export type EnquiryValues = {
  fields: Record<string, string>
  file: File | null
  turnstileToken: string
  startedAt: number
}

export const STANDALONE_ENQUIRY_ENDPOINT = '/enquiry-submit.php'
const STANDALONE_MAX_FILE_BYTES = 5 * 1024 * 1024
const STANDALONE_FILE_TYPES = new Set(['image/jpeg', 'image/png', 'application/pdf'])

/** Standalone transport contract. Site-specific validation remains with the site. */
export function buildStandalonePayload(values: EnquiryValues, submissionId: string): FormData {
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(submissionId)) throw new Error('submission_id')

  const body = new FormData()
  for (const [key, value] of Object.entries(values.fields)) body.set(key, value)
  body.set('submission_id', submissionId)
  body.set('cf-turnstile-response', values.turnstileToken)
  body.set('company', '')
  body.delete('photos')
  if (values.file) body.set('photos', values.file)
  return body
}

/** Minimal slice of Storage this needs, so tests and non-browser consumers need no DOM storage. */
export type IdentityStore = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
export type IdentityOptions = { storage?: IdentityStore | null; now?: () => number }

export const SUBMISSION_ID_KEY = 'agg.enquiry-kit.submission-id.v1'
export const SUBMISSION_ID_TTL_MS = 24 * 60 * 60 * 1000

function defaultStore(): IdentityStore | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    return null
  }
}

export class SubmissionIdentity {
  private snapshot = ''
  private id = ''
  private storage: IdentityStore | null
  private now: () => number

  constructor(private create: () => string = () => crypto.randomUUID(), options: IdentityOptions = {}) {
    this.storage = options.storage === undefined ? defaultStore() : options.storage
    this.now = options.now ?? (() => Date.now())
  }

  /** Stable for identical content; token refresh and form start time are intentionally ignored. */
  for(values: EnquiryValues): string {
    const { turnstileToken: _token, startedAt: _started, file, ...details } = values
    const fields = Object.fromEntries(
      Object.entries(details.fields).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0),
    )
    const snapshot = JSON.stringify({
      ...details,
      fields,
      file: file ? { name: file.name, size: file.size, lastModified: file.lastModified } : null,
    })
    if (this.id && snapshot === this.snapshot) return this.id

    const stored = this.read()
    if (stored && stored.snapshot === snapshot && this.now() - stored.ts < SUBMISSION_ID_TTL_MS) {
      this.snapshot = snapshot
      this.id = stored.id
      return this.id
    }

    this.id = this.create()
    this.snapshot = snapshot
    this.write(snapshot, this.id)
    return this.id
  }

  private read(): { snapshot: string; id: string; ts: number } | null {
    try {
      const raw = this.storage?.getItem(SUBMISSION_ID_KEY)
      if (!raw) return null
      const value = JSON.parse(raw) as Record<string, unknown>
      return typeof value.snapshot === 'string' && typeof value.id === 'string' && typeof value.ts === 'number'
        ? { snapshot: value.snapshot, id: value.id, ts: value.ts }
        : null
    } catch {
      return null
    }
  }

  private write(snapshot: string, id: string): void {
    try {
      this.storage?.setItem(SUBMISSION_ID_KEY, JSON.stringify({ snapshot, id, ts: this.now() }))
    } catch {
      // Storage can fail in private mode or at quota; in-memory identity still supports retries.
    }
  }
}

export function acceptedReceipt(status: number, value: unknown): boolean {
  if (status !== 202 || !value || typeof value !== 'object') return false
  const receipt = value as Record<string, unknown>
  return receipt.ok === true
    && typeof receipt.reference === 'string'
    && /^[a-f0-9]{32}$/.test(receipt.reference)
    && receipt.email_status === 'queued'
    && receipt.booking_confirmed === false
}

export type SubmissionResponse = { accepted: boolean; code: string | null; resetToken: boolean }

export function classifySubmissionResponse(
  status: number,
  value: unknown,
  standalone = true,
): SubmissionResponse {
  const accepted = standalone
    ? acceptedReceipt(status, value)
    : status >= 200 && status < 300 && !!value && typeof value === 'object'
      && (value as Record<string, unknown>).ok === true
  if (accepted) return { accepted: true, code: null, resetToken: false }

  const code = value && typeof value === 'object' && typeof (value as Record<string, unknown>).error === 'string'
    ? String((value as Record<string, unknown>).error)
    : 'upstream'
  return { accepted: false, code, resetToken: true }
}

export function validateStandaloneFile(file: File | null): 'upload' | null {
  if (!file) return null
  return file.size <= STANDALONE_MAX_FILE_BYTES && STANDALONE_FILE_TYPES.has(file.type) ? null : 'upload'
}

export type SubmissionRequest = {
  endpoint: string
  method: 'POST'
  headers?: undefined
  body: FormData
  accepts: (status: number, value: unknown) => boolean
}

export function buildSubmissionRequest(
  values: EnquiryValues,
  identity: SubmissionIdentity,
): SubmissionRequest {
  // Enforce the standalone upload contract before minting an identity or building transport data.
  if (validateStandaloneFile(values.file)) throw new Error('upload')
  return {
    endpoint: STANDALONE_ENQUIRY_ENDPOINT,
    method: 'POST',
    body: buildStandalonePayload(values, identity.for(values)),
    accepts: acceptedReceipt,
  }
}

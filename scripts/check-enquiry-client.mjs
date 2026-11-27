// Drift guard for the copied kit module. src/lib/enquiryClient.ts is a byte-for-byte copy of
// agg-enquiry-kit's web/enquiryClient.ts; editing it locally, or copying a newer kit version
// without updating this hash, would silently desync this site from the kit's contract.
// Runs as part of `npm run build`, so drift fails the build rather than a test nobody runs.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const PUBLISHED = '380743aee8b29707c6e7ddcfda81a0ad589a5f050637480c900911b75f2478e1'
const path = new URL('../src/lib/enquiryClient.ts', import.meta.url)
const actual = createHash('sha256').update(readFileSync(path)).digest('hex')

if (actual !== PUBLISHED) {
  console.error('enquiryClient.ts does not match the published kit module.')
  console.error(`  expected ${PUBLISHED}`)
  console.error(`  actual   ${actual}`)
  console.error('Re-copy it from the kit, or update PUBLISHED here if you are adopting a new kit version.')
  process.exit(1)
}
console.log('enquiry client matches the published kit module')

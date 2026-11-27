import { FORM_OPTIONS } from '../components/sections/Contact'

// Site-specific glue between this form's shape and the kit's canonical field names.
// The kit's enquiryClient.ts is generic and byte-pinned; everything that knows about
// *this* site's fields lives here, so the copied module never needs editing.

export type CurrentFormFields = {
  name: string
  email: string
  phone: string
  suburb: string
  propertyType: string
  serviceType: string
  serviceFor: string
  garageDoorType: string
  gateType: string
  message: string
}

export function standaloneEnquiriesEnabled(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === 'true'
}

export function standaloneFields(values: CurrentFormFields): Record<string, string> {
  // The form shows a gate list or a garage-door list depending on serviceFor, but posts
  // whichever is active as the single door_type field. enquiry/adapter.php accepts both sets.
  const doorType = values.serviceFor === 'Gate' ? values.gateType : values.garageDoorType
  return {
    name: values.name,
    email: values.email,
    phone: values.phone,
    suburb: values.suburb,
    message: values.message,
    property_type: values.propertyType,
    service_type: values.serviceType,
    service_for: values.serviceFor,
    door_type: doorType,
  }
}

// Single source of truth for the option lists, so enquiry/contract-test.php can prove the
// PHP adapter's enums and the form's dropdowns cannot drift apart.
export const STANDALONE_FIELD_OPTIONS = {
  property_type: FORM_OPTIONS.propertyTypes,
  service_type: FORM_OPTIONS.serviceTypes,
  service_for: FORM_OPTIONS.serviceFor,
  door_type: [...FORM_OPTIONS.garageDoorTypes, ...FORM_OPTIONS.gateTypes],
} as const

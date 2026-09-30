<?php
declare(strict_types=1);

// Field names and option lists read from the live form component,
// src/components/sections/Contact.tsx, not from the legacy quote-submit.php proxy.
// The adapter is the allowlist the intake enforces, so it has to match what the form
// actually posts.

use Enquiry\Adapters\GenericAdapter;

return new GenericAdapter(
    site: 'garagedoorrepairsmelbourne.net.au',
    // The form has a suburb field and marks it required.
    requireSuburb: true,
    enums: [
        'property_type' => ['Residential', 'Commercial', 'Industrial', 'Strata / Body Corporate', 'Other'],
        'service_type' => [
            'New door supply & install',
            'Garage door repair',
            'Motor / automation',
            'Spring, cable or track repair',
            'Remote or wall control',
            'Preventative maintenance',
            'Emergency repair',
            'Other / not sure',
        ],
        'service_for' => ['Garage Door', 'Garage Door Opener', 'Gate', 'Remote / Controls', 'Not Sure'],
    ],
    optionalEnums: [
        // Contact.tsx posts door_type from either the garage-door list or the gate list
        // depending on service_for, so both sets are valid values for the one field.
        'door_type' => [
            'Sectional / panel lift', 'Roller door', 'Tilt door', 'Custom door', 'Not sure',
            'Sliding gate', 'Swing gate', 'Pedestrian gate',
        ],
    ],
    map: [
        'name' => 'name',
        'email' => 'email',
        'phone' => 'phone',
        'suburb' => 'suburb',
        'message' => 'message',
    ],
);

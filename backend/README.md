# Project Schemes

## TransportTypeSchema

The `TransportTypeSchema` defines the structure for transport types in the database. This schema includes the following fields:

- **id**: A unique identifier for the transport type. This field is a string, required, and must be unique.
- **name**: The name of the transport type. This field is a string and is required.
- **photo**: An optional field for the URL of a photo representing the transport type. This field is a string and defaults to `null`.

## TransportAvailabilitySchema

The `TransportAvailabilitySchema` defines the structure for transport availability in the database. This schema includes the following fields:

- **transportId**: A reference to the transport type. This field is a number.
- **date**: The date for which the availability is being recorded. This field is a date and is required.
- **slots**: An array of time slots, each containing:

  - **start**: The start time of the slot. This field is a number and is required.
  - **end**: The end time of the slot. This field is a number and is required.
  - **available**: A boolean indicating whether the slot is available. This field is required.

  ## TransportSchema

The `TransportSchema` defines the structure for transport details in the database. This schema includes the following fields:

- **name**: The name of the transport.
- **cost**: The cost of the transport.
- **transportTypeId**: A reference to the transport type. (TODO: Update to `Schema.Types.ObjectId` and `ref` once `TransportType` schema is defined)
- **ownerId**: A reference to the owner of the transport. (TODO: Update to `Schema.Types.ObjectId` and `ref` once `Owner` schema is defined)
- **locationDataId**: A reference to the location data. (TODO: Update to `Schema.Types.ObjectId` and `ref` once `LocationData` schema is defined)
- **description**: A description of the transport. This field is a string and is trimmed.
- **hasDelivery**: A boolean indicating whether the transport has delivery options.
- **photos**: An array of strings representing URLs of photos of the transport.

## SlotSchema

The `SlotSchema` defines the structure for time slots in the database. This schema includes the following fields:

- **start**: The start time of the slot.
- **end**: The end time of the slot.
- **available**: A boolean indicating whether the slot is available.

### Validation

The schema includes a pre-save hook to ensure the following validations:
- The start time must be before the end time.
- The slot must be at least one hour long.

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

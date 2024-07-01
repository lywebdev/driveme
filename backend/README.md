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
- **slots**: An array of time slots, referencing SlotSchema.

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

## UserSchema

The `UserSchema` defines the structure for user details in the database. This schema includes the following fields:

- **name**: The name of the user.
- **email**: The email address of the user.
- **password**: The password for the user's account.
- **role**: The role of the user within the system.
- **createdAt**: The date and time when the user was created.

### Validation

The schema includes a pre-save hook to ensure the following validations:
- Email is checked using a regular expression (string length, presence of @, absence of spaces are checked)

### Existing roles
- `user` - a regular user
- `admin` - has the ability to manage content
## TransportLocationDataSchema

The `TransportLocationDataSchema` defines the structure for transport location data in the database. This schema includes the following fields:

- **address**: The address of the transport location.
- **city**: The city of the transport location.
- **postalCode**: The postal code of the transport location.
- **transport**: A reference to the transport associated with this location.


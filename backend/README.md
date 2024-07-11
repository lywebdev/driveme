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
- **transportTypeId**: A reference to the transport type.
- **ownerId**: A reference to the owner of the transport. (TODO: Update to `Schema.Types.ObjectId` and `ref` once `Owner` schema is defined)
- **locationDataId**: A reference to the location data.
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

## Authentication Middleware

This middleware handles user authentication by verifying JSON Web Tokens (JWT) stored in cookies. It includes two main functions: `isUserLoggedIn` and `isUserLoggedOut`.

## Admin Authentication Middleware

This middleware handles admin authentication by verifying JSON Web Tokens (JWT) stored in cookies and checking the user’s role.

### Functions

- **authResponse**: Sends a 401 Unauthorized response with a message.
- **isUserLoggedIn**: Checks if the user is logged in by verifying the JWT in the cookies.
  - If the token is missing or invalid, it sends an unauthorized response.
  - If the token is valid, it attaches the user information to the request object and calls the next middleware.
- **isUserLoggedOut**: Checks if the user is logged out by verifying the absence of a valid JWT in the cookies.

  - If the token is present and valid, it sends an unauthorized response.
  - If the token is missing or invalid, it calls the next middleware.

  ## User Routes

This file defines the routes for user-related operations. It uses Express to create a router and includes middleware for authentication.

### Routes

- **Public Routes**:

  - `POST /login`: Allows users to log in. This route is accessible only if the user is logged out. Uses `auth.isUserLoggedOut` middleware.

- **Protected Routes**:

  - All routes below require the user to be logged in. Uses `auth.isUserLoggedIn` middleware.
  - `GET /`: Retrieves all users. Uses `usersController.findAll`.
  - `POST /`: Creates a new user. Uses `usersController.store`.
  - `GET /logout`: Logs out the user. Uses `usersController.logout`.

  **Admin Routes**:

  - All routes below require the user to be an admin. Uses `adminAuth.isAdmin` middleware.
  - `GET /`: Retrieves all transport types. Uses `transportTypeController.findAll`.
  - `POST /`: Creates a new transport type. Uses `transportTypeController.store`.
  - `DELETE /:id`: Deletes a transport type by ID. Uses `transportTypeController.destroy`.
  - `PUT /:id`: Updates a transport type by ID. Uses `transportTypeController.update`.

  ## Index.js

This file sets up the main router for the application and includes the user routes.

### Imports

- **express**: The Express framework.
- **usersRoutes**: The routes for user-related operations.

### Router Setup

- **router.use("/users", usersRoutes)**: Mounts the user routes at the `/users` path.
- **router.use("transporttypes, transportTypeRoutes)**: Mounts the transport type routes at the `/transporttypes` path.

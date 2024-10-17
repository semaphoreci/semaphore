# RFC 0000 - API-v2: Standardized and Fully Documented API

## What

This RFC proposes the development of API-v2 for Semaphore, which aims to standardize our API structure, migrate existing services, and implement comprehensive, sustainable documentation for all endpoints.

## Why

Our current API is in an alpha version, and many services lack complete documentation. This situation hinders user adoption, makes integration difficult, and complicates future development. By creating API-v2, we aim to:

1. Improve the developer experience for our users.
2. Ensure consistency across all our API services.
3. Establish a sustainable process for maintaining up-to-date documentation.
4. Facilitate easier onboarding for new services in the future.

## Solution details

### Functionality

1. Migration of existing services:
   - Audit all current API services and endpoints.
   - Define a standard format for endpoint structure and response schemas.
   - Migrate each existing service to the new standard, ensuring backward compatibility where possible.

2. Documentation system:
   - Implement an OpenAPI specification for all endpoints.
   - Set up automated documentation generation from code comments and OpenAPI specs.
   - Create a user-friendly documentation portal with interactive examples.

3. Versioning strategy:
   - Implement clear versioning for the API (e.g., `/v2/` prefix for all new endpoints).
   - Establish a deprecation policy for old endpoints.

4. Authentication and security:
   - Review and potentially update authentication methods.
   - Implement rate limiting and other security measures consistently across all endpoints.

### Architecture & Design

The proposed updates are currently split into two groups:

#### Endpoint updates

The proposal for the updates of all of the existing endpoints.
They can be found in the [resources/endpoint-descriptions](./resources/endpoint-descriptions/)

**Please share your feedback as a direct comment on those file.**

#### API design guide

This guide defines the core principles and best practices for building and evolving APIs within our CI/CD platform.

It can be found in the [resources/Semaphore API Design Guide.md](./resources/Semaphore%20API%20Design%20Guide.md)

**Please share your feedback as a direct comment on the design guide file.**

## Open questions

- What are the aditional changes we should make in the existing endpoints?
- Should we make any changes to the API Design Guide?
- How do we maintain parallel support for both v1 (alpha) and v2 APIs during the transition, and set a hard cutoff date?
- How do we handle breaking changes in the future once v2 is established?
- How can we encourage internal teams to keep the documentation up-to-date as they make changes to the API?
- Should we implement a developer feedback system within the new documentation portal?

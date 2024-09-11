# Semaphore API Design Guide

## Table of Contents

- [Introduction](#introduction)
- [Resources](#resources)
  - [Resource-Oriented Design](#resource-oriented-design)
  - [Nested Resources](#nested-resources)
  - [Endpoint Naming](#endpoint-naming)
- [Response](#response)
  - [Response Format](#response-format)
  - [Object Instead of IDs](#object-instead-of-ids)
- [Standard Methods](#standard-methods)
  - [Create a Resource](#create-a-resource)
  - [Read a Resource](#read-a-resource)
  - [Update a Resource](#update-a-resource)
  - [Delete a Resource](#delete-a-resource)
- [Custom Methods](#custom-methods)
  - [Behavior of Custom Methods](#behavior-of-custom-methods)
  - [Request and Response Structure](#request-and-response-structure)
  - [Examples of Custom Methods](#examples-of-custom-methods)
  - [Encouraging the Use of Standard Methods](#encouraging-the-use-of-standard-methods)
- [Error Handling](#error-handling)
  - [Error Response Format](#error-response-format)
  - [Writing Effective Error Messages](#writing-effective-error-messages)
  - [Error Codes](#error-codes)
  - [HTTP Status Codes](#http-status-codes)
  - [Best Practices for Error Handling](#best-practices-for-error-handling)
- [Standard Fields](#standard-fields)
  - [Naming Convention: snake_case](#naming-convention-snake_case)
  - [Timestamps](#timestamps)

## Introduction

Welcome to the **Semaphore API Design Guide**. This guide sets out the core principles and best practices for building and evolving APIs within our open-source CI/CD platform. It's intended for both internal developers and external contributors to help ensure consistency, simplicity, and scalability across the API.

This guide focuses on **RESTful APIs** and covers critical areas like URL structures, versioning, error handling, and authentication. By adhering to these guidelines, you'll ensure that your contributions align with Semaphore's technical vision and can be smoothly integrated with existing code.

We update this guide regularly to reflect new patterns and recommendations. Whether you're adding features, fixing issues, or improving performance, we encourage you to consult this document and follow the outlined practices. Feedback and collaboration are always welcome as we continuously improve our API.

## Resources

### Resource-Oriented Design

At Semaphore, we follow a **resource-oriented design** approach for our API to ensure simplicity, consistency, and ease of use. This design pattern structures the API around resources—such as pipelines, jobs, or secrets—making it intuitive and predictable for developers.

By adopting resource-oriented design, we aim to:

- **Simplify interactions**: Each resource in our API is represented by a unique URL and interacts through standard HTTP methods (GET, POST, PUT, DELETE). This makes it easier for developers to understand and work with the API, using clear and consistent endpoints.

- **Maintain consistency**: Structuring the API around resources ensures that similar types of data are handled in a uniform way. Whether you're retrieving information, updating a record, or deleting an entity, the same approach applies across all resources.

- **Enhance usability**: With clearly defined resources and operations, the API remains intuitive for both new and experienced developers. This approach minimizes confusion and speeds up the development process by reducing the learning curve.

In practice, every resource in the Semaphore API is treated as a first-class entity, with actions mapped to appropriate HTTP methods. For example:

- GET /jobs/{id} retrieves details for a specific job.
- POST /pipelines creates a new pipeline.
- DELETE /secrets/{secret_name_or_id} removes a secret.

This structure not only supports clean, organized API design but also makes scaling and maintaining the API much easier as Semaphore continues to grow.

### Nested Resources

In the Semaphore API, most resources are defined at the root level, such as /jobs, /pipelines, and /secrets, even though some of them are associated with specific projects. However, for other resources—like deployment targets, project secrets, and tasks—we use a nested structure. The primary reason for this is to handle potential **name conflicts** when resources can have the same name across different projects.

**Why Nest Resources?**

When a resource can be identified by name (such as tasks or project secrets) and that name might be used in multiple projects, nesting under the project resource becomes necessary. This ensures that resources are scoped within the correct project, preventing ambiguity in cases where the same resource name exists in more than one project.

For example:

- GET /projects/{project_name_or_id}/tasks/{task_name_or_id} retrieves a task with the given name or ID, scoped to a specific project.
- POST /projects/{project_name_or_id}/deployment_targets creates a deployment target for a specific project.
- DELETE /projects/{project_name_or_id}/secrets/{secret_name_or_id} removes a named secret within a project.

By scoping resources like tasks or secrets under the project, we avoid conflicts that would arise if multiple projects used the same resource name.

**When to Use Nested Resources**

- **Handling name conflicts**: Resources like tasks, secrets, and deployment targets that may share names across projects must be nested under project_name_or_id to properly differentiate between them.

In all other cases where resource names are unique or where scoping isn't necessary, resources remain at the root level to keep the API simple and easy to use.

### Endpoint Naming

In the Semaphore API, we use **snake_case** (underscores between words) for naming endpoints. This convention ensures consistency and readability throughout the API, making it easier for developers to work with.

**Example**

- GET /self_hosted_agent_types: Retrieve available types of self-hosted agents.
- POST /projects/{project_name_or_id}/deployment_targets: Create a new deployment target within a specific project.

By following this naming convention, we maintain uniformity across all API endpoints, helping both internal and external developers quickly understand the purpose and structure of each endpoint. This consistency simplifies development and ensures a smooth experience when interacting with the API.

## Response

### Response Format

In the Semaphore API, resources follow a consistent structure to facilitate easy identification and parsing. Each resource contains the following key fields:

**apiVersion**

The apiVersion field specifies the version of the API that the resource adheres to. This helps maintain compatibility as the API evolves over time.

**Example**: "apiVersion": "v2"

**kind**

The kind field defines the type of the resource. It helps in identifying the nature of the resource (e.g., a Secret, Job, or Project).

**Example**: "kind": "Secret"

**metadata**

The metadata field contains non-functional information that helps identify and manage the resource. This section typically includes:

- **id**: The unique identifier of the resource.
- **org_id**: The unique identifier of the organization.
- **name**: A human-readable name for the resource.
- **created_at**: The timestamp when the resource was created.
- **updated_at**: The timestamp when the resource was last updated.
- **created_by / updated_by**: Information about the user or system that created or updated the resource.

**Example**:

```json
"metadata": {
  "id": "b6654945-cf11-43a1-8e3a-f5a22c7d19fa",
  "org_id": "7a9f674e-3c3f-47e9-b9ef-bc456a7e27b5",
  "project_id": "be3d2a67-e741-4c1f-882e-8d7ad5461e4b",
  "created_at": "2024-07-12T11:02:50.108Z",
  "updated_at": "2024-07-15T10:30:00.000Z"
}
```

**spec**

The spec field contains the functional configuration or the desired state of the resource. This is where the actual content of the resource is defined, based on its kind. For instance, if the resource is a Secret, the spec field would include details like environment variables, files, and access configurations.

**Example**:

```json
"spec": {
  "access_config": {
    "attach_access": "YES",
    "debug_access": "YES",
    "project_access": "WHITELISTED",
    "projects": [
      { "id": "0e7fa31e-f974-4f57-ab99-72ac8b70df41" }
    ]
  }
}
```

### Object Instead of IDs

In Semaphore's API, we return detailed objects with relevant information for entities such as users and roles, rather than providing only raw identifiers. This ensures that clients receive necessary context directly in the response without requiring additional API calls.

Initially, the object will include only the id field, but as needed, it can be expanded to include other attributes such as name or avatar. This provides flexibility and allows the API to return more detailed information when necessary.

**Example**

```json
"promoted_by": {
  "type": "USER",
  "id": "b6654945-cf11-43a1-8e3a-f5a22c7d19fa",
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg"
}
```

By returning full objects, we provide more context for interacting with these entities, reducing the need for additional queries and enhancing usability.

## Standard Methods

Semaphore's API follows RESTful principles, using standard HTTP methods to interact with resources. The four main actions—**Create**, **Read**, **Update**, and **Delete** (CRUD)—are supported by corresponding HTTP methods: POST, GET, PATCH, and DELETE. Each method behaves consistently across different resources, ensuring predictable API interactions.

### Create a Resource

- **Behavior**: The POST method is used to create a new resource within a project or other parent resource. When creating a resource, the request body must contain metadata and spec fields that define both the identity and details of the resource being created.

- **Parameters**:
  - metadata: Includes essential resource identification fields, such as project_id.
  - spec: Contains the functional details of the resource (e.g., name, configuration, etc.).

- **Request Format**: The request body contains metadata and spec, while apiVersion and kind are optional and can be inferred from the URL.

- **Response Format**: The response mirrors the request format, including metadata, spec, and potentially generated fields like id, timestamps, and user identifiers.

### Read a Resource

- **Behavior**: The GET method retrieves details of an existing resource. This could be a single resource or a collection of resources, depending on the endpoint. No body is required in the request.

- **Parameters**:
  - Path parameters (e.g., resource_id, project_name_or_id) to specify the resource being retrieved.

- **Response Format**: The response includes metadata and spec fields, detailing the resource's identity and functional information, along with optional fields like apiVersion and kind.

### Update a Resource

- **Behavior**: The PATCH method is used to modify an existing resource. Semaphore only uses PATCH for updates, and both request and response bodies follow the same structure. Updates modify specific fields in the resource without replacing the entire object.

- **Parameters**:
  - Path parameters for identifying the resource (e.g., resource_id, project_name_or_id).
  - Request body containing metadata and spec with the fields that need updating.

- **Request Format**: The request body must include both metadata and spec, ensuring that the resource can be properly identified and the necessary changes applied.

- **Response Format**: The response reflects the updated resource with its new state, using the same structure as the request (i.e., metadata, spec, optional apiVersion and kind).

### Delete a Resource

- **Behavior**: The DELETE method removes an existing resource. The resource is identified via path parameters, and no body is required in the request.

- **Parameters**:
  - Path parameters (e.g., resource_id, project_name_or_id) to identify the resource to be deleted.

- **Response Format**: Typically, a 204 No Content status is returned to indicate successful deletion, with no body in the response.

## Custom Methods

Semaphore's API supports **custom methods** for performing actions that extend beyond basic CRUD operations. These methods allow the API to handle resource-specific operations that require more flexibility, such as starting, stopping, or performing actions on resources.

### Behavior of Custom Methods

Custom methods are categorized based on the type of action:

- **Triggering an action**: Use the POST method when initiating an action that results in a change or side effect.
- **Idempotent actions**: Use the GET method for retrieving information or performing actions that do not change the resource's state (no side effects).

### Request and Response Structure

- **Request Structure**:
  - The request body for custom methods only needs to include the data required to perform the action. It does not follow the standard metadata and spec structure used for resource manipulation.
  - Path parameters are used to identify the resource (e.g., project_name_or_id, resource_id), and the body may contain additional parameters relevant to the action.

- **Response Structure**:
  - If the action is **synchronous** (the action completes immediately), the response should return the updated state of the resource, reflecting any changes made by the action.
  - If the action is **asynchronous** (the action is still processing), the response should return either an empty body or an action ID that the client can use to check the status of the action later.

### Examples of Custom Methods

1. **Pausing a Resource (POST)**:
   - **Behavior**: A pipeline or task may be paused, altering its state.
   - **Method**: POST /projects/{project_name_or_id}/pipelines/{pipeline_id}/pause
   - **Request Body**: Includes only the relevant data needed to perform the action, such as user confirmation or reason for pausing.
   - **Response**: Returns the updated state of the resource if synchronous, or an action ID if asynchronous.

2. **Checking Deployment Status (GET)**:
   - **Behavior**: Retrieving the status of a deployment without modifying it.
   - **Method**: GET /projects/{project_name_or_id}/deployments/{deployment_id}/status
   - **Response**: Returns the current status of the deployment, with no side effects.

### Encouraging the Use of Standard Methods

We encourage using **standard methods** (POST, GET, PATCH, DELETE) whenever possible to maintain API consistency. Custom methods should only be used when the action cannot be performed using standard methods, ensuring that the API remains simple and predictable.

## Error Handling

Semaphore's API provides clear, actionable error messages to help developers quickly understand and resolve issues. All error responses follow a structured format to maintain consistency and provide useful feedback.

### Error Response Format

Error responses use the following structure:

- **message**: A human-readable description of the error that explains what went wrong and provides some context.
- **documentation_url**: A link to relevant documentation for further information or troubleshooting.
- **errors**: An array of specific error details, each containing:
  - **resource**: The type of resource where the error occurred (e.g., Project).
  - **field**: The specific field that caused the issue (e.g., name).
  - **code**: A short code that indicates the nature of the problem (e.g., missing_field).

**Example Error Response**

```json
{
  "message": "Validation failed: The 'name' field is required to create a project.",
  "documentation_url": "https://example.com/docs/errors",
  "errors": [
    {
      "resource": "Project",
      "field": "name",
      "code": "missing_field"
    }
  ]
}
```

### Writing Effective Error Messages

- **Audience**: Error messages should be written for a broad technical audience. Users might not be familiar with your API's implementation, so avoid assuming deep knowledge of your service.
- **Clarity**: Keep error messages brief but informative. Provide clear guidance on what went wrong and how to fix it. Where more information is necessary, link to documentation.
- **Resolution-Oriented**: Whenever possible, offer actionable advice to resolve the error. If a field is missing or invalid, specify which field and why it matters.

### Error Codes

The following error codes are used to indicate specific issues in requests:

- **missing**: A resource does not exist.
- **missing_field**: A required field on a resource has not been set.
- **invalid**: The formatting of a field is invalid.
- **already_exists**: Another resource has the same value as this field.
- **unprocessable**: The inputs provided were invalid.

### HTTP Status Codes

Semaphore's API uses standard HTTP status codes to communicate the result of requests. These codes help users understand whether a request was successful or why it failed:

- **200 OK**: The request was successful.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: The request was malformed or contained invalid data.
- **401 Unauthorized**: Authentication is required or has failed.
- **403 Forbidden**: The user is authenticated but does not have permission to perform the action.
- **404 Not Found**: The requested resource could not be found.
- **422 Unprocessable Entity**: The request was well-formed but contained invalid data.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### Best Practices for Error Handling

Error messages should be clear, concise, and provide users with sufficient information to understand and correct the issue. Always include links to relevant documentation for further context, and avoid exposing sensitive internal details.

## Standard Fields

To ensure consistency and clarity, the Semaphore API uses standard naming conventions for certain fields across all resources. One key example is how **timestamps** are handled.

### Naming Convention: snake_case

All fields in the API will follow the **snake_case** convention, where words are separated by underscores. This applies to both request and response fields to ensure uniformity across the entire API.

### Timestamps

All timestamps returned by the API will adhere to the following standards:

- **UTC Time**: Timestamps will always be in **UTC** to avoid confusion across different time zones.
- **ISO 8601 Format**: The API will use ISO 8601 format for all timestamps, ensuring a consistent and widely recognized format. Example: "2022-07-08T20:18:44Z".
- **Suffix**: All fields related to timestamps will end with the _at suffix, indicating the action associated with the time. For example:
  - created_at: The time when the resource was created.
  - queued_at: The time when the resource was queued for processing.
- **Specified Timestamps**: For API calls that accept timestamps as input, we use the exact timestamp provided by the client. These timestamps may also include an offset, such as "2022-07-08T16:18:44+04:00".

This standard ensures consistency across all resources and simplifies timestamp management for both clients and the API itself.

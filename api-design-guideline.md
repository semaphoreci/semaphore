# API v2 - The Standard

## 1. Pagination

We will implement token-based or offset-based pagination for the API. It will depend on the endpoint.

- Token-based pagination will use `page_size` and `page_token` parameters. (before, after??)
- Offset-based pagination will use `page_size` and `page` parameters.
- In both cases `page_size`, it will have default and maximum value, defined per endpoint.

If a response is paginated, response headers will include a `link` header. The `link` header contains URLs for fetching additional pages of results. The `link` header will be omitted if the endpoint does not support pagination or if all results fit on a single page.

Example:
```
link: <https://acme.semaphoreci.com/api/projects?pag_token=2>; rel="prev", <https://acme.semaphoreci.com/api/projects?pag_token=4>; rel="next", <https://acme.semaphoreci.com/api/projects>; rel="first"
```

The `link` header provides the URL for the previous, next, first, and last page of results:

- The URL for the previous page is followed by `rel="prev"`.
- The URL for the next page is followed by `rel="next"`.
- The URL for the last page is followed by `rel="last"`.
- The URL for the first page is followed by `rel="first"`.

In some cases, only a subset of these links are available. For example, the link to the previous page won't be included if you are on the first page of results, and the link to the last page won't be included if it can't be calculated.

The URLs in the `link` header use query parameters to indicate what page of results to return. The query parameters in the link URLs may differ between endpoints: each paginated endpoint will use the `page`, or `page_token` query parameters. In all cases, client can use the URLs in the `link` header to fetch additional pages of results.

Because not every API call uses the same structure for pagination, it's important to inform customers in documentation to not try and guess the format of the pagination URL. Instead, they should extract the pagination information from the `link` header, which is returned with every request. 

## 2. Timestamps

All timestamps returned by the API will be in UTC time and ISO 8601 format:

Example: `"2022-07-08T20:18:44Z"`

All fields related to timestamps will end with `_at` suffix, such as `created_at`, `queued_at`, etc. 

For API calls that allow for a timestamp to be specified, we use that exact timestamp.
These timestamps look something like `"2022-07-08T16:18:44+04:00"`

## 3. Enums

All enumerations used in the API will be in uppercase.

## 4. Object instead of IDs

Rather than using raw IDs for entities like users or roles, we will return detailed objects with relevant information. We can start with providing only the id inside the object.

Example: 
```json
"promoted_by": { "type": "USER", "id": "", "name": "", "avatar": "" } # in pipelines
"role": { "id": "", "name": "" } # in Deployment Targets
```

## 5. Status Codes

HTTP status codes along with a JSON message will indicate errors. 

Example:

### 404 error for an existing resource

We will send a 404 error when client isn't properly authenticated. Customer might expect to see a 403 Forbidden in these cases. However, since we don't want to provide any information about private resources, the API returns a 404 error instead.

```json
{
  "message": "Not Found",
  "documentation_url": "https://docs.semaphoreci.com/api/projects#get"
}
```

### 401 error when customer send wrong token

```json
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.semaphoreci.com/api/authorization"
}
```

### 500 error

```json
{
  "message": "Internal Error",
  "documentation_url": "..."
}
```

### 400 Parsing issue

```json
{
  "message":"Problems parsing JSON",
  "documentation_url": "..."
}
```

### 422 Resource Validation Error

```json
{
  "message": "Validation Failed",
  "documentation_url": "..",
  "errors": [
    {
      "resource": "Project",
      "field": "name",
      "code": "missing_field"
    }
  ]
}
```

### 403/404 Feature is not available

```json
{
  "message": "Feature Not Available",
  "documentation_url": "..."
}
```

Here are some additional details about status codes and error codes:

- `missing`: A resource does not exist.
- `missing_field`: A required field on a resource has not been set.
- `invalid`: The formatting of a field is invalid.
- `already_exists`: Another resource has the same value as this field.
- `unprocessable`: The inputs provided were invalid.

Resources may also send custom validation errors. Custom errors will always have a `message` field describing the error, and most errors will also include a `documentation_url` field pointing to content that might help you resolve the error.

## 6. User Agent Requirement

All API requests MUST include a valid User-Agent header. Requests without a header will be rejected. Please use the name of your application for the User-Agent header value.

Example: `User-Agent: App1`

## 7. Response Format

Each response will follow the given structure:

- `apiVersion`: (v1)
- `kind`: Project
- `metadata`: (id, org_id, project_id, timestamps)*readonly
- `spec`: duplication of metadata + resource-specific stuff

## 8. Endpoint Naming

Endpoint names will be connected with `_`. Examples include `self_hosted_agent_types`, `deployment_targets`.

## 9. Nesting of resources?

[Note: This section appears to be incomplete in the original text.]

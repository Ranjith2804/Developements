# Backend & System Design — Complete Knowledge Map
> A structured curriculum from beginner → intermediate → expert

---

## 1. System Design

### Core Concepts
- Scalability, Reliability, Availability, Maintainability (SRAM)
- Latency vs. Throughput trade-offs
- CAP Theorem (Consistency, Availability, Partition Tolerance)
- PACELC extension (latency trade-off even without partitions)
- Single points of failure (SPOF) and how to eliminate them

### Subtopics (Beginner → Advanced)
- **Beginner:** Client-server model, monolith vs. microservices overview, basic load balancing
- **Intermediate:** Database sharding, replication, consistent hashing, service discovery, API gateway patterns
- **Advanced:** Distributed consensus (Raft, Paxos), event-driven architecture, CQRS + Event Sourcing, saga pattern for distributed transactions, cell-based architecture

### Real-World Use Cases
- Designing a URL shortener (scaling writes, redirect caching, analytics)
- Designing a social feed (fan-out on write vs. fan-out on read)
- Designing a payment system (exactly-once semantics, idempotency)
- Designing a ride-sharing backend (geospatial queries, real-time matching)

### Key Principles & Best Practices
- Design for failure: assume everything will fail
- Prefer stateless services; push state to dedicated layers (DB, cache, queue)
- Use back-of-the-envelope calculations before choosing architecture
- Decouple components via message queues to absorb traffic spikes
- Idempotency keys for safe retries

### Common Pitfalls
- Over-engineering for scale that isn't needed yet
- Ignoring network partitions in distributed designs
- Hot partitions in sharded databases
- Synchronous calls creating cascading failures

### Connections
- Feeds into: Caching, Databases, Scaling & Performance, Concurrency, DevOps
- Informed by: OS (process/thread model), Networks (latency), Security (zero trust)

---

## 2. Operating Systems

### Core Concepts
- Process vs. Thread (isolation, memory space, scheduling overhead)
- CPU scheduling algorithms (Round Robin, Priority, MLFQ)
- Memory hierarchy: registers → L1/L2/L3 cache → RAM → disk
- Virtual memory, paging, page faults, TLB
- Context switching cost

### Subtopics (Beginner → Advanced)
- **Beginner:** Process lifecycle (new, ready, running, blocked, terminated), fork/exec, basic memory layout (stack, heap, BSS, text)
- **Intermediate:** Thread synchronization (mutex, semaphore, spinlock), deadlock conditions (Coffman), memory-mapped files, I/O models (blocking, non-blocking, async, I/O multiplexing — select/epoll/kqueue)
- **Advanced:** Lock-free data structures, memory barriers and CPU reordering, NUMA architecture, kernel bypass (DPDK), eBPF for observability

### Real-World Use Cases
- Nginx uses epoll + event loop — single-threaded handling thousands of connections
- Redis is single-threaded with non-blocking I/O — why this works
- Java thread pool sizing: CPU-bound (N+1 threads), I/O-bound (N * (1 + wait/compute))

### Key Principles & Best Practices
- Prefer async I/O for network-heavy services; prefer threads for CPU-bound
- Avoid holding locks during I/O operations
- Use thread pools — thread creation is expensive
- Understand the cost of a syscall (user-space → kernel-space switch)

### Common Pitfalls
- Race conditions from unsynchronized shared state
- Priority inversion (low-priority thread holding lock needed by high-priority thread)
- Thundering herd (many processes woken up for one event)
- Stack overflow from deep recursion in small-stack threads

### Connections
- Underpins: Concurrency & Parallelism, Backend servers, Databases (storage engine I/O), Caching (memory management)

---

## 3. Computer Networks

### Core Concepts
- OSI 7-layer model vs. TCP/IP 4-layer model
- IP addressing (IPv4/IPv6), subnetting, CIDR
- TCP (reliable, ordered, connection-oriented) vs. UDP (unreliable, fast, connectionless)
- DNS resolution chain (recursive resolver → root → TLD → authoritative)
- Bandwidth vs. Latency — which matters when

### Subtopics (Beginner → Advanced)
- **Beginner:** How HTTP sits on TCP, what a socket is, what a port is, basic DNS lookup
- **Intermediate:** TCP handshake (SYN/SYN-ACK/ACK), TCP congestion control (slow start, CWND), TLS handshake (certificate exchange, session keys), CDN mechanics
- **Advanced:** QUIC/HTTP3 (UDP-based, 0-RTT, head-of-line blocking elimination), BGP routing, anycast, network namespace (foundation of Docker networking), eBPF-based networking

### Real-World Use Cases
- Why multiplexing HTTP/2 over HTTP/1.1 reduces latency (head-of-line blocking)
- How a CDN terminates TLS at the edge (reduces round trips)
- TCP keepalive for long-lived DB connections
- How NAT traversal works in P2P systems

### Key Principles & Best Practices
- Minimize round trips — every RTT adds latency
- Keep payloads small for latency-bound workloads
- Use connection pooling to avoid TCP handshake overhead per request
- Implement exponential backoff + jitter for retries

### Common Pitfalls
- Forgetting TIME_WAIT state exhausts ephemeral ports under load
- Not setting TCP_NODELAY for latency-sensitive streams (Nagle's algorithm)
- Assuming internal network is reliable (it isn't)
- DNS TTL misconfiguration causing stale caches during deployments

### Connections
- Foundation for: HTTP Protocol, Routing, WebSockets (Realtime), Security (TLS), DevOps (networking in containers)

---

## 4. Backend Development

### Core Concepts
- Request lifecycle: network → OS → process → framework → handler → response
- Separation of concerns: routing, business logic, data access, serialization
- Sync vs. async execution models
- The role of a framework vs. raw HTTP server

### Subtopics (Beginner → Advanced)
- **Beginner:** Setting up an HTTP server, handling routes, returning JSON responses, environment variables
- **Intermediate:** Middleware pipelines, dependency injection, repository pattern, layered architecture (controller → service → repository), error handling strategies
- **Advanced:** Plugin/modular architecture, event-driven backends, multi-tenant systems, rate limiting at the framework level, building your own HTTP server primitives

### Real-World Use Cases
- ASP.NET Core pipeline: IApplicationBuilder composing middleware
- Express.js middleware chain with `next()` propagation
- FastAPI's dependency injection for auth, DB sessions

### Key Principles & Best Practices
- Single Responsibility at every layer
- Fail fast — validate input at the boundary before it reaches business logic
- Keep controllers thin — they orchestrate, they don't compute
- Return domain-agnostic error types from services; translate at the controller

### Common Pitfalls
- Business logic leaking into controllers or repositories
- Not separating the data model (DB entity) from the API response model (DTO)
- Synchronous blocking calls inside async code paths
- God services that do everything

### Connections
- Consumes: OS (threads, I/O), Networks, HTTP Protocol
- Contains: Routing, Middleware, Handlers/Controllers, Business Logic Layer, Validation

---

## 5. DBMS

### Core Concepts
- ACID properties (Atomicity, Consistency, Isolation, Durability)
- Transactions and isolation levels (Read Uncommitted → Serializable)
- Indexing internals: B-Tree (RDBMS) vs. LSM-Tree (Cassandra, RocksDB)
- Query planner and EXPLAIN output
- Normalization (1NF → 3NF → BCNF) vs. denormalization for reads

### Subtopics (Beginner → Advanced)
- **Beginner:** SQL basics, primary/foreign keys, simple indexes, basic joins
- **Intermediate:** Composite indexes, covering indexes, index selectivity, transaction isolation (phantom reads, dirty reads, non-repeatable reads), stored procedures, views
- **Advanced:** MVCC (how Postgres handles concurrent reads without locking writers), WAL (Write-Ahead Log) and crash recovery, sharding strategies, distributed transactions (2PC, saga), column-store vs. row-store engines

### Real-World Use Cases
- Choosing READ COMMITTED to avoid dirty reads in payment processing
- Using a covering index to eliminate a table lookup (index-only scan)
- WAL replication for read replicas (your Stage 4 URL Shortener)
- Partial indexes for soft-deleted rows

### Key Principles & Best Practices
- Index what you filter and sort on — but over-indexing slows writes
- Use EXPLAIN ANALYZE before optimizing queries
- Choose isolation level based on actual consistency requirements — Serializable is rarely needed
- Always wrap multi-step mutations in a transaction

### Common Pitfalls
- N+1 query problem (loop of individual queries instead of a JOIN)
- Implicit full table scans from function calls on indexed columns (WHERE YEAR(created_at) = 2024)
- Long-running transactions holding locks
- Not understanding phantom reads at REPEATABLE READ level

### Connections
- Underpins: Databases (practical patterns), Business Logic Layer, Caching (what to cache), CRUD, Scaling (replication, sharding)

---

## 6. Security

### Core Concepts
- CIA Triad: Confidentiality, Integrity, Availability
- Defense in depth — multiple security layers
- Principle of least privilege
- OWASP Top 10 (SQL injection, XSS, broken auth, IDOR, SSRF, etc.)
- Threat modeling (STRIDE: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege)

### Subtopics (Beginner → Advanced)
- **Beginner:** HTTPS/TLS, hashing passwords (bcrypt, Argon2), never storing plaintext secrets, input sanitization
- **Intermediate:** JWT security (algorithm confusion attacks, token expiry, refresh rotation), OAuth 2.0 flows, rate limiting, CSRF protection, CORS policy, SQL injection prevention via parameterized queries
- **Advanced:** mTLS (mutual TLS for service-to-service), zero-trust networking, secrets rotation with Vault, supply chain security (SBOM), side-channel attacks, secure enclave usage

### Real-World Use Cases
- bcrypt's intentional slowness prevents brute-force of leaked hash databases
- SSRF allows an attacker to hit internal EC2 metadata endpoint via a URL-fetching feature
- Content-Security-Policy headers stopping XSS exfiltration
- Row-level security in Postgres for multi-tenant data isolation

### Key Principles & Best Practices
- Never trust input — validate and sanitize at every boundary
- Secrets never in source code or logs
- Short-lived tokens with refresh rotation
- Audit logs for sensitive operations
- Fail secure — deny by default

### Common Pitfalls
- Using MD5/SHA-1 for passwords (no work factor, GPU crackable)
- Overly broad CORS (`*`) on authenticated APIs
- Storing JWTs in localStorage (XSS accessible) instead of HttpOnly cookies
- Logging sensitive data (PII, tokens, passwords) in plaintext

### Connections
- Spans: Authentication & Authorization, HTTP Protocol (TLS, CORS, CSP), Middleware (auth guards), Configuration Management (secrets), Logging (audit trails)

---

## 7. HTTP Protocol (In Depth)

### Core Concepts
- Stateless request-response protocol over TCP (HTTP/1.1, HTTP/2) or UDP (HTTP/3)
- Request structure: method, URL, headers, body
- Response structure: status code, headers, body
- Idempotency of HTTP methods (GET/PUT/DELETE are idempotent; POST is not)
- Content negotiation (Accept, Content-Type headers)

### Subtopics (Beginner → Advanced)
- **Beginner:** HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS), status codes (2xx, 3xx, 4xx, 5xx), headers (Authorization, Content-Type, Cache-Control), HTTP vs. HTTPS
- **Intermediate:** Keep-Alive and connection reuse, chunked transfer encoding, HTTP caching (ETag, Last-Modified, Cache-Control: max-age/no-cache/no-store), CORS preflight (OPTIONS), redirects (301 permanent vs. 302 temporary vs. 307 preserving method)
- **Advanced:** HTTP/2 — multiplexing streams, header compression (HPACK), server push (deprecated); HTTP/3 — QUIC, 0-RTT handshake, independent stream delivery; WebSockets upgrade handshake; Server-Sent Events (SSE); long polling mechanics

### Real-World Use Cases
- 302 vs. 307: POST to /checkout must redirect with 307 to preserve method; 302 would convert to GET
- ETag-based conditional requests to avoid re-downloading unchanged resources
- Chunked encoding for streaming large API responses progressively
- OPTIONS preflight for cross-origin AJAX with custom headers

### Key Principles & Best Practices
- Use correct status codes semantically (409 Conflict, not 400, for duplicate resource)
- Cache aggressively with correct Cache-Control headers
- Use HEAD requests to check resource existence without body transfer
- Compress bodies with gzip/brotli (Content-Encoding header)
- Return Location header after 201 Created

### Common Pitfalls
- Using GET with a body for search (undefined behavior in proxies) — use POST or query params
- Returning 200 with `{ "error": "..." }` in the body instead of a proper 4xx/5xx
- Not setting Content-Type on responses (clients may misparse)
- Caching POST responses inadvertently

### Connections
- Foundation for: REST Best Practices, Authentication (Bearer tokens, cookies), WebSockets (Realtime), OpenAPI Standard, Webhooks

---

## 8. Routing

### Core Concepts
- Mapping an incoming HTTP request (method + path) to a handler function
- Static vs. dynamic route segments (`/users/:id`)
- Route parameters, query strings, and path segments
- Route matching priority (specificity, declaration order)

### Subtopics (Beginner → Advanced)
- **Beginner:** Defining routes, reading path parameters, reading query strings, grouping routes
- **Intermediate:** Route prefixes and versioning (`/api/v1/...`), nested routers, middleware scoped to route groups, wildcard routes, regex-constrained parameters
- **Advanced:** Trie-based route matching (how Express/Radix router works internally), conflict detection, route discovery for OpenAPI generation, request dispatching in reverse proxies (Nginx location blocks, API gateway routing rules)

### Real-World Use Cases
- `/api/v1` prefix group with auth middleware applied; `/health` outside auth scope
- Wildcard catch-all route for SPA (serve index.html for any unknown path)
- Nginx `location /api/` proxying to backend; `location /` serving static files

### Key Principles & Best Practices
- Version APIs via URL prefix (`/v1/`) or headers — URL versioning is simpler to debug
- Keep routes declarative and co-located with their handlers
- Don't put business logic in route definitions
- Order routes from most specific to most general to avoid shadowing

### Common Pitfalls
- Ambiguous routes resolving to the wrong handler silently
- Over-nesting routes making the path difficult to read
- Missing trailing-slash consistency causing 404s (`/users` vs. `/users/`)
- Forgetting to scope middleware correctly (auth middleware on public routes)

### Connections
- Sits inside: Backend Development, Middleware pipeline
- Connects to: HTTP Protocol (method + path), Handlers/Controllers, REST Best Practices, OpenAPI

---

## 9. Serialization & Deserialization

### Core Concepts
- Serialization: converting in-memory objects → wire format (JSON, XML, Protobuf, MessagePack, Avro)
- Deserialization: wire format → in-memory objects
- Schema evolution: backward and forward compatibility
- Text-based (human readable) vs. binary (compact, fast) formats

### Subtopics (Beginner → Advanced)
- **Beginner:** JSON structure, parsing JSON in code, handling null vs. missing fields, date/time serialization (ISO 8601)
- **Intermediate:** Custom serializers/deserializers for domain types, camelCase vs. snake_case field naming conventions, excluding sensitive fields from output, DTOs as serialization boundaries, XML namespaces
- **Advanced:** Protobuf schema design (field numbers, reserved fields for schema evolution), Avro with schema registry (Kafka), MessagePack for binary JSON, flatbuffers (zero-copy deserialization), handling large payloads with streaming JSON parsers

### Real-World Use Cases
- Protobuf in gRPC: 5-10x smaller payloads than JSON, faster parse time
- Avro + Confluent Schema Registry ensuring producer/consumer compatibility in Kafka
- `[JsonIgnore]` in C# / `@JsonIgnoreProperties` in Java to exclude DB entity fields from API response
- ISO 8601 (`2024-01-15T10:30:00Z`) as the only sane date format in APIs

### Key Principles & Best Practices
- Always serialize to DTOs — never expose DB entities directly
- Treat missing fields and null as different semantics in PATCH requests
- Be explicit about timezone in datetime serialization (always UTC at the wire level)
- Validate incoming data after deserialization, before processing

### Common Pitfalls
- Floating-point precision loss when serializing monetary values as `float` (use `decimal`/`string`)
- Breaking schema changes in Protobuf (renaming fields, reusing field numbers)
- Deserializing untrusted input without size/depth limits (billion laughs XML attack)
- Silent data truncation due to mismatched field types

### Connections
- Used in: REST APIs, gRPC, Message Queues, Webhooks, Caching (serialized cached values), Elasticsearch (JSON documents)

---

## 10. Authentication & Authorization

### Core Concepts
- **Authentication (AuthN):** Verifying identity — "Who are you?"
- **Authorization (AuthZ):** Verifying permission — "What are you allowed to do?"
- Session-based auth vs. token-based auth (JWT)
- OAuth 2.0 and OpenID Connect (OIDC)
- RBAC (Role-Based), ABAC (Attribute-Based), ReBAC (Relationship-Based)

### Subtopics (Beginner → Advanced)
- **Beginner:** Username/password login, hashing passwords (bcrypt/Argon2), session cookies, basic JWT structure (header.payload.signature)
- **Intermediate:** JWT signing (HS256 symmetric vs. RS256 asymmetric), access token + refresh token rotation, OAuth 2.0 flows (Authorization Code with PKCE, Client Credentials for M2M), middleware-based route protection, RBAC permission checks in handlers
- **Advanced:** Token introspection vs. local JWT validation trade-offs, JWKS (public key rotation), ABAC with policy engines (OPA — Open Policy Agent), session fixation and CSRF attacks, mTLS for service identity, Passkeys/WebAuthn

### Real-World Use Cases
- Authorization Code + PKCE for SPAs (Google/GitHub login)
- Client Credentials grant for background jobs hitting internal APIs
- OPA sidecar evaluating fine-grained policies: "Can user X delete document Y if they're in group Z?"
- Refresh token rotation: every use issues a new refresh token and invalidates the old one

### Key Principles & Best Practices
- Short-lived access tokens (15min), longer-lived refresh tokens stored in HttpOnly cookies
- Validate JWT signature AND expiry AND audience (`aud`) AND issuer (`iss`)
- Never put sensitive data (PII) in JWT payload — it's base64-encoded, not encrypted
- Authorization checks belong in the service layer, not just the controller

### Common Pitfalls
- "alg: none" JWT attack — always enforce expected algorithm server-side
- Checking auth on the HTTP layer but forgetting WebSocket upgrade endpoint
- Returning 403 Forbidden for unauthenticated requests instead of 401 Unauthorized
- Storing refresh tokens in localStorage (XSS risk)

### Connections
- Enabled by: Security, HTTP Protocol (Bearer tokens, Set-Cookie), Middleware (auth guards)
- Used by: All protected routes, Business Logic Layer (user context), Logging (user ID in logs)

---

## 11. Validation & Transformation

### Core Concepts
- Validation: asserting incoming data conforms to rules before processing
- Transformation: converting data from one shape/type to another
- Where to validate: at the API boundary (controller/handler), not deep in business logic
- Schema-based validation vs. imperative validation

### Subtopics (Beginner → Advanced)
- **Beginner:** Required fields, type checking, string length, numeric range, email format (regex)
- **Intermediate:** Nested object validation, cross-field validation (password == confirmPassword), custom validators, validation pipelines (FluentValidation in C#, Joi/Zod in Node.js, Pydantic in Python), returning structured error responses
- **Advanced:** Validation as a first-class middleware step, sanitization vs. validation distinction, allow-list vs. block-list approaches, validation of binary uploads (MIME type, magic bytes), async validation (check uniqueness against DB)

### Real-World Use Cases
- FluentValidation in ASP.NET Core: auto-validated DTOs before hitting the controller method
- Zod in TypeScript: parse-don't-validate pattern (types are inferred from schema)
- Checking uniqueness (does this email already exist?) as part of registration validation pipeline

### Key Principles & Best Practices
- Fail fast with meaningful, field-specific error messages (not generic "bad request")
- Return ALL validation errors at once, not just the first one
- Validate at the boundary — don't let malformed data reach your DB
- Sanitize for safety; validate for correctness (these are separate concerns)
- Use allow-lists for accepted values; never block-lists

### Common Pitfalls
- Validating only required fields but allowing arbitrary extra fields (mass assignment)
- Trusting client-provided IDs without validating ownership
- Swallowing validation errors and returning a generic 500
- Over-validating in the business layer — duplication of effort

### Connections
- Part of: Backend Development, Middleware pipeline
- Feeds into: Handlers/Controllers, Business Logic Layer
- Informs: REST Best Practices (error response shape), OpenAPI (schema-based docs)

---

## 12. Middleware

### Core Concepts
- Middleware: a function that sits in the request/response pipeline and can read, modify, or short-circuit it
- The chain pattern: each middleware calls `next()` or terminates early
- Cross-cutting concerns: logging, auth, rate limiting, CORS, compression, error handling
- Order of middleware matters — earlier middleware wraps later ones

### Subtopics (Beginner → Advanced)
- **Beginner:** Logging middleware (log every request), error-handling middleware (catch unhandled exceptions), CORS middleware
- **Intermediate:** Authentication middleware (validate JWT, attach user to context), rate limiting middleware (sliding window counter with Redis), request ID middleware (attach correlation ID), response compression middleware
- **Advanced:** Circuit breaker middleware, request deduplication, distributed tracing injection (inject trace headers), custom middleware for tenant resolution in multi-tenant SaaS

### Real-World Use Cases
- ASP.NET Core's `IMiddleware` and the `Use/Run/Map` pipeline composition
- Express error-handling middleware has 4 params `(err, req, res, next)` and must be last
- Rate limiter using Redis `INCR` + `EXPIRE` for sliding window per IP/user

### Key Principles & Best Practices
- Global error-handling middleware should always be the outermost wrapper
- Auth middleware should be early but after request parsing
- Don't do heavy computation in middleware — it runs on every request
- Keep middleware single-purpose and composable

### Common Pitfalls
- Calling `next()` AND sending a response in the same middleware (double response)
- Auth middleware placed after the handler — it never runs
- Error-handling middleware that swallows errors without logging them
- Middleware that mutates request data without documenting it

### Connections
- Contains: Authentication, Validation, Logging, Rate Limiting, CORS, Compression
- Part of: Backend Development, Routing
- Enables: Request Context propagation, Graceful Shutdown hooks

---

## 13. Request Context

### Core Concepts
- Request context: a scoped object carrying per-request data throughout the lifecycle
- Allows cross-layer access to: authenticated user, correlation ID, tenant ID, locale, DB transaction
- Must be scoped to a request — not global state
- Thread-local / AsyncLocal storage vs. explicit parameter passing

### Subtopics (Beginner → Advanced)
- **Beginner:** Accessing user ID set by auth middleware in a downstream handler
- **Intermediate:** Correlation ID (generated at entry, propagated in all logs and outgoing HTTP calls), request-scoped DI (ASP.NET Core's `IHttpContextAccessor`, Node.js `AsyncLocalStorage`)
- **Advanced:** Distributed tracing context propagation (W3C TraceContext headers: `traceparent`, `tracestate`), ambient context anti-pattern, context propagation across async boundaries and message queues

### Real-World Use Cases
- Auth middleware sets `context.user = { id, roles }` → service layer reads it without needing it passed explicitly
- Correlation ID set at the load balancer, forwarded in all service-to-service calls, appearing in all logs
- `IHttpContextAccessor` in C# injected into repository for audit trails (who made this change?)

### Key Principles & Best Practices
- Correlation IDs should be generated at the first entry point (not the service itself)
- Context must not leak between requests (request-scoped, not singleton)
- For outgoing HTTP calls, propagate context headers using an HTTP client interceptor
- Keep context lean — don't dump the full user object, use lazy resolution

### Common Pitfalls
- Using a static/global variable to store request context (causes data leakage between concurrent requests)
- Losing context across `await` in languages without proper async context propagation
- Not propagating trace headers to downstream services (breaks distributed traces)

### Connections
- Set by: Middleware (auth, correlation ID)
- Consumed by: Handlers/Controllers, Business Logic Layer, Logging
- Enables: Observability (tracing), Security (user context checks)

---

## 14. Handlers / Controllers

### Core Concepts
- The handler/controller is the entry point for a routed HTTP request
- Responsibilities: parse input, call service/business logic, return response
- Should be thin — no business logic, no DB queries directly
- Action methods map to HTTP methods: `GET` → read, `POST` → create, `PUT/PATCH` → update, `DELETE` → delete

### Subtopics (Beginner → Advanced)
- **Beginner:** Reading route params, query strings, and body from the request; returning JSON responses with correct status codes
- **Intermediate:** Constructor injection of services, DTO mapping (request DTO → domain → response DTO), handling partial updates (PATCH semantics), centralized error mapping
- **Advanced:** Minimal APIs vs. MVC controller trade-offs, vertical slice architecture (feature folders instead of layer folders), mediator pattern (MediatR / CQRS dispatching), response shaping

### Real-World Use Cases
- `POST /api/url/shorten` → controller reads `LongUrl` from body DTO → calls `UrlService.Shorten()` → returns `201 Created` with `shortCode`
- Controller catches `NotFoundException` from service → maps to `404 Not Found` response
- MediatR: controller dispatches `CreateOrderCommand` → handler executes it → controller gets the result

### Key Principles & Best Practices
- One controller per resource or feature domain
- Map exceptions to HTTP status codes in one place (global error handler or problem details middleware)
- Return `IActionResult` / `Results<>` for flexible response types
- Controllers should not `new` up dependencies — use DI

### Common Pitfalls
- Fat controllers containing business rules and DB queries
- Returning raw DB entities instead of response DTOs (leaking internal schema)
- Not handling the case where the service returns null (causing NullReference or 500)
- Inconsistent response shapes across different endpoints

### Connections
- Receives from: Routing, Middleware
- Calls into: Business Logic Layer, Services
- Returns via: Serialization (JSON), HTTP Protocol (status codes)

---

## 15. CRUD (Deep Dive)

### Core Concepts
- CRUD: Create, Read, Update, Delete — the four fundamental data operations
- Each operation maps to an HTTP method and a SQL DML statement
- Idempotency: GET, PUT, DELETE are idempotent; POST is not
- Soft delete vs. hard delete trade-offs

### Subtopics (Beginner → Advanced)
- **Beginner:** `POST` → `INSERT`, `GET` → `SELECT`, `PUT` → full `UPDATE`, `DELETE` → `DELETE`, basic EF Core usage
- **Intermediate:** `PATCH` semantics (partial update — only provided fields change), optimistic concurrency (row version/ETag), pagination (offset vs. keyset/cursor), filtering, sorting, field projection
- **Advanced:** Bulk CRUD with batching, upsert patterns (INSERT ON CONFLICT), soft delete with filtered indexes, audit columns (created_by, updated_at), event sourcing as an alternative to mutable CRUD

### Real-World Use Cases
- Offset pagination fails on large tables with deep pages — use keyset: `WHERE id > lastSeenId ORDER BY id LIMIT 20`
- Optimistic concurrency: include `rowVersion` in update, reject if version doesn't match (prevents lost updates)
- Soft delete: `deleted_at IS NULL` in queries; partial index on this for performance
- Upsert: `INSERT INTO ... ON CONFLICT (shortCode) DO UPDATE SET ...`

### Key Principles & Best Practices
- Never expose raw DB IDs if they're sequential — use UUIDs or obfuscated IDs
- Keyset pagination is O(log n) vs. offset's O(n) deep pages
- Include audit fields (`created_at`, `updated_at`, `created_by`) on every entity
- Validate ownership before update/delete ("does this record belong to this user?")

### Common Pitfalls
- Using offset pagination on large tables (slow and prone to duplicates/skips during concurrent inserts)
- Returning 200 OK for a DELETE that didn't find the resource (use 404 or 204 consistently)
- Full entity `PUT` replacing fields the client didn't send (use `PATCH` for partial updates)
- Forgetting to handle the "record modified since you last fetched it" concurrency scenario

### Connections
- Uses: DBMS, HTTP Protocol, Validation, REST Best Practices, Databases (patterns)
- Generates: Events for queues (if using outbox pattern), Cache invalidation signals

---

## 16. REST Best Practices

### Core Concepts
- REST: architectural style, not a protocol — 6 constraints (stateless, client-server, cacheable, layered, uniform interface, code on demand)
- Resources as nouns in URLs; HTTP methods as verbs
- HATEOAS (Hypermedia as the Engine of Application State) — controversial in practice
- Richardson Maturity Model (Level 0 → 3)

### Subtopics (Beginner → Advanced)
- **Beginner:** Noun-based URLs (`/users`, `/orders`), correct method usage, consistent status codes, JSON as default content type
- **Intermediate:** Versioning (`/v1/`), pagination (Link headers or body envelope), filtering/sorting via query params, error response schema (RFC 7807 Problem Details), collection vs. singleton resource endpoints
- **Advanced:** Conditional requests (If-None-Match, ETag), partial responses (field masks), long-running operation pattern (202 Accepted + Location for polling), bulk operations, idempotency keys for POST requests

### Real-World Use Cases
- RFC 7807 Problem Details: `{ "type": "...", "title": "Not Found", "status": 404, "detail": "User 123 not found" }`
- Stripe's idempotency key header (`Idempotency-Key: uuid`) for safe payment retries
- Google API returning `nextPageToken` in body for cursor pagination
- `PATCH /users/123` with only `{ "email": "new@email.com" }` — only email updated

### Key Principles & Best Practices
- Be consistent — pick conventions and stick to them across the entire API
- Use plural nouns: `/users`, not `/user`
- Sub-resources for relationships: `/orders/42/items`
- Paginate all list endpoints — never return unbounded collections
- Document every endpoint (leads to OpenAPI Standard)

### Common Pitfalls
- Using verbs in URLs (`/getUser`, `/createOrder`)
- Non-standard error shapes (every endpoint has a different error format)
- Returning 200 with error details in the body
- Ignoring HTTP caching headers — every response is cache-Control: no-store implicitly

### Connections
- Formalizes: HTTP Protocol, CRUD, Routing
- Documents via: OpenAPI Standard
- Secured by: Authentication & Authorization
- Versioned with: Configuration Management (feature flags per version)

---

## 17. Databases (Practical Usage & Patterns)

### Core Concepts
- Relational (RDBMS) vs. Document vs. Key-Value vs. Column-family vs. Graph vs. Time-series
- When to use which: relational for complex relationships + transactions; document for flexible schema; key-value for cache/session; column-family for time-series at scale; graph for highly connected traversal
- Connection pooling: why and how
- ORM vs. raw SQL trade-offs

### Subtopics (Beginner → Advanced)
- **Beginner:** Basic CRUD with an ORM, schema migrations, connection string management
- **Intermediate:** Index strategy, query optimization, connection pooling (HikariCP, pgBouncer), database seeding and migration versioning (Flyway, Liquibase, EF Core Migrations), soft deletes, the repository pattern
- **Advanced:** Read replicas with connection routing (route SELECTs to replica, writes to primary), sharding patterns (range vs. hash), database per tenant (vs. shared schema), CQRS splitting read/write models, polyglot persistence

### Real-World Use Cases
- pgBouncer as connection pooler in front of Postgres (saves 10MB RAM per connection at scale)
- EF Core `AsNoTracking()` for read-only queries — saves change-tracker overhead
- Separate `ReadDbContext` and `WriteDbContext` pointing to replica vs. primary (your Stage 4)
- Time-series DB (InfluxDB, TimescaleDB) for metrics — far more efficient than RDBMS for time-range queries

### Key Principles & Best Practices
- Migrations must be backward compatible — new column with default first, code deploy second
- Test with production-scale data — indexes that work on 1000 rows may fail on 10 million
- Always set connection pool `maxSize` — default is often unlimited
- Repository pattern abstracts DB from business logic — enables testing with in-memory fakes

### Common Pitfalls
- Lazy loading causing N+1 queries silently (disable lazy loading in ORMs by default)
- Running migrations during deployment without a rollback plan
- No connection timeout — app hangs when DB is unreachable
- Using an ORM for complex analytical queries (raw SQL is clearer and faster)

### Connections
- Underpins: CRUD, Business Logic Layer, Caching (what to cache), Scaling (replication, sharding)
- Informed by: DBMS theory, System Design

---

## 18. Business Logic Layer

### Core Concepts
- The service layer: contains domain rules, orchestrates repositories, enforces invariants
- Domain logic belongs here — not in controllers, not in repositories, not in the DB
- Domain model: rich objects with behavior vs. anemic model (plain data + separate logic)
- Use cases as the unit of business logic organization

### Subtopics (Beginner → Advanced)
- **Beginner:** Service classes calling repositories, basic validation before DB operations, throwing domain exceptions
- **Intermediate:** Domain events (raising events when state changes), the saga pattern for multi-step business processes, the outbox pattern (publish domain events transactionally), aggregate boundaries in DDD
- **Advanced:** Domain-Driven Design (bounded contexts, aggregates, value objects, entities, ubiquitous language), CQRS (separating command handlers from query handlers), event-driven sagas with compensation

### Real-World Use Cases
- URL Shortener: `UrlService.Shorten()` generates base62 code, checks uniqueness, saves URL, caches — all orchestrated by the service
- Order processing saga: Reserve inventory → Charge payment → Create shipment; if payment fails → release inventory
- Outbox pattern: insert domain event into `OutboxMessages` table in same transaction as the business change; background worker publishes it to the queue

### Key Principles & Best Practices
- Services should be stateless — all state lives in the DB or in the request context
- Express domain invariants as exceptions or Result types — never return null for "not found"
- Keep aggregates small — large aggregates create contention
- Unit test the service layer in isolation using mocked repositories

### Common Pitfalls
- Anemic domain model: all logic in services, objects are just data bags (valid in simple CRUD, not in complex domains)
- Services calling other services in a chain — creates tight coupling; prefer domain events
- Business rules in the DB (stored procedures) — hard to test, version, and refactor
- Mixing I/O (HTTP calls, DB queries) throughout business logic — hard to test

### Connections
- Called by: Handlers/Controllers
- Calls: Databases/Repositories, Cache, Task Queues, Email services
- Informs: CQRS, Event Sourcing (advanced patterns)

---

## 19. Caching

### Core Concepts
- Caching: storing the result of expensive computation or I/O to serve future requests faster
- Cache levels: in-process (in-memory), distributed (Redis, Memcached), CDN, browser
- Cache strategies: Cache-Aside, Write-Through, Write-Behind, Read-Through
- Eviction policies: LRU, LFU, TTL-based

### Subtopics (Beginner → Advanced)
- **Beginner:** In-memory dictionary as a cache, setting TTL, cache-aside pattern (check cache → miss → DB → set cache)
- **Intermediate:** Redis data structures (string, hash, list, set, sorted set, streams), cache key design, thundering herd / cache stampede problem, cache warming, HTTP caching headers (ETag, Cache-Control)
- **Advanced:** Cache invalidation strategies (event-driven invalidation via pub/sub, tag-based invalidation), multi-level caching (L1 in-process + L2 Redis), probabilistic early expiry (PER), write-behind with async persistence, Redis Cluster vs. Redis Sentinel

### Real-World Use Cases
- Your URL Shortener Stage 2: cache-aside with 12hr TTL on `url:{shortCode}` key
- Cache stampede prevention: set slightly randomized TTL (e.g., `3600 + random(-60, 60)`)
- Write-through on user profile cache — write to DB and cache simultaneously
- HTTP Cache-Control: `max-age=31536000, immutable` for versioned static assets

### Key Principles & Best Practices
- Cache invalidation is hard — prefer TTL-based expiry for simple cases
- Design cache keys to be deterministic and collision-free: `{entity}:{id}:{version}`
- Don't cache authorization-sensitive data without isolating by user
- Monitor cache hit rates — a low hit rate means the cache design is wrong

### Common Pitfalls
- Cache stampede: TTL expires simultaneously under high load — 1000 requests hit the DB
- Caching mutable data without invalidation (stale data served indefinitely)
- Storing large objects in Redis (serialization cost, memory waste)
- Not having a fallback when Redis is unavailable

### Connections
- Used by: URL Shortener (Stage 2), Business Logic Layer, CRUD (read path optimization)
- Backed by: Redis (Databases), HTTP Protocol (client-side caching headers)
- Required for: Scaling & Performance, System Design

---

## 20. Transactional Emails

### Core Concepts
- Transactional emails: triggered by user actions (welcome, password reset, invoice, order confirmation) — not marketing bulk email
- Never send email synchronously in the request path — always async via queue
- Email providers: SendGrid, AWS SES, Mailgun, Postmark
- SPF, DKIM, DMARC: DNS-based authentication to prevent spoofing and improve deliverability

### Subtopics (Beginner → Advanced)
- **Beginner:** Sending email via SMTP or provider SDK, HTML vs. plain text, basic templates
- **Intermediate:** Template engines (Handlebars, Liquid, Razor), email queuing (dispatch via job queue, not inline), tracking (open/click pixels), bounce and complaint handling via webhooks
- **Advanced:** SPF/DKIM/DMARC configuration, dedicated sending IPs, suppression lists (unsubscribes, bounces), email rendering across clients (Outlook notoriously bad), link tracking infrastructure, rate limiting sends per user

### Real-World Use Cases
- Password reset: user requests → insert `PasswordResetToken` in DB → enqueue `SendPasswordResetEmail` job → worker sends email via SES
- Invoice email: PDF generated by background worker, attached to email via SES with `multipart/mixed`
- Bounce webhook: SendGrid calls `POST /webhooks/sendgrid` → mark email as bounced → suppress future sends

### Key Principles & Best Practices
- Always queue email — if the email provider is down, the request shouldn't fail
- Expire and single-use password reset tokens (invalidate on use)
- Provide both HTML and plain text versions (`multipart/alternative`)
- Log email sends with user ID and template name for debugging

### Common Pitfalls
- Sending emails synchronously — provider timeout fails the whole user request
- Not expiring reset tokens — old tokens remain valid indefinitely
- Hard-coding sender email in code instead of configuration
- Not handling bounces — continued sends to invalid addresses hurt deliverability score

### Connections
- Triggered by: Business Logic Layer (domain events)
- Delivered via: Task Queuing & Scheduling (background jobs)
- Secured by: Authentication (password reset token generation)

---

## 21. Task Queuing & Scheduling

### Core Concepts
- Message queue: producer puts tasks on a queue; worker processes them asynchronously
- Advantages: decoupling, backpressure absorption, retries, offline processing
- Job queue vs. message broker: Hangfire/Sidekiq (job queue) vs. RabbitMQ/Kafka (message broker)
- Scheduled tasks (cron): run at a fixed time or interval

### Subtopics (Beginner → Advanced)
- **Beginner:** In-process background tasks (HostedService in .NET), basic job queue (Hangfire, Sidekiq), fire-and-forget jobs
- **Intermediate:** Job retry strategies (exponential backoff, max retries), dead-letter queues (DLQ) for failed jobs, idempotent job handlers, priority queues, delayed jobs (send in 1 hour)
- **Advanced:** Message brokers (RabbitMQ — exchanges and bindings, Kafka — partitions and consumer groups), exactly-once delivery semantics, the outbox pattern (transactional publishing), distributed cron (ensuring only one instance runs per schedule), fan-out patterns

### Real-World Use Cases
- Hangfire: `BackgroundJob.Enqueue(() => emailService.SendWelcomeEmail(userId))` — runs in background worker
- Dead letter queue: after 3 failed retries, job goes to DLQ for manual inspection
- Kafka partition key: ensure all events for the same `orderId` go to the same partition → ordered processing
- Distributed cron with leader election (only one scheduler instance fires the job)

### Key Principles & Best Practices
- Every job handler must be idempotent (safe to run twice)
- Set max retries and DLQ — never let jobs retry forever
- Observe queue depth as a key metric — growing queue = insufficient workers
- Jobs should be small units of work; large jobs should break themselves into smaller jobs

### Common Pitfalls
- Non-idempotent job handlers (duplicate sends, double charges on retry)
- No DLQ — failed jobs are silently dropped
- Holding database locks inside job handlers causing contention
- Scheduling jobs inside a transaction but rolling back (job fires, transaction doesn't commit)

### Connections
- Uses: Message brokers (Databases layer), Redis (job state)
- Triggered by: Business Logic Layer, Webhooks (incoming events triggering jobs)
- Enables: Transactional Emails, Elasticsearch indexing, large file processing

---

## 22. Elasticsearch

### Core Concepts
- Distributed, inverted-index search engine built on Apache Lucene
- Index: analogous to a database table; Document: a JSON record
- Inverted index: maps terms → document IDs (enables full-text search)
- Relevance scoring (TF-IDF, BM25)
- Near real-time (NRT): documents searchable ~1 second after indexing

### Subtopics (Beginner → Advanced)
- **Beginner:** Indexing documents, basic query DSL (match, term, range), retrieving by ID
- **Intermediate:** Analyzers and tokenizers (how text is processed at index/query time), multi-field search, filters vs. queries (filters are cached, queries contribute to score), aggregations (metrics, buckets), index aliases for zero-downtime reindex
- **Advanced:** Custom analyzers (stemming, synonyms, stop words), search-as-you-type (completion suggester, edge n-grams), percolator (reverse search — "which query matches this document?"), index lifecycle management (ILM), cross-cluster search, scaling (shard count, routing key to avoid hot shards)

### Real-World Use Cases
- E-commerce product search with full-text + faceted filtering + relevance ranking
- Log aggregation (ELK stack: Elasticsearch + Logstash + Kibana)
- Autocomplete suggestions using edge n-gram tokenizer
- Index alias swap: reindex to `products_v2`, then atomically move alias from `products_v1` to `products_v2`

### Key Principles & Best Practices
- Keep ES as a secondary index — primary data lives in the DB; index via outbox/CDC
- Choose shard count carefully at creation — can't change without reindex
- Use `filter` context for exact matches (cached, fast); `must` context for scored queries
- Monitor JVM heap usage — Elasticsearch is memory-intensive

### Common Pitfalls
- Using Elasticsearch as the primary data store (no ACID, hard to do transactions)
- Mapping explosion: dynamic mapping creating thousands of fields from arbitrary JSON
- Too many shards relative to data size (over-sharding causes overhead)
- Not accounting for the ~1 second NRT delay (queries immediately after index may miss document)

### Connections
- Indexed from: Business Logic Layer (via outbox), Task Queuing (async indexing jobs)
- Queries served by: Handlers/Controllers (search endpoints)
- Part of: Observability (ELK stack for logs)

---

## 23. Configuration Management

### Core Concepts
- Separating configuration from code (12-Factor App, Factor III)
- Configuration sources: environment variables, config files, secrets managers, feature flags
- Config hierarchy: defaults → config files → environment variables → secrets manager (later overrides earlier)
- Secrets vs. configuration: secrets are sensitive (DB passwords, API keys); configuration is non-sensitive (timeouts, feature flags)

### Subtopics (Beginner → Advanced)
- **Beginner:** `.env` files, environment variables, `appsettings.json` / `config.yaml`, reading config in code
- **Intermediate:** Config validation at startup (fail fast if required config is missing), secrets managers (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault), config per environment (dev/staging/prod), hot reload of config without restart
- **Advanced:** Feature flags (LaunchDarkly, Unleash) for gradual rollouts and A/B testing, secrets rotation with zero downtime, encrypted config in git (SOPS, sealed secrets in Kubernetes), config as code with schema validation

### Real-World Use Cases
- `appsettings.{Environment}.json` in ASP.NET Core overriding base config per environment
- Vault dynamic secrets: DB credentials that expire every hour and auto-rotate
- Feature flag: `if (featureFlags.IsEnabled("newCheckoutFlow", userId))` — roll out to 5% of users
- Startup guard: if `ConnectionStrings:Database` is null → throw and refuse to start

### Key Principles & Best Practices
- Never commit secrets to git — use a secrets manager or encrypted secrets
- Validate all required config at startup before serving traffic
- Use feature flags for risky changes instead of separate code branches
- Different config per environment — never use production credentials in dev

### Common Pitfalls
- Hardcoding credentials or API keys in source code
- No validation — app starts with missing config and fails in production under load
- Using the same database for dev and production
- Long-lived static secrets instead of rotated dynamic credentials

### Connections
- Applies to: All layers (DB connection strings, Redis URLs, JWT secrets, email provider keys)
- Enabled by: DevOps (environment management, Kubernetes ConfigMaps/Secrets)
- Related to: Security (secrets management), 12-Factor App (Factor III)

---

## 24. Logging, Monitoring & Observability

### Core Concepts
- **The three pillars:** Logs (what happened), Metrics (how much/how fast), Traces (where time was spent)
- Structured logging: logs as machine-parseable JSON, not plain strings
- Correlation ID: links all logs/traces for a single request across services
- SLO/SLA/SLI: Service Level Objective/Agreement/Indicator

### Subtopics (Beginner → Advanced)
- **Beginner:** Logging levels (DEBUG, INFO, WARN, ERROR, FATAL), basic structured logging (Serilog, Winston, Logback), not logging sensitive data
- **Intermediate:** Centralized log aggregation (ELK, Loki + Grafana), application metrics (Prometheus + Grafana), alerting on error rate / latency / availability, correlation ID propagation, RED method (Rate, Errors, Duration per service)
- **Advanced:** Distributed tracing (OpenTelemetry, Jaeger, Zipkin) with trace spans across services, exemplars (linking metrics to traces), SLO burn rate alerting, chaos engineering for observability validation, profiling (continuous profiling with Pyroscope)

### Real-World Use Cases
- Serilog with Elasticsearch sink: all logs searchable in Kibana with `correlationId` filter
- Prometheus scraping `/metrics` endpoint → Grafana dashboard showing p50/p95/p99 latency
- OpenTelemetry auto-instrumentation in ASP.NET Core: automatic trace spans for each request/DB query
- PagerDuty alert: error rate > 1% for 5 minutes → wake on-call engineer

### Key Principles & Best Practices
- Log at the boundary (request received, response sent) — not inside business logic
- Never log passwords, tokens, credit card numbers, or PII
- Include correlation ID in every log entry
- Alert on symptoms (latency, error rate), not causes (CPU spike)
- Keep DEBUG logs verbose; INFO minimal in production

### Common Pitfalls
- Logging inside tight loops (I/O overhead, massive log volume)
- No correlation ID (can't trace a request across logs)
- Alerting on every error rather than sustained error rates (alert fatigue)
- Not sampling traces in high-traffic systems (storing 100% of traces is expensive)

### Connections
- Enabled by: Middleware (request logging), Request Context (correlation ID)
- Uses: Elasticsearch (log storage), Task Queuing (async log shipping)
- Part of: DevOps (production operations), Scaling (identifying bottlenecks)

---

## 25. Graceful Shutdown

### Core Concepts
- Graceful shutdown: orderly termination — finish in-flight requests, drain queue, close connections, then exit
- SIGTERM (request to terminate gracefully) vs. SIGKILL (immediate kill — no cleanup)
- Health check interaction: mark as unhealthy before starting shutdown so load balancer stops routing
- Shutdown timeout: maximum time to wait before forcing exit

### Subtopics (Beginner → Advanced)
- **Beginner:** Listening for SIGTERM, not accepting new requests, completing current request before exiting
- **Intermediate:** .NET `IHostedService.StopAsync()`, Node.js `process.on('SIGTERM')`, drain period (stop accepting → wait → exit), closing DB connection pool on shutdown, unregistering from service discovery
- **Advanced:** Kubernetes `preStop` hook + `terminationGracePeriodSeconds` orchestration, long-polling / WebSocket connection draining, checkpoint-based job resumption for background workers, zero-downtime rolling deployments requiring graceful shutdown

### Real-World Use Cases
- Kubernetes sends SIGTERM → app marks itself unhealthy → load balancer stops routing → app finishes in-flight → exits within 30s → Kubernetes kills if exceeded
- Background worker on SIGTERM: finish current job, don't pick up new ones, then exit
- DB pool `dispose()` on shutdown — avoids idle connection warnings in Postgres logs

### Key Principles & Best Practices
- Always handle SIGTERM — never rely on SIGKILL for cleanup
- Drain window should be longer than the longest expected request processing time
- Log shutdown phases: "shutdown initiated", "in-flight requests drained", "connections closed", "exit"
- Register `/health` to return 503 immediately when shutdown is initiated

### Connections
- Enables: Zero-downtime deployments (DevOps), Rolling updates (Scaling)
- Uses: Logging (shutdown events), Health checks (Monitoring)
- Part of: 12-Factor App (disposability principle)

---

## 26. Scaling & Performance

### Core Concepts
- Vertical scaling (bigger machine) vs. horizontal scaling (more machines)
- Stateless services scale horizontally; stateful services require session affinity or externalized state
- Bottleneck identification: every system has one — find it before optimizing elsewhere
- Amdahl's Law: parallelization gains are limited by the sequential fraction

### Subtopics (Beginner → Advanced)
- **Beginner:** Load balancing basics (round robin, least connections), stateless app design, adding more app instances
- **Intermediate:** Database read replicas, caching hot data, connection pooling, async I/O for I/O-bound workloads, CDN offloading static assets, horizontal pod autoscaling (HPA in Kubernetes)
- **Advanced:** Database sharding, consistent hashing for cache/sharding, rate limiting under load, request coalescing (de-duplicate identical in-flight requests), CQRS for independent read/write scaling, back-pressure patterns, capacity planning (load testing with k6/Gatling)

### Real-World Use Cases
- Read replica routing: 80% of traffic is reads → route to 3 replicas, all writes to primary
- Horizontal scaling of stateless URL Shortener (Stage 3): Nginx LB → 3 app instances → shared Redis + MSSQL
- Back-pressure: Kafka consumer slows down; producer queue grows; upstream sees increased latency → sheds load
- Consistent hashing in Redis Cluster: adding a node rebalances only K/N keys (not all)

### Key Principles & Best Practices
- Profile and measure before optimizing — intuition is often wrong
- Fix the bottleneck, not the symptoms
- Scale stateless horizontally; externalize all state (DB, Redis, S3)
- Test performance at 3-10x expected peak before going live

### Common Pitfalls
- Scaling application servers when the DB is the bottleneck
- Adding caching without measuring whether the bottleneck is DB reads
- Shared mutable state in the app process preventing horizontal scaling
- Not load testing — discovering capacity limits in production

### Connections
- Requires: Caching, Databases (replicas, sharding), Concurrency, System Design
- Enabled by: DevOps (autoscaling, container orchestration), Graceful Shutdown (rolling deploys)
- Measured by: Logging & Monitoring (latency, throughput metrics)

---

## 27. Concurrency & Parallelism

### Core Concepts
- **Concurrency:** managing multiple tasks at once (not necessarily simultaneously) — about structure
- **Parallelism:** executing multiple tasks simultaneously on multiple CPU cores — about execution
- Thread-based concurrency vs. event-loop concurrency vs. goroutine/fiber concurrency
- Shared state problems: race conditions, deadlocks, livelocks, starvation

### Subtopics (Beginner → Advanced)
- **Beginner:** Threads, `async`/`await`, basic mutex/lock usage, why concurrency bugs are hard to reproduce
- **Intermediate:** Thread pools (why they exist, sizing for CPU vs. I/O bound), `Task`/`Promise` composition, structured concurrency, producer-consumer pattern, semaphore for limiting concurrency, `CancellationToken` for cooperative cancellation
- **Advanced:** Lock-free algorithms (compare-and-swap, atomic operations), memory models (Java Memory Model, C# memory model — visibility guarantees), actor model (Akka, Erlang), Software Transactional Memory (STM), virtual threads (Java 21 Project Loom), async iterators for streaming

### Real-World Use Cases
- C# `async`/`await` on I/O: 1 thread handles 1000 concurrent HTTP requests by releasing the thread while waiting for DB
- Semaphore to limit concurrent outbound HTTP calls to an external API (avoid rate limiting)
- `Parallel.ForEach` with degree-of-parallelism for CPU-bound image processing
- Channel (Go/C#) for producer-consumer pipelines with backpressure

### Key Principles & Best Practices
- Prefer message passing over shared mutable state
- Keep critical sections (locks) as short as possible
- Use `CancellationToken` everywhere — enables timeout and graceful shutdown
- Prefer higher-level concurrency primitives (channels, actors) over raw locks

### Common Pitfalls
- Deadlock: two tasks each waiting for the other's lock
- Async void (fire-and-forget with no error handling in C#)
- Thread starvation in thread pool when all threads are blocked on synchronous I/O
- Using `Task.Result` or `.Wait()` in async code (blocks thread, can cause deadlock)

### Connections
- Underpins: Backend Development (async server handling), Task Queuing (parallel workers)
- Informed by: Operating Systems (thread model, I/O multiplexing)
- Required for: Scaling & Performance, Realtime Backend Systems

---

## 28. Object Storage & Large Files

### Core Concepts
- Object storage: flat namespace of objects (files) with metadata — S3, GCS, Azure Blob Storage
- Presigned URLs: client uploads/downloads directly to S3 without going through your backend
- Multipart upload: split large files into parts, upload in parallel, assemble server-side
- CDN integration: CloudFront in front of S3 for low-latency file delivery

### Subtopics (Beginner → Advanced)
- **Beginner:** Uploading files to S3 via SDK, generating public/private URLs, bucket policies
- **Intermediate:** Presigned PUT URL flow (client uploads directly, bypassing your server), multipart upload for files >100MB, lifecycle policies (archive to Glacier after 90 days), content addressing via hash-based keys
- **Advanced:** S3 event notifications → Lambda/SQS for post-upload processing, resumable uploads (TUS protocol), virus scanning pipeline (upload → queue → scan → quarantine or approve), CDN signed URLs for time-limited access to private content, storage tiering and cost optimization

### Real-World Use Cases
- Presigned URL flow: `POST /api/upload/presign` → returns `{ url, key }` → client PUTs directly to S3 → client calls `POST /api/upload/complete?key=...` to register in DB
- Video processing: upload to S3 → S3 event → SQS queue → worker transcodes → stores output back to S3
- Resume upload (TUS): browser crash during 2GB upload → resume from byte offset instead of restarting

### Key Principles & Best Practices
- Never stream large files through your app server — use presigned URLs for direct S3 access
- Set Content-Type correctly and let the browser render or download appropriately
- Use hash-based keys (`sha256/{hash}`) for deduplication and cache-forever CDN headers
- Enforce size limits and file type validation before generating presigned URLs

### Common Pitfalls
- Streaming files through the app server (memory exhaustion, unnecessary bandwidth)
- Public buckets with no access control (data exposure)
- Storing files in the DB as BLOBs (kills DB performance)
- Not cleaning up incomplete multipart uploads (they cost money)

### Connections
- Triggered by: Handlers/Controllers (presign endpoint), Task Queuing (post-upload processing)
- Secured by: Authentication (presigned URL scoped to user), Authorization (access checks)
- Served via: CDN (part of Scaling & Performance)

---

## 29. Realtime Backend Systems

### Core Concepts
- Realtime: delivering data to clients with minimal latency (sub-second) without polling
- Three main patterns: WebSockets (full-duplex), Server-Sent Events (server → client, one-way), Long Polling (fallback)
- Pub/Sub for broadcasting messages to multiple connected clients
- Fan-out: one event → many subscribed clients receive it

### Subtopics (Beginner → Advanced)
- **Beginner:** Long polling (client polls, server holds response until data available), basic WebSocket connection lifecycle, SSE for simple server-push
- **Intermediate:** WebSocket server scaling (sticky sessions or shared pub/sub via Redis Pub/Sub), heartbeat/ping-pong for connection health, connection management (reconnection with backoff), presence systems (who is online?)
- **Advanced:** Message ordering guarantees, horizontal scaling of WebSocket servers with Redis Pub/Sub or Kafka, CRDT for conflict-free collaborative editing (like Google Docs), WebRTC for peer-to-peer media, event sourcing for realtime feeds, Socket.io rooms and namespaces

### Real-World Use Cases
- Chat: WebSocket connection → Redis Pub/Sub channel per chat room → all servers subscribed to channel → broadcast to connected clients on that server
- Live dashboard: SSE pushing metric updates every 5s — simpler than WebSocket when you don't need client→server messages
- Collaborative document editing: operational transform or CRDT to resolve concurrent edits
- Notification system: user connects → server subscribes to Redis channel `user:{id}:notifications`

### Key Principles & Best Practices
- WebSocket connections are stateful — design for horizontal scaling from day 1
- Always implement heartbeat — proxies/firewalls close idle TCP connections
- Degrade gracefully: SSE → long-polling → polling as fallback chain
- Authenticate the WebSocket upgrade request (check JWT before upgrading)

### Common Pitfalls
- Storing WebSocket session state in process memory (breaks horizontal scaling)
- Not handling reconnection on client (temporary network drop breaks the UX)
- Missing auth on the WebSocket endpoint (anonymous connections receive events)
- Thundering herd on reconnect (all clients reconnect simultaneously after server restart)

### Connections
- Uses: Concurrency (managing thousands of connections), Caching/Redis (pub/sub, presence)
- Secured by: Authentication & Authorization (upgrade handshake auth)
- Enabled by: HTTP Protocol (WebSocket upgrade mechanism), OS (epoll for many connections)

---

## 30. Testing & Code Quality

### Core Concepts
- Testing pyramid: Unit tests (many, fast) → Integration tests (fewer, slower) → E2E tests (fewest, slowest)
- Test doubles: Mock (verify calls), Stub (fixed return), Fake (working simplified impl), Spy
- Arrange-Act-Assert (AAA) pattern
- Code quality: readability, maintainability, cyclomatic complexity, coupling/cohesion

### Subtopics (Beginner → Advanced)
- **Beginner:** Writing unit tests for a service, mocking dependencies, basic assertions, running tests in CI
- **Intermediate:** Integration tests with a real DB (test containers), testing HTTP handlers end-to-end (WebApplicationFactory in .NET), test coverage reporting, property-based testing (FsCheck), contract testing (Pact for microservices)
- **Advanced:** Mutation testing (verify tests actually catch bugs), performance testing (k6, Gatling), chaos testing (inject failures to test resilience), snapshot testing, fuzz testing for security, architectural fitness functions (automated guardrails on code structure)

### Real-World Use Cases
- `WebApplicationFactory<Program>` in .NET: spin up the full app in-memory, hit HTTP endpoints, assert responses — no mocking needed
- Testcontainers: spin up a real Postgres container in tests, run migrations, test actual queries
- Pact contract test: consumer defines expected API shape → provider verifies it → catches breaking changes before deployment
- k6 load test: 1000 concurrent users for 5 minutes, assert p99 latency < 500ms

### Key Principles & Best Practices
- Test behavior, not implementation (don't test that you called a specific method)
- Tests must be deterministic — no random data, no time-dependent assertions
- Fast tests enable TDD — if tests take 10 minutes, nobody runs them
- Every bug that reaches production gets a regression test

### Common Pitfalls
- Mocking everything including the code under test (testing the mocks, not the system)
- Tests coupled to implementation details — refactoring breaks tests without changing behavior
- Flaky tests ignored instead of fixed (destroys trust in the suite)
- 100% coverage as the goal — coverage doesn't measure test quality

### Connections
- Tests: All layers (unit → service, integration → DB, E2E → HTTP handlers)
- Enabled by: Dependency injection (mockable boundaries), Business Logic Layer (pure functions are easiest to test)
- Part of: DevOps (CI pipeline runs tests on every push)

---

## 31. 12-Factor App Principles

### Core Concepts
A methodology for building production-grade, scalable, maintainable SaaS applications. Each factor addresses a specific operational concern.

### The 12 Factors
1. **Codebase** — One repo, many deploys (dev/staging/prod); no per-environment branches
2. **Dependencies** — Explicitly declared (package.json, .csproj, requirements.txt); never rely on system-installed tools
3. **Config** — Store config in environment, not in code; never commit secrets
4. **Backing Services** — Treat DB, Redis, S3, email as attached resources; swap by changing URL
5. **Build, Release, Run** — Strict separation: build → release → run; releases are immutable
6. **Processes** — Execute as stateless, share-nothing processes; persist state in backing services
7. **Port Binding** — Self-contained app exports HTTP on a port; no app server needed externally
8. **Concurrency** — Scale via process model; horizontal scale of stateless processes
9. **Disposability** — Fast startup (<10s), graceful shutdown; robust to sudden death
10. **Dev/Prod Parity** — Keep dev, staging, prod as similar as possible; same backing service types
11. **Logs** — Treat logs as event streams; write to stdout; execution environment manages routing
12. **Admin Processes** — Run admin tasks (migrations, scripts) as one-off processes in the same environment

### Real-World Use Cases
- Factor 3 (Config): `DATABASE_URL` in env instead of hardcoded connection string → swap databases without a code change
- Factor 9 (Disposability): Kubernetes can kill and restart pods; if startup takes 5 minutes, rolling deployments are painful
- Factor 10 (Dev/Prod Parity): Using SQLite in dev and Postgres in prod masks bugs (different behavior with locks, types, functions)

### Common Pitfalls
- Committing `.env` files with secrets to git (Factor 3 violation)
- Long startup times (Factor 9 violation — impacts Kubernetes rolling deploy)
- Writing logs to files in the container (Factor 11 violation — logs lost on container restart)

### Connections
- Formalizes: Configuration Management, Graceful Shutdown, Logging, Scaling
- Foundation for: DevOps, Containerization (Docker, Kubernetes)

---

## 32. OpenAPI Standard

### Core Concepts
- OpenAPI (formerly Swagger): a standard for describing REST APIs in machine-readable format (YAML/JSON)
- Enables: auto-generated documentation (Swagger UI), client SDK generation, contract testing, mock servers
- OpenAPI 3.0 / 3.1 are current standards
- Schema-first vs. code-first approaches

### Subtopics (Beginner → Advanced)
- **Beginner:** Swagger UI exploration, annotating endpoints with descriptions, documenting request/response shapes
- **Intermediate:** Defining reusable `$ref` schemas, documenting authentication (Bearer, OAuth2 flows), query/path/header parameter documentation, response codes and examples, marking deprecated endpoints
- **Advanced:** Generating typed clients from spec (NSwag, openapi-generator), server stub generation, contract testing using the spec as truth (Prism mock server, Dredd), API versioning in OpenAPI, overlays for multi-team spec management

### Real-World Use Cases
- NSwag generates a typed C# client from the OpenAPI spec → API changes detected at compile time
- Prism mock server: serve mock responses from the spec before the backend is built (front-end can develop in parallel)
- GitHub Actions: validate OpenAPI spec on every PR — reject if spec breaks backward compatibility

### Key Principles & Best Practices
- Keep spec in sync with code — use code-first (auto-generated from annotations) to avoid drift
- Document all error responses, not just the happy path
- Use `$ref` for reusable components — avoid duplicating schemas
- Treat breaking API changes as a major version increment

### Common Pitfalls
- Spec out of sync with actual API behavior (misleads consumers)
- Documenting only 200 responses — clients don't know how to handle errors
- Over-using `additionalProperties: true` — makes the contract useless
- Not documenting authentication requirements per endpoint

### Connections
- Documents: REST Best Practices, HTTP Protocol, Authentication
- Enables: Testing (contract testing), Developer Experience (API exploration)
- Generated by: Routing + Handlers (code annotations)

---

## 33. Webhooks

### Core Concepts
- Webhooks: HTTP callbacks — your server sends a POST request to a client-defined URL when an event occurs
- Push model vs. polling: webhooks push events; polling pulls them
- Reliability challenges: delivery failure, retries, ordering, duplicate delivery
- Security: signing payloads (HMAC-SHA256) so receivers can verify authenticity

### Subtopics (Beginner → Advanced)
- **Beginner:** Sending a POST request to a callback URL when an event happens, basic JSON event payload
- **Intermediate:** Retry with exponential backoff (if delivery fails), idempotency key in payload (receivers handle duplicates), HMAC signature header (`X-Signature: sha256=...`), event type field for routing (`"type": "payment.completed"`)
- **Advanced:** Webhook delivery guarantee levels (at-least-once vs. at-most-once), event ordering (sequence number + reconciliation), webhook portal (let users register/test/debug their endpoints), fan-out delivery (one event → many subscriber URLs), rate limiting per subscriber, the outbox pattern for reliable webhook publishing

### Real-World Use Cases
- Stripe: `payment_intent.succeeded` webhook → your server updates order to paid status
- GitHub: push to main → webhook → CI/CD pipeline triggers
- Receiving webhooks from SendGrid: bounce/complaint events → update email status in DB
- HMAC verification: `expectedSig = HMAC-SHA256(secret, requestBody)`, reject if header doesn't match

### Key Principles & Best Practices
- Always verify the HMAC signature before processing — anyone can POST to your webhook endpoint
- Respond with `200 OK` immediately, then process asynchronously (via queue)
- Make your webhook handler idempotent — providers retry on timeout or failure
- Log every received webhook with the full payload for debugging

### Common Pitfalls
- Processing the webhook synchronously (slow response causes sender to retry → duplicate processing)
- Not verifying the signature (allows spoofed webhook attacks)
- Assuming delivery order matches event order — use sequence numbers + reconciliation
- Webhook endpoint exposed but unauthenticated (no HMAC check)

### Connections
- Sends using: HTTP Protocol (POST), Task Queuing (async processing)
- Secured by: Security (HMAC), Authentication (endpoint-level auth)
- Triggered by: Business Logic Layer (domain events → webhook dispatch)
- Received via: Handlers/Controllers (dedicated webhook endpoint)

---

## Cross-Topic Relationship Map

```
OS (processes, threads, I/O) ──────────────────────────────────────────┐
     ↓                                                                  │
Networks (TCP, DNS, TLS) ──────────────────────────────────────────────┤
     ↓                                                                  │
HTTP Protocol ──────────────────────────────────────────────────────────┤
     │                                                                  │
     ├──→ Routing ──→ Middleware ──→ Handlers/Controllers               │
     │                    │               │                             │
     │                    ↓               ↓                             │
     │              Request Context   Validation ──────────────────────┤
     │                                   │                             │
     │                                   ↓                             │
     │              ┌────────── Business Logic Layer ──────────┐       │
     │              │                   │                       │       │
     │              ↓                   ↓                       ↓       │
     │         Databases            Caching (Redis)         Task Queue  │
     │         (CRUD, patterns)         │                       │       │
     │              │                   │                       ↓       │
     │              ↓                   │            Transactional Email│
     │         Elasticsearch ←──────────┘            Webhooks (outgoing)│
     │                                                                  │
     ├──→ Authentication & Authorization                                │
     │              │                                                   │
     │              ↓                                                   │
     ├──→ Security ──────────────────────────────────────────────────────┘
     │
     ├──→ Serialization/Deserialization (at every API boundary)
     │
     ├──→ REST Best Practices + OpenAPI (API design discipline)
     │
     ├──→ Concurrency & Parallelism (cross-cutting concern)
     │
     ├──→ Logging, Monitoring & Observability (cross-cutting concern)
     │
     ├──→ Configuration Management (cross-cutting concern)
     │
     ├──→ Object Storage (large file handling)
     │
     ├──→ Realtime Backend (WebSockets, SSE)
     │
     ├──→ Testing & Code Quality (validates everything above)
     │
     ├──→ 12-Factor App (operational philosophy across all)
     │
     ├──→ Graceful Shutdown + Scaling & Performance
     │
     └──→ DevOps (deploys, orchestrates, monitors everything above)
```

---

## Learning Path Recommendation

### Phase 1 — Foundations (Months 1–3)
Computer Networks → OS fundamentals → HTTP Protocol → Backend Development basics → CRUD → REST Best Practices → Databases (practical) → Authentication & Authorization → Validation → Middleware

### Phase 2 — Production Readiness (Months 4–6)
Caching → Configuration Management → Logging & Observability → Testing → Serialization → Task Queuing → Transactional Emails → Graceful Shutdown → 12-Factor App → OpenAPI

### Phase 3 — Scale & Architecture (Months 7–12)
System Design → Concurrency & Parallelism → Scaling & Performance → DBMS (deep) → Security (advanced) → Elasticsearch → Object Storage → Realtime Systems → Webhooks → DevOps

### Phase 4 — Expert Level (Ongoing)
CQRS + Event Sourcing → DDD → Distributed systems patterns → Chaos engineering → Performance profiling → Platform engineering → Architecture decision records (ADRs)
# Complete Backend & System Design Knowledge Map
### From Beginner → Intermediate → Expert

> A structured curriculum for backend engineers and system designers.
> Each topic includes: core concepts, subtopics (progressive), real-world use cases,
> key principles, common pitfalls, and cross-topic connections.

---

## HOW TO READ THIS MAP

```
Beginner  → foundational understanding, can implement with guidance
Intermediate → can design and implement independently, understands tradeoffs
Expert    → can architect at scale, anticipates failure modes, mentors others
```

Topics are grouped into five layers:
- **Layer 0 — Foundations** (Topics 1–3): The "physics" of software
- **Layer 1 — Protocol & Transport** (Topics 4, 7–9): How data moves
- **Layer 2 — Application Anatomy** (Topics 4–6, 10–19): How an app is built
- **Layer 3 — Infrastructure Concerns** (Topics 20–27): Operating at scale
- **Layer 4 — Specialization & Craft** (Topics 28–33): Advanced patterns
- **Layer 5 — Delivery & Ops** (Topic 34): Shipping and sustaining software

---

# LAYER 0 — FOUNDATIONS

---

## 1. System Design

### Core Concepts
- Functional vs. non-functional requirements
- Capacity estimation (QPS, storage, bandwidth math)
- Trade-offs: consistency vs. availability, latency vs. throughput
- CAP theorem and PACELC extension
- Horizontal vs. vertical scaling

### Subtopics (Beginner → Expert)

**Beginner**
- What is a distributed system vs. monolith?
- Client-server model
- DNS, load balancers, CDNs — what they do at a high level
- Stateless vs. stateful services

**Intermediate**
- High availability patterns: active-active, active-passive
- Data partitioning: horizontal sharding, range vs. hash partitioning
- Replication: primary-replica, multi-primary
- Consistent hashing (used in distributed caches and DHTs)
- Rate limiting algorithms: token bucket, leaky bucket, sliding window
- API gateway vs. reverse proxy vs. load balancer

**Expert**
- Saga pattern for distributed transactions
- Two-phase commit (2PC) and why it's dangerous
- Event sourcing + CQRS at scale
- Global multi-region design with data sovereignty
- Design for idempotency in distributed pipelines
- Cell-based architecture (isolation at the infrastructure level)

### Real-World Use Cases
- Design URL shortener (entry-level classic)
- Design Twitter feed (fan-out-on-write vs. fan-out-on-read)
- Design distributed message queue (Kafka internals)
- Design Netflix video delivery pipeline

### Key Principles
- Start with requirements; drive design from constraints
- Identify the "hot path" — optimize it ruthlessly
- Prefer simple + correct over clever + broken
- Draw boundaries early: where does state live?
- Plan for failure, not for success

### Common Pitfalls
- Over-engineering before you understand load
- Ignoring the "thundering herd" problem
- Assuming network calls are reliable or fast
- Not considering data access patterns before choosing a DB
- Conflating "scalable" with "microservices"

### Connections
→ OS (processes/threads underlie every server)
→ Networks (latency is a system design constraint)
→ Caching (fundamental scaling tool)
→ Databases (state must live somewhere)
→ Scaling & Performance (direct application)

---

## 2. Operating Systems

### Core Concepts
- Process lifecycle: created → ready → running → waiting → terminated
- Thread: lightweight execution unit sharing process address space
- Context switching cost and why it matters
- Memory management: virtual memory, paging, segmentation
- I/O models: blocking, non-blocking, I/O multiplexing, async

### Subtopics (Beginner → Expert)

**Beginner**
- Process vs. thread — what actually differs?
- Heap vs. stack memory per thread
- File descriptors and what "everything is a file" means in Linux
- Signals (SIGTERM, SIGKILL, SIGINT)

**Intermediate**
- Scheduling algorithms: FIFO, Round Robin, priority-based, CFS (Linux)
- Mutex, semaphore, spinlock — when to use each
- Deadlock conditions (DCHC: Deadlock, Circular wait, Hold-and-wait, No preemption)
- `epoll` / `kqueue` — how event-driven servers avoid thread-per-connection
- Memory-mapped files for zero-copy I/O
- Page faults and TLB misses

**Expert**
- NUMA (Non-Uniform Memory Access) and CPU affinity
- Lock-free data structures (CAS operations)
- Green threads vs. OS threads (Go goroutines, Java virtual threads)
- io_uring (Linux 5.1+): the future of async I/O
- Copy-on-write semantics (used in Redis BGSAVE, Docker layers)

### Real-World Use Cases
- Node.js single-threaded event loop + libuv — enabled by epoll
- Redis single-threaded model — no mutex overhead
- Nginx vs. Apache: event-driven vs. thread-per-connection
- Docker uses Linux namespaces + cgroups (OS primitives)

### Key Principles
- More threads ≠ faster; context-switch overhead is real
- I/O-bound tasks → event loop or async; CPU-bound tasks → threads/processes
- Understand what your runtime does with OS threads (JVM, CLR, V8, Go)
- Memory leaks are OS-level; learn to read `/proc` and `pmap`

### Common Pitfalls
- Creating threads for I/O-bound work (wasted blocking)
- Ignoring cache line false sharing in multithreaded code
- Not handling signals → zombie processes, no graceful shutdown
- Stack overflow from unbounded recursion

### Connections
→ Concurrency & Parallelism (deep OS dependency)
→ Graceful Shutdown (SIGTERM handling)
→ Backend Development (every server is an OS process)
→ Scaling & Performance (CPU/memory are finite OS resources)

---

## 3. Computer Networks

### Core Concepts
- OSI model (7 layers) and TCP/IP model (4 layers)
- IP addressing, subnetting, CIDR notation
- TCP: connection-oriented, reliable, ordered, congestion-controlled
- UDP: connectionless, unreliable, fast
- DNS: hierarchical naming system → IP resolution

### Subtopics (Beginner → Expert)

**Beginner**
- What happens when you type a URL in a browser (full flow)
- TCP 3-way handshake: SYN → SYN-ACK → ACK
- TCP 4-way close: FIN / ACK exchange
- Ports and sockets
- IPv4 vs. IPv6 basics

**Intermediate**
- TCP congestion control: slow start, AIMD, BBR algorithm
- TCP head-of-line blocking — why HTTP/2 solved it at HTTP but not TCP layer
- QUIC (UDP-based): solves TCP HoL blocking, 0-RTT handshake
- TLS 1.3 handshake (1-RTT vs. 0-RTT)
- NAT traversal, STUN/TURN (needed for WebRTC)
- HTTP/1.1 vs. HTTP/2 vs. HTTP/3

**Expert**
- BGP routing (how the internet routes between autonomous systems)
- TCP socket options: `SO_REUSEPORT`, `TCP_NODELAY`, `SO_KEEPALIVE`
- Kernel bypass networking (DPDK)
- EBPF for network observability
- SDN (Software Defined Networking)

### Real-World Use Cases
- CDN design relies on anycast routing
- WebSocket and SSE require long-lived TCP connections
- gRPC built on HTTP/2 for multiplexing
- Kubernetes networking: CNI plugins, overlay networks

### Key Principles
- Latency has a physical floor: speed of light in fiber ≈ 200,000 km/s
- Bandwidth ≠ latency — a pipe can be wide but slow
- Packet loss triggers TCP congestion control — latency spikes follow
- TLS termination placement matters for security and performance

### Common Pitfalls
- Treating network calls as free (they cost 1–200ms+ each)
- Not enabling TCP keep-alive → ghost connections drain resources
- Ignoring MTU limits when sending large payloads
- Using UDP without implementing your own reliability layer when needed

### Connections
→ HTTP Protocol (built on TCP)
→ Security (TLS is a network-layer concern)
→ Realtime Systems (WebSocket, SSE, QUIC)
→ System Design (latency budgets)

---

# LAYER 1 — PROTOCOL & TRANSPORT

---

## 7. HTTP Protocol (In Depth)

### Core Concepts
- Stateless request-response protocol over TCP (HTTP/1.x, HTTP/2) or QUIC (HTTP/3)
- Request structure: method, URL, headers, optional body
- Response structure: status code, headers, body
- HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

### Subtopics (Beginner → Expert)

**Beginner**
- Status code families: 1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error
- Common headers: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`
- URL anatomy: scheme, authority, path, query, fragment
- HTTP vs. HTTPS

**Intermediate**
- HTTP/1.1: persistent connections (`Connection: keep-alive`), pipelining (and why it failed)
- HTTP/2: binary framing, header compression (HPACK), multiplexed streams, server push
- HTTP/3: runs on QUIC/UDP, eliminates TCP HoL blocking, 0-RTT reconnection
- Content negotiation (`Accept`, `Accept-Encoding`, `Accept-Language`)
- Range requests for partial content (video streaming, resumable uploads)
- Conditional requests: `ETag`, `If-None-Match`, `Last-Modified`, `If-Modified-Since`
- Redirect types: 301 (permanent), 302 (found/temp), 303 (see other), 307 (temp, keep method), 308 (permanent, keep method)

**Expert**
- HTTP caching model: `Cache-Control` directives in depth (`max-age`, `s-maxage`, `no-cache`, `no-store`, `must-revalidate`, `stale-while-revalidate`)
- Trailers in HTTP/2 (metadata sent after body)
- WebSocket upgrade handshake (HTTP → WS via `Upgrade` header)
- Server-Sent Events (SSE) over HTTP/1.1 and HTTP/2
- gRPC protocol: HTTP/2 + Protocol Buffers, streaming modes
- HTTP CONNECT tunneling (used by HTTPS proxies)

### Key Principles
- HTTP is stateless — state must be externalized (cookies, sessions, tokens)
- GET must be safe and idempotent; POST is neither
- PUT and DELETE must be idempotent
- Use correct status codes — 200 for everything is a lie to your clients
- Headers are case-insensitive by spec; treat them that way

### Common Pitfalls
- Using 200 OK for errors ("success: false" in body is wrong)
- Not setting `Content-Type` → clients guess and guess wrong
- Caching POST responses unintentionally
- Ignoring `OPTIONS` preflight in CORS setups
- Using 302 when you mean 307 (method changes on 302/303)

### Connections
→ REST Best Practices (HTTP is the transport layer for REST)
→ Caching (HTTP cache headers are the first cache layer)
→ Security (HTTPS, HSTS, CORS)
→ Realtime Backend (WebSocket, SSE upgrades)

---

## 8. Routing

### Core Concepts
- URL routing: mapping incoming request paths to handler functions
- Static vs. dynamic routes
- Route parameters vs. query parameters
- Router middleware chains

### Subtopics (Beginner → Expert)

**Beginner**
- Static routes: `/users`, `/products`
- Path parameters: `/users/:id`
- Query strings: `/search?q=hello&page=2`
- Route grouping and prefixes: `/api/v1/...`

**Intermediate**
- Regex routes and wildcard matching
- Route priority and ordering (specificity rules)
- Nested routers / sub-applications
- Versioning via routes: `/v1/`, `/v2/` — pros and cons
- Trailing slash normalization

**Expert**
- Trie-based router data structures (Radix trie — used in Gin, httprouter)
- Route conflict detection at startup
- Reverse routing (named routes → URL generation)
- Content-type based routing (route by `Accept` header)
- Method-not-allowed (405) vs. not-found (404) — correct distinction

### Real-World Use Cases
- Express.js Router for modular route files
- ASP.NET Core attribute routing vs. convention routing
- API Gateway routing rules in AWS/GCP
- Nginx location blocks as a routing layer

### Key Principles
- Routes are a contract — treat them like a public API
- Version routes before you need to, not after
- Keep routes thin — business logic belongs in services, not route files

### Common Pitfalls
- Putting business logic directly in route handlers
- Inconsistent URL naming (plural vs. singular, casing)
- Not returning 405 Method Not Allowed (just returning 404 for wrong method)
- Route ordering bugs — specific routes masked by wildcard routes

### Connections
→ Handlers/Controllers (routes dispatch to handlers)
→ Middleware (middleware chains are attached to routes)
→ REST Best Practices (URL design is part of REST)
→ API Gateway / Reverse Proxy (external routing)

---

## 9. Serialization & Deserialization

### Core Concepts
- Serialization: converting in-memory objects → bytes/text for transport or storage
- Deserialization: the reverse — bytes/text → in-memory objects
- Schema-based vs. schema-less formats
- Binary vs. text-based encoding

### Subtopics (Beginner → Expert)

**Beginner**
- JSON: human-readable, text-based, universally supported
- XML: verbose, still common in enterprise/SOAP
- `Content-Type: application/json` and how it signals format
- JSON parsing pitfalls: large integers, null vs. undefined

**Intermediate**
- Protocol Buffers (protobuf): binary, schema-defined, strongly typed, 3–10× smaller than JSON
- MessagePack: JSON-compatible binary format, no schema required
- Avro: schema stored in registry, used heavily in Kafka
- CBOR: binary JSON used in IoT
- Serialization performance comparison: JSON < protobuf ≈ flatbuffers < custom binary
- Schema evolution: backward/forward compatibility strategies

**Expert**
- FlatBuffers: zero-copy deserialization (no parsing step)
- Cap'n Proto: designed for RPCs, almost no encoding overhead
- Thrift: Apache's multi-language RPC framework with its own serialization
- Versioning strategies in protobuf (field numbers, `reserved` fields)
- Handling polymorphism in JSON (discriminator patterns)
- Canonical serialization for signing/hashing (deterministic output)

### Real-World Use Cases
- gRPC uses protobuf → 5–10× faster than REST+JSON in benchmarks
- Kafka Avro + Schema Registry — ensures producer/consumer compatibility
- Redis RESP protocol — custom binary text protocol
- JWT: JSON → Base64URL — a form of serialization

### Key Principles
- Never deserialize untrusted input without validation
- Choose format based on: human-readability need, performance need, language support
- Plan schema evolution from day one — adding fields is easy, removing is dangerous
- Canonical serialization matters for cryptographic signatures

### Common Pitfalls
- JSON number precision loss (IEEE 754 floats for large integers)
- Deserializing into types without whitelisting fields (mass assignment)
- Breaking protobuf changes: reusing field numbers, changing field types
- Ignoring timezone in datetime serialization (`Z` suffix in ISO 8601)

### Connections
→ HTTP Protocol (Content-Type negotiation)
→ Validation & Transformation (deserialize → validate → use)
→ Caching (serialized form is what gets cached)
→ Task Queuing (messages are serialized for the queue)

---

# LAYER 2 — APPLICATION ANATOMY

---

## 4. Backend Development

### Core Concepts
- The role of the backend: business logic, data persistence, security, API surface
- Request lifecycle: receive → parse → authenticate → validate → process → respond
- Separation of concerns: routing, logic, data access

### Subtopics (Beginner → Expert)

**Beginner**
- HTTP server basics: listen on port, parse request, send response
- MVC architecture: Model, View (API response), Controller
- Environment variables for configuration
- Dependency management (npm, NuGet, pip, Maven)

**Intermediate**
- Layered architecture: Controller → Service → Repository pattern
- Dependency injection (DI) and IoC containers
- DTOs (Data Transfer Objects) vs. domain models
- Error handling patterns: global error handlers, problem details (RFC 7807)
- API versioning strategies

**Expert**
- Clean Architecture / Hexagonal Architecture (ports and adapters)
- Domain-Driven Design (DDD): aggregates, bounded contexts, ubiquitous language
- CQRS: separating read and write models
- Event sourcing: state derived from immutable event log
- Modular monolith as a stepping stone to microservices

### Key Principles
- Business logic must be framework-independent (testable in isolation)
- The outermost layer (HTTP) is a delivery mechanism, not the application
- Fail fast: validate at the boundary, trust internally
- Design for the unhappy path first

### Common Pitfalls
- "Fat controllers" — business logic in HTTP handlers
- Tightly coupling to a specific framework (hard to migrate, hard to test)
- Not versioning your API until a breaking change forces it
- Returning internal error details to clients (security + UX problem)

### Connections
→ All Layer 2 topics (this is the umbrella)
→ System Design (architectural decisions start here)
→ Testing & Code Quality (testability is a design property)

---

## 5. DBMS

### Core Concepts
- ACID properties: Atomicity, Consistency, Isolation, Durability
- Transactions: grouping operations into all-or-nothing units
- Indexing: B-tree, hash, and composite indexes
- Locking vs. MVCC (Multi-Version Concurrency Control)
- SQL query lifecycle: parse → plan → optimize → execute

### Subtopics (Beginner → Expert)

**Beginner**
- Relational model: tables, rows, columns, primary/foreign keys
- Basic SQL: SELECT, INSERT, UPDATE, DELETE, JOIN types
- ACID explained with examples
- Normalization: 1NF, 2NF, 3NF — and when to denormalize

**Intermediate**
- Transaction isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable
- Phenomena: dirty reads, non-repeatable reads, phantom reads — which isolation prevents which
- Query execution plans: `EXPLAIN ANALYZE`, index scans vs. seq scans
- Index types: B-tree (default), BRIN (time-series), GIN (full-text/JSON), partial indexes
- N+1 query problem and how to solve it (eager loading, `JOIN`, `IN` clause)
- Connection pooling: PgBouncer, HikariCP — why direct DB connections are expensive

**Expert**
- MVCC internals (PostgreSQL vs. MySQL InnoDB differ significantly)
- WAL (Write-Ahead Log): the basis of crash recovery and replication
- Lock types: row-level, page-level, table-level, advisory locks
- Deadlock detection and prevention strategies
- Partitioning: range, list, hash — and partition pruning
- Covering indexes and index-only scans
- Statistics and the query planner: `ANALYZE`, histogram bounds

### Real-World Use Cases
- Read replicas for analytics queries (avoid impacting primary)
- Partial indexes for soft-deleted records (`WHERE deleted_at IS NULL`)
- Advisory locks for distributed mutex without external tools
- SKIP LOCKED for job queue pattern in PostgreSQL

### Key Principles
- Indexes speed reads, slow writes — index what you query, not everything
- Long transactions are dangerous: they hold locks and bloat MVCC storage
- Prefer optimistic locking for low-contention, pessimistic for high-contention
- Test your queries with production-scale data

### Common Pitfalls
- SELECT * in production (over-fetching, prevents index-only scans)
- Not using parameterized queries (SQL injection)
- Missing index on foreign key columns → full table scans on JOINs
- Auto-commit treating each statement as its own transaction
- Ignoring vacuum in PostgreSQL → table bloat → performance degradation

### Connections
→ Databases (practical usage patterns — this is the theory)
→ Caching (cache sits in front of DB to reduce load)
→ Business Logic Layer (transactions wrap business operations)
→ Security (SQL injection prevention)

---

## 6. Security

### Core Concepts
- CIA triad: Confidentiality, Integrity, Availability
- Authentication (who are you?) vs. Authorization (what can you do?)
- Threat modeling: STRIDE (Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation)
- Defense in depth: multiple independent security layers

### Subtopics (Beginner → Expert)

**Beginner**
- HTTPS and why HTTP is insecure
- Password hashing: bcrypt, Argon2 — never store plaintext
- SQL injection prevention: parameterized queries
- XSS prevention: output encoding, CSP headers
- CORS: what it is and what it protects against (and what it doesn't)

**Intermediate**
- JWT: structure, signing (HS256 vs. RS256), expiry, refresh token rotation
- OAuth 2.0 flows: authorization code, client credentials, device flow
- CSRF: token pattern, SameSite cookie attribute
- Rate limiting to prevent brute force
- HSTS: force HTTPS for a domain with long max-age
- Secrets management: never in code — use Vault, AWS Secrets Manager, env vars
- Input validation as a security control (not just a UX concern)

**Expert**
- PKCE (Proof Key for Code Exchange) — OAuth for public clients
- mTLS (mutual TLS): both sides present certificates
- Zero Trust Architecture: never trust, always verify, even inside the network
- Supply chain security: SBOM, dependency scanning, Sigstore
- SSRF (Server-Side Request Forgery) — attacking internal services via your server
- Timing attacks on comparison functions (constant-time comparison)
- Cryptographic agility: designing systems to swap algorithms

### Real-World Use Cases
- OAuth 2.0 + OIDC: "Login with Google" button
- mTLS in service meshes (Istio/Linkerd): inter-service auth
- Bug bounty programs finding SSRF in cloud metadata endpoints
- Log4Shell: RCE via deserialization of untrusted input (JNDI injection)

### Key Principles
- Never implement your own crypto
- Validate all input at the trust boundary
- Principle of least privilege everywhere
- Assume breach: design for detection and containment

### Common Pitfalls
- JWT without expiry or with `alg: none`
- Logging sensitive data (passwords, tokens, PII)
- Overly permissive CORS (`Access-Control-Allow-Origin: *` on auth endpoints)
- Trusting client-supplied data for authorization decisions

### Connections
→ Authentication & Authorization (direct application)
→ HTTP Protocol (HSTS, CORS, secure headers)
→ Databases (injection prevention, encryption at rest)
→ Configuration Management (secrets management)

---

## 10. Authentication & Authorization

### Core Concepts
- **Authentication (AuthN)**: verify identity
- **Authorization (AuthZ)**: verify permissions
- Session-based vs. token-based auth
- Identity providers (IdP) and the delegated auth model

### Subtopics (Beginner → Expert)

**Beginner**
- Cookie-session auth: login → server creates session → cookie sent back
- Basic Auth: `Authorization: Basic base64(user:pass)` — only for internal APIs with TLS
- Password hashing: bcrypt cost factor, salting
- "Remember me" — long-lived vs. short-lived sessions

**Intermediate**
- JWT anatomy: `header.payload.signature`, Base64URL encoded
- Access token (short-lived, 15min) + Refresh token (long-lived, 7–30 days)
- Token revocation problem: JWTs are stateless — blacklist or use short expiry
- OAuth 2.0: delegation protocol, not authentication (OIDC adds auth layer)
- OIDC (OpenID Connect): `id_token` as identity proof
- RBAC (Role-Based Access Control): roles → permissions
- ABAC (Attribute-Based Access Control): policies on attributes

**Expert**
- PBAC (Policy-Based Access Control): OPA (Open Policy Agent) for centralized policy
- Token introspection endpoint vs. local JWT validation tradeoffs
- Refresh token rotation with reuse detection (detect token theft)
- PKCE flow for SPAs and mobile apps (no client secret)
- Session fixation and session hijacking attacks
- Capability tokens vs. identity tokens

### Real-World Use Cases
- GitHub personal access tokens (PATs): capability tokens with scopes
- AWS IAM: ABAC with tags
- Kubernetes RBAC: cluster roles and bindings
- Google Sign-In: OIDC identity token from Google IdP

### Key Principles
- Separate AuthN from AuthZ — they're different problems
- Short access token lifetime limits blast radius of token theft
- Authorization decisions should be centralized (not scattered across services)
- Audit log every authorization decision in sensitive systems

### Common Pitfalls
- Storing JWT in localStorage (XSS risk) — prefer httpOnly cookie
- Not validating JWT issuer (`iss`) and audience (`aud`) claims
- Checking authorization in the frontend only
- Using the same secret for signing JWTs in all environments

### Connections
→ Security (AuthN/AuthZ are security controls)
→ Middleware (auth middleware validates tokens per-request)
→ HTTP Protocol (Bearer token in Authorization header)
→ Caching (cache user permissions, not full tokens)

---

## 11. Validation & Transformation

### Core Concepts
- **Validation**: is the data correct? (type, format, range, business rules)
- **Transformation**: converting data between representations (DTO → domain model)
- Validation at the boundary: request bodies, query params, path params, headers
- Schema-driven validation vs. imperative validation

### Subtopics (Beginner → Expert)

**Beginner**
- Required fields, type checking, string length limits
- Format validation: email, URL, UUID, date formats
- Returning validation errors with field-level detail
- HTTP 400 Bad Request as the correct status for validation failure

**Intermediate**
- Declarative schemas: Zod (TS), Joi, Pydantic (Python), FluentValidation (.NET)
- Cross-field validation: password == confirmPassword
- Sanitization vs. validation (sanitization modifies; validation rejects)
- Mapping layers: AutoMapper (.NET), MapStruct (Java)
- Validation in pipelines: fail fast vs. collect all errors

**Expert**
- Domain-level validation vs. input validation (separate concerns)
- Validation as a monad: `Result<T, ValidationError[]>` pattern
- Reusing validation rules across input and domain models
- Async validation (check uniqueness in DB as part of validation)
- Validation in event-driven systems: schema registry as validation

### Key Principles
- Validate at every trust boundary — never assume upstream validated correctly
- Return all errors at once (not one at a time) for better UX
- Distinguish user errors (400) from server errors (500)
- Transformation should be explicit, not magical

### Common Pitfalls
- Trusting frontend-validated data on the backend
- Overly strict validation breaking legitimate edge cases
- Transforming before validating (transform garbage, get garbage)
- Not localizing validation error messages

### Connections
→ Serialization (deserialize → validate → use)
→ Handlers/Controllers (validation happens before handler logic)
→ CRUD (validates every write operation)
→ Business Logic Layer (domain validation is part of business rules)

---

## 12. Middleware

### Core Concepts
- Middleware: a function that sits in the request-response pipeline
- Chain of responsibility pattern applied to HTTP request handling
- Cross-cutting concerns extracted into reusable pipeline components
- Middleware can terminate the chain (e.g., auth failure) or pass through

### Subtopics (Beginner → Expert)

**Beginner**
- Logging middleware: log every request (method, path, status, duration)
- CORS middleware: set cross-origin headers
- Body parsing middleware: parse JSON/form bodies before handlers see them
- Execution order: middleware runs in registration order

**Intermediate**
- Auth middleware: validate token → attach user to request context
- Rate limiting middleware: token bucket per IP or per user
- Request ID middleware: attach `X-Request-ID` for tracing
- Error handling middleware: catch unhandled errors, return proper response
- Compression middleware: gzip/brotli response bodies
- Timeout middleware: abort requests that exceed time budget

**Expert**
- Middleware for distributed tracing: extract/inject trace context (W3C TraceContext)
- Circuit breaker middleware for outgoing HTTP calls
- Idempotency key middleware: detect and handle duplicate requests
- Request hedging middleware: fire duplicate requests, use first response
- Middleware composition vs. decorator pattern tradeoffs

### Key Principles
- Middleware is for cross-cutting concerns — not business logic
- Order matters: auth before rate limit, parse before validate
- Middleware should be side-effect aware (logging middleware must not mutate)
- Keep middleware fast — it runs on every single request

### Common Pitfalls
- Business logic creeping into middleware
- Registering middleware in wrong order (auth after route handlers)
- Middleware that doesn't call `next()` — silently hangs requests
- Stateful middleware shared across requests → race conditions

### Connections
→ Authentication (auth validation in middleware)
→ Logging/Monitoring (request logging is middleware)
→ Request Context (middleware populates context)
→ Handlers/Controllers (middleware wraps handlers)

---

## 13. Request Context

### Core Concepts
- A container for request-scoped data passed through the call stack
- Decouples callers from needing to pass explicit parameters everywhere
- Examples: current user, request ID, locale, DB transaction, trace span

### Subtopics (Beginner → Expert)

**Beginner**
- What request-scoped data means (vs. global state)
- `HttpContext` in ASP.NET, `Context` in Go's `net/http`, `req` object in Express

**Intermediate**
- Passing context through async call chains (Go `context.Context`, AsyncLocal in .NET)
- Propagating trace/span IDs from middleware to logs to outgoing calls
- Storing current user in context after auth middleware validates token
- Context cancellation: propagating timeouts down the call stack

**Expert**
- Context as a concurrency tool: `context.WithTimeout`, `context.WithCancel`
- Preventing goroutine/thread leaks with context cancellation
- Context vs. thread-local storage vs. continuation-local storage tradeoffs
- Distributed context propagation: W3C TraceContext, B3 headers

### Key Principles
- Never store mutable shared state in context — only request-scoped values
- Context should flow down, not across (don't share between concurrent requests)
- Use typed context keys to avoid key collisions

### Common Pitfalls
- Storing database connections or external clients in context (use DI instead)
- Not propagating context to downstream HTTP calls (trace gaps)
- Using global variables as "context" (thread-safety nightmare)

### Connections
→ Middleware (populates the context)
→ Logging (request ID attached to every log line via context)
→ Concurrency (context cancellation is a concurrency primitive)
→ Handlers/Controllers (context is consumed here)

---

## 14. Handlers / Controllers

### Core Concepts
- The layer that handles an HTTP request and produces a response
- Receives parsed, validated, authorized input and calls the service layer
- Should be thin: orchestrate, don't compute

### Subtopics (Beginner → Expert)

**Beginner**
- Anatomy of a handler: receive request, call service, return response
- Extracting path params, query params, body from request
- Returning appropriate HTTP status codes

**Intermediate**
- Controller vs. handler: controller groups related handlers by resource
- Response shaping: what to include in a response (HATEOAS, partial fields)
- Error mapping: service exceptions → HTTP status codes
- Async handlers and proper error propagation

**Expert**
- Command/Query handler pattern (CQRS)
- Handler mediator pattern (MediatR in .NET)
- Thin controllers: all logic delegated to use-case/service objects
- Content negotiation in handlers: JSON vs. XML vs. MessagePack response

### Key Principles
- The handler is a boundary layer, not a logic layer
- Map errors to HTTP semantics — domain errors don't equal HTTP errors 1:1
- Avoid direct DB access from controllers

### Common Pitfalls
- "Fat controllers" with SQL queries and business logic
- Returning internal exception messages to clients
- Not handling async errors (unhandled promise rejections)
- Inconsistent response shapes across endpoints

### Connections
→ Routing (routes dispatch to handlers)
→ Middleware (middleware wraps handler execution)
→ Business Logic Layer (handlers call into service layer)
→ Validation (validated request reaches handler)

---

## 15. CRUD (Deep Dive)

### Core Concepts
- Create, Read, Update, Delete — the four fundamental data operations
- Maps to HTTP: POST (create), GET (read), PUT/PATCH (update), DELETE (delete)
- Every database interaction reduces to some combination of CRUD

### Subtopics (Beginner → Expert)

**Beginner**
- Basic CRUD endpoints for a resource
- Difference between PUT (replace) and PATCH (partial update)
- Soft delete vs. hard delete

**Intermediate**
- Pagination patterns: offset/limit, cursor-based, keyset pagination
  - Offset pagination: simple but degrades with large offsets
  - Cursor pagination: stable, efficient, no "skipping" rows on concurrent writes
- Filtering and sorting: query parameter design, index-aligned queries
- Bulk operations: batch create/update with atomic guarantees
- Optimistic locking: version field or ETag to prevent lost updates

**Expert**
- Upsert patterns: `INSERT ... ON CONFLICT DO UPDATE` (PostgreSQL), `MERGE` (SQL Server)
- Partial update validation: PATCH with JSON Patch (RFC 6902) or JSON Merge Patch (RFC 7396)
- CQRS splitting read and write models at the CRUD level
- Event-driven CRUD: operations emit domain events for downstream consumers
- Idempotent writes: client-supplied idempotency keys prevent duplicate creates

### Key Principles
- Reads should never block writes (use read replicas or MVCC)
- Pagination must be consistent — cursor-based for large datasets
- Soft delete has hidden complexity (unique constraints, "active" record queries)
- Every mutation should have an audit trail

### Common Pitfalls
- `LIMIT 100 OFFSET 10000` on large tables → full table scan
- Not returning the created/updated resource in the response (extra round trip)
- PUT requests not replacing the full resource (partial PUT is actually PATCH)
- Delete without checking referential integrity

### Connections
→ REST Best Practices (CRUD maps to REST conventions)
→ DBMS (every CRUD operation is a SQL DML statement)
→ Validation (validate before every write)
→ Caching (invalidate cache on writes)

---

## 16. REST Best Practices

### Core Concepts
- REST constraints: stateless, client-server, cacheable, uniform interface, layered, code-on-demand
- Resource-oriented design: URLs represent nouns, not verbs
- HTTP method semantics carry the verb
- Hypermedia (HATEOAS) — often aspirational, rarely implemented fully

### Subtopics (Beginner → Expert)

**Beginner**
- Resource naming: plural nouns (`/users`, `/orders`)
- Nested resources: `/users/{id}/orders` (keep to max 2 levels)
- Correct HTTP methods for CRUD
- Standard status codes per operation

**Intermediate**
- API versioning strategies:
  - URL path: `/v1/users` — explicit, easy to route, pollutes URL
  - Header: `Accept: application/vnd.api+json;version=1` — clean, harder to test in browser
  - Query param: `?version=1` — easy, not standard
- HATEOAS: linking related resources in responses
- Partial responses: `?fields=id,name` — GraphQL-lite for REST
- Error response standard: RFC 7807 Problem Details
  ```json
  { "type": "/errors/not-found", "title": "Not Found", "status": 404, "detail": "User 123 not found" }
  ```
- Idempotency keys for POST requests

**Expert**
- Richardson Maturity Model: Level 0 (RPC), 1 (Resources), 2 (HTTP Verbs), 3 (HATEOAS)
- REST vs. GraphQL vs. gRPC — choosing based on use case
- API design first: OpenAPI spec before code
- Deprecation strategy: sunset headers, grace periods
- Long-running operations: `202 Accepted` + polling or webhook callback

### Key Principles
- Design for the client, not the server's internal model
- Stable URLs are a contract — breaking them is a breaking change
- Consistency > cleverness in API design
- Document everything; your future self and your clients will thank you

### Common Pitfalls
- Action-based URLs: `/api/deleteUser?id=5` (not RESTful)
- Inconsistent naming: `/Users` vs `/user` vs `/user-profile`
- 200 OK with error body
- Ignoring HTTP caching semantics on GET responses

### Connections
→ HTTP Protocol (REST is an architectural style over HTTP)
→ OpenAPI Standard (documenting REST APIs)
→ Validation (REST inputs must be validated)
→ CRUD (REST expresses CRUD operations)

---

## 17. Databases (Practical Usage & Patterns)

### Core Concepts
- Relational (SQL): strong consistency, ACID, tabular model
- Document (NoSQL): flexible schema, denormalized, JSON-like
- Key-Value: O(1) lookups, no query language
- Column-family: wide tables, optimized for analytical queries
- Graph: relationships as first-class citizens
- Time-series: append-only, optimized for temporal queries

### Subtopics (Beginner → Expert)

**Beginner**
- When to use PostgreSQL vs. MongoDB vs. Redis
- ORM basics: Sequelize, Prisma, EF Core, SQLAlchemy
- Migrations: versioned, repeatable, automated schema changes
- Seed data and fixtures for development

**Intermediate**
- Repository pattern: abstract data access behind interface
- Unit of Work pattern: group operations in a single transaction
- Database-per-service in microservices
- Event-driven data sync: CDC (Change Data Capture) with Debezium
- Multi-tenancy patterns: shared DB shared schema, shared DB separate schema, DB per tenant

**Expert**
- CQRS with separate read/write databases
- Event sourcing: Postgres as event store
- Geo-distributed databases: CockroachDB, Spanner, DynamoDB Global Tables
- Schema migration in zero-downtime deployments:
  - Expand-contract pattern (add new column, migrate data, drop old column)
- Database proxy: PgBouncer, ProxySQL — connection pooling layer

### Real-World Choices
| Use Case | Database |
|---|---|
| User profiles, transactions | PostgreSQL |
| Product catalog, CMS | MongoDB |
| Session storage, rate limiting | Redis |
| Analytics, BI queries | ClickHouse, Redshift |
| Social graph | Neo4j |
| IoT telemetry | InfluxDB, TimescaleDB |
| Job queue | PostgreSQL (`SKIP LOCKED`) or Redis |

### Key Principles
- Choose DB based on access pattern, not familiarity
- Schema migrations must be backward-compatible during rollout
- Never share a database between services in production
- Connection pools must be sized to DB max_connections, not app concurrency

### Common Pitfalls
- Using MongoDB because "no schema needed" — ends up with inconsistent data
- ORM hiding terrible query plans — always inspect generated SQL
- Migrations in application startup code → race conditions in multi-instance deployments
- Not testing rollback of migrations

### Connections
→ DBMS (theory behind practical decisions here)
→ Caching (cache is a DB performance layer)
→ CRUD (all data operations)
→ Business Logic Layer (transactions span business operations)

---

## 18. Business Logic Layer

### Core Concepts
- The layer encoding the "what the application does" — independent of HTTP, DB, or UI
- Domain services, use cases, application services
- Where invariants are enforced and business rules live

### Subtopics (Beginner → Expert)

**Beginner**
- Service layer: between controller and repository
- Business rules: "a user can only have one active subscription"
- Why logic doesn't belong in controllers or in SQL

**Intermediate**
- Domain model: rich entities vs. anemic domain model (anti-pattern)
- Value objects: immutable, identity-less (Money, EmailAddress)
- Aggregates: consistency boundary — only save through aggregate root
- Domain events: emit events after state changes for side effects
- Application services: coordinate domain objects, transactions, external services

**Expert**
- Bounded contexts: isolate domain models in large systems
- Anti-corruption layer (ACL): translate between bounded contexts
- Saga orchestration vs. choreography for cross-aggregate transactions
- Specification pattern: reusable, combinable business rule objects
- Invariant enforcement: fail loudly at construction time (value objects, factory methods)

### Key Principles
- Domain logic must be unit-testable without a database or HTTP server
- Aggregates enforce consistency — don't bypass the aggregate to update sub-entities
- Separate command handling (write) from query handling (read) — even informally
- Side effects (emails, notifications) belong outside the domain core

### Common Pitfalls
- Logic scattered across controllers, stored procedures, and frontend
- Anemic domain model: entities with only getters/setters, logic in services
- Transaction scripts: long procedural functions doing everything (hard to test/maintain)
- Forgetting to emit domain events → side effects don't happen

### Connections
→ DBMS (transactions wrap business operations)
→ Handlers/Controllers (calls into this layer)
→ Task Queuing (domain events trigger async tasks)
→ Testing (this layer should be 80% unit tested)

---

## 19. Caching

### Core Concepts
- Caching: storing computed results to serve future requests faster
- Cache hierarchy: L1/L2/L3 CPU cache → RAM → local cache → distributed cache → CDN → client
- Cache miss: data not in cache, must fetch from source
- Cache hit ratio: percentage of requests served from cache

### Subtopics (Beginner → Expert)

**Beginner**
- In-memory caching: `Dictionary<K,V>` or equivalent
- Redis as a distributed cache
- TTL (Time-to-Live): automatic expiration
- Cache-aside pattern (lazy loading)

**Intermediate**
- Cache-aside vs. write-through vs. write-behind vs. read-through
  - **Cache-aside**: app manages cache + DB separately (most flexible)
  - **Write-through**: write to cache + DB synchronously (consistent, write penalty)
  - **Write-behind**: write to cache, async flush to DB (fast writes, data loss risk)
  - **Read-through**: cache fetches from DB on miss transparently
- Cache invalidation strategies: TTL, explicit delete, event-driven
- Cache stampede / thundering herd: many requests for expired key hit DB simultaneously
  - Solutions: mutex lock, probabilistic early reexpiration, background refresh
- HTTP cache headers (`Cache-Control`, `ETag`, `Vary`)
- CDN caching: edge nodes serve static assets and cacheable API responses

**Expert**
- Redis data structures: String, Hash, List, Set, Sorted Set, Streams
- Redis persistence: RDB snapshots vs. AOF (append-only file)
- Redis Cluster: horizontal sharding with hash slots
- Redis Sentinel: HA with automatic failover
- Distributed cache consistency: cache invalidation on cross-service writes
- Multi-tier caching: local in-process cache + Redis (reduces Redis round-trips)
- Cache warming: preload cache before traffic hits

### Key Principles
- "There are only two hard things in computer science: cache invalidation and naming things"
- Cache data that is: expensive to compute, frequently read, infrequently changed
- TTL is a fallback, not a strategy — prefer explicit invalidation
- Cache failure must not crash your app (fallback to source of truth)

### Common Pitfalls
- Caching mutable, user-specific data incorrectly (serving user A's data to user B)
- Not invalidating cache on writes → stale data served indefinitely
- Storing too much in cache → memory pressure → eviction of hot keys
- Cache as the only copy of data (cache is not a database)

### Connections
→ DBMS (cache sits in front of DB)
→ HTTP Protocol (HTTP cache headers)
→ Scaling & Performance (cache is the #1 scaling lever)
→ Redis (primary cache implementation tool)

---

# LAYER 3 — INFRASTRUCTURE CONCERNS

---

## 20. Transactional Emails

### Core Concepts
- System-triggered emails: account verification, password reset, receipts, notifications
- Different from marketing emails (different deliverability rules, providers, compliance)
- Email delivery is asynchronous and unreliable — design accordingly

### Subtopics (Beginner → Expert)

**Beginner**
- SMTP: the underlying email protocol
- Email service providers: SendGrid, SES (AWS), Mailgun, Postmark
- Email templates: HTML + text fallback
- Trigger points: user signup, password reset, purchase confirmation

**Intermediate**
- SPF, DKIM, DMARC: email authentication to prevent spoofing
  - SPF: authorized IP list for your domain
  - DKIM: cryptographic signature on email headers
  - DMARC: policy for handling SPF/DKIM failures
- Transactional vs. marketing separation: separate domains/subdomains
- Bounce handling: hard bounce (remove permanently), soft bounce (retry)
- Email queue: never send synchronously from request handler
- Idempotency: prevent duplicate emails (idempotency key per event)

**Expert**
- Email rendering consistency: testing across 40+ email clients (Litmus)
- Deliverability monitoring: sender reputation, spam trap avoidance
- Unsubscribe handling compliance: CAN-SPAM, GDPR Article 17
- Inbound email parsing (receive, parse, process)
- Scheduled email digests vs. real-time triggers

### Key Principles
- Always send emails asynchronously (never block HTTP request on email send)
- Test email rendering in multiple clients before launch
- Log every email sent with recipient, template, and timestamp
- Design for failure: email delivery is best-effort

### Common Pitfalls
- Sending emails synchronously in the request path (latency + failure risk)
- Using the same domain for transactional and marketing (reputation bleed)
- Not implementing unsubscribe → compliance violations
- Not handling API errors from email provider → silent failures

### Connections
→ Task Queuing (emails sent via message queue)
→ Logging/Monitoring (track delivery, bounces, opens)
→ Authentication (password reset is a security-critical email flow)

---

## 21. Task Queuing & Scheduling

### Core Concepts
- Offload work from the request-response cycle to background workers
- Message queue: producer sends message, consumer processes asynchronously
- Job scheduler: run tasks at specific times or intervals (cron-like)

### Subtopics (Beginner → Expert)

**Beginner**
- Why background jobs? (send email, resize image, generate report)
- Simple queue: Redis list as a job queue
- Cron jobs: `0 9 * * 1-5` (9am weekdays)
- Job states: pending → processing → complete/failed

**Intermediate**
- Message brokers: RabbitMQ (AMQP), Redis Streams, BullMQ, Celery
- Dead letter queue (DLQ): where failed jobs go after max retries
- Job retry strategies: exponential backoff with jitter
- Idempotency in job processing: safe to process twice
- Priority queues: high/medium/low priority lanes
- Delayed jobs: send email 24hrs after signup

**Expert**
- Kafka vs. RabbitMQ: log-based vs. queue-based messaging
  - Kafka: ordered, replayable, consumer-controlled offset
  - RabbitMQ: routed, deleted-on-ack, push-based
- Exactly-once semantics: idempotent consumer + transactional outbox pattern
- Transactional outbox: write event to DB in same transaction as business operation
- SAGA pattern via message queue: compensating transactions across services
- Distributed scheduler: leader election for scheduled jobs in multi-instance deployment

### Key Principles
- All queue consumers must be idempotent (message may be delivered more than once)
- Use exponential backoff — don't hammer a failing downstream service
- Monitor queue depth as a leading indicator of system stress
- Separate queues for different job types (prevent head-of-line blocking)

### Common Pitfalls
- Processing emails synchronously in request handlers
- No dead-letter queue → failed jobs disappear silently
- Not handling partial failures in batch jobs
- Infinite retry loops on permanently failing jobs

### Connections
→ Transactional Emails (emails are queued jobs)
→ Logging/Monitoring (monitor queue depth)
→ Business Logic Layer (domain events trigger queued jobs)
→ Scaling & Performance (queues decouple producer/consumer scaling)

---

## 22. Elasticsearch

### Core Concepts
- Distributed, RESTful search and analytics engine built on Apache Lucene
- Inverted index: maps terms to documents (opposite of a document index)
- Documents stored as JSON, schema-less but benefits from explicit mappings
- Near real-time (NRT): indexed documents visible within ~1 second

### Subtopics (Beginner → Expert)

**Beginner**
- Index: logical collection of documents (≈ table)
- Document: a JSON record (≈ row)
- Full-text search: tokenization, stemming, relevance scoring (BM25)
- Basic query DSL: `match`, `term`, `range`, `bool` queries

**Intermediate**
- Mappings: explicit field type definitions (text, keyword, date, geo_point)
- Analyzers: how text is tokenized (standard, english, custom)
- Aggregations: metrics (avg, sum), buckets (terms, histogram, date_histogram)
- Index aliases: zero-downtime reindexing via alias swap
- Scroll vs. `search_after` for deep pagination
- Relevance tuning: boosting, function score queries

**Expert**
- Cluster architecture: master nodes, data nodes, coordinating nodes
- Shard allocation and rebalancing
- Index lifecycle management (ILM): hot → warm → cold → delete
- Cross-cluster replication (CCR) for DR and geo-distribution
- Performance tuning: `_source` disabling, doc values, field data cache
- Sync strategy: dual-write, CDC, or ETL pipeline from primary DB to ES

### Real-World Use Cases
- E-commerce product search with faceted filtering (aggregations)
- Log aggregation: ELK stack (Elasticsearch + Logstash + Kibana)
- APM: Elastic APM for distributed tracing
- Autocomplete with `completion` suggesters

### Key Principles
- Elasticsearch is a search index, not a system of record — primary data lives in your DB
- Design for write amplification: every indexed document costs more than a DB write
- Test queries against production-sized datasets for relevance and performance

### Common Pitfalls
- Using Elasticsearch as primary database
- Deep pagination with `from/size` (expensive on large datasets)
- Not handling sync lag between DB and ES (serving stale search results)
- Mapping explosion from dynamic mappings on log data

### Connections
→ Databases (ES synced from primary DB)
→ Logging/Monitoring (ELK stack for log search)
→ CRUD (search is the "R" at massive scale)

---

## 23. Configuration Management

### Core Concepts
- Application behavior controlled by external configuration, not hardcoded values
- 12-Factor principle: strict separation of config from code
- Configuration sources: environment variables, config files, secrets managers, remote config

### Subtopics (Beginner → Expert)

**Beginner**
- Environment variables: `DATABASE_URL`, `PORT`, `NODE_ENV`
- `.env` files for local development (never commit to Git)
- Config per environment: dev, staging, production

**Intermediate**
- Typed configuration with validation at startup (fail-fast if misconfigured)
- Secrets management: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault
- Feature flags: enable/disable features without deployment
- Configuration injection via DI container (strongly typed config objects)
- Config reload without restart (watching config files or polling remote)

**Expert**
- Centralized config service: Consul, AWS AppConfig, Azure App Configuration
- Config drift detection: ensure all instances have same config
- Secret rotation: automated rotation with zero-downtime
- Audit trail for config changes (who changed what, when)
- Config as code: Terraform for infrastructure config, GitOps for app config

### Key Principles
- Applications should start with `PORT=X DATABASE_URL=Y ./app` — no other setup
- Never log secrets, even by accident
- Validate all configuration at startup — don't fail at runtime when a value is missing
- Secrets have different lifecycle than config — treat them separately

### Common Pitfalls
- Hardcoding database URLs or API keys in source code
- Committing `.env` files to version control
- Different config formats per environment (inconsistency causes bugs)
- Feature flags with no expiry date → permanent "temporary" features

### Connections
→ 12-Factor App (config is Factor III)
→ Security (secrets management)
→ DevOps (config in CI/CD pipelines)
→ Graceful Shutdown (config reload without restart)

---

## 24. Logging, Monitoring & Observability

### Core Concepts
- **Observability** = knowing the internal state of a system from external outputs
- The three pillars: **Logs** (events), **Metrics** (aggregated numbers), **Traces** (request journeys)
- Structured logging: machine-parseable JSON logs vs. human-readable text logs

### Subtopics (Beginner → Expert)

**Beginner**
- Log levels: DEBUG, INFO, WARN, ERROR, FATAL — use them correctly
- Structured logging: `{"level":"info","userId":123,"action":"login","duration_ms":45}`
- Basic metrics: request count, error rate, response time
- Alerting: get notified when error rate spikes

**Intermediate**
- Correlation ID / Trace ID: link all log lines from a single request
- Centralized logging: ELK stack, Loki + Grafana, Datadog
- RED method for services: Rate, Errors, Duration
- USE method for resources: Utilization, Saturation, Errors
- Application metrics: Prometheus + Grafana
- Health check endpoints: `/health` (liveness) and `/ready` (readiness)

**Expert**
- Distributed tracing: OpenTelemetry, Jaeger, Zipkin
  - Trace → Spans → parent-child relationships across services
  - W3C TraceContext standard for context propagation
- Exemplars: link a metric spike to the trace that caused it
- SLIs/SLOs/SLAs:
  - SLI: actual measurement (99.5% of requests < 200ms)
  - SLO: target (99.9% of requests < 200ms over 30 days)
  - SLA: contractual consequence of missing SLO
- Error budgets: how much unreliability you can afford
- Cardinality problem: high-cardinality labels explode time-series DBs

### Key Principles
- Log for debugging, not for auditing (separate concerns)
- Every request should have a trace ID from entry to exit
- Alert on symptoms (error rate, latency), not causes (CPU %)
- Never log PII (passwords, tokens, personal data)

### Common Pitfalls
- Log noise: DEBUG logs in production → expensive storage, hard to find signal
- Missing correlation IDs → impossible to trace request across 10 log lines
- Alert fatigue: too many low-signal alerts → real alerts ignored
- Monitoring the wrong metrics ("our CPU is fine but users can't log in")

### Connections
→ Middleware (request logging is middleware)
→ Request Context (trace ID flows through context)
→ Scaling & Performance (metrics drive scaling decisions)
→ DevOps (monitoring is a DevOps responsibility)

---

## 25. Graceful Shutdown

### Core Concepts
- Stopping a service without losing in-flight requests or corrupting state
- Triggered by SIGTERM in container/orchestration environments (Kubernetes sends SIGTERM before SIGKILL after 30s)
- Phases: stop accepting new requests → drain in-flight requests → cleanup → exit

### Subtopics (Beginner → Expert)

**Beginner**
- Why process kill without cleanup corrupts: open DB transactions, partially written files
- Listening to SIGTERM and SIGINT signals
- HTTP server: `server.close(callback)` — stop accepting, drain connections

**Intermediate**
- Graceful shutdown sequence:
  1. Receive SIGTERM
  2. Set health check to unhealthy (Kubernetes stops sending traffic)
  3. Wait for load balancer to route away (typically 5–10s)
  4. Stop accepting new HTTP connections
  5. Wait for active requests to complete (timeout: 30s)
  6. Flush pending async operations (queue messages, log buffers)
  7. Close DB connection pool
  8. Exit with code 0
- `terminationGracePeriodSeconds` in Kubernetes
- Preemptible/spot instance shutdown hooks

**Expert**
- Draining long-lived connections: WebSockets, SSE streams
- Rolling restarts: Kubernetes ensures N-1 instances stay alive during restart
- Leader re-election on graceful shutdown (distributed systems)
- Circuit breaker open on shutdown: stop taking new work before signaling shutdown

### Key Principles
- All containers must handle SIGTERM gracefully
- Never use SIGKILL as your primary shutdown mechanism
- Health check endpoint must return unhealthy immediately on SIGTERM
- Test graceful shutdown in your staging environment

### Common Pitfalls
- Not trapping SIGTERM (defaults to SIGKILL after grace period)
- DB connection pool destroyed before in-flight queries complete
- Not sleeping before drain (traffic still arriving from load balancer)
- Infinite request wait with no timeout → shutdown hangs

### Connections
→ Operating Systems (SIGTERM is an OS signal)
→ DevOps (Kubernetes lifecycle hooks)
→ Task Queuing (drain pending jobs before exit)
→ Logging (flush log buffers before exit)

---

## 26. Scaling & Performance

### Core Concepts
- **Horizontal scaling**: add more instances (scale out)
- **Vertical scaling**: add more CPU/RAM (scale up) — has limits
- **Latency**: time for a single request to complete
- **Throughput**: requests per second the system handles
- **Bottleneck**: the constraint that limits overall system throughput

### Subtopics (Beginner → Expert)

**Beginner**
- Load balancer: distribute traffic across instances
- Stateless services: any instance can serve any request
- Connection pooling: reuse DB connections
- Basic profiling: find slow endpoints before optimizing

**Intermediate**
- Amdahl's Law: maximum speedup limited by serial portion of work
- Little's Law: L = λW (in-flight requests = arrival rate × processing time)
- Caching as a scaling lever (reduce DB load)
- Async processing: move work out of request path
- Database read replicas: scale reads independently
- CDN for static assets: offload traffic from origin

**Expert**
- Auto-scaling: HPA in Kubernetes based on CPU/memory/custom metrics
- KEDA: scale on external metrics (queue depth, Kafka lag)
- Backpressure: signal producers to slow down when consumers are overloaded
- Circuit breaker pattern: fail fast when downstream is degraded
- Shedding load gracefully: return 503 instead of piling up work
- Tail latency optimization (p99, p99.9): the outlier requests that hurt users most
- Flamegraph profiling for CPU bottleneck identification

### Key Principles
- Measure before optimizing — find the actual bottleneck
- Premature optimization is the root of all evil (Knuth)
- Optimize the hot path; ignore the cold path
- Caching and async are the two most powerful scaling levers

### Common Pitfalls
- Scaling horizontally without making the service stateless first
- Optimizing for throughput when users care about latency (and vice versa)
- N+1 queries destroying DB at scale
- Connection pool exhaustion: app has 100 instances × 10 connections = 1000 DB connections

### Connections
→ Caching (most impactful scaling optimization)
→ DBMS (DB is usually the bottleneck)
→ System Design (scaling decisions made at design time)
→ Concurrency & Parallelism (utilize all cores)

---

## 27. Concurrency & Parallelism

### Core Concepts
- **Concurrency**: managing multiple tasks in overlapping time (structure)
- **Parallelism**: executing multiple tasks simultaneously (execution)
- **Concurrency is about dealing with lots of things at once; parallelism is about doing lots of things at once** — Rob Pike
- Thread safety: correctness when shared state accessed by multiple threads

### Subtopics (Beginner → Expert)

**Beginner**
- Race condition: non-deterministic outcome from unsynchronized shared state
- Mutex (mutual exclusion): only one thread at a time
- Thread pool: reuse threads instead of creating/destroying
- I/O-bound vs. CPU-bound: different models apply

**Intermediate**
- Async/await: language-level syntax for non-blocking I/O
- Promises, futures, tasks: abstract over async computation
- Producer-consumer pattern with bounded queue
- Thread-safe data structures: `ConcurrentQueue`, `ConcurrentDictionary`
- Atomic operations: increment without mutex (CAS — Compare And Swap)
- Deadlock: four conditions, prevention strategies
- Lock ordering: always acquire in consistent order to prevent deadlock

**Expert**
- Go goroutines + channels: CSP (Communicating Sequential Processes) model
- Reactive programming: RxJava, Reactor, RxJS — event streams as first-class
- Structured concurrency: parent task outlives all child tasks (Java Loom, Kotlin)
- Actors model: Akka — each actor processes one message at a time
- Software Transactional Memory (STM): optimistic database-style transactions for memory
- Lock-free algorithms: ABA problem, Michael-Scott queue
- False sharing: cache line contention between threads accessing adjacent memory

### Key Principles
- Prefer message passing over shared memory (Go, Erlang philosophy)
- Minimize lock scope — hold locks for the shortest possible time
- Immutability eliminates most concurrency bugs
- Test concurrent code with race detectors (Go race detector, TSan)

### Common Pitfalls
- Creating one thread per task (thread explosion with I/O-bound work)
- Using async for CPU-bound work without actually parallelizing
- Missing `await` on async call → fire-and-forget unintentionally
- Nesting locks → deadlock risk

### Connections
→ Operating Systems (threads are OS primitives)
→ Scaling & Performance (concurrency is how you use available CPU/I-O)
→ Task Queuing (queues are concurrent producer-consumer systems)
→ DBMS (DB isolation levels handle concurrent access)

---

# LAYER 4 — SPECIALIZATION & CRAFT

---

## 28. Object Storage & Large Files

### Core Concepts
- Object storage: flat namespace of objects identified by key (vs. hierarchical filesystem)
- Not a filesystem — optimized for write-once, read-many at scale
- Main providers: S3 (AWS), GCS (Google), Azure Blob, MinIO (self-hosted)

### Subtopics (Beginner → Expert)

**Beginner**
- Bucket + key model: `s3://my-bucket/users/123/avatar.jpg`
- Upload and download via SDK
- Public vs. private access control

**Intermediate**
- Presigned URLs: time-limited, signed URL for direct client upload/download
  - Client uploads directly to S3 — your server never handles the bytes
- Multipart upload: required for files >5GB, recommended >100MB
- Lifecycle policies: move to Glacier after 90 days, delete after 365 days
- CORS configuration for browser uploads
- Content-Disposition header for download file naming
- Virus scanning pipeline: scan on upload via Lambda trigger

**Expert**
- Eventual consistency in S3 (though now strongly consistent after 2020 update)
- S3 Select: query CSV/JSON/Parquet directly in S3 without downloading
- Storage classes: Standard, IA (Infrequent Access), Glacier, Deep Archive
- Transfer acceleration via CloudFront CDN edges
- Resumable uploads: TUS protocol implementation
- Large file streaming: avoid loading entire file into memory

### Key Principles
- Never proxy large files through your backend — use presigned URLs
- Use multipart for anything over 50MB
- Separate buckets by environment and sensitivity level
- Content-addressed storage (hash as key) prevents duplicates and enables dedup

### Common Pitfalls
- Streaming large files through app server → memory exhaustion
- Public S3 buckets with sensitive data
- Not setting CORS → browser uploads fail
- Not using multipart for large uploads → failures lose all progress

### Connections
→ HTTP Protocol (presigned URLs are standard HTTP GET/PUT)
→ Security (bucket policies, presigned URL expiry)
→ Task Queuing (post-upload processing via queue)

---

## 29. Realtime Backend Systems

### Core Concepts
- Realtime: data delivered to clients as it happens (or within ~100ms)
- Push-based vs. pull-based communication
- WebSocket: full-duplex, bidirectional TCP connection
- SSE (Server-Sent Events): unidirectional server→client over HTTP

### Subtopics (Beginner → Expert)

**Beginner**
- Short polling: client asks every N seconds (simple, wasteful)
- Long polling: client waits, server holds connection until data or timeout
- WebSocket: `ws://` or `wss://`, persistent connection after HTTP upgrade
- SSE: `text/event-stream`, automatic reconnect built into browser

**Intermediate**
- WebSocket vs. SSE vs. HTTP/2 push — choosing the right model
  - SSE: unidirectional, simpler, built-in reconnect, works over HTTP/2
  - WebSocket: bidirectional, requires separate server, firewall-friendlier issues
- Pub/Sub model: clients subscribe to channels, server publishes events
- Redis Pub/Sub: simple pub/sub for broadcasting across server instances
- Fan-out problem: 1 event → millions of connected clients
- Connection management: heartbeat/ping-pong to detect dead connections

**Expert**
- WebSocket at scale: socket servers behind load balancer with sticky sessions OR Redis pub/sub as shared bus
- Presence system: who is online? (expensive at scale — use approximate counts)
- Event ordering guarantees: sequence numbers, vector clocks
- CRDT (Conflict-free Replicated Data Type): for collaborative editing (Google Docs model)
- WebRTC: peer-to-peer media/data with signaling server
- MQTT: lightweight pub/sub for IoT (QoS levels 0/1/2)

### Key Principles
- Long-lived connections require special load balancing (sticky sessions or shared bus)
- Implement heartbeats — TCP doesn't detect dead connections fast enough
- Design for horizontal scaling from day one (stateless with shared bus)
- Graceful shutdown must drain active connections

### Common Pitfalls
- Stateful WebSocket servers that can't scale horizontally
- No heartbeat → phantom connections consuming server memory
- Sending all events to all clients → fan-out bottleneck
- Not handling reconnection on client side (flaky network drops connections)

### Connections
→ HTTP Protocol (WebSocket upgrade, SSE over HTTP)
→ Scaling & Performance (fan-out is a scaling challenge)
→ Task Queuing (realtime events often triggered by background jobs)
→ Caching (cache presence/subscription state in Redis)

---

## 30. Testing & Code Quality

### Core Concepts
- Test pyramid: unit tests (many) → integration tests (some) → E2E tests (few)
- Test coverage: % of code executed by tests — necessary but not sufficient
- Test-Driven Development (TDD): write test first, then code to pass
- Behavior-Driven Development (BDD): tests describe business behavior

### Subtopics (Beginner → Expert)

**Beginner**
- Unit test: test one function in isolation, mock dependencies
- Assertion: verify expected output
- Test runner basics: Jest, pytest, xUnit, NUnit
- Code coverage: 70%+ is a start, 80%+ for critical paths

**Intermediate**
- Integration test: test interaction between components (app + real DB)
- API / contract test: test HTTP endpoints end-to-end
- Test doubles: mock, stub, spy, fake, dummy
- Test isolation: each test starts with clean state
- Property-based testing: generate random inputs (fast-check, Hypothesis)
- Mutation testing: introduce bugs, verify tests catch them (PIT, Stryker)

**Expert**
- Consumer-driven contract testing (Pact): test microservice interfaces without mocking entire services
- Chaos engineering: deliberately inject failures (latency, packet loss, process kill)
- Performance/load testing: k6, Gatling, Locust — measure system under load
- Snapshot testing: detect unintended changes in serialized output
- Fuzz testing: automated random input to find security vulnerabilities
- Test flakiness: deterministic tests, fixed test data, controlled time

### Key Principles
- Tests are documentation — a readable test explains intended behavior
- Fast tests are run; slow tests are skipped — keep unit tests < 10ms
- Test behavior, not implementation — refactoring shouldn't break tests
- Continuous testing in CI: every commit runs all tests

### Common Pitfalls
- Testing implementation details (brittle, break on refactors)
- Shared mutable state between tests → test order dependency
- 100% code coverage with zero useful assertions (coverage theater)
- Not testing error/edge cases — only happy paths

### Connections
→ Business Logic Layer (80% of unit tests live here)
→ CI/CD / DevOps (tests run in pipeline)
→ Handlers/Controllers (integration tests cover API layer)
→ DBMS (integration tests use real DB in Docker)

---

## 31. 12-Factor App Principles

### Core Concepts
- A methodology for building scalable, maintainable, cloud-native applications
- Defined by Heroku engineers based on patterns in thousands of apps
- Language and framework agnostic

### The 12 Factors

| # | Factor | Essence |
|---|---|---|
| I | Codebase | One repo, many deploys |
| II | Dependencies | Explicitly declare all dependencies |
| III | Config | Store config in environment |
| IV | Backing Services | Treat as attached resources |
| V | Build, Release, Run | Strictly separate build and run stages |
| VI | Processes | Execute as stateless, share-nothing processes |
| VII | Port Binding | Export services via port binding |
| VIII | Concurrency | Scale out via the process model |
| IX | Disposability | Fast startup, graceful shutdown |
| X | Dev/Prod Parity | Keep dev, staging, production similar |
| XI | Logs | Treat logs as event streams |
| XII | Admin Processes | Run admin tasks as one-off processes |

### Key Extensions (Beyond 12-Factor)
- **XIII: API First** — design the contract before implementation
- **XIV: Telemetry** — observability built in from the start
- **XV: Auth** — security is non-negotiable, not optional

### Key Principles
- Factor VI (stateless processes) is the foundation of horizontal scaling
- Factor III (config in env) is the foundation of multi-environment deployments
- Factor IX (disposability) enables zero-downtime deployments
- Every factor is a prerequisite for Kubernetes-native deployment

### Common Pitfalls
- Storing session state in local memory (violates Factor VI)
- Different DB versions in dev and prod (violates Factor X)
- Mounting a writable filesystem for state (violates Factor VI)
- Slow startup times → deployment slowdowns (violates Factor IX)

### Connections
→ Configuration Management (Factor III)
→ Graceful Shutdown (Factor IX)
→ Logging/Monitoring (Factor XI)
→ DevOps (the 12-Factor app is designed for cloud/container deployment)

---

## 32. OpenAPI Standard

### Core Concepts
- Machine-readable REST API description standard (formerly Swagger)
- YAML/JSON document describing: endpoints, parameters, request/response schemas, auth
- Enables: code generation, automatic documentation, contract testing

### Subtopics (Beginner → Expert)

**Beginner**
- OpenAPI spec structure: `openapi`, `info`, `paths`, `components`
- Describing a GET endpoint with path parameter and response schema
- Swagger UI: auto-generated interactive documentation

**Intermediate**
- Request body schemas with validation constraints
- Response schemas and status code mapping
- Security schemes: Bearer, API Key, OAuth2, OIDC
- `$ref` for reusable components: schemas, parameters, responses
- Spec-first vs. code-first: design API before implementation
- Tags for grouping endpoints into logical sections

**Expert**
- API versioning in OpenAPI: separate spec files vs. `x-` extensions
- Generating server stubs and client SDKs (openapi-generator)
- Contract testing: Dredd, Prism (mock server from spec)
- Spectral: linting OpenAPI specs for style and correctness
- AsyncAPI: OpenAPI equivalent for event-driven/message-based APIs
- Overlays: layering changes on top of a base spec

### Key Principles
- API-first development: spec is the contract, code implements the contract
- Spec is documentation that never goes stale if generated from code
- Version your spec files alongside your code in the same repository
- Use `$ref` liberally — DRY principle applies to specs too

### Common Pitfalls
- Generating spec from code with no descriptions → useless documentation
- Spec not matching actual API behavior (drift)
- Not validating request/response against spec in tests
- One massive spec file for a large API → unmaintainable

### Connections
→ REST Best Practices (OpenAPI documents REST APIs)
→ Testing (spec is the contract for contract tests)
→ Backend Development (API-first shapes implementation)

---

## 33. Webhooks

### Core Concepts
- Reverse API: your server sends HTTP POST to client's URL when an event occurs
- Event-driven integration: Stripe telling your server "payment succeeded"
- Push vs. pull: webhooks push data; polling pulls data

### Subtopics (Beginner → Expert)

**Beginner**
- Webhook endpoint: HTTP POST handler that receives event payloads
- Event types: `payment.succeeded`, `user.created`
- Responding quickly: return 200 immediately, process asynchronously

**Intermediate**
- Webhook signing: HMAC-SHA256 signature in header (verify sender is authentic)
  ```
  X-Signature: sha256=<HMAC(secret, body)>
  ```
- Retry logic: sending provider retries on non-2xx responses (idempotency required)
- Idempotency: same event delivered twice must not double-process
- Payload schema versioning: handle old and new event formats simultaneously
- Fan-out webhook delivery: your server sending webhooks to many clients

**Expert**
- Webhook delivery guarantees: at-least-once delivery (not exactly-once)
- Building a webhook delivery system:
  - Store event in DB
  - Queue delivery job
  - Worker makes HTTP POST with retry/backoff
  - Track delivery status per subscriber
- Subscription management: client registers URL, selects event types
- Secret rotation: update signing secret without breaking delivery

### Key Principles
- Always verify webhook signatures before processing
- Respond with 200 immediately — do all processing asynchronously
- Design consumers for idempotency — webhooks arrive more than once
- Implement exponential backoff when sending webhooks from your system

### Common Pitfalls
- Processing webhook synchronously → timeout → sender retries → duplicate processing
- Not verifying signatures → fake events from malicious sources
- Storing raw payloads without validation → unexpected schema breaks app

### Connections
→ Task Queuing (webhook delivery is a background job)
→ Security (HMAC signature verification)
→ REST Best Practices (webhooks are the reverse of REST)
→ Logging/Monitoring (track delivery success/failure rate)

---

# LAYER 5 — DELIVERY & OPS

---

## 34. DevOps

### Core Concepts
- Cultural and technical movement: break down silos between Dev and Ops
- CI/CD: automate build → test → deploy pipeline
- Infrastructure as Code (IaC): define infrastructure in version-controlled code
- Containerization + orchestration: Docker + Kubernetes

### Subtopics (Beginner → Expert)

**Beginner**
- CI (Continuous Integration): automated tests on every push
- CD (Continuous Delivery): every passing build is a deployable artifact
- Docker basics: `Dockerfile`, build image, run container
- Environment parity: dev = staging = prod (different scale, same software)

**Intermediate**
- GitHub Actions / GitLab CI / Jenkins / CircleCI: pipeline configuration
- Docker multi-stage builds: smaller production images
- Container registry: Docker Hub, ECR, GCR — store and version images
- Kubernetes core concepts: Pod, Deployment, Service, ConfigMap, Secret
- Kubernetes probes: liveness (restart if unhealthy), readiness (route traffic if ready)
- Blue/green deployment: two identical environments, flip DNS
- Canary deployment: route 5% of traffic to new version, gradually increase

**Expert**
- GitOps: Git as single source of truth for cluster state (ArgoCD, Flux)
- Service mesh: Istio/Linkerd — mTLS, traffic management, observability between services
- Helm: Kubernetes package manager — templated manifests
- Infrastructure as Code: Terraform, Pulumi
- Horizontal Pod Autoscaler (HPA) and custom metrics autoscaling
- Chaos engineering: intentional failure injection (Chaos Monkey, LitmusChaos)
- Multi-cluster Kubernetes: cluster federation, cross-cluster networking
- eBPF for kernel-level observability without sidecars (Cilium, Pixie)

### CI/CD Pipeline Anatomy
```
Code Push → Lint → Unit Tests → Build Docker Image → Integration Tests →
Push to Registry → Deploy to Staging → Smoke Tests → Deploy to Production →
Health Check → Alert on Failure
```

### Key Principles
- Everything should be automated — humans make mistakes at 2am
- Deployments should be boring: reliable, repeatable, reversible
- Immutable infrastructure: never patch live servers — replace them
- Fast feedback loop: failing tests in < 5 minutes

### Common Pitfalls
- Manual deployments ("I'll just SSH in and update the config")
- Large, infrequent deploys → more risk than small frequent ones
- Not running integration tests in CI (only unit tests)
- Skipping staging environment → bugs reach production first

### Connections
→ All topics (DevOps is the delivery mechanism for everything else)
→ 12-Factor App (designed to be deployed by DevOps pipelines)
→ Logging/Monitoring (observability is a DevOps concern)
→ Configuration Management (config in pipelines)
→ Graceful Shutdown (Kubernetes relies on it)

---

# TOPIC RELATIONSHIP MAP

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SYSTEM DESIGN                                   │
│           (the meta-layer — everything feeds into this)                 │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
          ┌──────────────────┼───────────────────┐
          ▼                  ▼                   ▼
     OS / Networks    HTTP Protocol        Databases
          │                 │                   │
          ▼                 ▼                   ▼
     Concurrency        Routing            DBMS Theory
          │            Middleware           Caching
          │            Serialization            │
          └──────────────┬──┴───────────────────┘
                         ▼
              ┌─────────────────────┐
              │  Application Core   │
              │  Auth & AuthZ       │
              │  Validation         │
              │  Handlers / CRUD    │
              │  Business Logic     │
              │  REST Best Pract.   │
              └──────────┬──────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   Task Queuing    Elasticsearch    Realtime Systems
   Trans. Emails   Object Storage   Webhooks
         │               │               │
         └───────────────┼───────────────┘
                         ▼
              ┌─────────────────────┐
              │  Infrastructure     │
              │  Config Mgmt        │
              │  Logging/Monitoring │
              │  Graceful Shutdown  │
              │  Scaling/Perf       │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  Delivery           │
              │  DevOps / CI/CD     │
              │  12-Factor App      │
              │  OpenAPI            │
              │  Testing & Quality  │
              └─────────────────────┘
```

---

# LEARNING PROGRESSION GUIDE

## Phase 1 — Beginner (Months 1–3)
Master these in order:
1. OS fundamentals (processes, threads, memory)
2. Computer Networks (TCP/IP, DNS, TLS)
3. HTTP Protocol (methods, status codes, headers)
4. Backend Development basics (MVC, routing, handlers)
5. DBMS (SQL, ACID, basic indexing)
6. CRUD operations with REST
7. Basic Auth (JWT)
8. Configuration Management
9. Docker basics

**Milestone**: Build a fully functional CRUD REST API with JWT auth, PostgreSQL, and Docker

## Phase 2 — Intermediate (Months 4–8)
10. Middleware patterns
11. Validation & Transformation
12. Caching with Redis
13. Task Queuing (background jobs)
14. Logging & Monitoring
15. Security (OAuth, CSRF, XSS, rate limiting)
16. REST Best Practices (versioning, error formats)
17. OpenAPI documentation
18. Testing (unit, integration, API)
19. 12-Factor App
20. Graceful Shutdown

**Milestone**: Production-grade API with queues, caching, observability, and CI/CD pipeline

## Phase 3 — Advanced (Months 9–18)
21. System Design (capacity estimation, trade-offs)
22. Serialization (protobuf, Avro)
23. Elasticsearch
24. Realtime Backend (WebSocket, SSE)
25. Webhooks
26. Object Storage
27. Transactional Emails (deliverability)
28. Scaling & Performance (profiling, bottlenecks)
29. Concurrency & Parallelism (deep)
30. Business Logic Layer (DDD, aggregates)
31. Database patterns (CQRS, event sourcing)
32. DevOps (Kubernetes, GitOps)

**Milestone**: Design and build a distributed, scalable system from scratch

## Phase 4 — Expert (18+ months, ongoing)
- Distributed systems theory (CAP, PACELC, Paxos, Raft)
- Performance engineering (flamegraphs, profiling at kernel level)
- Chaos engineering
- Compiler-aware performance optimization
- Contributing to open source infrastructure tools
- Mentoring — teaching crystallizes understanding

---

# KEY CROSS-CUTTING THEMES

Every topic in this map is touched by these five meta-principles:

1. **Fail gracefully, not catastrophically** — errors are expected; unhandled errors are bugs
2. **Observability first** — if you can't measure it, you can't improve it
3. **Stateless where possible, explicit state where necessary** — the foundation of scale
4. **Security is a design constraint, not a feature** — bolt-on security always fails
5. **Test your assumptions** — benchmarks, load tests, and chaos tests are how you really know

---


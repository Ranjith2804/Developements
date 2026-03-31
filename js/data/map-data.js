/* js/data/map-data.js — Knowledge Map topics data */

const mapTopics = [
    {
        num: 1, title: 'System Design', level: 'Foundation',
        concepts: ['<strong>Scalability</strong> — horizontal vs. vertical scaling', '<strong>Availability</strong> — uptime guarantees, nines (99.9%, 99.99%)', '<strong>Reliability</strong> — system correctness over time', '<strong>Latency vs. Throughput</strong> — response speed vs. requests/sec', '<strong>CAP Theorem</strong> — Consistency, Availability, Partition tolerance', '<strong>Single points of failure</strong> and redundancy'],
        subtopics: [['b', 'Client-server model, monolith architecture'], ['b', 'DNS, load balancers, reverse proxies'], ['i', 'Microservices, service mesh, API gateway'], ['i', 'Data partitioning — sharding, horizontal partitioning'], ['i', 'Replication — leader-follower, multi-leader'], ['a', 'Consistent hashing for distributed routing'], ['a', 'Event-driven architecture, CQRS, Event Sourcing'], ['a', 'Distributed consensus — Raft, Paxos']],
        usecases: ['Design a URL shortener (Bitly) — hashing, redirects, analytics', 'Design Twitter/X timeline — fan-out on write vs. read', 'Design a ride-sharing backend — geo-queries, real-time', 'Design YouTube — video storage, CDN, transcoding pipeline', 'Design a payment system — exactly-once processing, consistency'],
        principles: ['Always clarify requirements and constraints before designing', 'Design for failure — assume components will fail', 'Start simple (monolith), scale when proven necessary', 'Prefer stateless services for horizontal scalability', 'Idempotency — safe to retry without side effects'],
        pitfalls: ['Over-engineering too early — premature microservices', 'Ignoring the network — treating remote calls as local', 'Not defining SLAs/SLOs before choosing consistency model', 'Single node DB with no replication in "production" designs'],
        connections: ['Scaling & Performance #26', 'DBMS #5', 'Caching #19', 'Concurrency #27', 'Task Queuing #21', 'DevOps #34']
    },
    {
        num: 2, title: 'Operating Systems', level: 'Foundation',
        concepts: ['<strong>Process</strong> — isolated execution unit with own memory space', '<strong>Thread</strong> — lightweight unit sharing process memory', '<strong>Scheduler</strong> — OS kernel decides CPU time allocation', '<strong>Virtual memory</strong> — abstraction over physical RAM', '<strong>System calls</strong> — kernel API boundary (read, write, fork)', '<strong>Signals</strong> — async notifications (SIGTERM, SIGKILL)'],
        subtopics: [['b', 'Process lifecycle, fork/exec model'], ['b', 'Thread creation, join, detach'], ['i', 'Mutexes, semaphores, condition variables'], ['i', 'Deadlock, livelock, starvation detection'], ['a', 'Lock-free data structures, CAS operations'], ['a', 'epoll/kqueue — event-driven I/O multiplexing']],
        usecases: ['Node.js event loop built on libuv/epoll — non-blocking I/O', 'Nginx worker processes — one per CPU core', 'Database buffer pool — OS page cache management', 'Docker — namespaces (PID, net, mount) + cgroups'],
        principles: ['Prefer fewer, larger threads over many tiny threads', 'Lock granularity — hold locks for the shortest time possible', 'Understand I/O-bound vs CPU-bound to choose threading model', 'Never block the event loop in async runtimes'],
        pitfalls: ['Race conditions — forgetting that memory writes aren\'t atomic', 'Deadlock — lock ordering inconsistencies across threads', 'Thread-per-request model — collapses under 10k connections', 'Killing process with SIGKILL — bypasses cleanup handlers'],
        connections: ['Concurrency #27', 'Graceful Shutdown #25', 'Scaling #26', 'Realtime #29']
    },
    {
        num: 3, title: 'Computer Networks', level: 'Foundation',
        concepts: ['<strong>OSI model</strong> — 7-layer abstraction (Physical to Application)', '<strong>TCP vs UDP</strong> — reliable ordered vs. best-effort delivery', '<strong>IP addressing</strong> — IPv4/IPv6, subnets, CIDR notation', '<strong>DNS</strong> — name resolution, recursive resolvers, TTL', '<strong>TLS/SSL</strong> — encryption, certificates, handshake', '<strong>Latency components</strong> — propagation, transmission, queuing'],
        subtopics: [['b', 'TCP handshake (SYN, SYN-ACK, ACK), ports'], ['b', 'DNS lookup chain: browser → OS → resolver → authoritative'], ['i', 'HTTP/1.1 keep-alive, HTTP/2 multiplexing'], ['i', 'TLS 1.3 — 0-RTT, perfect forward secrecy'], ['i', 'CDN architecture — edge nodes, origin pull'], ['a', 'QUIC protocol — UDP + built-in TLS + stream multiplexing'], ['a', 'BGP routing, Anycast, network topology']],
        usecases: ['Cloudflare — DDoS mitigation, edge TLS', 'Service mesh (Istio) — mutual TLS between microservices', 'WebSockets — upgrade from HTTP, full-duplex over TCP', 'gRPC uses HTTP/2 streams for multiplexed RPC calls'],
        principles: ['Connection pooling — amortize TCP handshake cost', 'Always terminate TLS at the edge, re-encrypt internally', 'Set appropriate timeouts — connect, read, write, idle', 'Prefer shorter TTLs for DNS during deployments'],
        pitfalls: ['No timeout on outbound HTTP calls — threads block indefinitely', 'DNS caching not respected — ignoring TTL in code', 'Self-signed certs in production without proper rotation', 'Treating LAN latency as zero in cross-region designs'],
        connections: ['HTTP Protocol #7', 'Security #6', 'Routing #8', 'Realtime #29', 'System Design #1']
    },
    {
        num: 4, title: 'Backend Development', level: 'Foundation',
        concepts: ['<strong>Request-response cycle</strong> — from TCP socket to HTTP handler', '<strong>Server frameworks</strong> — ASP.NET Core, Express, FastAPI, Spring', '<strong>Layered architecture</strong> — Controller → Service → Repository', '<strong>Dependency Injection</strong> — inversion of control, testability', '<strong>ORM vs raw SQL</strong> — abstraction vs. control', '<strong>Environment configs</strong> — dev, staging, prod separation'],
        subtopics: [['b', 'Setting up a web server, port binding, routing'], ['b', 'CRUD endpoints, request parsing, response shaping'], ['i', 'Middleware pipeline, DI container lifecycle'], ['i', 'Background services, hosted services'], ['i', 'Health checks, readiness vs liveness probes'], ['a', 'CQRS pattern — separate read/write models'], ['a', 'Hexagonal architecture (ports & adapters)']],
        usecases: ['REST API for mobile app — versioned, paginated, rate-limited', 'Internal admin panel — role-based access, audit logging', 'Webhook receiver — validates signature, queues for processing', 'B2B API with multi-tenant isolation per org'],
        principles: ['Controllers should be thin — delegate to service layer', 'Separate domain logic from infrastructure (DB, HTTP)', 'Register services with correct DI lifetime', 'Consistently shape errors — RFC 7807 Problem Details'],
        pitfalls: ['Fat controllers — business logic leaking into HTTP layer', 'Singleton service capturing Scoped dependency', 'Hardcoded config values — breaks across environments', 'No versioning strategy — breaking API clients on deploy'],
        connections: ['Middleware #12', 'REST #16', 'Business Logic #18', 'Config #23', 'Testing #30']
    },
    {
        num: 5, title: 'DBMS', level: 'Foundation',
        concepts: ['<strong>ACID</strong> — Atomicity, Consistency, Isolation, Durability', '<strong>Transactions</strong> — unit of work that succeeds or fails entirely', '<strong>Indexes</strong> — B-tree, Hash, GIN, covering indexes', '<strong>Query planner</strong> — how DB chooses execution plan', '<strong>Normalization</strong> — 1NF → 3NF, eliminating data redundancy', '<strong>WAL</strong> — Write-Ahead Log for durability and replication'],
        subtopics: [['b', 'Relational model, primary/foreign keys, JOINs'], ['b', 'Basic SQL — SELECT, INSERT, UPDATE, DELETE, GROUP BY'], ['i', 'Transaction isolation levels — read uncommitted → serializable'], ['i', 'Index types and when to use them; EXPLAIN ANALYZE'], ['i', 'N+1 query problem, eager vs lazy loading'], ['a', 'MVCC — Postgres multi-version concurrency control'], ['a', 'Partitioning — range, hash, list'], ['a', 'NoSQL data models — document, key-value, wide-column, graph']],
        usecases: ['Postgres + pgvector for semantic search / AI embeddings', 'Redis as primary DB for leaderboards with sorted sets', 'Cassandra for time-series IoT data — high write throughput', 'MongoDB for CMS with highly variable document shapes'],
        principles: ['Index foreign keys — unindexed FK joins are table scans', 'Prefer optimistic locking for low-conflict scenarios', 'Use READ COMMITTED by default; escalate only when needed', 'Never SELECT * in production code'],
        pitfalls: ['Missing index on high-cardinality columns used in WHERE', 'Long-running transactions — hold locks, block other writes', 'Storing JSON blobs when relational structure is needed', 'Over-normalizing OLAP workloads'],
        connections: ['Databases Practical #17', 'Caching #19', 'Business Logic #18', 'System Design #1', 'Elasticsearch #22']
    },
    {
        num: 6, title: 'Security', level: 'Core',
        concepts: ['<strong>OWASP Top 10</strong> — industry standard vulnerability classification', '<strong>Injection attacks</strong> — SQL, command, LDAP, template injection', '<strong>XSS</strong> — stored, reflected, DOM-based cross-site scripting', '<strong>CSRF</strong> — forged cross-site requests using user cookies', '<strong>Cryptography</strong> — symmetric (AES), asymmetric (RSA), hashing (SHA-256)', '<strong>Defense in depth</strong> — multiple independent security layers'],
        subtopics: [['b', 'Input validation, output encoding'], ['b', 'HTTPS everywhere, HSTS headers'], ['i', 'JWT security — algorithm confusion, expiry, rotation'], ['i', 'Password hashing — bcrypt, Argon2 (NOT MD5/SHA1)'], ['i', 'Rate limiting, brute force protection'], ['a', 'OAuth 2.0 security — PKCE, state param, token leakage'], ['a', 'Secret management — Vault, AWS Secrets Manager']],
        usecases: ['Parameterized queries — prevents SQL injection universally', 'Content Security Policy headers — XSS mitigation at browser', 'Webhook HMAC-SHA256 signature validation', 'mTLS between internal services — zero-trust networking'],
        principles: ['Principle of least privilege — only grant minimum access', 'Never trust user input — validate and sanitize at every boundary', 'Fail secure — deny by default, allow by exception', 'Secrets never in code, logs, or environment dumps'],
        pitfalls: ['Storing passwords in plaintext or with MD5', 'JWT without expiry or without verifying signature algorithm', 'Secrets committed to git — even for one second', 'Missing CORS configuration — allowing wildcard origin + credentials'],
        connections: ['Auth & Authz #10', 'HTTP Protocol #7', 'Config Mgmt #23', 'Validation #11', 'Webhooks #33']
    },
    {
        num: 7, title: 'HTTP Protocol', level: 'Core',
        concepts: ['<strong>Request structure</strong> — method, URL, headers, body', '<strong>Response structure</strong> — status code, headers, body', '<strong>Status codes</strong> — 1xx informational, 2xx success, 3xx redirect, 4xx client, 5xx server', '<strong>Headers</strong> — Content-Type, Accept, Authorization, Cache-Control, ETag', '<strong>Stateless</strong> — each request carries all context needed', '<strong>Method semantics</strong> — GET (safe+idempotent), POST, PUT (idempotent), PATCH, DELETE'],
        subtopics: [['b', 'HTTP/1.0 vs 1.1 — persistent connections, chunked transfer'], ['b', 'Common headers — Accept, Content-Type, Authorization'], ['i', 'HTTP/2 — binary framing, HPACK header compression, server push'], ['i', 'Caching — ETag, Last-Modified, Cache-Control directives'], ['i', 'CORS — preflight, simple vs complex requests'], ['a', 'HTTP/3 + QUIC — 0-RTT, no HOL blocking'], ['a', 'Server-Sent Events, long polling']],
        usecases: ['Conditional GET (If-None-Match) — serve 304 instead of full body', 'Gzip/Brotli encoding — compress response bodies 60-80%', 'Range requests — partial content for video streaming', 'Retry-After header — rate limiter tells client when to retry'],
        principles: ['Use correct status codes — don\'t return 200 with error body', 'Set Content-Type explicitly — never assume the client guesses', 'Leverage ETag for client-side caching of API responses', 'Enable HTTP/2 — free multiplexing benefit with TLS'],
        pitfalls: ['Using GET with body — undefined behavior, routers may strip it', '200 OK with error message in body — breaks monitoring', 'Cache-Control: no-cache misunderstood — it still revalidates', 'Forgetting OPTIONS support for CORS — preflight always fails'],
        connections: ['Computer Networks #3', 'Caching #19', 'REST #16', 'Auth #10', 'Security #6']
    },
    {
        num: 8, title: 'Routing', level: 'Core',
        concepts: ['<strong>URL structure</strong> — scheme, host, path, query string, fragment', '<strong>Route matching</strong> — exact, prefix, regex, wildcard', '<strong>Path parameters</strong> — /users/:id vs /users/{id}', '<strong>Query parameters</strong> — optional filters, pagination, search', '<strong>Route priority</strong> — order matters when patterns overlap', '<strong>Method-based dispatch</strong> — GET /users vs POST /users'],
        subtopics: [['b', 'Static routes, parameterized routes'], ['b', 'Route groups, prefixes, nested routes'], ['i', 'API versioning via URL (/v1/) vs header vs subdomain'], ['i', 'Reverse proxy routing — Nginx location blocks'], ['i', 'API gateway routing — path rewriting, service discovery'], ['a', 'Trie-based route matching in high-throughput routers'], ['a', 'Weighted routing — canary deployments via traffic split']],
        usecases: ['Nginx upstream routing — route by host header to different services', 'API gateway — /api/users → users-service, /api/orders → orders-service', 'Canary deployment — 5% traffic to new version via weighted route'],
        principles: ['RESTful resource naming — nouns not verbs in paths', 'Use route constraints to avoid ambiguous matches early', 'Always version APIs from day one — retrofit is painful'],
        pitfalls: ['Greedy wildcard routes catching unintended paths', 'Mixing versioning strategies in the same API', 'Action-based URLs (/createUser) — breaks REST semantics', 'No trailing slash normalization'],
        connections: ['HTTP Protocol #7', 'REST #16', 'Middleware #12', 'Handlers #14']
    },
    {
        num: 9, title: 'Serialization', level: 'Core',
        concepts: ['<strong>Serialization</strong> — object/struct → bytes/string for transport', '<strong>Deserialization</strong> — bytes/string → in-memory object', '<strong>Schema evolution</strong> — forward/backward compatibility', '<strong>Text formats</strong> — JSON, XML, YAML (human-readable)', '<strong>Binary formats</strong> — Protobuf, MessagePack, Avro, CBOR', '<strong>Encoding vs encryption</strong> — encoding is NOT security'],
        subtopics: [['b', 'JSON parsing, camelCase vs snake_case, null handling'], ['b', 'DateTime serialization — ISO 8601, UTC offset'], ['i', 'Protobuf — strongly typed, backward-compatible schemas'], ['i', 'Custom converters — polymorphic types, value objects'], ['a', 'Avro schema registry for Kafka message contracts'], ['a', 'Zero-copy deserialization — FlatBuffers, Cap\'n Proto']],
        usecases: ['gRPC uses Protobuf — 2-10x smaller than JSON, faster parsing', 'Kafka message schema registry — prevents producer/consumer mismatch', 'Caching serialized objects in Redis — JSON string vs binary'],
        principles: ['Never use object serialization across trust boundaries', 'Always deserialize dates as UTC; display in user\'s timezone', 'Validate after deserialization — schema ≠ business validity', 'Use versioned schemas to allow consumer-side migration'],
        pitfalls: ['Float precision loss — serialize money as integer cents', 'Deserializing untrusted input into arbitrary types', 'Breaking schema changes — removing fields used by consumers', 'Ignoring Content-Type — parsing JSON body as form data'],
        connections: ['HTTP Protocol #7', 'Validation #11', 'Task Queuing #21', 'OpenAPI #32', 'Caching #19']
    },
    {
        num: 10, title: 'Authentication & Authorization', level: 'Core',
        concepts: ['<strong>AuthN vs AuthZ</strong> — who you are vs what you can do', '<strong>Session-based auth</strong> — server stores state, cookie holds session ID', '<strong>JWT (token-based)</strong> — stateless, self-contained, signed claims', '<strong>OAuth 2.0</strong> — delegated authorization framework', '<strong>OIDC</strong> — identity layer on top of OAuth 2.0', '<strong>API keys</strong> — simple long-lived tokens for server-to-server'],
        subtopics: [['b', 'Username/password, bcrypt hashing, session cookies'], ['b', 'JWT structure — header.payload.signature, claims'], ['i', 'Refresh token rotation — silent re-auth, revocation'], ['i', 'RBAC (roles) vs ABAC (attributes) authorization'], ['i', 'OAuth 2.0 flows — Authorization Code + PKCE'], ['a', 'SSO — SAML 2.0, OIDC federation'], ['a', 'Fine-grained authz — Zanzibar-style relation-based (Google)']],
        usecases: ['Login with Google — OIDC Authorization Code + PKCE flow', 'Multi-tenant SaaS — org-scoped permissions + tenant isolation', 'Machine-to-machine — Client Credentials OAuth flow', 'Passwordless login — magic links, WebAuthn/passkeys'],
        principles: ['Short-lived access tokens (15 min), long-lived refresh tokens', 'Store refresh tokens server-side with ability to revoke', 'Validate JWT algorithm explicitly — reject \'none\' alg', 'Enforce authz in service layer, not just UI'],
        pitfalls: ['JWT without expiry — stolen token valid forever', 'Storing JWT in localStorage — XSS can steal it', 'IDOR — checking authentication but not authorization per resource', 'Trusting client-side roles in JWT without server verification'],
        connections: ['Security #6', 'Middleware #12', 'HTTP Protocol #7', 'Request Context #13', 'Logging #24']
    },
    {
        num: 11, title: 'Validation & Transformation', level: 'Core',
        concepts: ['<strong>Input validation</strong> — ensure data conforms to expected shape and rules', '<strong>Sanitization</strong> — strip or encode dangerous characters', '<strong>Transformation</strong> — convert DTO → domain model → response DTO', '<strong>DTOs</strong> — Data Transfer Objects, decoupled from domain', '<strong>Error aggregation</strong> — return all errors, not just first'],
        subtopics: [['b', 'Required fields, type coercion, format validation (email, UUID)'], ['b', 'Annotation-based validation (DataAnnotations, class-validator)'], ['i', 'FluentValidation — composable rule chains'], ['i', 'Mapping layers — AutoMapper, Mapster, manual mapping'], ['a', 'Cross-field validation — conditional rules'], ['a', 'Async validation — DB uniqueness check during validation phase']],
        usecases: ['Registration form — email unique, password strength, terms accepted', 'Payment API — currency codes, positive amounts, card format', 'Bulk import — row-level errors with line numbers returned'],
        principles: ['Validate at the boundary — before any business logic runs', 'Return structured errors — field + code + message', 'Never expose internal model shape in API response directly'],
        pitfalls: ['Validating in service layer only — HTTP layer accepts garbage', 'Returning first validation error only — poor DX', 'Exposing DB constraint errors directly to API consumers'],
        connections: ['Handlers #14', 'Security #6', 'REST #16', 'Business Logic #18', 'OpenAPI #32']
    },
    {
        num: 12, title: 'Middleware', level: 'Core',
        concepts: ['<strong>Pipeline pattern</strong> — request flows through ordered chain of components', '<strong>next() / invoke()</strong> — pass control to next middleware in chain', '<strong>Short-circuiting</strong> — return early without calling next (auth failure)', '<strong>Bidirectional</strong> — middleware runs on request AND on response path', '<strong>Order matters</strong> — auth before business logic; logging at edges'],
        subtopics: [['b', 'Logging middleware — log every request/response'], ['b', 'Error handling middleware — catch unhandled exceptions'], ['i', 'Authentication middleware — validate token, set principal'], ['i', 'Rate limiting middleware — token bucket / sliding window'], ['i', 'Correlation ID injection — trace requests across services'], ['a', 'Tenant resolution middleware — multi-tenant routing'], ['a', 'Custom middleware for circuit breaking, retry policies']],
        usecases: ['ASP.NET Core pipeline — UseRouting → UseAuthentication → UseAuthorization → UseEndpoints', 'Express.js — helmet for security headers as middleware', 'Global exception handler — convert exceptions to RFC 7807 responses'],
        principles: ['Keep middleware focused — one responsibility per component', 'Place error handler outermost — catches all downstream exceptions', 'Avoid heavy computation in middleware — impacts every request'],
        pitfalls: ['Wrong order — authorization before authentication runs', 'Middleware modifying request body — stream already consumed', 'Not calling next() — request hangs with no response'],
        connections: ['Auth #10', 'Logging #24', 'Request Context #13', 'Backend Dev #4', 'Security #6']
    },
    {
        num: 13, title: 'Request Context', level: 'Core',
        concepts: ['<strong>HttpContext</strong> — the envelope of a single HTTP request\'s lifetime', '<strong>Scoped services</strong> — created per request, share request state', '<strong>ClaimsPrincipal</strong> — authenticated user with roles and claims', '<strong>Items dictionary</strong> — key-value bag to pass data between middleware', '<strong>Correlation ID</strong> — unique ID propagated across service calls', '<strong>Cancellation token</strong> — signals request was aborted by client'],
        subtopics: [['b', 'Reading user ID from HttpContext after authentication'], ['i', 'Passing tenant context via scoped service'], ['i', 'AsyncLocal / execution context for ambient state'], ['a', 'Distributed tracing context propagation (W3C TraceContext)'], ['a', 'Context propagation to background jobs']],
        usecases: ['Multi-tenant: middleware resolves TenantId from JWT, stores in scoped service', 'Audit logging: downstream service reads UserId from context', 'Distributed trace: X-Correlation-ID propagated to all downstream calls'],
        principles: ['Never access HttpContext from a Singleton service — thread-unsafe', 'Pass context explicitly to background services rather than capturing HttpContext', 'Log correlation ID on every log line within request scope'],
        pitfalls: ['Capturing HttpContext in async lambda — context may be null', 'Not propagating trace headers to outbound HTTP calls'],
        connections: ['Middleware #12', 'Auth #10', 'Logging #24', 'Concurrency #27']
    },
    {
        num: 14, title: 'Handlers / Controllers', level: 'Core',
        concepts: ['<strong>Controller</strong> — HTTP layer component that handles one route group', '<strong>Handler</strong> — single function/class handling one specific operation', '<strong>Action result</strong> — typed response (Ok, Created, BadRequest, NotFound)', '<strong>Model binding</strong> — hydrate handler params from route/query/body', '<strong>Action filters</strong> — cross-cutting concerns at action level'],
        subtopics: [['b', 'CRUD controller structure, resource-based naming'], ['i', 'Minimal APIs vs MVC controllers (ASP.NET Core)'], ['i', 'Handler per use case (Vertical Slice Architecture)'], ['a', 'MediatR — decoupled command/query handler dispatch'], ['a', 'Strongly typed request/response objects per endpoint']],
        usecases: ['UsersController with Get, Create, Update, Delete actions', 'MediatR: POST /orders → CreateOrderCommand → CreateOrderHandler', 'Minimal API: app.MapGet("/users/{id}", GetUserHandler) — low overhead'],
        principles: ['Controllers are adapters — parse HTTP, call service, return result', 'Return meaningful HTTP status codes from every action', 'Group related endpoints in one controller/route file'],
        pitfalls: ['God controller — 30+ action methods, unrelated concerns', 'Business logic inside controller action — untestable', 'Returning 200 for all outcomes including errors'],
        connections: ['Routing #8', 'Middleware #12', 'Validation #11', 'Business Logic #18', 'REST #16']
    },
    {
        num: 15, title: 'CRUD Deep Dive', level: 'Core',
        concepts: ['<strong>Create</strong> — POST /resources, return 201 + Location header', '<strong>Read</strong> — GET single, GET list with pagination/filtering', '<strong>Update</strong> — PUT (full replacement) vs PATCH (partial update)', '<strong>Delete</strong> — hard delete vs soft delete (deleted_at column)', '<strong>Idempotency</strong> — PUT/DELETE safe to retry; POST needs idempotency key', '<strong>Concurrency control</strong> — ETag / optimistic locking prevents lost updates'],
        subtopics: [['b', 'Basic CRUD endpoint implementation, status codes'], ['b', 'Pagination — offset/limit vs cursor-based'], ['i', 'Filtering, sorting, field projection in list endpoints'], ['i', 'Soft delete — filter deleted_at IS NULL everywhere'], ['i', 'Upsert — INSERT OR UPDATE in single DB operation'], ['a', 'Optimistic concurrency — If-Match header + ETag validation'], ['a', 'Event sourcing — CRUD as event log, not mutable rows']],
        usecases: ['Cursor pagination on Twitter feed — offset breaks on live data', 'Soft delete for GDPR — mark deleted, purge separately', 'Idempotency key for payment POST — prevent duplicate charges'],
        principles: ['Cursor-based pagination for large, live datasets', 'Always index soft-delete column if filtering by it', 'Use database-generated IDs (UUID v7, ULID) for temporal ordering'],
        pitfalls: ['Offset pagination on large tables — OFFSET 10000 scans 10000 rows', 'Forgetting to filter soft-deleted records in all queries', 'PUT for partial update — nullifies unset fields'],
        connections: ['REST #16', 'DBMS #5', 'Databases #17', 'HTTP Protocol #7', 'Caching #19']
    },
    {
        num: 16, title: 'REST Best Practices', level: 'Core',
        concepts: ['<strong>Richardson Maturity Model</strong> — Level 0 → HATEOAS (Level 3)', '<strong>Resource-oriented</strong> — nouns, not verbs in URLs', '<strong>Stateless</strong> — server holds no client session state', '<strong>Uniform interface</strong> — consistent URL patterns across all resources', '<strong>HATEOAS</strong> — responses include links to related actions'],
        subtopics: [['b', 'URL naming conventions — lowercase, hyphens, plurals'], ['b', 'Correct HTTP method and status code usage'], ['i', 'API versioning strategies and tradeoffs'], ['i', 'Consistent error response shape — RFC 7807'], ['i', 'Rate limiting headers — X-RateLimit-Limit, Retry-After'], ['a', 'HATEOAS implementation — HAL, JSON:API specification'], ['a', 'GraphQL vs REST tradeoffs for complex read patterns']],
        usecases: ['Stripe API — gold standard REST: versioned, typed errors, idempotency', 'GitHub API — HATEOAS links in responses for discoverability', 'Twilio — consistent {status, code, message, moreInfo} error shape'],
        principles: ['/users/{id}/orders — nested resources for owned relationships', 'Never break v1 — deprecate, then remove with migration window', 'Document with OpenAPI spec — contract-first development'],
        pitfalls: ['Verbs in URLs — /api/getUsers, /api/deleteUser/5', 'Inconsistent casing — mixing camelCase and snake_case', 'Deeply nested URLs — /a/b/c/d/e — use flat with filters instead'],
        connections: ['HTTP Protocol #7', 'CRUD #15', 'OpenAPI #32', 'Validation #11', 'Auth #10']
    },
    {
        num: 17, title: 'Databases — Practical', level: 'Core',
        concepts: ['<strong>ORM</strong> — maps classes to tables; abstracts SQL (EF Core, Hibernate)', '<strong>Migration</strong> — versioned, incremental schema changes', '<strong>Repository pattern</strong> — abstract data access behind interface', '<strong>Unit of Work</strong> — groups DB operations into one transaction', '<strong>Connection pooling</strong> — reuse TCP connections to DB'],
        subtopics: [['b', 'EF Core DbContext, DbSet, migrations, seeding'], ['b', 'Repository + Unit of Work pattern implementation'], ['i', 'Dapper for raw SQL with mapping — performance-first'], ['i', 'Outbox pattern — reliable event publishing with DB transaction'], ['i', 'Optimistic concurrency with row version / timestamp'], ['a', 'Read replicas — route reads to replica, writes to primary'], ['a', 'Multi-tenancy — shared DB / separate schema / separate DB'], ['a', 'Change data capture (CDC) — stream DB changes to event bus']],
        usecases: ['Outbox pattern — save order + publish event atomically', 'Audit table — triggers that log every row change', 'Read replica — analytics queries don\'t compete with writes'],
        principles: ['Migration scripts must be reversible (down migration)', 'Never run migrations automatically on app startup in prod', 'Avoid N+1 via explicit Include() or join-fetch in ORM'],
        pitfalls: ['Running EnsureCreated() in prod — drops and recreates DB', 'Lazy loading enabled globally — hidden N+1 in every query', 'Long migrations with table locks — blocks prod traffic'],
        connections: ['DBMS #5', 'Caching #19', 'Business Logic #18', 'Task Queuing #21', 'CRUD #15']
    },
    {
        num: 18, title: 'Business Logic Layer', level: 'Core',
        concepts: ['<strong>Domain model</strong> — entities, value objects, aggregates', '<strong>Service layer</strong> — orchestrates domain operations', '<strong>Domain events</strong> — signals something happened in the domain', '<strong>Invariants</strong> — rules that must always hold true', '<strong>Aggregate root</strong> — single entry point for consistency boundary'],
        subtopics: [['b', 'Service class — validates, calls repo, returns result'], ['i', 'Rich domain model — logic inside entities, not services'], ['i', 'Result pattern — return Success/Failure instead of exceptions'], ['a', 'DDD — Bounded Contexts, Ubiquitous Language'], ['a', 'Domain events + handlers — decouple side effects'], ['a', 'Specification pattern — reusable, composable query rules']],
        usecases: ['Order.Place() — validates items, deducts inventory, emits OrderPlaced event', 'Subscription billing — complex state machine in domain service', 'Discount engine — specification pattern for composable eligibility rules'],
        principles: ['Keep domain model free of infrastructure (no DB calls inside entity)', 'Express domain language in code — class/method names match ubiquitous language', 'Use Result<T, Error> to make failure paths explicit'],
        pitfalls: ['Anemic domain model — entities are just data bags, logic in services', 'Business rules scattered across controllers, services, DB triggers', 'Throwing exceptions for normal domain outcomes'],
        connections: ['Databases #17', 'Handlers #14', 'Task Queuing #21', 'Testing #30', 'Validation #11']
    },
    {
        num: 19, title: 'Caching', level: 'Advanced',
        concepts: ['<strong>Cache-aside</strong> — app checks cache, on miss: fetch from DB, then write', '<strong>Write-through</strong> — write to cache and DB simultaneously', '<strong>Write-behind</strong> — write to cache, async write to DB (eventual)', '<strong>TTL</strong> — time-to-live; after which entry is evicted', '<strong>Eviction policies</strong> — LRU, LFU, FIFO, TTL-based', '<strong>Cache stampede</strong> — many requests hitting DB simultaneously on cache miss'],
        subtopics: [['b', 'In-memory cache (IMemoryCache in .NET), basic TTL'], ['i', 'Redis — strings, hashes, sorted sets, pub/sub'], ['i', 'Distributed cache for stateless multi-instance apps'], ['i', 'Cache invalidation strategies — event-driven, key-based'], ['a', 'Probabilistic early expiration to prevent stampede'], ['a', 'Multi-tier caching — L1 (in-process) + L2 (Redis) + L3 (CDN)']],
        usecases: ['Session storage in Redis — horizontal scaling for session-based auth', 'Rate limiter counters — Redis INCR + EXPIRE per user per window', 'Leaderboards — Redis sorted set (ZADD/ZRANK) for real-time ranking', 'CDN — caches entire HTTP responses at edge nodes globally'],
        principles: ['Cache only deterministic, infrequently changing data', 'Always design for cache miss — system must function without cache', 'Include version or tenant in cache key to avoid cross-contamination', 'Monitor cache hit rate — below 80% means strategy needs review'],
        pitfalls: ['Caching user-specific data under shared key — data leakage', 'Infinite TTL — stale data served indefinitely after writes', 'Cache stampede — no lock/early expiry — DB overwhelmed on miss'],
        connections: ['Databases #17', 'Scaling #26', 'HTTP Protocol #7', 'System Design #1', 'Realtime #29']
    },
    {
        num: 20, title: 'Transactional Emails', level: 'Core',
        concepts: ['<strong>Transactional email</strong> — triggered by user action (welcome, reset, invoice)', '<strong>SMTP vs API</strong> — raw protocol vs provider SDK (SendGrid, Resend)', '<strong>SPF, DKIM, DMARC</strong> — domain authentication to prevent spoofing', '<strong>Deliverability</strong> — reputation, bounces, complaints affect inbox rate'],
        subtopics: [['b', 'Integrate provider SDK (Resend, SendGrid, SES)'], ['i', 'Queue email sends — never block HTTP request'], ['i', 'Idempotency — prevent duplicate emails on retry'], ['a', 'Bounce and complaint webhooks — suppress invalid addresses']],
        usecases: ['Password reset — short-lived token, single-use, HTTPS link', 'Order confirmation — templated HTML with line items', 'Email verification — send on signup, block login until verified'],
        principles: ['Always send async — email send must not fail the HTTP request', 'Configure SPF/DKIM from day one — retroactive is painful', 'Track send/open/bounce via provider webhooks'],
        pitfalls: ['Sending email synchronously in request handler — latency + failure', 'No bounce handling — continue emailing invalid addresses', 'Storing reset tokens unhashed in DB'],
        connections: ['Task Queuing #21', 'Auth #10', 'Security #6', 'Webhooks #33']
    },
    {
        num: 21, title: 'Task Queuing & Scheduling', level: 'Advanced',
        concepts: ['<strong>Message queue</strong> — durable buffer between producer and consumer', '<strong>Producer</strong> — enqueues work items (jobs, messages)', '<strong>Consumer / Worker</strong> — dequeues and processes jobs', '<strong>Dead letter queue</strong> — failed jobs after max retries', '<strong>At-least-once delivery</strong> — jobs may be processed more than once', '<strong>Cron scheduling</strong> — time-based periodic job execution'],
        subtopics: [['b', 'Background jobs with Hangfire / BullMQ / Celery'], ['i', 'Redis-backed queue — simple, fast, ephemeral'], ['i', 'RabbitMQ — AMQP, exchanges, routing keys, acknowledgments'], ['i', 'Retry policies with exponential backoff + jitter'], ['a', 'Kafka — log-based, consumer groups, offset management'], ['a', 'Exactly-once processing with idempotent consumers'], ['a', 'Outbox pattern — transactional enqueue with DB operation']],
        usecases: ['Send welcome email asynchronously after user registration', 'Nightly report generation — cron at 00:00 UTC', 'Image resizing after upload — offload to worker process', 'Kafka for event streaming — audit log, analytics pipeline'],
        principles: ['Workers must be idempotent — safe to process same job twice', 'Always acknowledge after successful processing, not before', 'Monitor queue depth — growing backlog signals underprovisioned workers'],
        pitfalls: ['Non-idempotent jobs — duplicate processing causes double charges', 'No DLQ — failed jobs silently disappear', 'Cron job without distributed lock — two instances run simultaneously'],
        connections: ['Transactional Emails #20', 'Scaling #26', 'OS #2', 'Databases #17', 'Logging #24']
    },
    {
        num: 22, title: 'Elasticsearch', level: 'Advanced',
        concepts: ['<strong>Inverted index</strong> — maps terms to document IDs for full-text search', '<strong>Index</strong> — equivalent to a table; collection of documents', '<strong>Document</strong> — JSON object stored in an index', '<strong>Shard</strong> — horizontal partition of an index; enables scale', '<strong>Replica</strong> — copy of a shard for high availability', '<strong>Relevance scoring</strong> — TF-IDF / BM25 for ranked results'],
        subtopics: [['b', 'Index CRUD, mapping types (text, keyword, date)'], ['i', 'Query DSL — match, term, bool, range, nested'], ['i', 'Aggregations — bucket (group by) + metric (avg, max)'], ['i', 'Sync strategy — DB → ES via Kafka CDC or polling'], ['a', 'Search-as-you-type — edge n-gram analyzer'], ['a', 'Vector search (kNN) with dense_vector for semantic search']],
        usecases: ['E-commerce product search — full-text + facets + geo-distance', 'Log aggregation — ELK stack (Elasticsearch + Logstash + Kibana)', 'Autocomplete — prefix query on keyword-analyzed field'],
        principles: ['ES is not your source of truth — always sync from primary DB', 'Define explicit mappings — avoid dynamic mapping in prod', 'Use bulk API for indexing — single-doc index is 10x slower'],
        pitfalls: ['Too many shards — overhead exceeds benefit for small indices', 'Mapping explosion — dynamic mapping creates thousands of fields', 'Treating ES like a relational DB — not built for joins'],
        connections: ['DBMS #5', 'Task Queuing #21', 'Logging #24', 'Scaling #26']
    },
    {
        num: 23, title: 'Configuration Management', level: 'Core',
        concepts: ['<strong>12-Factor config</strong> — environment variables, not code', '<strong>Separation of secrets</strong> — credentials never in config files committed to VCS', '<strong>Environment-specific config</strong> — dev vs staging vs prod', '<strong>Secrets management</strong> — HashiCorp Vault, AWS Secrets Manager, Azure Key Vault', '<strong>Feature flags</strong> — config-driven behavior switching'],
        subtopics: [['b', '.env files, appsettings.json, environment variables'], ['i', 'Strongly typed options pattern (IOptions<T> in .NET)'], ['i', 'Config validation at startup — fail fast before serving traffic'], ['a', 'Dynamic config — feature flags via LaunchDarkly/Unleash'], ['a', 'Secret rotation — zero-downtime credential update']],
        usecases: ['Kill switch feature flag — disable broken feature in prod without deploy', 'A/B test via config — 10% users see new checkout flow', 'Database connection string from Vault — auto-rotated every 24h'],
        principles: ['Config as code for infrastructure; secrets external to VCS', 'Default to strict mode — missing required config = fail startup', 'Namespace configs by service to avoid collisions in shared env'],
        pitfalls: ['Secrets in appsettings.json committed to git', 'Hardcoded environment strings — "production" typo breaks everything', 'No validation — app starts with null DB connection string'],
        connections: ['12-Factor #31', 'Security #6', 'DevOps #34', 'Backend Dev #4']
    },
    {
        num: 24, title: 'Logging & Observability', level: 'Advanced',
        concepts: ['<strong>Three pillars</strong> — Logs, Metrics, Traces (OpenTelemetry)', '<strong>Structured logging</strong> — JSON logs with queryable fields', '<strong>Distributed tracing</strong> — follow a request across services', '<strong>Metrics</strong> — counters, gauges, histograms (Prometheus)', '<strong>SLI/SLO/SLA</strong> — define and measure reliability targets', '<strong>Alerting</strong> — fire when SLO breach threshold exceeded'],
        subtopics: [['b', 'Log levels — DEBUG, INFO, WARN, ERROR, FATAL'], ['b', 'Serilog / Winston structured logging with correlation ID'], ['i', 'Prometheus + Grafana — scrape metrics, build dashboards'], ['i', 'Distributed tracing with OpenTelemetry + Jaeger'], ['a', 'Log aggregation — ELK / Loki + Grafana'], ['a', 'RED method — Rate, Errors, Duration for services']],
        usecases: ['Trace a slow request across 5 microservices with Jaeger', 'P99 latency alert — page on-call when 99th percentile > 2s', 'Request rate drop alert — signals upstream outage'],
        principles: ['Log correlation ID on every line within a request scope', 'Never log passwords, tokens, or PII', 'Alert on symptoms (high latency), not causes (CPU %)'],
        pitfalls: ['Logging PII in plaintext — GDPR/compliance violation', 'Logging at DEBUG in prod — disk I/O overhead, noise', 'No trace context propagation — distributed trace breaks at service boundary'],
        connections: ['Middleware #12', 'DevOps #34', 'Scaling #26', 'Graceful Shutdown #25', '12-Factor #31']
    },
    {
        num: 25, title: 'Graceful Shutdown', level: 'Advanced',
        concepts: ['<strong>SIGTERM</strong> — OS signal to request termination (graceful)', '<strong>SIGKILL</strong> — OS signal that immediately terminates (no cleanup)', '<strong>Drain period</strong> — time window to finish in-flight requests', '<strong>Health check deregistration</strong> — stop receiving new traffic before shutdown'],
        subtopics: [['b', 'Catch SIGTERM, stop accepting new requests'], ['i', 'Wait for in-flight requests to complete (drain)'], ['i', 'Flush log buffers, close DB connections cleanly'], ['a', 'Kubernetes terminationGracePeriodSeconds configuration'], ['a', 'Queue workers — stop consuming, finish current job']],
        usecases: ['Kubernetes rolling deploy — pod receives SIGTERM, drains, terminates', 'Long payment transaction — must complete before shutdown (or rollback)', 'Worker draining — finish current Kafka message, commit offset, exit'],
        principles: ['Remove from load balancer first, then drain, then terminate', 'Set drain timeout shorter than Kubernetes terminationGracePeriodSeconds', 'Always handle CancellationToken in long-running operations'],
        pitfalls: ['Not handling SIGTERM — Kubernetes sends SIGKILL after 30s', 'Drain timeout too long — deployment stuck waiting', 'Not flushing telemetry buffers — losing last seconds of data'],
        connections: ['OS #2', 'DevOps #34', 'Task Queuing #21', 'Logging #24']
    },
    {
        num: 26, title: 'Scaling & Performance', level: 'Advanced',
        concepts: ['<strong>Horizontal scaling</strong> — add more instances (stateless app)', '<strong>Vertical scaling</strong> — bigger machine (faster, but limited)', '<strong>Load balancing</strong> — distribute traffic across instances', '<strong>Amdahl\'s Law</strong> — max speedup limited by serial portion', '<strong>Bottleneck identification</strong> — profiling, flame graphs, DB explain'],
        subtopics: [['b', 'Stateless services — no in-memory session, externalize state'], ['i', 'Auto-scaling — HPA (Kubernetes), target CPU/RPS'], ['i', 'DB read replicas, connection pooling (PgBouncer)'], ['i', 'CDN for static assets — serve globally, reduce origin load'], ['a', 'Profiling — CPU flame graphs, memory heap dumps'], ['a', 'Backpressure — rate limiting upstream to protect downstream'], ['a', 'CQRS — separate read model optimized for query patterns']],
        usecases: ['Black Friday — auto-scale from 2 to 50 pods on CPU metric', 'PgBouncer — pool 1000 app connections to 20 actual DB connections', 'Async writes — respond 202 Accepted, process in background'],
        principles: ['Measure before optimizing — profiling reveals actual bottleneck', 'Design stateless from day one — retrofit is painful', 'Circuit breaker — stop calling failing service, fail fast'],
        pitfalls: ['Premature optimization — guessing bottleneck without profiling', 'Stateful app with in-memory session — horizontal scaling breaks sessions', 'No backpressure — fast producer overwhelms slow consumer'],
        connections: ['System Design #1', 'Caching #19', 'Databases #17', 'Concurrency #27', 'DevOps #34']
    },
    {
        num: 27, title: 'Concurrency & Parallelism', level: 'Advanced',
        concepts: ['<strong>Concurrency</strong> — dealing with multiple things at once (structure)', '<strong>Parallelism</strong> — doing multiple things at once (execution)', '<strong>async/await</strong> — cooperative multitasking without blocking threads', '<strong>Thread pool</strong> — reuse threads to reduce creation cost', '<strong>Data races</strong> — unsynchronized concurrent access to shared state'],
        subtopics: [['b', 'async/await in C#/JavaScript — Task, Promise'], ['i', 'Parallel.ForEach, PLINQ — CPU-bound parallelism'], ['i', 'SemaphoreSlim — throttle concurrent async operations'], ['a', 'Channels — producer/consumer pipeline in .NET'], ['a', 'Actor model — Akka, Erlang OTP for message-passing concurrency'], ['a', 'Lock-free algorithms — CAS, atomic operations']],
        usecases: ['Parallel API calls — fetch user + orders + notifications simultaneously', 'Semaphore-limited external API calls — max 10 concurrent', 'Image processing pipeline — Channels for streaming transform'],
        principles: ['Prefer message passing over shared mutable state', 'async all the way down — don\'t block async with .Result', 'Limit parallelism with semaphore — unbounded causes resource exhaustion'],
        pitfalls: ['.Result or .Wait() on async — deadlock in ASP.NET synchronization context', 'Shared mutable state without locking — data corruption', 'Unbounded Task.WhenAll — spawns thousands of tasks at once'],
        connections: ['OS #2', 'Scaling #26', 'Realtime #29', 'Task Queuing #21']
    },
    {
        num: 28, title: 'Object Storage & Large Files', level: 'Advanced',
        concepts: ['<strong>Object storage</strong> — flat namespace, key-value for blobs (S3, GCS, R2)', '<strong>Presigned URL</strong> — time-limited URL for direct client upload/download', '<strong>Multipart upload</strong> — chunk large files, resume on failure', '<strong>CDN + object storage</strong> — serve files from edge, origin = S3'],
        subtopics: [['b', 'Upload file via server, store in S3, return URL'], ['i', 'Presigned PUT URL — client uploads directly to S3 (bypass server)'], ['i', 'Multipart upload — 5MB minimum part size, parallelism'], ['a', 'Post-upload webhook — trigger processing after S3 event'], ['a', 'Streaming upload/download — don\'t buffer entire file in memory']],
        usecases: ['Avatar upload — presigned PUT to S3, then validate + process thumbnail', 'Video upload — multipart, then transcode via Lambda/worker', 'CSV bulk import — upload to S3, background job processes rows'],
        principles: ['Never expose raw S3 bucket URL — always use presigned or CDN', 'Validate file type server-side — not just extension (magic bytes)', 'Use server-side encryption at rest (SSE-S3 or SSE-KMS)'],
        pitfalls: ['Buffering entire file in memory on server — OOM for large files', 'Public bucket without ACL — files world-readable', 'Storing file binary in DB column — bloats DB, slower than S3'],
        connections: ['Task Queuing #21', 'Security #6', 'Scaling #26', 'Webhooks #33']
    },
    {
        num: 29, title: 'Realtime Backend Systems', level: 'Advanced',
        concepts: ['<strong>WebSockets</strong> — full-duplex persistent TCP connection over HTTP upgrade', '<strong>Server-Sent Events (SSE)</strong> — server pushes events, client reads stream', '<strong>Long polling</strong> — client holds request open until data ready', '<strong>Pub/Sub</strong> — publisher emits events, subscribers receive (Redis pub/sub)', '<strong>Presence</strong> — who is online now; heartbeat + TTL pattern'],
        subtopics: [['b', 'WebSocket handshake, ping/pong keepalive'], ['i', 'Socket.IO — fallback (polling → WS), rooms, namespaces'], ['i', 'Redis Pub/Sub to fan out to multiple server instances'], ['a', 'SignalR (ASP.NET) with backplane for scale-out'], ['a', 'CRDT — conflict-free replicated data types for collaborative editing']],
        usecases: ['Chat app — WebSocket per user, Redis pub/sub for room broadcast', 'Live dashboard — SSE pushes metric updates every second', 'Collaborative document editor — CRDT or OT (Operational Transform)'],
        principles: ['Always handle reconnection on client — WebSocket connections drop', 'Fan-out via message broker — don\'t store WS connections in-process', 'Authenticate WebSocket at upgrade request — not during connection lifetime'],
        pitfalls: ['Storing WS connections in memory — breaks when second server instance added', 'No heartbeat — silent disconnections go undetected', 'Broadcasting entire state on every update — should send diffs'],
        connections: ['Computer Networks #3', 'Caching #19', 'Concurrency #27', 'Scaling #26']
    },
    {
        num: 30, title: 'Testing & Code Quality', level: 'Core',
        concepts: ['<strong>Unit test</strong> — test one unit in isolation (no I/O)', '<strong>Integration test</strong> — test interactions between components (DB, API)', '<strong>E2E test</strong> — test full user journey through system', '<strong>Test pyramid</strong> — many unit → fewer integration → few E2E', '<strong>Mocks vs Stubs vs Fakes</strong> — substitutes for dependencies'],
        subtopics: [['b', 'xUnit / Jest — test structure, assertions, AAA pattern'], ['b', 'Mocking with Moq / Jest mocks — substitute dependencies'], ['i', 'Integration tests with TestServer, WebApplicationFactory'], ['i', 'TestContainers — real Postgres/Redis in Docker for tests'], ['a', 'Contract testing (Pact) — verify producer/consumer API contracts'], ['a', 'Performance/load testing — k6, Gatling, Locust']],
        usecases: ['TDD — write failing test, write code, refactor green', 'CI pipeline — unit tests on every PR, integration on merge', 'Regression test — reproduce bug with test first, then fix'],
        principles: ['Tests are documentation — test names explain expected behavior', 'Test behavior, not implementation — don\'t test private methods', 'Prefer real implementations over mocks for integration layers'],
        pitfalls: ['100% code coverage as a goal — metrics don\'t equal quality', 'Tests coupled to implementation — break on refactor', 'No integration tests — unit tests pass, system fails in prod'],
        connections: ['Business Logic #18', 'DevOps #34', 'Databases #17', 'Backend Dev #4']
    },
    {
        num: 31, title: '12-Factor App', level: 'Advanced',
        concepts: ['<strong>I. Codebase</strong> — one codebase, many deploys (Git)', '<strong>II. Dependencies</strong> — explicitly declared, isolated', '<strong>III. Config</strong> — in environment, not code', '<strong>IV. Backing services</strong> — DB, Redis, S3 as attached resources (URL-addressed)', '<strong>V. Build/Release/Run</strong> — strict stage separation', '<strong>VI. Processes</strong> — stateless, share-nothing'],
        subtopics: [['b', 'What each factor means and why it matters'], ['i', 'Applying 12-factor to containerized apps (Docker)'], ['a', 'Beyond 12-factor — 15-factor extensions (telemetry, API-first)']],
        usecases: ['Factor III — DATABASE_URL env var, not hardcoded connection string', 'Factor VI — store session in Redis, not in-process memory', 'Factor XI — logs to stdout, platform (Datadog) aggregates'],
        principles: ['Treat every backing service as replaceable — URL-addressed only', 'App must start fast and shut down gracefully (disposability)', 'Keep dev and prod as similar as possible — avoid parity drift'],
        pitfalls: ['In-process session state — can\'t scale horizontally', 'Different DB engines in dev/prod — behavior diverges subtly', 'Writing logs to files instead of stdout — breaks log aggregation'],
        connections: ['Config Mgmt #23', 'DevOps #34', 'Scaling #26', 'Logging #24']
    },
    {
        num: 32, title: 'OpenAPI Standard', level: 'Core',
        concepts: ['<strong>OpenAPI Spec (OAS)</strong> — machine-readable API description (YAML/JSON)', '<strong>Contract-first</strong> — define spec before writing code', '<strong>Code-first</strong> — generate spec from existing code annotations', '<strong>Swagger UI</strong> — interactive documentation from OpenAPI spec', '<strong>Code generation</strong> — generate client SDKs from spec (OpenAPI Generator)'],
        subtopics: [['b', 'OpenAPI 3.x structure — paths, components, schemas'], ['i', 'Swashbuckle (ASP.NET) / Springdoc — auto-generate from code'], ['i', 'Schema validation — request body validated against spec'], ['a', 'Contract testing — verify implementation matches spec'], ['a', 'API versioning in OpenAPI — separate specs per version']],
        usecases: ['Generate TypeScript client for React frontend from backend spec', 'Postman collection import from OpenAPI spec', 'API gateway validates requests against OpenAPI spec at edge'],
        principles: ['Treat the spec as the source of truth — not the implementation', 'Version specs alongside code in same repository', 'Document error responses as thoroughly as success cases'],
        pitfalls: ['Spec not matching implementation — generated spec drifts from reality', 'No error response schemas — clients don\'t know error shape', 'Missing security schemes — auth not described in spec'],
        connections: ['REST #16', 'Validation #11', 'Serialization #9', 'Testing #30']
    },
    {
        num: 33, title: 'Webhooks', level: 'Advanced',
        concepts: ['<strong>Webhook</strong> — HTTP POST sent by system A to system B when event occurs', '<strong>Push vs poll</strong> — webhooks push; polling repeatedly asks', '<strong>HMAC signature</strong> — verify webhook came from expected sender', '<strong>Retry with backoff</strong> — sender retries on non-2xx response', '<strong>Idempotency</strong> — receiver must handle duplicate deliveries safely'],
        subtopics: [['b', 'Receive webhook — validate, return 200 fast, process async'], ['i', 'HMAC-SHA256 signature validation — Stripe/GitHub style'], ['i', 'Idempotency — deduplicate by event ID before processing'], ['a', 'Building a webhook delivery system — retry, backoff, DLQ'], ['a', 'Webhook gateway — fan-out, filtering, delivery tracking']],
        usecases: ['Stripe payment.succeeded → update order status in your DB', 'GitHub push event → trigger CI/CD pipeline', 'SendGrid bounce → suppress email address from future sends'],
        principles: ['Respond with 200 immediately — process async via job queue', 'Validate signature before processing any payload', 'Store event ID and check for duplicates before acting'],
        pitfalls: ['Not validating signature — any HTTP client can forge events', 'Slow processing in webhook handler — sender times out, retries', 'Not handling duplicates — double-charged, double-fulfilled'],
        connections: ['Task Queuing #21', 'Security #6', 'HTTP Protocol #7', 'Transactional Email #20']
    },
    {
        num: 34, title: 'DevOps', level: 'Expert',
        concepts: ['<strong>CI/CD</strong> — Continuous Integration + Continuous Delivery/Deployment', '<strong>Infrastructure as Code (IaC)</strong> — Terraform, Pulumi, CloudFormation', '<strong>Containerization</strong> — Docker, image layers, registry', '<strong>Orchestration</strong> — Kubernetes for running containers at scale', '<strong>Deployment strategies</strong> — Rolling, Blue/Green, Canary', '<strong>GitOps</strong> — Git as source of truth for infra and app state'],
        subtopics: [['b', 'Dockerfile — build image, layers, entrypoint'], ['b', 'GitHub Actions / GitLab CI — pipeline stages'], ['i', 'Kubernetes — Deployments, Services, Ingress, ConfigMaps'], ['i', 'Helm charts — templated Kubernetes manifests'], ['a', 'Terraform — provision cloud infra declaratively'], ['a', 'Service mesh — Istio for mTLS, traffic shaping, observability'], ['a', 'GitOps with ArgoCD — cluster auto-syncs from Git']],
        usecases: ['PR opens → CI: lint, test, build image → merge → CD: deploy to staging', 'Blue/Green deploy — switch load balancer, keep old version warm for rollback', 'Canary — 5% traffic to v2, monitor error rate, gradually increase'],
        principles: ['Everything as code — infra, pipelines, runbooks in Git', 'Immutable infrastructure — replace servers, never patch in-place', 'Ship small, ship often — small diffs = safer deployments'],
        pitfalls: ['Manual deploy steps — undocumented, unrepeateable, error-prone', 'Fat Docker image — no .dockerignore, copies node_modules', 'No rollback plan — deploy fails, no way back without data loss'],
        connections: ['System Design #1', '12-Factor #31', 'Logging #24', 'Graceful Shutdown #25', 'Scaling #26']
    },
];

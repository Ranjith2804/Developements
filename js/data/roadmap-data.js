/* js/data/roadmap-data.js — Roadmap phases data */

const roadmapPhases = [
    {
        id: 'rp1', num: 'Phase 01', title: 'The Spine — How Computers Actually Work', timeline: 'Week 1–2', concepts: [
            { name: 'How HTTP Works', level: 'basic', desc: 'Request/response cycle, verbs, status codes, headers, keep-alive.', why: 'Every web app runs on HTTP. If you don\'t know what a 200 vs 503 means at the protocol level, you can\'t debug production. This is the alphabet of the web.' },
            { name: 'TCP/IP & DNS Basics', level: 'basic', desc: 'How data travels from browser to server. Packets, handshakes, resolution.', why: 'When your app is \'down\', is it DNS? Network? App? You need to know the layers to know where to look. Ping vs curl vs dig — each tests a different layer.' },
            { name: 'Processes & Threads', level: 'basic', desc: 'How your OS runs programs, concurrency basics, context switching.', why: 'Your web server handles many requests at once. Understanding processes/threads explains why Node.js behaves differently from Java and why CPU-heavy tasks block your server.' },
            { name: 'Memory — Heap vs Stack', level: 'basic', desc: 'Where data lives when your program runs. GC basics.', why: 'Memory leaks are a real production killer. You need to know what lives on heap vs stack to understand why your service crashes at 2am after running fine all day.' },
            { name: 'File I/O & Disk', level: 'basic', desc: 'How programs read/write to disk. Syscalls, buffering, blocking vs non-blocking.', why: 'Disk is 1000x slower than memory. This single fact shapes every architecture decision about what to cache.' },
            { name: 'Client–Server Model', level: 'basic', desc: 'The fundamental separation of concerns in networked systems.', why: 'Everything you build is a variation of this. Understanding it cleanly lets you reason about where logic should live.' },
        ]
    },
    {
        id: 'rp2', num: 'Phase 02', title: 'The Spine With Flesh — Your First Real App', timeline: 'Week 2–4', concepts: [
            { name: 'CRUD & REST Principles', level: 'basic', desc: 'Create, Read, Update, Delete. Resource-oriented API design, statelessness.', why: 'This is your baseline. Every production system has CRUD at its core. Know it so well you can design a clean REST API in your sleep.' },
            { name: 'Raw SQL — No ORM First', level: 'basic', desc: 'SELECT, JOIN, WHERE, GROUP BY, EXPLAIN. Writing queries manually.', why: 'ORMs abstract pain away. You need to feel the pain first. Writing raw SQL teaches you what\'s actually happening and makes you dangerous when you eventually use an ORM.' },
            { name: 'Indexes & Query Plans', level: 'basic', desc: 'Why queries slow down at scale, B-tree indexes, EXPLAIN output.', why: 'A table with 100k rows with no index on the WHERE column will destroy performance. You\'ll only truly understand indexes after watching a query go from 4s to 4ms.' },
            { name: 'Relational Data Modeling', level: 'basic', desc: 'Normalization (1NF-3NF), foreign keys, many-to-many via join tables.', why: 'Your schema design at day 1 haunts you at month 6. Getting relationships right early saves enormous migration pain.' },
            { name: 'HTTP Status Codes (deep)', level: 'basic', desc: '2xx success, 3xx redirect, 4xx client error, 5xx server error families.', why: 'When your client gets a 502, do you know if the problem is your app, your proxy, or your upstream? Status codes are your first diagnostic signal.' },
            { name: 'Environment Variables & Config', level: 'basic', desc: 'Keeping secrets out of code. .env files, 12-factor app config.', why: 'Hardcoded secrets are how companies get hacked. Database passwords in git repos are a real incident type.' },
        ]
    },
    {
        id: 'rp3', num: 'Phase 03', title: 'The Nervous System — Observability', timeline: 'Week 3–5', concepts: [
            { name: 'Structured Logging', level: 'basic', desc: 'JSON logs with context — timestamp, request ID, user ID, latency, error.', why: 'console.log() is debugging in the dark. Structured logs let you filter, search, and correlate production incidents in seconds.' },
            { name: 'Log Levels', level: 'basic', desc: 'DEBUG, INFO, WARN, ERROR, FATAL — semantics of each.', why: 'Log everything at DEBUG and you flood storage. Log nothing and you\'re blind. Level discipline is operational maturity.' },
            { name: 'Health Check Endpoints', level: 'basic', desc: '/health, /ready endpoints. Liveness vs readiness distinction.', why: 'Load balancers need to know if your app is alive. Without health checks, dead instances keep receiving traffic.' },
            { name: 'Metrics & Counters', level: 'medium', desc: 'Request count, latency percentiles (p50/p95/p99), error rate, saturation.', why: 'Averages lie. p99 latency tells you about your worst users. Tracking these over time lets you see degradation before users file tickets.' },
            { name: 'Error Tracking', level: 'medium', desc: 'Capturing exceptions with full context — stack trace, user, input, env.', why: 'Errors in production are invisible without tooling. Error trackers show you exactly what broke, for how many users, and with what input.' },
            { name: 'Alerting & Thresholds', level: 'medium', desc: 'When to page, SLOs, error budgets, alert fatigue.', why: 'Metrics without alerts are dashboards nobody watches at 3am. Good alerts fire rarely but always matter.' },
            { name: 'Distributed Tracing Concepts', level: 'medium', desc: 'Trace IDs flowing across service boundaries. Spans, parents, timing.', why: 'Once you have 3+ services, a slow request becomes a mystery. Tracing gives you the full story across service boundaries.' },
        ]
    },
    {
        id: 'rp4', num: 'Phase 04', title: 'The Muscles — Performance', timeline: 'Week 4–7', concepts: [
            { name: 'N+1 Query Problem', level: 'basic', desc: 'Queries that multiply with data volume. The silent performance killer.', why: 'The #1 performance bug in any ORM-based app. A page that works fine with 10 rows sends 10,001 queries with 10,000 rows.' },
            { name: 'Caching Concepts', level: 'basic', desc: 'Cache-aside pattern, TTL, what to cache vs not, cold starts.', why: 'Caching is the single biggest lever for performance. Understanding when to cache and when to invalidate separates senior engineers from juniors.' },
            { name: 'Redis Fundamentals', level: 'basic', desc: 'Key-value, strings, hashes, lists, sorted sets, TTL, pub/sub.', why: 'Redis is the most common production cache. Each data structure solves different problems — sorted sets for leaderboards, hashes for sessions.' },
            { name: 'Load Testing', level: 'basic', desc: 'Simulating concurrent traffic with k6 or similar. Finding bottlenecks.', why: 'You don\'t know your system\'s breaking point until you test it. Do this before launch, not after.' },
            { name: 'Connection Pooling', level: 'medium', desc: 'Reusing DB connections across requests. Pool sizing strategy.', why: 'Creating a database connection costs 5-10ms. Without pooling, 1000 concurrent users means 1000 new connections. Databases die this way.' },
            { name: 'Cache Invalidation', level: 'medium', desc: 'TTL strategies, write-through vs write-back, stampede prevention.', why: 'Called the hardest problem in CS for a reason. Stale cache causes real bugs. When do you invalidate?' },
            { name: 'CDN Concepts', level: 'medium', desc: 'Edge caching, asset delivery, geographic PoPs, cache-control headers.', why: 'CDNs put content geographically close to users and take load off your servers.' },
        ]
    },
    {
        id: 'rp5', num: 'Phase 05', title: 'The Immune System — Resilience', timeline: 'Week 6–9', concepts: [
            { name: 'Timeouts', level: 'basic', desc: 'Every external call needs a maximum wait. Connect timeout vs read timeout.', why: 'Without timeouts, one slow dependency hangs your entire server thread indefinitely.' },
            { name: 'Retries & Exponential Backoff', level: 'basic', desc: 'Retry failed calls intelligently with growing delay. Jitter to prevent stampedes.', why: 'Instant retries hammer already-struggling services. Exponential backoff gives systems breathing room.' },
            { name: 'Idempotency', level: 'medium', desc: 'Same request = same result regardless of how many times it\'s sent.', why: 'Networks fail and retries happen. If your \'charge payment\' endpoint isn\'t idempotent, users get double-charged on retry.' },
            { name: 'Circuit Breaker Pattern', level: 'medium', desc: 'Stop calling a failing service. States: closed, open, half-open.', why: 'Circuit breakers prevent one slow service from cascading failures across your entire system.' },
            { name: 'Graceful Degradation', level: 'medium', desc: 'Partial failure = partial feature, not total crash. Fallback strategies.', why: 'If your recommendation service fails, your homepage should still load — without recommendations.' },
            { name: 'Bulkhead Pattern', level: 'advanced', desc: 'Thread pool isolation per dependency. Contain blast radius.', why: 'If your image resize service exhausts its thread pool, it shouldn\'t starve your checkout service.' },
            { name: 'Dead Letter Queues', level: 'advanced', desc: 'Where messages go when they permanently fail processing. Inspection, replay.', why: 'Without DLQs, permanently-failing async jobs silently disappear.' },
        ]
    },
    {
        id: 'rp6', num: 'Phase 06', title: 'The Circulatory System — Async & Events', timeline: 'Week 7–10', concepts: [
            { name: 'Sync vs Async Design', level: 'basic', desc: 'When users must wait vs when work can happen in background.', why: 'Sending a welcome email doesn\'t need to happen before the user sees their dashboard. Async decouples response time from work time.' },
            { name: 'Message Queue Concepts', level: 'basic', desc: 'Producer pushes, consumer pulls. Decoupled, durable, ordered processing.', why: 'Queues let services communicate without tight coupling. If a consumer goes down, messages wait.' },
            { name: 'Redis Pub/Sub', level: 'basic', desc: 'Simple fire-and-forget messaging. Non-durable, lightweight.', why: 'Good entry point to feel async patterns. Messages don\'t survive Redis restarts — teaching you what \'durability\' means by its absence.' },
            { name: 'BullMQ / RabbitMQ', level: 'medium', desc: 'Durable queues with acknowledgment, retries, delay, priority.', why: 'When you need guaranteed delivery — payments, emails, webhooks — you need durable queues.' },
            { name: 'Event-Driven Architecture', level: 'medium', desc: 'Services emit events, others subscribe. No direct coupling.', why: 'Service A calls Service B directly = tight coupling. Service A emits \'OrderPlaced\' event = loose coupling.' },
            { name: 'Kafka Fundamentals', level: 'advanced', desc: 'Distributed commit log. Partitions, consumer groups, offsets, retention.', why: 'When you need millions of events/second or want to replay history, Kafka is the answer.' },
            { name: 'At-Least-Once vs Exactly-Once', level: 'advanced', desc: 'Message delivery guarantees and their real-world tradeoffs.', why: 'Exactly-once is nearly impossible in distributed systems. Design idempotent consumers that handle duplicates safely.' },
        ]
    },
    {
        id: 'rp7', num: 'Phase 07', title: 'The Skeleton — Infrastructure', timeline: 'Week 8–12', concepts: [
            { name: 'Docker & Containers', level: 'basic', desc: 'Packaging app + runtime + dependencies together. Image vs container.', why: 'Containers are the universal unit of deployment. \'Works on my machine\' is solved by making the machine part of the package.' },
            { name: 'Docker Compose', level: 'basic', desc: 'Running multi-container environments locally with one command.', why: 'Your app + Postgres + Redis running locally with one command, isolated from your host system.' },
            { name: 'Linux Command Line Basics', level: 'basic', desc: 'File system, permissions, ps, top, netstat, grep, curl, ssh.', why: 'Production runs on Linux. When your server is unhealthy, you SSH in and use these commands. There\'s no GUI to save you.' },
            { name: 'Nginx & Reverse Proxy', level: 'medium', desc: 'Sitting in front of your app — routing, SSL termination, static files.', why: 'Nginx handles TLS, serves static assets without hitting your app, and routes to multiple upstream services.' },
            { name: 'CI/CD Pipelines', level: 'medium', desc: 'Automated test, lint, build, deploy on every git push.', why: 'Manual deployments are how bugs reach production. CI enforces quality gates before merging.' },
            { name: 'Kubernetes Concepts', level: 'advanced', desc: 'Container orchestration. Pods, deployments, services, ingress, HPA.', why: 'At scale, managing 50 containers manually is impossible. K8s automates scheduling, self-healing, rolling deploys, and auto-scaling.' },
            { name: 'Infrastructure as Code', level: 'advanced', desc: 'Terraform/Pulumi — infra defined in version-controlled files.', why: 'Clicking around cloud consoles is manual, error-prone, and not reproducible. IaC means your infrastructure is auditable and disaster-recoverable.' },
        ]
    },
    {
        id: 'rp8', num: 'Phase 08', title: 'The Blood — Databases Deep', timeline: 'Week 8–14', concepts: [
            { name: 'ACID Properties', level: 'basic', desc: 'Atomicity, Consistency, Isolation, Durability — what they guarantee.', why: 'These are the promises a relational database makes to you. Without ACID, you can\'t safely handle money, inventory, or any state where partial writes are catastrophic.' },
            { name: 'Database Transactions', level: 'basic', desc: 'BEGIN, COMMIT, ROLLBACK. Grouping operations atomically.', why: 'Transfer money: debit account A, credit account B. If the credit fails, the debit must roll back. Transactions make this safe.' },
            { name: 'Isolation Levels', level: 'medium', desc: 'Read uncommitted, read committed, repeatable read, serializable.', why: 'Different isolation levels trade consistency for performance. Choosing the wrong level causes subtle data corruption bugs.' },
            { name: 'CAP Theorem', level: 'medium', desc: 'Consistency, Availability, Partition tolerance — you can only guarantee two.', why: 'Every distributed database makes this tradeoff explicitly. Understanding CAP explains why MongoDB, Cassandra, and Postgres make different choices.' },
            { name: 'Read Replicas', level: 'medium', desc: 'Secondary copies of your DB serving read traffic. Replication lag.', why: 'Your primary handles writes. At scale, reads overwhelm it. Replicas distribute read load.' },
            { name: 'NoSQL Tradeoffs', level: 'medium', desc: 'Document, key-value, wide-column, graph — when each fits vs SQL.', why: 'MongoDB isn\'t better than Postgres — it\'s different. Understanding tradeoffs means you pick the right tool.' },
            { name: 'Database Sharding', level: 'advanced', desc: 'Horizontal partitioning across multiple DB instances. Shard keys, hotspots.', why: 'When one machine can\'t hold all your data. Sharding adds enormous operational complexity.' },
        ]
    },
    {
        id: 'rp9', num: 'Phase 09', title: 'The Immune System II — Security', timeline: 'Week 10–14', concepts: [
            { name: 'OWASP Top 10', level: 'basic', desc: 'SQL injection, XSS, broken auth, IDOR, security misconfiguration.', why: 'These are the attacks that actually hit real systems. Every developer must know them. Ignorance here is negligence to your users.' },
            { name: 'Authentication vs Authorization', level: 'basic', desc: 'Who are you (authn) vs what can you do (authz). Always separate concerns.', why: 'Conflating these creates security holes. Auth answers identity. Authz answers permissions.' },
            { name: 'Input Validation & Sanitization', level: 'basic', desc: 'Never trust user input. Validate type, length, format, range.', why: 'SQL injection, XSS, buffer overflows — all stem from trusting user input. Non-negotiable.' },
            { name: 'TLS & HTTPS', level: 'basic', desc: 'Encrypting data in transit. Certificates, TLS handshake, HSTS.', why: 'Plain HTTP in production means anyone on the network can read your users\' data.' },
            { name: 'JWT & Session Auth', level: 'basic', desc: 'Stateless tokens vs server-side sessions. Signing, expiry, refresh tokens.', why: 'JWTs are stateless and scalable but can\'t be revoked easily. Sessions are revocable but need shared storage.' },
            { name: 'Rate Limiting', level: 'medium', desc: 'Limiting requests per IP/user/key. Sliding window, token bucket algorithms.', why: 'Without rate limiting, one bad actor takes down your API for everyone.' },
            { name: 'Secrets Management', level: 'medium', desc: 'Vault, AWS Secrets Manager — centralized, rotatable, audited secrets.', why: 'Secrets in .env files get committed. Secrets hardcoded get leaked. Production secrets need rotation and revocation.' },
        ]
    },
    {
        id: 'rp10', num: 'Phase 10', title: 'The Full Body — Scale Architecture', timeline: 'Month 4–6', concepts: [
            { name: 'Horizontal vs Vertical Scaling', level: 'basic', desc: 'More machines (horizontal) vs bigger machine (vertical). When each applies.', why: 'Vertical scaling has a hard ceiling. Horizontal scales indefinitely but requires stateless service design.' },
            { name: 'Load Balancing', level: 'medium', desc: 'Distributing traffic across instances. Round-robin, least-connections, consistent hash.', why: 'Load balancers let you scale horizontally and enable zero-downtime deployments via rolling updates.' },
            { name: 'Stateless Service Design', level: 'medium', desc: 'Each request is self-contained. No server-side state between requests.', why: 'Stateful services can only run as one instance. Statelessness is the prerequisite to horizontal scale.' },
            { name: 'API Gateway Pattern', level: 'medium', desc: 'Single entry point. Auth, rate limiting, routing, request transformation.', why: 'A gateway centralizes cross-cutting concerns and gives you one place to enforce policies.' },
            { name: 'Microservices vs Monolith', level: 'medium', desc: 'When to split, when to stay together. Conway\'s Law. The distribution tax.', why: 'Microservices solve team autonomy problems, not software problems. Most startups should start monolithic.' },
            { name: 'Consistent Hashing', level: 'advanced', desc: 'Distributing keys across nodes with minimal reshuffling when topology changes.', why: 'Used in every distributed cache and database. When a node joins or leaves, consistent hashing minimizes how much data needs to move.' },
            { name: 'CQRS', level: 'advanced', desc: 'Command Query Responsibility Segregation — separate read and write models.', why: 'When reads and writes have fundamentally different scaling needs, CQRS lets you optimize each independently.' },
            { name: 'Saga Pattern', level: 'advanced', desc: 'Distributed transactions via compensating actions. Choreography vs orchestration.', why: 'The practical alternative to 2PC for distributed transactions. Each step has an undo operation.' },
            { name: 'Event Sourcing', level: 'advanced', desc: 'State as a sequence of events, not current values. Full audit trail.', why: 'Complete history, time travel, replay. Complex but powerful wherever history matters.' },
            { name: 'Service Discovery', level: 'advanced', desc: 'How services find each other dynamically when IPs change. Consul, K8s DNS.', why: 'In Kubernetes, pod IPs change on every restart. Service discovery lets services find each other by name.' },
        ]
    },
];

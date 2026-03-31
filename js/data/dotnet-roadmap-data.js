/* js/data/dotnet-roadmap-data.js — .NET Roadmap phases data */

const roadmapPhases = [
    {
        id: 'rp1', num: 'Phase 01', title: 'The Core — C# & The Ecosystem', timeline: 'Week 1-3', concepts: [
            { name: 'C#  Features', level: 'basic', desc: 'Pattern matching, records, top-level statements, and modern C# constructs.', why: 'Modern C# is drastically different from C# 5. Knowing how to write concise, functional-first C# separates modern developers from legacy maintainers.' },
            { name: '.NET 9 vs Legacy', level: 'basic', desc: 'Understanding the unified .NET ecosystem versus legacy .NET Framework 4.8.', why: 'You will encounter legacy codebases. Understanding the migration paths and runtime differences is critical for enterprise modernization.' },
            { name: 'dotnet CLI & NuGet', level: 'basic', desc: 'Command-line scaffolding, building, publishing, and dependency management.', why: 'Visual Studio abstracts this, but CI/CD runs on the CLI. You must know how your code is built and packaged under the hood.' }
        ]
    },
    {
        id: 'rp2', num: 'Phase 02', title: 'Engineering Principles — General Dev Skills', timeline: 'Week 3-6', concepts: [
            { name: 'Version Control (Git)', level: 'basic', desc: 'Branching strategies, rebasing, committing, and resolving deep conflicts.', why: 'Git is how teams collaborate. A developer who breaks the git history is a liability, no matter how good their code is.' },
            { name: 'SOLID, DRY, KISS, YAGNI', level: 'medium', desc: 'The fundamental heuristics of object-oriented design and clean code.', why: 'Code is read 10x more than it is written. Applying these principles ensures your codebase survives longer than 6 months.' },
            { name: 'Design Patterns & Architectures', level: 'medium', desc: 'Creational, structural, and behavioral patterns. Layered, Clean, and Microservices architectures.', why: 'Patterns give you a vocabulary to discuss complex designs with your team. "Let\'s use a Factory here" replaces 10 minutes of explanation.' },
            { name: 'Data Structures & Algorithms', level: 'medium', desc: 'Arrays, hashes, trees, graphs, and algorithmic complexity (Big O).', why: 'Even high-level languages rely on efficient data access. Using a List when a HashSet is needed will crash a production app under load.' }
        ]
    },
    {
        id: 'rp3', num: 'Phase 03', title: 'The Web Layer — ASP.NET Core', timeline: 'Week 6-10', concepts: [
            { name: 'Web APIs & Minimal APIs', level: 'medium', desc: 'Building high-performance HTTP endpoints using controllers or the modern minimal API pattern.', why: 'ASP.NET Core is the fastest mainstream web framework. Knowing when to use MVC vs Minimal APIs optimizes both developer speed and runtime performance.' },
            { name: 'Middlewares & Pipeline', level: 'medium', desc: 'The request delegate pipeline. Short-circuiting, branching, and custom middleware.', why: 'Every request passes through the pipeline. If you want to log, authenticate, or compress requests globally, you do it here.' },
            { name: 'Dependency Injection (DI)', level: 'medium', desc: 'Transient, Scoped, and Singleton lifetimes. Resolving dependencies.', why: 'ASP.NET Core is built entirely around DI. If you misunderstand Scoped vs Singleton, you will introduce memory leaks or cross-request data corruption.' },
            { name: 'Authentication & Authorization', level: 'advanced', desc: 'OAuth 2.0, OIDC, JWT tokens, IdentityServer, and ASP.NET Core Identity.', why: 'Security is non-negotiable. You must understand token lifecycles to protect your API endpoints from malicious actors.' },
            { name: 'Filters & Attributes', level: 'advanced', desc: 'Action filters, exception filters, model validation, and cross-cutting concerns.', why: 'Filters let you execute code before or after an endpoint runs, perfectly abstracting away repetitive validation logic.' }
        ]
    },
    {
        id: 'rp4', num: 'Phase 04', title: 'The Frontend Integration — Client-side .NET', timeline: 'Month 3', concepts: [
            { name: 'Blazor (Server & WebAssembly)', level: 'medium', desc: 'Building interactive client-side web UI with .NET/C# instead of JavaScript.', why: 'For enterprise internal tools, Blazor allows C# teams to ship full-stack applications with incredible velocity.' },
            { name: 'Razor Pages & MVC View', level: 'medium', desc: 'Server-side rendered HTML generation.', why: 'Not every app needs a complex SPA. Razor is perfect for SEO-heavy, content-driven, or admin portal applications.' },
            { name: '.NET MAUI, WPF, WinForms', level: 'basic', desc: 'Cross-platform and legacy Windows native desktop development.', why: 'Many legacy enterprise systems run on WPF/WinForms. MAUI represents the future of C# mobile and desktop apps.' }
        ]
    },
    {
        id: 'rp5', num: 'Phase 05', title: 'Data Persistence — Databases', timeline: 'Month 3-4', concepts: [
            { name: 'Relational DBs (Postgres, SQL Server)', level: 'medium', desc: 'ACID transactions, normalization, indexing, and Azure SQL.', why: 'SQL Server is deeply integrated into the .NET ecosystem, but Postgres is increasingly the open-source target of choice.' },
            { name: 'NoSQL (MongoDB, Cosmos DB)', level: 'medium', desc: 'Document and wide-column databases. Schema-less design, partitioning.', why: 'When scaling horizontally or storing unstructured JSON, NoSQL databases like Azure Cosmos DB offer incredible scale and global distribution.' },
            { name: 'Database Design & SQL Syntax', level: 'medium', desc: 'Designing schemas, writing raw JOINs, EXPLAIN plans, and Stored Procedures.', why: 'ORMs abstract the database, but when a query takes 4 seconds, you must know how to drop into raw SQL and analyze the execution plan.' }
        ]
    },
    {
        id: 'rp6', num: 'Phase 06', title: 'Data Access — ORMs', timeline: 'Month 4', concepts: [
            { name: 'Entity Framework Core', level: 'medium', desc: 'Code First migrations, DbContext, Tracking API, and the difference between Lazy vs Eager loading.', why: 'EF Core is the undisputed primary ORM for .NET. Understanding its Change Tracker and exactly how it translates LINQ to SQL is critical.' },
            { name: 'LINQ', level: 'basic', desc: 'Language Integrated Query. Filtering, projecting, and grouping data in memory and to SQL.', why: 'LINQ is C#\'s superpower. It provides a unified, readable syntax for querying any data source.' },
            { name: 'Dapper', level: 'advanced', desc: 'A micro-ORM built by StackOverflow for maximum raw query performance.', why: 'EF Core is fast, but Dapper is nearly as fast as ADO.NET. Reaching for Dapper in your hottest paths is a senior optimization move.' }
        ]
    },
    {
        id: 'rp7', num: 'Phase 07', title: 'Quality Assurance — Testing', timeline: 'Month 5', concepts: [
            { name: 'Unit Testing (xUnit, NUnit, MSTest)', level: 'medium', desc: 'Testing isolated code chunks. xUnit is the modern standard.', why: 'Unit tests prove your business logic works. Without them, refactoring is gambling.' },
            { name: 'Mocking (NSubstitute, Moq)', level: 'medium', desc: 'Faking dependencies (like a database or an API) during isolated tests.', why: 'You cannot write fast, deterministic unit tests if they actually hit the network.' },
            { name: 'Integration & API Testing', level: 'advanced', desc: 'Using WebApplicationFactory to spin up an in-memory test server.', why: 'This proves the entire pipeline (Routing -> Middleware -> Controller -> DB) works together.' },
            { name: 'Test Data Generators (Bogus, AutoFixture)', level: 'advanced', desc: 'Generating thousands of realistic fake records for testing.', why: 'Writing dummy data manually takes ages. Generators make your tests resilient to edge cases.' },
            { name: 'E2E & Performance (Playwright, K6)', level: 'expert', desc: 'Driving browsers programmatically and simulating 10,000 concurrent users.', why: 'Performance tests find the breaking point of your app before your customers do.' }
        ]
    },
    {
        id: 'rp8', num: 'Phase 08', title: 'The Nervous System — Logging', timeline: 'Month 5', concepts: [
            { name: 'Microsoft.Extensions.Logging', level: 'basic', desc: 'The built-in logging abstraction provided natively by .NET.', why: 'The standard DI-injected ILogger interface ensures your code is decoupled from the actual logging provider.' },
            { name: 'Serilog', level: 'medium', desc: 'The dominant structured logging provider for .NET.', why: 'Writing raw strings to a file is dead. Serilog writes rich JSON logs, allowing you to filter by specific users or HTTP methods in production.' }
        ]
    },
    {
        id: 'rp9', num: 'Phase 09', title: 'Connections — Communication', timeline: 'Month 6', concepts: [
            { name: 'Synchronous (HTTP Client, gRPC)', level: 'medium', desc: 'Directly calling other services via REST or high-performance gRPC binary protocols.', why: 'Knowing how to correctly instantiate HttpClient using HttpClientFactory prevents socket exhaustion.' },
            { name: 'Real-time (SignalR Core, Web Sockets)', level: 'advanced', desc: 'Pushing messages directly to connected clients from the server.', why: 'Dashboards, chat apps, and live notifications require bi-directional connections. SignalR abstracts the heavy lifting of WebSockets.' },
            { name: 'Asynchronous (Message Brokers)', level: 'advanced', desc: 'MassTransit, RabbitMQ, Azure Service Bus, Apache Kafka.', why: 'For microservices, direct HTTP calls cause cascading failures. Throwing an event onto a bus decouples services and guarantees delivery.' }
        ]
    },
    {
        id: 'rp10', num: 'Phase 10', title: 'Out of Band — Background Tasks', timeline: 'Month 6', concepts: [
            { name: 'Native Background Service', level: 'medium', desc: 'IHostedService and BackgroundService natively in ASP.NET Core.', why: 'Running a lightweight background thread inside your web host is perfect for simple polling operations.' },
            { name: 'HangFire & Quartz.NET', level: 'advanced', desc: 'Distributed, persistent background job scheduling with a UI dashboard.', why: 'When you must guarantee a job runs (even if the server crashes mid-execution) or support millions of retries, you need a persisted job queue.' }
        ]
    },
    {
        id: 'rp11', num: 'Phase 11', title: 'Speed — Caching', timeline: 'Month 7', concepts: [
            { name: 'Memory Cache & Output Cache', level: 'medium', desc: 'Caching objects in-process memory or caching HTTP response outputs locally.', why: 'The cheapest query is the one you never make. IMemoryCache drastically speeds up local, highly-accessed data.' },
            { name: 'Distributed Caching (Redis)', level: 'advanced', desc: 'Sharing cache state across an entire cluster of web servers using IDistributedCache.', why: 'When your app scales horizontally to 5 web servers, local memory cache immediately goes out of sync. You need a distributed cache like Redis.' }
        ]
    },
    {
        id: 'rp12', num: 'Phase 12', title: 'The Dashboard — Observability', timeline: 'Month 7', concepts: [
            { name: 'Telemetry (OpenTelemetry, Jaeger)', level: 'expert', desc: 'Distributed tracing standards across your entire stack.', why: 'When a request touches 4 microservices, OpenTelemetry allows you to trace exactly which hop took 900ms.' },
            { name: 'Monitoring (Grafana, Datadog)', level: 'expert', desc: 'Collecting metrics (CPU, Memory, Request limits) and visualizing them.', why: 'You cannot fix what you cannot see. Centralized monitoring is the only way to prove system health.' }
        ]
    },
    {
        id: 'rp13', num: 'Phase 13', title: 'Portability — Containerization', timeline: 'Month 8', concepts: [
            { name: 'Docker / Azure Container Registry', level: 'advanced', desc: 'Creating Dockerfiles to package .NET applications, deploying images to ACR.', why: 'Containers are the universal deployment format. Knowing how to write a minimal, secure Dockerfile for your API is required.' },
            { name: 'Orchestration (Kubernetes, Helm)', level: 'expert', desc: 'Managing clusters of containers, handling routing, and scaling automatically.', why: 'K8s is the OS of the cloud. It restarts dead containers, routes traffic, and handles rolling deployments without downtime.' }
        ]
    },
    {
        id: 'rp14', num: 'Phase 14', title: 'The Sky — Cloud', timeline: 'Month 8', concepts: [
            { name: 'Azure & AWS Foundations', level: 'advanced', desc: 'App Services, Lambda/Functions, Blob Storage, and networking.', why: 'Deploying code to the cloud is fundamentally different than on-premise. You must embrace managed services like PaaS.' },
            { name: '.NET Aspire', level: 'expert', desc: 'The new cloud-ready stack for building observable, production-ready distributed applications in .NET.', why: 'Aspire radically simplifies local development and cloud deployment of multi-project microservices.' }
        ]
    },
    {
        id: 'rp15', num: 'Phase 15', title: 'Automation — CI / CD', timeline: 'Month 9', concepts: [
            { name: 'GitHub Actions & Azure Pipelines', level: 'advanced', desc: 'Writing YAML pipelines to build, test, and automatically deploy code.', why: 'If deployment relies on a human copying a DLL to a server, you have a massive vulnerability and zero rollback capability.' }
        ]
    },
    {
        id: 'rp16', num: 'Phase 16', title: 'The Future — AI & Machine Learning', timeline: 'Month 10', concepts: [
            { name: 'Working with LLMs (Azure AI, OpenAI)', level: 'expert', desc: 'Integrating Large Language Models into your .NET applications natively via APIs.', why: 'AI is shifting from a novelty to a strict requirement in business software. Knowing how to chain prompts and call OpenAI APIs is a superpower.' },
            { name: '.NET AI Libraries (Semantic Kernel, ML.NET)', level: 'expert', desc: 'Microsoft\'s frameworks for RAG implementations and training custom models.', why: 'Semantic Kernel acts as the orchestration layer between your C# code and LLM models, similar to LangChain but typed and integrated for .NET.' }
        ]
    },
    {
        id: 'rp17', num: 'Phase 17', title: 'The Ecosystem — Essential Libraries', timeline: 'Ongoing', concepts: [
            { name: 'MediatR & CQRS Patterns', level: 'advanced', desc: 'Decoupling controllers from handlers via an in-process message bus.', why: 'Forces you to write independent use cases, radically cleaning up "fat controllers" into isolated, highly testable logic classes.' },
            { name: 'Polly', level: 'expert', desc: 'The resilience and transient-fault-handling library. Circuit breakers, retries, and fallbacks.', why: 'The network will fail. Polly guarantees your app gracefully retries an HTTP call or fails over when the database blinks offline.' },
            { name: 'FluentValidation', level: 'medium', desc: 'Strongly-typed validation rules decoupled from your domain models.', why: 'Using standard DataAnnotations pollutes your clean entities. FluentValidation keeps constraints fully separated.' }
        ]
    }
];


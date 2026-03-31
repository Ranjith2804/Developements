/* js/data/dotnet-map-data.js — .NET Knowledge Map sections
   Ported from map_view React app (SectionCard UI) */

const dotnetMapSections = [

    // ── 1. C# ─────────────────────────────────────────────────────────────────
    {
        id: 'csharp', number: 1, label: 'C#', color: '#18b6b1', iconName: 'braces',
        subsections: [
            {
                id: 'csharp-basics', label: 'Basics of C#',
                topics: [
                    { id: 'b1', label: 'Classes', status: 'must-know' },
                    { id: 'b2', label: 'Operators', status: 'must-know' },
                    { id: 'b3', label: 'Collections', status: 'must-know' },
                    { id: 'b4', label: 'Access modifiers', status: 'must-know' },
                    { id: 'b5', label: 'Assemblies', status: 'must-know' },
                    { id: 'b6', label: 'Boxing / Unboxing', status: 'nice-to-know' },
                    { id: 'b7', label: 'Virtual keyword', status: 'must-know' },
                    { id: 'b8', label: 'Parameter types', status: 'must-know' },
                    { id: 'b9', label: 'Arrays', status: 'must-know' },
                    { id: 'b10', label: 'Generics', status: 'must-know' },
                    { id: 'b11', label: 'Interfaces', status: 'must-know' },
                    { id: 'b12', label: 'Async / await', status: 'must-know' },
                    { id: 'b13', label: 'Using keyword', status: 'must-know' },
                    { id: 'b14', label: 'Casting', status: 'nice-to-know' },
                    { id: 'b15', label: 'Delegates / Events', status: 'must-know' },
                    { id: 'b16', label: 'out keyword', status: 'must-know' },
                    { id: 'b17', label: 'Strings', status: 'must-know' },
                    { id: 'b18', label: 'Reference and value types', status: 'must-know' },
                    { id: 'b19', label: 'Statements and expressions', status: 'must-know' },
                ]
            },
            {
                id: 'csharp-net9', label: '.NET 9',
                topics: [
                    { id: 'n1', label: 'File I/O', status: 'must-know' },
                    { id: 'n2', label: 'Networking', status: 'must-know' },
                    { id: 'n3', label: 'Security', status: 'must-know' },
                    { id: 'n4', label: 'Collections', status: 'must-know' },
                    { id: 'n5', label: 'Multithreading', status: 'must-know' },
                    { id: 'n6', label: 'Cryptography', status: 'nice-to-know' },
                    { id: 'n7', label: 'Exceptions', status: 'must-know' },
                    { id: 'n8', label: 'Channels', status: 'must-know' },
                ]
            },
            {
                id: 'csharp-framework', label: '.NET Framework 4.8',
                topics: [
                    { id: 'fw1', label: 'WinForms', status: 'nice-to-know' },
                    { id: 'fw2', label: 'WCF', status: 'nice-to-know' },
                    { id: 'fw3', label: 'ADO.NET', status: 'nice-to-know' },
                    { id: 'fw4', label: 'App.config', status: 'nice-to-know' },
                    { id: 'fw5', label: 'Web Forms', status: 'nice-to-know' },
                    { id: 'fw6', label: 'ASMX Web Services', status: 'nice-to-know' },
                ]
            },
            {
                id: 'csharp-cli', label: 'dotnet CLI',
                topics: [
                    { id: 'cli1', label: 'dotnet new', status: 'must-know' },
                    { id: 'cli2', label: 'dotnet run', status: 'must-know' },
                    { id: 'cli3', label: 'dotnet build', status: 'must-know' },
                    { id: 'cli4', label: 'dotnet test', status: 'must-know' },
                    { id: 'cli5', label: 'dotnet publish', status: 'must-know' },
                    { id: 'cli6', label: 'dotnet restore', status: 'must-know' },
                    { id: 'cli7', label: 'dotnet tool', status: 'nice-to-know' },
                    { id: 'cli8', label: 'dotnet watch', status: 'nice-to-know' },
                ]
            },
            {
                id: 'csharp-nuget', label: 'NuGet',
                topics: [
                    { id: 'nu1', label: 'Package install / restore', status: 'must-know' },
                    { id: 'nu2', label: 'NuGet.config', status: 'must-know' },
                    { id: 'nu3', label: 'Package versioning', status: 'must-know' },
                    { id: 'nu4', label: 'Private feeds', status: 'nice-to-know' },
                    { id: 'nu5', label: 'Creating packages', status: 'nice-to-know' },
                    { id: 'nu6', label: 'dotnet pack', status: 'nice-to-know' },
                ]
            },
        ]
    },

    // ── 2. General Development Skills ────────────────────────────────────────
    {
        id: 'general', number: 2, label: 'General Development Skills', color: '#8b7a63', iconName: 'blocks',
        subsections: [
            { id: 'gen-git', label: 'Git', topics: [] },
            { id: 'gen-ds', label: 'Data Structures & Algorithms', topics: [] },
            { id: 'gen-patterns', label: 'Design Patterns', topics: [] },
            { id: 'gen-solid', label: 'SOLID & Clean Code', topics: [] },
            { id: 'gen-arch', label: 'Architecture Patterns', topics: [] },
        ]
    },

    // ── 3. ASP.NET Core ───────────────────────────────────────────────────────
    {
        id: 'aspnet', number: 3, label: 'ASP.NET Core', color: '#d17a6f', iconName: 'server-cog',
        subsections: [
            { id: 'asp-basics', label: 'Web Basics & MVC', topics: [] },
            { id: 'asp-webapi', label: 'Web APIs', topics: [] },
            { id: 'asp-minimal', label: 'Minimal APIs', topics: [] },
            { id: 'asp-auth', label: 'Authentication & Authorization', topics: [] },
            { id: 'asp-middleware', label: 'Middlewares', topics: [] },
            { id: 'asp-di', label: 'Dependency Injection', topics: [] },
        ]
    },

    // ── 4. Client-side .NET ───────────────────────────────────────────────────
    {
        id: 'client', number: 4, label: 'Client-side .NET', color: '#ec5b68', iconName: 'monitor-smartphone',
        subsections: [
            { id: 'client-blazor', label: 'Blazor', topics: [] },
            { id: 'client-maui', label: '.NET MAUI', topics: [] },
            { id: 'client-wpf', label: 'WPF', topics: [] },
            { id: 'client-winforms', label: 'WinForms', topics: [] },
        ]
    },

    // ── 5. Databases ──────────────────────────────────────────────────────────
    {
        id: 'db', number: 5, label: 'Databases', color: '#f39b4d', iconName: 'database',
        subsections: [
            { id: 'db-design', label: 'Database Design', topics: [] },
            { id: 'db-sql', label: 'SQL Syntax', topics: [] },
            { id: 'db-stored', label: 'Stored Procedures', topics: [] },
            { id: 'db-nosql', label: 'NoSQL', topics: [] },
        ]
    },

    // ── 6. ORM ────────────────────────────────────────────────────────────────
    {
        id: 'orm', number: 6, label: 'ORM', color: '#f0bf32', iconName: 'table-2',
        subsections: [
            { id: 'orm-ef', label: 'Entity Framework Core', topics: [] },
            { id: 'orm-dapper', label: 'Dapper', topics: [] },
            { id: 'orm-linq', label: 'LINQ', topics: [] },
        ]
    },

    // ── 7. Testing ────────────────────────────────────────────────────────────
    {
        id: 'testing', number: 7, label: 'Testing', color: '#6074ff', iconName: 'flask-conical',
        subsections: [
            { id: 'test-unit', label: 'Unit Testing', topics: [] },
            { id: 'test-integration', label: 'Integration Testing', topics: [] },
            { id: 'test-snapshot', label: 'Snapshot Testing', topics: [] },
            { id: 'test-e2e', label: 'End-to-End Testing', topics: [] },
            { id: 'test-perf', label: 'Performance Testing', topics: [] },
        ]
    },

    // ── 8. Logging ────────────────────────────────────────────────────────────
    {
        id: 'logging', number: 8, label: 'Logging', color: '#7b3ff2', iconName: 'scroll-text',
        subsections: [
            { id: 'log-ms', label: 'Microsoft Extensions Logging', topics: [] },
            { id: 'log-serilog', label: 'Serilog', topics: [] },
            { id: 'log-nlog', label: 'NLog', topics: [] },
        ]
    },

    // ── 9. Communication ─────────────────────────────────────────────────────
    {
        id: 'communication', number: 9, label: 'Communication', color: '#d65cf3', iconName: 'plug-zap',
        subsections: [
            { id: 'comm-realtime', label: 'Real-time (SignalR)', topics: [] },
            { id: 'comm-sync', label: 'Synchronous (HTTP Client)', topics: [] },
            { id: 'comm-async', label: 'Async / Message Brokers', topics: [] },
        ]
    },

    // ── 10. Background Tasks ─────────────────────────────────────────────────
    {
        id: 'background', number: 10, label: 'Background Tasks', color: '#7b5cf0', iconName: 'clock-3',
        subsections: [
            { id: 'bg-native', label: 'Native Background Service', topics: [] },
            { id: 'bg-hangfire', label: 'HangFire', topics: [] },
            { id: 'bg-quartz', label: 'Quartz', topics: [] },
        ]
    },

    // ── 11. Caching ───────────────────────────────────────────────────────────
    {
        id: 'caching', number: 11, label: 'Caching', color: '#52a9df', iconName: 'boxes',
        subsections: [
            { id: 'cache-memory', label: 'Memory Cache', topics: [] },
            { id: 'cache-hybrid', label: 'Hybrid Cache', topics: [] },
            { id: 'cache-redis', label: 'Redis', topics: [] },
            { id: 'cache-appLevel', label: 'Application-level', topics: [] },
        ]
    },

    // ── 12. Observability ────────────────────────────────────────────────────
    {
        id: 'observability', number: 12, label: 'Observability', color: '#5f7288', iconName: 'activity',
        subsections: [
            { id: 'obs-monitoring', label: 'Monitoring', topics: [] },
            { id: 'obs-telemetry', label: 'Telemetry', topics: [] },
            { id: 'obs-opentel', label: 'OpenTelemetry', topics: [] },
        ]
    },

    // ── 13. Containerization ─────────────────────────────────────────────────
    {
        id: 'containers', number: 13, label: 'Containerization', color: '#2ea87b', iconName: 'boxes',
        subsections: [
            { id: 'cont-docker', label: 'Docker', topics: [] },
            { id: 'cont-compose', label: 'Docker Compose', topics: [] },
            { id: 'cont-k8s', label: 'Kubernetes', topics: [] },
            { id: 'cont-helm', label: 'Helm', topics: [] },
        ]
    },

    // ── 14. Cloud ─────────────────────────────────────────────────────────────
    {
        id: 'cloud', number: 14, label: 'Cloud', color: '#5b9bd5', iconName: 'cloud',
        subsections: [
            { id: 'cloud-azure', label: 'Azure', topics: [] },
            { id: 'cloud-aws', label: 'AWS', topics: [] },
            { id: 'cloud-gcp', label: 'Google Cloud', topics: [] },
            { id: 'cloud-aspire', label: '.NET Aspire', topics: [] },
        ]
    },

    // ── 15. CI/CD ─────────────────────────────────────────────────────────────
    {
        id: 'cicd', number: 15, label: 'CI / CD', color: '#9b7e69', iconName: 'git-branch-plus',
        subsections: [
            { id: 'cicd-github', label: 'GitHub Actions', topics: [] },
            { id: 'cicd-azure', label: 'Azure Pipelines', topics: [] },
            { id: 'cicd-gitlab', label: 'GitLab CI', topics: [] },
            { id: 'cicd-jenkins', label: 'Jenkins', topics: [] },
        ]
    },

    // ── 16. AI & Machine Learning ─────────────────────────────────────────────
    {
        id: 'ai', number: 16, label: 'AI & Machine Learning', color: '#9e6d54', iconName: 'bot',
        subsections: [
            { id: 'ai-basics', label: 'ML Basics', topics: [] },
            { id: 'ai-mlnet', label: 'ML.NET', topics: [] },
            { id: 'ai-llm', label: 'Working with LLMs', topics: [] },
            { id: 'ai-semantic', label: 'Semantic Kernel', topics: [] },
        ]
    },

    // ── 17. .NET Libraries ────────────────────────────────────────────────────
    {
        id: 'libraries', number: 17, label: '.NET Libraries', color: '#f28b32', iconName: 'book-open',
        subsections: [
            { id: 'lib-mediatr', label: 'MediatR', topics: [] },
            { id: 'lib-polly', label: 'Polly', topics: [] },
            { id: 'lib-fluent', label: 'FluentValidation', topics: [] },
            { id: 'lib-mapster', label: 'Mapster', topics: [] },
            { id: 'lib-benchmark', label: 'Benchmark.NET', topics: [] },
            { id: 'lib-refit', label: 'Refit', topics: [] },
        ]
    },
];

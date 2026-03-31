# Design Settings for Stitch (.NET Roadmap App)

Copy these exact specifications directly into your design tool / Stitch to generate the perfectly matched `.NET Roadmap` screen.

## 1. Global System Tokens

### Dark Mode (Primary Focus)
* **Mode**: `Dark`
* **Primary Color**: `#E8FF47` (Neon Yellow-Green)
* **Saturation Level**: `Vibrant`
* **Corner Roundness**: `Medium` (10px)
* **Font Family**: `Inter` (closest match to JetBrains/Syne)
* **Background Color**: `#09090E`
* **Card Surface**: `#0F0F18`
* **Hover Surface**: `#18182A`
* **Border Color**: `#1C1C2E`
* **Main Text**: `#E8E8F2`
* **Secondary Text**: `#B8B8D0`

### Light Mode (Secondary Variant)
* **Mode**: `Light`
* **Primary Color**: `#8A6F00` (Dark Gold)
* **Saturation Level**: `Muted`
* **Corner Roundness**: `Medium` (10px)
* **Font Family**: `Inter`
* **Background Color**: `#F7F6F2`
* **Card Surface**: `#FFFFFF`
* **Hover Surface**: `#EBE8E0`
* **Border Color**: `#DDD9CC`

---

## 2. Topic Level Colors
Use these specific marker colors to denote difficulty/levels on the roadmap:
* **Foundation (Basic)**: `#47FFB2` (Mint Green)
* **Core (Medium)**: `#47C4FF` (Sky Blue)
* **Advanced**: `#FF6B47` (Coral Orange)
* **Expert**: `#E8FF47` (Neon Yellow-Green)

---

## 3. Stitch Prompt to Copy & Paste

```text
Design the ".NET Developer Roadmap 2025" application interface. This is a technical learning platform for backend engineers. It must perfectly match an existing premium dark-mode design language.

LAYOUT STRUCTURE:
1. FIXED LEFT SIDEBAR (Width: 240px):
   - A search bar: "Search topics..." with subtle borders (#1c1c2e).
   - A View Switcher toggle group: [ Roadmap (Active/Neon Green) | Knowledge Map ]
   - Navigation Menu under "Topics" (Small uppercase headings):
     - Section Label: "C# & Core"
     - Items: "01 C#", "02 General Dev Skills"
     - Section Label: "Web Frameworks"
     - Items: "03 ASP.NET Core", "04 Client-side .NET"
     - Section Label: "Data & Scaling"
     - Items: "05 Databases", "06 ORM", "07 Testing", "08 Logging"

2. MAIN CONTENT AREA (Right of sidebar):
   - A top progress bar (thin horizontal line #E8FF47 at the very top edge).
   - "Theme Toggle" button (Moon/Sun icon) in the top right corner.
   - Header Section: 
     - Eyebrow text (monospace): "// .NET-Roadmap · v2025"
     - H1 Title: ".NET Developer Roadmap 2025" (Make ".NET" the accent color).
     - Subtitle paragraph explaining the journey from C# basics to advanced Microservices and AI integration.
     - Stats Row: "17 Topics" | "Foundation" | "Core / Medium" | "Advanced"

3. ROADMAP VISUALIZATION (Main content body):
   - A top Legend and Filter bar with rounded pill buttons: [ All (Active) ] [ Basic ] [ Medium ] [ Advanced ]
   - A vertical timeline or grid of "Concept Cards" representing the roadmap steps based on the reference:
     - Card 1: "1. C#" (Basic level marker, #47FFB2 color line). Tags: Basics, .NET 9, dotnet CLI, NuGet.
     - Card 2: "2. General development skills" (Medium level marker, #47C4FF). Tags: Git, Algorithms, SOLID, Design Patterns.
     - Card 3: "3. ASP.NET Core" (Advanced level marker, #FF6B47). Tags: MVC, Web APIs, Middlewares, Dependency Injection.
     - Card 4: "5. Databases" (Level marker). Tags: Relational (Postgres, SQL Server), NoSQL (MongoDB, Redis).

VISUAL STYLE & THEME (CRITICAL):
- Background: Very dark (#09090E) with a subtle grid pattern overlay (size 40x40px).
- Atmospheric Glow: Include a very soft, blurry radial glow effect in the background behind the header using the primary accent color.
- Cards: Solid dark surface (#0F0F18) with a subtle border (#1C1C2E). When "active" or "hovered", they elevate with a 10px shadow and a glowing top border line.
- Typography: Use bold, extended sans-serif for Headings, and clean monospace for small labels/eyebrows.
- Aesthetic: Technical, precise, highly premium developer tool dashboard. Not a typical marketing site.
```

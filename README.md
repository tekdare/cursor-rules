# cursor-rules

> 🎯 Hierarchical Cursor AI rules for safe full-stack Angular & .NET monorepos

A structured set of `.cursor/rules/*.mdc` files designed to constrain Cursor AI to generate **modern Angular v20+** code (standalone components, Signals, typed RxJS) within a `ClientApp` structure, clean **C#/.NET 10+** web APIs/microservices, and optimized **SQL** databases with zero rule conflicts, following the **RBAC.Lab Monorepo** architecture.

---

## ✨ Key Features & Tech Stack

- **RBAC.Lab Monorepo Architecture**: Cleanly couples the ASP.NET Core API host project (`Controllers`, `Authorization`, `Helpers`) with a dedicated `ClientApp` SPA folder and separate library projects (`DAL`, `FileSystem.Lib`, `OpenXML.Report.Lib`).
- **.NET 10+ LTS Backend**: Advanced rules governing C# 14 / C# 13 web APIs, robust domain modeling, Entity Framework Core 10+ multi-DbContext structures, observability (logging/tracing/health checks), and enterprise security resilience.
- **Angular v20+ LTS Frontend**: High-performance frontend hosted in `ClientApp`. Embraces Standalone components, Signals, reactive state management, and strict TypeScript/ESLint 9 standards.
- **Multi-Dialect SQL Optimization**: Isolated rule sets for MSSQL, Oracle, PostgreSQL, MySQL, and SQLite to ensure optimized indexing, safe migrations, and precise SQL dialect generation.
- **Next-Gen Quality Assurance**: Fast unit testing powered by Vitest 3 (`vitest.workspace.ts`) and modern flat-config ESLint (`eslint.config.mjs`).
- **Zero-Conflict AI Guardrails**: Multi-layer rule cascade with strict glob matching to prevent AI token bloating and cross-domain instruction conflicts.

---

## 🏛️ Project Structure (RBAC.Lab Architecture)

Our monorepo cleanly separates the ASP.NET Core host, the Angular SPA client, and shared libraries to enforce clear boundary definitions and clean architecture:

```text
cursor-rules / RBAC.Lab Monorepo /
├── .cursor/                  # Global Cursor AI rules (alwaysApply: true)
│   └── rules/                # Domain-specific Cursor AI rules (alwaysApply: false)
├── ClientApp/                # Modern Angular v20+ frontend application (SPA root)
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Core singletons (Auth/OAuth2, Interceptors, Guards, Layout)
│   │   │   ├── shared/       # Shared UI (PrimeNG wrappers, Pipes, Directives, Formly custom types)
│   │   │   └── features/     # Feature domains (auth, dashboard, form-engine, user-management, workflow)
│   │   ├── assets/           # Static assets, i18n translation JSON files (`@ngx-translate`)
│   │   └── environments/     # Environment configurations (`environment.ts`)
│   ├── angular.json          # Angular CLI build configuration (or Vite setup)
│   ├── package.json          # Frontend dependencies
│   ├── tsconfig.json         # TypeScript base configuration
│   └── eslint.config.mjs     # Frontend ESLint 9 Flat Config
├── Controllers/              # ASP.NET Core .NET 10+ API Endpoints & Controllers
├── Authorization/            # Security policies, custom requirements & middleware
├── Helpers/                  # Cross-cutting helper utilities & configuration objects
├── ViewModels/               # DTOs, request/response models & validation rules
├── Migrations/               # EF Core 10+ migration files
├── DAL/                      # Data Access Layer & multi-DbContext definitions
├── FileSystem.Lib/           # Dedicated library for file system management
├── OpenXML.Report.Lib/       # Dedicated library for advanced report generation
├── MDC_RULES_ANALYSIS.md     # In-depth analysis of MDC loading & glob matching
├── project_structure.md      # Detailed breakdown of file trees & project structure
├── eslint.config.mjs         # Modern flat ESLint 9 configuration
├── vitest.workspace.ts       # Vitest 3 workspace configuration
├── appsettings.json          # Backend configuration & connection strings
└── Program.cs                # .NET 10+ minimal hosting start & middleware pipeline
```

*For more in-depth details on the repository layout and rule loading analysis, see [project_structure.md](project_structure.md) and [MDC_RULES_ANALYSIS.md](MDC_RULES_ANALYSIS.md).*

---

## 📁 Rule Hierarchy & Loading Mechanism

The rules are divided into two main layers: project-wide global rules under `.cursor/`, and domain-specific rules under `.cursor/rules/`.

### 1. Global Rules (`.cursor/`)
These rules are loaded globally (`alwaysApply: true`) to provide core baseline guidelines across all files in the repository.

| File | `alwaysApply` | `globs` | Purpose |
|------|:---:|---|---|
| `architecture-monorepo.mdc` | ✅ true | All | Monorepo architecture & cross-layer boundary rules (RBAC.Lab structure) |
| `project-overview.mdc` | ✅ true | All | Overall project overview & AI collaboration guidelines (.NET 10 / Angular 20) |
| `safety-security.mdc` | ✅ true | All | Safety, data protection, verification, and testing baselines |

### 2. Domain Rules (`.cursor/rules/`)
These rules target specific technologies and file patterns based on glob matching (`alwaysApply: false`). This ensures Cursor AI only loads relevant context, preventing token bloating and instruction pollution.

| Category / File | `alwaysApply` | `globs` | Purpose |
|---|:---:|---|---|
| **Global Naming & TS** | | | |
| `000-global-naming.mdc` | ❌ false | `ClientApp/src/**/*`, `apps/frontend/src/**/*` | Modern naming conventions & TypeScript baseline for frontend assets |
| **Angular Frontend** | | | |
| `100-angular-naming-and-structure.mdc` | ❌ false | `ClientApp/**/*.ts`, `apps/**/*.ts`, `libs/**/*.ts` | Angular v20+ naming, file structures & TypeScript coding standards |
| `110-angular-components.mdc` | ❌ false | `ClientApp/**/*.component.{ts,html,css}`, `apps/**/*.component.{ts,html,css}` | Standalone component decoration, templates, style guide & A11y |
| `120-angular-rxjs-signals.mdc` | ❌ false | `ClientApp/**/*.{component,service}.ts`, `apps/**/*.{component,service}.ts` | Reactive state management, RxJS and Signals integration & boundaries |
| `130-angular-routing-forms-http.mdc` | ❌ false | `ClientApp/**/*.ts`, `apps/**/*.ts`, `libs/**/*.ts` | Angular routing, forms, HTTP & error handling |
| **C# Backend** | | | |
| `200-csharp-backend-naming-and-structure.mdc` | ❌ false | `Controllers/**/*.cs`, `Authorization/**/*.cs`, `services/**/*.cs`, `src/**/*.cs` | C# naming, .NET 10+ project structures & modern C# 14 coding standards |
| `210-csharp-api-and-minimalapi.mdc` | ❌ false | `**/*Controller.cs`, `api/**/*.cs`, `**/Program.cs` | Web APIs, Minimal APIs, request validation & response formatting |
| `220-csharp-application-domain-infra.mdc` | ❌ false | `services/**/*.cs`, `src/**/*.cs` | Clean Architecture layers (Application, Domain, Infrastructure) |
| `230-csharp-observability-security.mdc` | ❌ false | `services/**/*.cs`, `src/**/*.cs`, `**/Program.cs` | Observability (logging, trace, health check) & security resilience |
| **SQL Database** | | | |
| `300-sql-global-data-rules.mdc` | ❌ false | `database/**/*.sql`, `sql/**/*.sql`, `migrations/**/*.sql`, `**/*.sql` | Common SQL, safety, naming, indexing & migration standards |
| `310-mssql-rules.mdc` | ❌ false | `database/mssql/**/*.sql`, `sql/mssql/**/*.sql`, `**/*mssql*.sql` | Microsoft SQL Server specific dialect & optimization rules |
| `320-oracle-rules.mdc` | ❌ false | `database/oracle/**/*.sql`, `sql/oracle/**/*.sql`, `**/*oracle*.sql` | Oracle Database specific dialect & optimization rules |
| `330-postgresql-rules.mdc` | ❌ false | `database/postgresql/**/*.sql`, `sql/postgresql/**/*.sql`, `**/*postgres*.sql`, `**/*pgsql*.sql` | PostgreSQL specific dialect & optimization rules |
| `340-mysql-rules.mdc` | ❌ false | `database/mysql/**/*.sql`, `sql/mysql/**/*.sql`, `**/*mysql*.sql` | MySQL specific dialect & optimization rules |
| `350-sqlite-rules.mdc` | ❌ false | `database/sqlite/**/*.sql`, `sql/sqlite/**/*.sql`, `**/*sqlite*.sql` | SQLite specific dialect & optimization rules |
| **DevOps** | | | |
| `400-devops-ci-monorepo.mdc` | ❌ false | `**/Dockerfile`, `**/*.yml`, `**/*.yaml`, `.github/**/*.yml`, `azure-pipelines*.yml`, `docker-compose*.yml` | DevOps pipelines, CI/CD, Docker container configuration & monorepo deployment |

---

## 🚀 Quick Start

### 1. Copy rules into your monorepo

```bash
cp -r .cursor/ <your-monorepo>/.cursor/
```

### 2. Verify Cursor loads the rules

In Cursor, you should see the rules taking effect based on the files you are currently editing. Global rules will always be in context, while domain rules dynamically activate per file type.

---

## 🏗️ Rule Design Principles

### Semantic segmentation with Markdown headings

Each file uses `##` / `###` headings to divide semantically distinct concerns, maximising Cursor MDC precision and preventing AI from mixing rules across domains.

### Multi-layer Cascade

```
Global Rules (.cursor/*.mdc)
  ├── Frontend Domain (1xx-angular-*.mdc, active on ClientApp/apps/libs)
  ├── Backend Domain (2xx-csharp-*.mdc, active on Controllers/services/src)
  ├── Database Domain (3xx-sql-*.mdc, active on database/sql)
  └── DevOps Domain (4xx-devops-*.mdc, active on YAML/Docker)
```

### Conflict prevention

- **Global Rules** only govern naming, monorepo boundaries, & general safety—never prescribing specific domain implementation details.
- **Frontend / Backend / Database / DevOps Rules** are isolated via `globs` filters so they never load simultaneously onto unrelated file scopes (preventing token bloating and LLM instruction conflicts).
- **Domain files (e.g., C# vs TS)** will never mix up instructions, ensuring highly contextual and precise AI code generation.

---

## 🔗 References & Documentation

- [MDC Rules Analysis Report](MDC_RULES_ANALYSIS.md)
- [Project Structure Documentation](project_structure.md)
- [Angular v20 Docs](https://angular.dev)
- [Cursor MDC Rules](https://docs.cursor.com/context/rules)
- [Nx Monorepo](https://nx.dev)

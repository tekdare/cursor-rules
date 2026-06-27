# cursor-angular-rules

> 🎯 Hierarchical Cursor AI rules for safe full-stack Angular & .NET monorepos

A structured set of `.cursor/rules/*.mdc` files that constrain Cursor AI to generate **modern Angular v20** code (standalone components, Signals, typed RxJS), clean **C#/.NET** microservices, and optimized **SQL** databases with zero rule conflicts.

---

## 📁 Rule Hierarchy

The rules are divided into two main layers: project-wide global rules under `.cursor/`, and domain-specific rules under `.cursor/rules/`.

### 1. Global Rules (`.cursor/`)
These rules are loaded globally (`alwaysApply: true`) to provide core baseline guidelines.

| File | `alwaysApply` | `globs` | Purpose |
|------|:---:|---|---|
| `architecture-monorepo.mdc` | ✅ true | All | Monorepo architecture & cross-layer boundary rules |
| `project-overview.mdc` | ✅ true | All | Overall project overview & AI collaboration guidelines |
| `safety-security.mdc` | ✅ true | All | Safety, data protection, verification, and testing baselines |

### 2. Domain Rules (`.cursor/rules/`)
These rules target specific technologies and file patterns based on glob matching (`alwaysApply: false`).

| Category / File | `alwaysApply` | `globs` | Purpose |
|---|:---:|---|---|
| **Global Naming & TS** | | | |
| `000-global-naming.mdc` | ✅ true | `apps/sandbox/src/**/*` | Global naming rules & TypeScript baseline |
| **Angular Frontend** | | | |
| `100-angular-naming-and-structure.mdc` | ❌ false | `apps/**/*.ts`, `libs/**/*.ts` | Angular naming & TypeScript coding standards |
| `110-angular-components.mdc` | ❌ false | Component `ts`, `html`, `css` | Standalone component decoration, templates, style guide |
| `120-angular-rxjs-signals.mdc` | ❌ false | Services & Components | Reactive state management, RxJS and Signals integration |
| `130-angular-routing-forms-http.mdc` | ❌ false | `apps/**/*.ts`, `libs/**/*.ts` | Angular routing, forms, HTTP & error handling |
| **C# Backend** | | | |
| `200-csharp-backend-naming-and-structure.mdc` | ❌ false | `services/**/*.cs`, `src/**/*.cs`, `api/**/*.cs` | C# naming, microservice project structures |
| `210-csharp-api-and-minimalapi.mdc` | ❌ false | Controller files, `Program.cs` | Web APIs, Minimal APIs, request validation & response formatting |
| `220-csharp-application-domain-infra.mdc` | ❌ false | `services/**/*.cs`, `src/**/*.cs` | Clean Architecture layers (Application, Domain, Infrastructure) |
| `230-csharp-observability-security.mdc` | ❌ false | `.cs` files, `Program.cs` | Observability (logging, trace, health check) & security resilience |
| **SQL Database** | | | |
| `300-sql-global-data-rules.mdc` | ❌ false | `**/*.sql` | Common SQL, safety, naming, indexing & migration |
| `310-mssql-rules.mdc` / `320-oracle-rules.mdc` / `330-postgresql-rules.mdc` / `340-mysql-rules.mdc` / `350-sqlite-rules.mdc` | ❌ false | Specific `.sql` paths | Database-specific SQL dialects & optimization rules |
| **DevOps** | | | |
| `400-devops-ci-monorepo.mdc` | ❌ false | Dockerfiles, YAML files | DevOps pipelines, Docker container configuration & monorepo deployment |

---

## 🚀 Quick Start

### 1. Copy rules into your monorepo

```bash
cp -r .cursor/ <your-monorepo>/.cursor/
```

### 2. Verify Cursor loads the rules

In Cursor, you should see the rules taking effect based on the files you are currently editing. Global rules will always be in context.

---

## 🏗️ Rule Design Principles

### Semantic segmentation with Markdown headings

Each file uses `##` / `###` headings to divide semantically distinct concerns, maximising Cursor MDC precision and preventing AI from mixing rules across domains.

### Multi-layer Cascade

```
Global Rules (.cursor/*.mdc)
  ├── Frontend Domain (1xx-angular-*.mdc, active on apps/libs)
  ├── Backend Domain (2xx-csharp-*.mdc, active on services/src/api)
  ├── Database Domain (3xx-sql-*.mdc, active on database/sql)
  └── DevOps Domain (4xx-devops-*.mdc, active on YAML/Docker)
```

### Conflict prevention

- **Global Rules** only govern naming, monorepo boundaries, & general safety—never prescribing specific domain implementation details.
- **Frontend / Backend / Database Rules** are isolated via `globs` filters so they never load simultaneously onto unrelated file scopes (preventing token bloating and LLM instruction conflicts).
- **Domain files (e.g. C# vs TS)** will never mix up instructions, ensuring highly contextual and precise AI code generation.

---

## 🔗 References

- [Angular v20 Docs](https://angular.dev)
- [Cursor MDC Rules](https://docs.cursor.com/context/rules)
- [Nx Monorepo](https://nx.dev)

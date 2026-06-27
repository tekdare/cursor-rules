# Cursor MDC 規則套用與載入機制分析報告

本報告針對專案中 `.cursor/` 及 `.cursor/rules/` 目錄下的所有 `.mdc` 檔案進行了加載策略、Glob 匹配與語意檢索機制的分析。

> [!NOTE]
> **Cursor MDC (Markdown Cursor) 規則套用機制說明**
> 1. **全域套用 (alwaysApply: true)**：無論開啟何種檔案，Cursor 都會自動將該規則載入對話與編輯的 System Prompt。
> 2. **Glob 匹配 (alwaysApply: false + globs)**：當您在編輯器中編輯或開啟符合 `globs` 模式的路徑時，Cursor 會自動載入該規則。
> 3. **語意搜尋 / Agent 請求 (alwaysApply: false + description)**：當前兩者都不符合，但 AI Agent 在執行任務時判定需要（會比對 `description` 與當前任務），Agent 會動態讀取此規則。

---

## 📊 規則套用彙整表

| 規則名稱與路徑 | 套用類型 (`alwaysApply`) | Glob 匹配模式 (`globs`) | 語意搜尋描述 (`description`) |
| :--- | :--- | :--- | :--- |
| [architecture-monorepo.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/architecture-monorepo.mdc) | `true` | 全域套用 | Monorepo 架構與跨層責任邊界規則 |
| [project-overview.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/project-overview.mdc) | `true` | 全域套用 | Monorepo 專案總覽與 AI 協作總則，適用於整個倉庫 |
| [safety-security.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/safety-security.mdc) | `true` | 全域套用 | 專案安全、資料保護、驗證與測試底線 |
| [000-global-naming.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/000-global-naming.mdc) | `false` | `apps/frontend/src/**/*` | 適用於所有 Angular 開發物件與檔案的現代化命名規範與基礎 TypeScript 編碼標準 |
| [100-angular-naming-and-structure.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/100-angular-naming-and-structure.mdc) | `false` | `apps/**/*.ts`<br>`libs/**/*.ts` | Angular 命名、檔案結構與基礎 TypeScript 規則 |
| [110-angular-components.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/110-angular-components.mdc) | `false` | `apps/**/*.component.ts`<br>`libs/**/*.component.ts`<br>`apps/**/*.component.html`<br>`libs/**/*.component.html`<br>`apps/**/*.component.css`<br>`libs/**/*.component.css` | Angular Component、Template、Style 與 A11y 規範 |
| [120-angular-rxjs-signals.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/120-angular-rxjs-signals.mdc) | `false` | `apps/**/*.component.ts`<br>`libs/**/*.component.ts`<br>`apps/**/*.service.ts`<br>`libs/**/*.service.ts` | Angular 響應式狀態規範——適用於所有 Service 及 Component 檔案，統一 RxJS 與 Signals 的命名與邊界 |
| [130-angular-routing-forms-http.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/130-angular-routing-forms-http.mdc) | `false` | `apps/**/*.ts`<br>`libs/**/*.ts` | Angular 路由、表單、HTTP 與錯誤處理規範 |
| [200-csharp-backend-naming-and-structure.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/200-csharp-backend-naming-and-structure.mdc) | `false` | `services/**/*.cs`<br>`src/**/*.cs`<br>`api/**/*.cs` | C# 微服務命名、專案結構與基礎程式碼規範 |
| [210-csharp-api-and-minimalapi.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/210-csharp-api-and-minimalapi.mdc) | `false` | `services/**/*Controller.cs`<br>`src/**/*Controller.cs`<br>`api/**/*.cs`<br>`**/Program.cs` | C# API、Controller、Minimal API、驗證與錯誤回應規範 |
| [220-csharp-application-domain-infra.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/220-csharp-application-domain-infra.mdc) | `false` | `services/**/*.cs`<br>`src/**/*.cs` | C# Application、Domain、Infrastructure 分層與資料存取規範 |
| [230-csharp-observability-security.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/230-csharp-observability-security.mdc) | `false` | `services/**/*.cs`<br>`src/**/*.cs`<br>`**/Program.cs` | C# 微服務的 logging、trace、health check、security 與 resilience 規範 |
| [300-sql-global-data-rules.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/300-sql-global-data-rules.mdc) | `false` | `database/**/*.sql`<br>`sql/**/*.sql`<br>`migrations/**/*.sql`<br>`**/*.sql` | 跨資料庫共通 SQL、安全、命名、索引與 migration 規範 |
| [310-mssql-rules.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/310-mssql-rules.mdc) | `false` | `database/mssql/**/*.sql`<br>`sql/mssql/**/*.sql`<br>`**/*mssql*.sql` | Microsoft SQL Server 專屬規範 |
| [320-oracle-rules.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/320-oracle-rules.mdc) | `false` | `database/oracle/**/*.sql`<br>`sql/oracle/**/*.sql`<br>`**/*oracle*.sql` | Oracle Database 專屬規範 |
| [330-postgresql-rules.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/330-postgresql-rules.mdc) | `false` | `database/postgresql/**/*.sql`<br>`sql/postgresql/**/*.sql`<br>`**/*postgres*.sql`<br>`**/*pgsql*.sql` | PostgreSQL 專屬規範 |
| [340-mysql-rules.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/340-mysql-rules.mdc) | `false` | `database/mysql/**/*.sql`<br>`sql/mysql/**/*.sql`<br>`**/*mysql*.sql` | MySQL 專屬規範 |
| [350-sqlite-rules.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/350-sqlite-rules.mdc) | `false` | `database/sqlite/**/*.sql`<br>`sql/sqlite/**/*.sql`<br>`**/*sqlite*.sql` | SQLite 專屬規範，適用於本機開發、測試與輕量資料場景 |
| [400-devops-ci-monorepo.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/400-devops-ci-monorepo.mdc) | `false` | `**/Dockerfile`<br>`**/*.yml`<br>`**/*.yaml`<br>`.github/**/*.yml`<br>`.github/**/*.yaml`<br>`azure-pipelines*.yml`<br>`docker-compose*.yml` | Monorepo 的 DevOps、CI/CD、環境設定、容器與發佈規範 |

---

## 🛠️ 分析與建議

1. **已修正：[000-global-naming.mdc](file:///D:/Dev/cursor-angular-rules/.cursor/rules/000-global-naming.mdc)**
   * 此規則原先設定了 `alwaysApply: true`，會導致全域套用至整個專案（包含後端 C# 微服務）。
   * **調整後行為**：目前已將 `alwaysApply` 修改為 `false`，並精準匹配 `globs: apps/frontend/src/**/*`，確保僅在前端 Angular 開發目錄套用此命名與 TypeScript 規範，避免全域範圍的規則污染。

2. **舊有重複規則清理**
   * 已移除舊位置與重複的規則檔案（`100-angular-components.mdc` 與 `200-rxjs-signals.mdc`），全面採用新版全端架構的職責分離規則（`110-angular-components.mdc`、`120-angular-rxjs-signals.mdc` 等）。

3. **動態載入的機制運作良好**
   * 所有 `alwaysApply: false` 的規則都精確設定了對應開發環境（如 Angular、C#、SQL、DevOps）的 `globs` 匹配路徑。
   * 這能有效減少 Cursor 在與 AI 互動時攜帶的 Token 數量，只有在開啟或提及相關檔案時才會加載，能大幅優化模型回應速度並降低 Token 使用成本。

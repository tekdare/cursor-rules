# Project Folder Structure

```text
Project/
|   .editorconfig
|   .gitignore
|   .prettierignore
|   .prettierrc
|   eslint.config.mjs
|   LICENSE
|   MDC_RULES_ANALYSIS.md
|   nx.json
|   package-lock.json
|   package.json
|  # 專案目錄結構與模組說明 (RBAC.Lab Monorepo 全端方案架構)

本文件詳細記載專案之核心目錄、方案結構及 ClientApp 子資料夾架構設計。當 AI 建立新方案及存放庫時，必須精確遵循此架構規範。

---

## 🏛️ 總體方案與存放庫結構 (Monorepo Root)

本專案採用 RBAC.Lab 經典全端方案結構，完美結合 **.NET 10 (或更新的 LTS 版本)** 宿主與相鄰類別庫，以及位於 `ClientApp` 內的 **Angular v20 (或更新的 LTS 版本)** 現代化 SPA。

```text
RBAC.Lab Monorepo Root /
├── .cursor/                  # 專案層級 Cursor 全域規則 (alwaysApply: true)
│   └── rules/                # 領域與技術專屬 Cursor 規則 (alwaysApply: false)
├── ClientApp/                # Angular v20+ 現代化前端 SPA 專案根目錄
├── Controllers/              # C# / .NET 10+ MVC 與 RESTful API 端點
├── Authorization/            # 權限控管、自訂原則 (Policies) 與安全中介軟體
├── Contract/                 # 跨層 DTO 介面契約與驗證模型
├── Helpers/                  # 跨功能公用程式、郵件範本與組態定義
├── ViewModels/               # 檢視端模型、請求與回應封裝
├── Migrations/               # EF Core 10+ 資料庫遷移紀錄檔
├── DAL/                      # 資料存取層專案 (Data Access Layer) 與多 DbContext 結構
├── FileSystem.Lib/           # 檔案系統管理與二進位串流處理類別庫
├── OpenXML.Report.Lib/       # 進階 Word/Excel/PDF 報表產製類別庫
├── database/                 # 資料庫結構腳本與 SQL 語法彙整
├── MDC_RULES_ANALYSIS.md     # MDC 規則動態載入與 globs 匹配分析報告
├── project_structure.md      # 本專案架構文件
├── eslint.config.mjs         # 現代化 ESLint 9 Flat Config 全域檢查設定
├── vitest.workspace.ts       # Vitest 3 工作區測試設定檔
├── appsettings.json          # 後端主控態配置與資料庫連線字串
└── Program.cs                # .NET 10+ Minimal Hosting 啟動程序與中介軟體管線
```

---

## 💻 前端方案架構與子資料夾設計 (`ClientApp/`)

`ClientApp` 為前端主應用程式目錄，採用 **Angular v20 (或更新的 LTS 版本)** 搭配最新 Signals 生態與 Standalone Components 構建。其內部之目錄與子資料夾必須依據下列模組化職責展開：

```text
ClientApp/
├── src/
│   ├── app/
│   │   ├── core/                    # 核心單例服務與系統啟動必要模組
│   │   │   ├── auth/                # OAuth2.0 / OIDC 授權與 Token 管理
│   │   │   ├── guards/              # 路由防護 (AuthGuard, PermissionGuard)
│   │   │   ├── interceptors/        # HTTP 攔截器 (AuthInterceptor, ErrorInterceptor)
│   │   │   └── layout/              # 系統外觀框架 (Header, Sidebar, Footer)
│   │   │
│   │   ├── shared/                  # 跨功能共享元件與表單封裝
│   │   │   ├── components/          # 獨立封裝之共用 UI (對話框、自訂下拉選單等)
│   │   │   ├── directives/          # 共用 DOM 操作指令 (如 appAutoFocus)
│   │   │   ├── pipes/               # 共用資料格式化管道
│   │   │   └── formly/              # 動態表單引擎 (Formly) 自訂型別與包裝器
│   │   │       ├── types/           # 自訂控制項 (如 SignaturePad, JSONEditor)
│   │   │       └── wrappers/        # 自訂表單容器包裝 (如 PrimeNG FormField Wrapper)
│   │   │
│   │   └── features/                # 業務功能領域模組 (Standalone 頁面與子路由)
│   │       ├── auth/                # 登入、登出與使用者個人帳號設定
│   │       ├── dashboard/           # 圖表與儀表板分析檢視 (`chart.js`)
│   │       ├── form-engine/         # 動態表單建構、定義與執行期呈現介面
│   │       ├── user-management/     # AG-Grid 使用者清單與 GACL 權限配置模組
│   │       └── workflow/            # 流程排程與日曆審核模組 (`@fullcalendar`)
│   │
│   ├── assets/                      # 靜態檔案與共用資源
│   │   ├── i18n/                    # 多國語系翻譯 JSON 檔 (`@ngx-translate`)
│   │   └── images/                  # 應用程式靜態圖示與品牌資產
│   │
│   └── environments/                # 環境變數定義檔
│       ├── environment.ts           # 開發環境配置 (代理至 `http://localhost:4200`)
│       └── environment.prod.ts      # 生產部署配置
│
├── angular.json                     # 前端建置與專案架構設定 (或 Vite 基礎配置)
├── package.json                     # 前端套件依賴宣告
├── tsconfig.json                    # TypeScript 核心設定檔
├── tsconfig.app.json                # 應用程式端 TypeScript 設定
└── eslint.config.mjs                # 前端 ESLint 9 Flat Config 語法檢查原則
```

### 前端子資料夾職責守則
1. **Core 與 Shared 嚴格隔離**：`core/` 僅放置整個應用程式生命週期中單一實例 (Singleton) 的服務與中介模組；`shared/` 則提供各業務模組自由匯入的純視覺與功能性元件。
2. **領域驅動特性 (Features)**：`features/` 內的業務資料夾必須保持獨立自洽，不得跨業務互相直接深層依賴，需透過公共路由或共享服務通訊。

---

## ⚙️ 後端方案架構與子資料夾設計 (C# / .NET 10+)

後端採用 **.NET 10 (或更新的 LTS 版本)** 作為宿主，具備現代化 C# 14 / C# 13 語法特徵，並將資料層與共通底層拆分為獨立的子專案結構：

```text
RBAC.Lab Solution (.NET 10+)
├── RBAC.Lab (Host Project)
│   ├── Controllers/                 # Web API 進入點 (AccountController, GACLController 等)
│   ├── Authorization/               # 動態授權原則 (Policies.cs) 與中介軟體攔截器
│   ├── Contract/                    # 介面定義與資料驗證契約
│   ├── Helpers/                     # 日誌設定 (Serilog)、公用程式與 EmailTemplates
│   ├── ViewModels/                  # 請求與回應物件 (DTOs)
│   ├── appsettings.json             # 資料庫連線字串與微服務閘道器設定
│   └── Program.cs                   # .NET 10+ 現代化中介軟體管線及 SPA 靜態代理設定
│
├── DAL (Data Access Layer Project)
│   ├── Core/                        # 資料庫公用常數與領域實體基底
│   ├── Models/                      # EF Core 資料表實體映射模型 (Entities)
│   ├── Repositories/                # 多 Context 之儲存庫實作 (CustomerRepository 等)
│   └── DBContexts                   # 4 大獨立 DbContext 隔離實體：
│       ├── ApplicationDbContext     # 使用者與身分驗證資料庫
│       ├── ManagementDBContext      # 業務系統管理資料庫
│       ├── gaclContext              # 存取控制清單引擎資料庫
│       └── FormEngineContext        # 動態表單引擎資料庫
│
├── FileSystem.Lib                   # 實作企業級檔案儲存、讀取與串流保護子專案
└── OpenXML.Report.Lib               # 實作動態生成 Word/Excel/PDF 進階報表子專案
```

### 後端子資料夾職責守則
1. **多 DbContext 解耦**：各業務領域之儲存體獨立運作，避免肥大混雜的單一 God Context。
2. **現代化 Minimal Hosting**：採用 `Program.cs` 單一核心載入管線，結合 ASP.NET Core SPA 拓展功能，無縫接軌前端 `ClientApp`。
|   project_structure.md
|   README.md
|   tsconfig.base.json
|   vitest.workspace.ts
|   
+---.cursor
|   |   architecture-monorepo.mdc
|   |   project-overview.mdc
|   |   safety-security.mdc
|   |   
|   \---rules
|           000-global-naming.mdc
|           100-angular-naming-and-structure.mdc
|           110-angular-components.mdc
|           120-angular-rxjs-signals.mdc
|           130-angular-routing-forms-http.mdc
|           200-csharp-backend-naming-and-structure.mdc
|           210-csharp-api-and-minimalapi.mdc
|           220-csharp-application-domain-infra.mdc
|           230-csharp-observability-security.mdc
|           300-sql-global-data-rules.mdc
|           310-mssql-rules.mdc
|           320-oracle-rules.mdc
|           330-postgresql-rules.mdc
|           340-mysql-rules.mdc
|           350-sqlite-rules.mdc
|           400-devops-ci-monorepo.mdc
|           
+---.idea
|       .gitignore
|       awsToolkit.xml
|       encodings.xml
|       indexLayout.xml
|       projectSettingsUpdater.xml
|       vcs.xml
|       workspace.xml
|       
+---apps
|   +---backend
|   |   |   project.json
|   |   |   tsconfig.app.json
|   |   |   tsconfig.json
|   |   |   
|   |   \---src
|   |       |   main.ts
|   |       |   
|   |       \---app
|   |               app.controller.ts
|   |               app.module.ts
|   |               app.service.ts
|   |               
|   \---frontend
|       |   eslint.config.mjs
|       |   project.json
|       |   tsconfig.app.json
|       |   tsconfig.json
|       |   tsconfig.spec.json
|       |   vite.config.mts
|       |   
|       +---public
|       |       favicon.ico
|       |       
|       \---src
|           |   index.html
|           |   main.ts
|           |   styles.css
|           |   test-setup.ts
|           |   
|           \---app
|                   app.config.ts
|                   app.css
|                   app.html
|                   app.routes.ts
|                   app.ts
|                   
\---libs
    +---backend
    |   +---auth
    |   |   \---src
    |   |           index.ts
    |   |           
    |   \---database
    |       \---src
    |               index.ts
    |               
    +---frontend
    |   +---data-access
    |   |   \---src
    |   |           index.ts
    |   |           
    |   \---ui
    |       \---src
    |               index.ts
    |               
    \---shared
        +---types
        |   \---src
        |           index.ts
        |           
        \---utils
            \---src
                    index.ts
                    
```

# Project Structure and Files

- .editorconfig
- .gitignore
- .prettierignore
- .prettierrc
- eslint.config.mjs
- LICENSE
- MDC_RULES_ANALYSIS.md
- nx.json
- package-lock.json
- package.json
- project_structure.md
- README.md
- tsconfig.base.json
- vitest.workspace.ts
- .cursor\architecture-monorepo.mdc
- .cursor\project-overview.mdc
- .cursor\safety-security.mdc
- .cursor\rules\000-global-naming.mdc
- .cursor\rules\100-angular-naming-and-structure.mdc
- .cursor\rules\110-angular-components.mdc
- .cursor\rules\120-angular-rxjs-signals.mdc
- .cursor\rules\130-angular-routing-forms-http.mdc
- .cursor\rules\200-csharp-backend-naming-and-structure.mdc
- .cursor\rules\210-csharp-api-and-minimalapi.mdc
- .cursor\rules\220-csharp-application-domain-infra.mdc
- .cursor\rules\230-csharp-observability-security.mdc
- .cursor\rules\300-sql-global-data-rules.mdc
- .cursor\rules\310-mssql-rules.mdc
- .cursor\rules\320-oracle-rules.mdc
- .cursor\rules\330-postgresql-rules.mdc
- .cursor\rules\340-mysql-rules.mdc
- .cursor\rules\350-sqlite-rules.mdc
- .cursor\rules\400-devops-ci-monorepo.mdc
- .idea\.gitignore
- .idea\awsToolkit.xml
- .idea\encodings.xml
- .idea\indexLayout.xml
- .idea\projectSettingsUpdater.xml
- .idea\vcs.xml
- .idea\workspace.xml
- apps\backend\project.json
- apps\backend\tsconfig.app.json
- apps\backend\tsconfig.json
- apps\backend\src\main.ts
- apps\backend\src\app\app.controller.ts
- apps\backend\src\app\app.module.ts
- apps\backend\src\app\app.service.ts
- apps\frontend\eslint.config.mjs
- apps\frontend\project.json
- apps\frontend\tsconfig.app.json
- apps\frontend\tsconfig.json
- apps\frontend\tsconfig.spec.json
- apps\frontend\vite.config.mts
- apps\frontend\public\favicon.ico
- apps\frontend\src\index.html
- apps\frontend\src\main.ts
- apps\frontend\src\styles.css
- apps\frontend\src\test-setup.ts
- apps\frontend\src\app\app.config.ts
- apps\frontend\src\app\app.css
- apps\frontend\src\app\app.html
- apps\frontend\src\app\app.routes.ts
- apps\frontend\src\app\app.ts
- libs\backend\auth\src\index.ts
- libs\backend\database\src\index.ts
- libs\frontend\data-access\src\index.ts
- libs\frontend\ui\src\index.ts
- libs\shared\types\src\index.ts
- libs\shared\utils\src\index.ts

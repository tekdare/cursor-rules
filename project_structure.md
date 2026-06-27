# Project Folder Structure

```text
列出磁碟區 新增磁碟區 的資料夾 PATH
磁碟區序號為 00000040 A0BE:55E8
D:.
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

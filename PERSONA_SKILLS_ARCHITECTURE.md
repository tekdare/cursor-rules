# Cursor Persona Skills 專家角色與技能運作機制架構書

本手冊詳細說明專案中基於 **Persona (專家角色)** 與 **原生 Skills (技能模組)** 的 Cursor AI 技能架構運作定義、觸發機制、決策護欄 (Guardrails) 以及多代理協作矩陣 (RACI Handoff Protocol)。

---

## 🌐 核心概念與運作哲學

為了提升 AI 代碼生成與架構審查的專業高度，本專案將不同的領域專家智慧抽離為專屬的 **Persona 技能定義檔 (`SKILL.md`)**。當您在 Cursor AI 聊天、Composer 或代碼生成時，只需呼叫對應的角色代號或指令，Cursor 將自動切換上下文與專家思維，避免產出平庸、未考量資安或不符合 Clean Architecture 的代碼。

```text
               ┌────────────────────────────────────────────────────────┐
               │              Cursor AI (Chat / Composer)               │
               │                                                        │
[使用者輸入] ──┼─► [ @CSA / @BAE / @FTL / @SEC / @CIE / @QAE / @UXD ]    │
               │    (或於對話框直接輸入 `/` 選擇原生 Skills 技能選單)     │
               │             │                                          │
               │             ▼ (.cursor/rules/500-persona-*.mdc 攔截)    │
               │     [ 自動載入 .cursor/skills/<skill-name>/SKILL.md ]  │
               │             │                                          │
               │             ▼ (吸收 USE WHEN / Guardrails / DoD)       │
               │     [ 專業架構審核 / 威脅建模 / CRUD 鷹架 / 臨床驗證 ]  │
               │             │                                          │
               │             ▼ (RACI 跨會話多代理協作)                  │
               │     [ 產出【🤝 任務移交單 (Handoff Summary)】無縫交接 ]   │
               └────────────────────────────────────────────────────────┘
```

---

## 👥 Persona 專家角色定義與總覽

| Persona 代號 | 觸發前綴 | 原生技能名稱與定義檔 (位於 `.cursor/skills/`) | 專家角色職責與核心能力指引 |
| :--- | :--- | :--- | :--- |
| **`ROLE-01-CSA`** | `@CSA` | `csa-architect` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/csa-architect/SKILL.md)) | **首席系統架構師**：主責微服務架構裁決、起草與更新 ADR、繪製 C4 Model 系統架構圖、審核 NFR 非功能性需求、發動高風險三方會簽與 Golden Rules 全域稽核。 |
| **`ROLE-02-FTL`** | `@FTL` | `ftl-frontend` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/ftl-frontend/SKILL.md)) | **前端技術領導**：主責 Angular 20+ 獨立功能模組鷹架、醫療 Reactive Forms 雙重驗證表單、Signal-based Facade 狀態封裝、打包預算檢驗與 A11y 醫療級可及性掃描。 |
| **`ROLE-03-BAE`** | `@BAE` | `bae-backend` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/bae-backend/SKILL.md)) | **後端 API 工程師**：主責 OpenAPI 3.1 規範與 DTO 產出、Clean Architecture CRUD 鷹架、增掛 Audit Log 審計追蹤、實作軟刪除 (Soft Delete) 與 Rate Limit 流量控管。 |
| **`ROLE-04-CIE`** | `@CIE` | `cie-clinical` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/cie-clinical/SKILL.md)) | **臨床資訊專家**：主責臨床規格與指引審查、臨床公式高風險驗證大閘、產出 SOAPIER 結構化紀錄樣板、覆核三階生命徵象邊界值與轉譯醫療規則為偽代碼。 |
| **`ROLE-05-UXD`** | `@UXD` | `uxd-medical` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/uxd-medical/SKILL.md)) | **醫療 UX 設計師**：主責醫療專用 Design Tokens 產出、醫療人因工程與 WCAG 2.1 AA 可及性審查 (≥ 48px 打擊區)、醫護核心工作流優化與 Formly 樣式同步。 |
| **`ROLE-06-SEC`** | `@SEC` | `sec-security` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/sec-security/SKILL.md)) | **資安工程師**：主責 STRIDE 威脅建模與 DREAD 評分、資安防護測試碼生成、Secrets 金鑰防漏掃描、金鑰與憑證輪替 SOP 及 DPIA 個資隱私衝擊分析。 |
| **`ROLE-10-QAE`** | `@QAE` | `qae-quality` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/qae-quality/SKILL.md)) | **測試品保工程師**：主責 xUnit/Vitest 單元與 Testcontainers 整合測試生成、Playwright E2E 測試指令碼、k6 系統壓力測試、多指標覆蓋率檢視與線上 Bug 重現反推。 |

---

## ⚙️ 觸發與運作機制 (How it works in Cursor)

### 1. 原生 Skills 選單與 MDC 動態橋接
在 `.cursor/rules/` 下建立了 `500-persona-skills-commands.mdc` 規則，該文件攔截使用者對任何 Persona 代號或前綴的呼叫。當您輸入 `@CSA` 或透過 `/` 點選 `csa-architect` 時，Cursor 會自動讀取並吸收 `.cursor/skills/csa-architect/SKILL.md` 內部的細緻能力模組與 DoD。

### 2. YAML 前置詞過濾 (USE WHEN / DO NOT USE WHEN)
每一份 `SKILL.md` 頂部均定義了精確的啟動條件與禁止啟動情境。這確保 Cursor AI 能夠在背景自動感測使用者當前的意圖，達成零干擾、高聚焦的精準啟動。

### 3. 原生技能與提示詞觸發 (Natural Language Execution)
您可以在 Composer 或聊天中直接結合原生技能與自然語言提示詞。例如：
```text
/bae-backend 請幫我依據 Patient 實體產生 Clean Architecture 的 CRUD 架構，並包含 Audit 與 Soft Delete
```
Cursor AI 將會精確為您生成符合 Clean Architecture 分層的 Domain, UseCase, Validator, Repository 及 Controller 薄層，並自動接入 Audit Log 與軟刪除邏輯。

---

## 🛡️ 決策護欄與多代理協作 (Guardrails & Multi-Agent Matrix)

### 1. 決策護欄與行為底線 (Decision Guardrails)
我們在全數 7 大專家技能檔內明列了不可妥協的防衛性規則，確保 AI 絕不生成脆弱或具備破壞性的解決方案：
- **`✅ 必須做 (MUST DO)`**：強制要求分層隔離、強制資源釋放 (`takeUntilDestroyed`)、強制寫入 Audit Log、強制採用 TLS 1.3、強制附上臨床指引出處。
- **`❌ 絕不做 (NEVER DO)`**：嚴厲禁止 `any` 型別污染、嚴厲禁止 Controller 直接查詢資料庫、嚴厲禁止硬編碼密鑰或十六進制色值、嚴厲禁止在測試中使用 `Thread.Sleep`。

### 2. RACI 跨角色協作矩陣
為了解決全端 Monorepo 系統中多角色協同的複雜度，各個 Persona 遵循標準的 RACI 權責劃分：
- **`R` (Responsible - 主責執行)**：負責完成具體實作或執行該任務的角色。
- **`A` (Accountable - 最終把關)**：為任務最終成敗負最終簽核與審查責任的角色。
- **`C` (Consulted - 協同諮詢)**：執行過程中必須徵詢其專業意見或進行雙重覆核的角色。
- **`I` (Informed - 進度知會)**：任務完成後需知會以利後續作業或追蹤的角色。
當面臨高風險議題（例如修改臨床計算公式或升級重要資料庫 Schema），AI 能夠依據矩陣規則發出聯防提示，邀請如 `@CIE` 或 `@QAE` 進行共同把關。

### 3. 跨會話任務移交協議 (Handoff Protocol)
Cursor AI 支援多對話視窗或 Composer 分工處理不同領域。透過標準化的 `【🤝 任務移交單 (Handoff Summary)】`，AI 在完成某一視角工作後（如架構師定案 ADR），會自動產生結構化的交接封包。使用者只需將該封包貼給下一個專家視角（如後端貼給前端、或前端貼給品保），下一個 AI 就能無縫接軌，達成最專業的接力協作。

---

## 🏛️ 存放庫目錄整合
這套系統完美相容 RBAC.Lab 全端 Monorepo 架構，所有技能與能力定義均集中收納於 `.cursor/skills/` 內，既維持極高清晰度，又完全契合 Cursor 原生 Auto-Discovery 與 `/` 浮動選單機制。

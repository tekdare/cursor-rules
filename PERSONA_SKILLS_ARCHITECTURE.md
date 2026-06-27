# Cursor Persona Skills 專家角色與技能運作機制架構書

本手冊詳細說明專案中基於 **Persona (專家角色)** 與 **Slash Commands (快捷指令)** 的 Cursor AI 技能架構運作定義、觸發機制及內部目錄結構。

---

## 🌐 核心概念與運作哲學

為了提升 AI 代碼生成與架構審查的專業高度，本專案將不同的領域專家智慧抽離為專屬的 **Persona 技能定義檔**。當您在 Cursor AI 聊天、Composer 或代碼生成時，只需呼叫對應的角色代號或指令，Cursor 將自動切換上下文與專家思維，避免產出平庸、未考量資安或不符合 Clean Architecture 的代碼。

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
               │             ▼ (專家視角展開與 DoD 執行)                │
               │     [ 專業架構審核 / 威脅建模 / CRUD 鷹架 / 臨床驗證 ]  │
               └────────────────────────────────────────────────────────┘
```

---

## 👥 Persona 專家角色定義與總覽

| Persona 代號 | 觸發前綴 | 原生技能名稱與定義檔 (位於 `.cursor/skills/`) | 核心能力與主打命令 |
| :--- | :--- | :--- | :--- |
| **`ROLE-01-CSA`** | `@CSA` | `csa-architect` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/csa-architect/SKILL.md)) | **首席系統架構師**：主責 ADR、C4 架構圖 (`/csa draw-c4`)、NFR 達標審核、架構裁決與 9-Step 啟動。 |
| **`ROLE-04-CIE`** | `@CIE` | `cie-clinical` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/cie-clinical/SKILL.md)) | **臨床資訊專家**：主責臨床規格 review (`/cie review-clinical-spec`)、三階邊界值檢驗與 `/cie verify` 公式守門。 |
| **`ROLE-03-BAE`** | `@BAE` | `bae-backend` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/bae-backend/SKILL.md)) | **後端 API 工程師**：主攻 OpenAPI、Clean Architecture CRUD 鷹架 (`/bae scaffold-crud`)、Audit Log 補強與軟刪除。 |
| **`ROLE-02-FTL`** | `@FTL` | `ftl-frontend` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/ftl-frontend/SKILL.md)) | **前端技術領導**：主攻 Angular 20+ 獨立模組鷹架 (`/ftl scaffold-module`)、Reactive Form、Signal Facade 與打包預算。 |
| **`ROLE-05-UXD`** | `@UXD` | `uxd-medical` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/uxd-medical/SKILL.md)) | **醫療 UX 設計師**：主攻醫療 Design Tokens (`/uxd generate-tokens`)、WCAG 2.1 AA 可及性、臨床人因工程與工作流簡化。 |
| **`ROLE-06-SEC`** | `@SEC` | `sec-security` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/sec-security/SKILL.md)) | **資安工程師**：主攻 STRIDE 威脅建模 (`/sec threat-model`)、資安測試生成、Secrets 洩漏審查與隱私衝擊分析 (DPIA)。 |
| **`ROLE-10-QAE`** | `@QAE` | `qae-quality` ([`SKILL.md`](file:///D:/Dev/cursor-rules/.cursor/skills/qae-quality/SKILL.md)) | **測試品保工程師**：主攻 xUnit/Vitest 單元測試 (`/qae generate-tests`)、Playwright E2E 測試、k6 壓測與 100% 公式覆蓋。 |

---

## ⚙️ 觸發與運作機制 (How it works in Cursor)

### 1. MDC 動態橋接機制
在 `.cursor/rules/` 下建立了 `500-persona-skills-commands.mdc` 規則，該文件攔截使用者對任何 Persona 代號或前綴的呼叫。當您輸入 `@CSA` 時，Cursor 會自動讀取並吸收 `.cursor/personas/role-01-csa.md` 內部的細緻指令與 DoD。

### 2. Slash Commands 快捷觸發
您可以在 Composer 或聊天中直接要求執行具體命令。例如：
```bash
@BAE 請執行 /bae scaffold-crud --entity Patient --with-audit --with-soft-delete
```
Cursor AI 將會精確為您生成符合 Clean Architecture 分層的 Domain, UseCase, Validator, Repository 及 Controller 薄層，並自動接入 Audit Log 邏輯。

### 3. 跨角色協作與高風險閘門
- **臨床公式防護**：任何涉及臨床或核心領域公式的變更，均可要求 `@CIE` 執行 `/cie verify` 進行 100% 測試覆蓋率及文獻出處校驗。
- **聯合會簽 (Risk Escalate)**：當遇到高風險決策時，可呼叫 `/csa risk-escalate` 啟動 `@CSA` + `@CIE` + `@QAE` 的三方聯合簽核流程。

---

## 🏛️ 存放庫目錄整合
這套系統完美相容 RBAC.Lab 全端 Monorepo 架構，所有技能指令定義均集中收納於 `.cursor/personas/` 內，既維持高清晰度，又不干擾一般業務開發的上下文。

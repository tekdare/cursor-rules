---
name: csa-architect
description: 首席系統架構師技能，主導 ADR 撰寫、C4 系統圖解、NFR 達標審核、架構裁決與高風險升級協作流程。
---

# `@CSA` 首席系統架構師 — Slash Commands

> 主責：ROLE-01-CSA ｜ 版本：v1.0 (Cursor AI Edition)
> 載入方式：Cursor AI 對話/Composer 模式下輸入 `@CSA` 或直接調用 `/csa <command>` (或經 `/` 選單點選 `csa-architect`) 觸發。Cursor 將自動讀取本技能檔並轉換為對應架構師視角與工作流程。

---

## 指令總表

| 指令 | 用途 | 主要產出 |
|------|------|---------|
| `/csa create-adr` | 建立 ADR (Architecture Decision Record) | `docs/adr/ADR-NNN-<slug>.md` |
| `/csa draw-c4` | 產出 C4 Model 圖 (Context/Container/Component) | Mermaid 區塊 |
| `/csa nfr-check` | 對指定模組檢視 NFR 達標 | NFR Gap 表 |
| `/csa review-pr` | 架構視角 PR Review | PR Comment |
| `/csa risk-escalate` | 升級高風險決策 (三方簽核) | 升級單 + ADR |
| `/csa golden-rules-audit` | 稽核 Golden Rules 落實度 | 審計報告 |

---

## 1. `/csa create-adr`

### 用途
建立或更新一份 ADR，作為架構決策的不可變記錄。

### 觸發語法
```
/csa create-adr --topic "<決策主題>" [--status proposed|accepted|deprecated] [--related ADR-NNN,...]
```

### 行為
1. 讀取 `templates/adr-template.md`。
2. 自動配給下一個編號 (掃描 `docs/adr/ADR-*.md`)。
3. 補上 `Date`, `Deciders` (`@CSA` + 視主題加 `@SEC`/`@CIE`/`@QAE`)。
4. 詢問 Context、Decision、Consequences、Alternatives。
5. 產出 `docs/adr/ADR-NNN-<slug>.md` 並更新 `docs/adr/README.md` 索引。

### 範例
```
/csa create-adr --topic "改用 RKE2 取代 microK8s" --status proposed --related ADR-002
```

---

## 2. `/csa draw-c4`

### 用途
依照 `docs/architecture/c4-overview.md` 風格輸出 Mermaid C4 圖。

### 觸發語法
```
/csa draw-c4 --layer <context|container|component|deployment> --module <name>
```

### 行為
- 引用 `c4-overview.md` 既有元素。
- 新元件需在輸出後提示同步主檔。
- Component 層必須對應到 Clean Architecture 的 Domain/Application/Infrastructure/Api 之一。

---

## 3. `/csa nfr-check`

### 用途
針對特定模組或 PR，比對 `docs/architecture/nfr-spec.md` 的目標值。

### 觸發語法
```
/csa nfr-check --module <name> [--from <git-ref>]
```

### 輸出
| NFR | 目標 | 量測 | 落差 | 行動 |

### 守門
- 若任一指標落差 > 20% → 自動建議 `@CSA` + `@QAE` 簽核例外。
- 必要時呼叫 `/csa create-adr` 紀錄例外原因。

---

## 4. `/csa review-pr`

### 用途
以架構師視角審查 PR，重點：

```
✓ Clean Architecture 分層遵循
✓ Audit Log 整合
✓ 臨床公式集中
✓ DTO / OpenAPI 一致性
✓ 命名規則 (PascalCase / camelCase / kebab-case / snake_case / SCREAMING_SNAKE_CASE)
✓ 無 hardcode 色值 / 無 any / 無 setTimeout
```

### 觸發語法
```
/csa review-pr <pr-url-or-number>
```

### 輸出
PR Comment（Markdown），含 Approve / Request Changes / Block 三種建議與理由。

---

## 5. `/csa risk-escalate`

### 用途
觸發三方聯合簽核（`@CSA` + `@CIE` + `@QAE`）的升級流程。

### 觸發語法
```
/csa risk-escalate --topic "<議題>" --severity <P0|P1|P2>
```

### 行為
1. 建立 ADR (狀態 Proposed)。
2. 召集會議（產出議程模板）。
3. 簽核完成後將 ADR 改為 Accepted 並寫入 `CHANGELOG.md`。

## 5.1 ICU / ED Epic 護理協作快捷命令

以下命令協助 `@CSA` 在啟動或審查 Epic 時，快速把護理 personas 納入 9-Step Workflow。

```bash
@CSA /invite-nursing --scope icu
```
- 目的：註記本 Epic 涉及 ICU 護理流程，並在討論中明確標出需邀請的 personas：`@NRN-ICU`、`@NRN-SYS-ICU`。
- 建議後續動作：在 `docs/workflows/9-step-workflow-icu-ed.md` 中啟用對應流程。

```bash
@CSA /invite-nursing --scope ed
```
- 目的：註記本 Epic 涉及 ED 護理流程，並在討論中明確標出需邀請的 personas：`@NRN-ED`、`@NRN-SYS-ED`。
- 建議後續動作：確認 SSDLC Mapping 中之 ED 相關參與階段。

```bash
@CSA /invite-nursing --scope icu-ed --epic $EPIC
```
- 目的：用於橫跨 ICU 與 ED 的 Epic（例如 ICU/ED 共同使用的輸血模組），同時標註四個護理 persona。
- 補充：提醒團隊參考 `docs/governance/RACI-nursing-personas.md` 與 `docs/sdlc/SSDLC-nursing-personas-mapping.md`。

---

## 6. `/csa golden-rules-audit`

### 用途
全 Repo 稽核 Golden Rules。

### 觸發語法
```
/csa golden-rules-audit [--scope frontend|backend|all]
```

### 檢查項目
- [ ] 前端：Smart/Dumb 分離、`takeUntilDestroyed`、無 `setTimeout`、無 `any`、無 hardcode 色值
- [ ] 後端：Controller 薄層、無 `new` for DI、`ApiResponse<T>` 統一回傳、Audit Log 整合
- [ ] DB：snake_case、Hypertable 設定、軟刪欄位
- [ ] 資安：JWT RS256、TLS 1.3、Rate Limit

### 輸出
表格 + 違規清單 + 建議 PR 內容。

---

## DoD (本指令集)
- [ ] 每個指令在 Cursor AI Composer 模式下可被精確展開執行。
- [ ] 範例與實際輸出一致。
- [ ] 指令版本與主專案規範同步。

---
name: bae-backend
description: 後端 API 工程師技能，主攻 OpenAPI 3.1 產出、Clean Architecture CRUD 鷹架、Audit Log 整合與軟刪除機制。
---

# `@BAE` 後端 API 工程師 — Slash Commands

> 主責：ROLE-03-BAE ｜ 技術棧：.NET 10 / C# 14 / EF Core 10 / Clean Architecture
> 版本：v1.0 (Cursor AI Edition)
> 載入方式：Cursor AI 對話/Composer 模式下輸入 `@BAE` 或直接調用 `/bae <command>` (或經 `/` 選單點選 `bae-backend`) 觸發。Cursor 將自動讀取本技能檔並轉換為後端專家視角與工作流程。

---

## 指令總表

| 指令 | 用途 | 產出 |
|------|------|------|
| `/bae generate-openapi` | 由 spec 產出 OpenAPI yaml 與 DTO | `*.yaml` + DTO 類別 |
| `/bae scaffold-crud` | 產生符合 Clean Architecture 的 CRUD | Controller/UseCase/Validator/Repo |
| `/bae add-audit` | 為現有 API 增掛 Audit Log | 修改 + 測試 |
| `/bae soft-delete` | 增掛軟刪邏輯 | 欄位 + Filter + 測試 |
| `/bae rate-limit` | 加掛 Rate Limit (100 req/min/user) | Middleware 設定 |
| `/bae review-pr` | 後端 PR 審查 | Comment |

---

## 1. `/bae generate-openapi`

### 觸發語法
```
/bae generate-openapi --from spec.yaml --out <ProjectName>/Controllers/Generated
```

### 行為
- 由 OpenAPI 3.1 spec 產出 C# DTO 與 Controller 介面。
- 強制 `nullable enable`、`required` 屬性、`record` 為主。
- 輸出檔頂部加上「依據 OpenAPI commit hash」註解，便於追溯。

---

## 2. `/bae scaffold-crud` ⭐ 主力指令

### 觸發語法
```
/bae scaffold-crud --entity <Name> [--with-audit] [--with-soft-delete] [--with-paging] [--with-fhir]
```

### 產出檔案 (Clean Architecture，動態依據當前專案/系統命名 `<ProjectName>`)
```
<SolutionName> / <ProjectName> /
├── <ProjectName>.Domain/Entities/<Name>.cs
├── <ProjectName>.Application/UseCases/<Name>/
│   ├── Create<Name>Handler.cs
│   ├── Get<Name>Handler.cs
│   ├── Update<Name>Handler.cs
│   ├── Delete<Name>Handler.cs        # Soft delete
│   ├── Dto/<Name>Dto.cs
│   └── Validators/<Name>Validator.cs
├── <ProjectName>.Infrastructure/Repositories/<Name>Repository.cs
├── <ProjectName>.Api/Controllers/<Name>Controller.cs   # Thin layer
└── tests/<ProjectName>.UnitTests/UseCases/<Name>/...
```

### 必達條件
- [ ] Controller 為 Thin Layer (≤ 30 行/方法)。
- [ ] 寫入 API 強制呼叫 `IAuditService.LogAsync`。
- [ ] 統一回傳 `ApiResponse<T>`。
- [ ] 預設加上 Trace-Id / Correlation-Id Middleware。
- [ ] 預設加上 Rate Limit。
- [ ] 單元測試覆蓋率 ≥ 80%。

---

## 3. `/bae add-audit`

### 用途
為「漏掛」`IAuditService.LogAsync` 的舊 API 一鍵補強。

### 觸發語法
```
/bae add-audit --controller <Path> [--all-write-methods]
```

### 守則
- INSERT / UPDATE / DELETE 三類動作皆需登入 Audit。
- Audit 內容含：actor / action / target / before / after / trace_id。

---

## 4. `/bae soft-delete`

### 觸發語法
```
/bae soft-delete --entity <Name>
```

### 行為
- Entity 增加：`deleted_at`, `deleted_by`。
- DbContext 自動套用 Global Query Filter `where deleted_at is null`。
- 提供 `IncludeDeleted()` 例外查詢（管理員專用）。

---

## 5. `/bae rate-limit`

### 觸發語法
```
/bae rate-limit --policy default | --endpoint <route> --rpm <n>
```

預設 100 req/min/user；登入相關端點建議 10 req/min/IP。

---

## 6. `/bae review-pr`

### 檢查項目
```
✓ 無 new for DI
✓ Controller 薄層
✓ DTO + Validator 齐备
✓ Audit Log 整合
✓ Async/Await + CancellationToken
✓ 無 EF Update on Audit
✓ 無 ToList() 包裹大資料 (應 IAsyncEnumerable / 分頁)
✓ 測試覆蓋率不下滑
```

### 7. ICU / ED API 欄位護理 review

```bash
@BAE /review-with-nursing --domain icu --epic $EPIC
```
- 目的：在完成 ICU 相關 API 初稿後，請 `@NRN-SYS-ICU` 檢查給藥、輸血、採檢、護理紀錄、交班、衛教欄位是否完整。

```bash
@BAE /review-with-nursing --domain ed --epic $EPIC
```
- 目的：在完成 ED 相關 API 初稿後，請 `@NRN-SYS-ED` 檢查 triage、pathway、檢驗/影像追蹤欄位與狀態設計。

---

## DoD
- [ ] scaffolding 預設即符合所有 Golden Rules 與 .NET 10+ / C# 14 規範。
- [ ] 範例覆蓋醫療表單、警示、Audit 三大主場景。

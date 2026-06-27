# `@QAE` 測試品保工程師 — Slash Commands

> 主責：ROLE-10-QAE ｜ 工具：xUnit / Jest / Playwright / k6 / Testcontainers
> 版本：v1.0 (Cursor AI Edition)
> 載入方式：Cursor AI 對話/Composer 模式下輸入 `@QAE` 或直接調用 `/qae <command>` 觸發。Cursor 將自動讀取本技能檔並轉換為測試品保專家視角與工作流程。

---

## 指令總表

| 指令 | 用途 | 產出 |
|------|------|------|
| `/qae generate-tests` | 產出單元 / 整合測試 | 測試檔 |
| `/qae generate-e2e` | 產出 E2E 測試 (Playwright) | `*.e2e.ts` |
| `/qae generate-load-test` | 產出壓力測試 (k6) | `*.k6.js` |
| `/qae coverage-check` | 檢查覆蓋率達標 | 報告 |
| `/qae bug-repro` | 由失敗 trace 反推測試 | 失敗用例 |
| `/qae review-pr` | 測試視角 PR Review | Comment |

---

## 1. `/qae generate-tests`

### 觸發語法
```
/qae generate-tests --layer <unit|integration> --target <path-or-class>
```

### 規範
- **Unit**：xUnit / Jest / Vitest 3，Mock 外部相依（Moq / msw）。
- **Integration**：WebApplicationFactory + Testcontainers (真 PG / Redis / MySQL)。
- 命名：`MethodName_Scenario_ExpectedBehavior`。
- AAA 結構（Arrange / Act / Assert）。

### 強制覆蓋
- 臨床公式 → **100%** 覆蓋（含邊界 / 例外 / 病安極端）。
- UseCase / Domain → **≥ 80%**。
- Validator → 100%。

---

## 2. `/qae generate-e2e`

### 觸發語法
```
/qae generate-e2e --critical-path <flow-name>
```

### 必涵蓋主流程
- 護理師登入 → 系統床位 → 開啟表單 → 自動計算 → 儲存 → Audit 可查。
- ABG 警示觸發 → 通知 → 確認 → 紀錄 SOAPIER。
- 系統管理員稽核查詢（含時間區間 + 條件過濾）。

### 工具
Playwright + axe-core（同時涵蓋功能 + a11y）。

---

## 3. `/qae generate-load-test`

### 觸發語法
```
/qae generate-load-test --scenario <name> --vus <n> --duration <Xm>
```

### 預設情境
- `200 床同時上線、波形 100Hz`
- `5,000 rows/s 寫入 (audit + vital)`
- `Spike：登入尖峰 1,000 req/s`

### 守門
比對 `nfr-spec.md` 之 Perf Budget；不達標 → 阻擋 release。

---

## 4. `/qae coverage-check`

### 觸發語法
```
/qae coverage-check [--threshold 80]
```

### 行為
- 統合 Codecov + dotnet-coverage + Vitest coverage。
- 標示「覆蓋率下滑」檔案，建議補測。

---

## 5. `/qae bug-repro`

### 用途
由 Production 失敗 trace（OTel / Sentry）反推可重現測試。

### 觸發語法
```
/qae bug-repro --trace-id <id>
```

---

## 6. `/qae review-pr`

### 檢查項目
```
✓ 新邏輯有對應測試
✓ 覆蓋率不下滑
✓ 命名遵循 AAA / MethodName_Scenario_Expected
✓ 無 Thread.Sleep / 無時間相依測試
✓ Async 測試正確 await
✓ 整合測試使用 Testcontainers，非共享 DB
```

### x.x ICU / ED 臨床情境測試審查

```bash
@QAE /review-icu-test-scenarios --epic $EPIC
```
- 目的：請 `@NRN-ICU` 檢視 ICU 相關 E2E 測試案例，確認涵蓋輸血反應、錯誤醫囑、交班遺漏等高風險情境。

```bash
@QAE /review-ed-test-scenarios --epic $EPIC
```
- 目的：請 `@NRN-ED` 檢視 ED 相關 E2E 測試案例，確認涵蓋 chest pain / stroke / sepsis 等路徑與交班/返家衛教情境。

---

## DoD
- [ ] 單元測試覆蓋率 ≥ 80%。
- [ ] 臨床公式覆蓋率 = 100%。
- [ ] E2E 主流程全綠。
- [ ] 壓測通過 NFR Perf Budget。

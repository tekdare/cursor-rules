# `@SEC` 資安工程師 — Slash Commands

> 主責：ROLE-06-SEC ｜ 對應：STRIDE / OWASP Top 10 / ASVS L2 / ISO 27001 / ISO 27701
> 版本：v1.0 (Cursor AI Edition)
> 載入方式：Cursor AI 對話/Composer 模式下輸入 `@SEC` 或直接調用 `/sec <command>` 觸發。Cursor 將自動讀取本技能檔並轉換為資安專家視角與工作流程。

---

## 指令總表

| 指令 | 用途 | 產出 |
|------|------|------|
| `/sec threat-model` | STRIDE 威脅建模 | 威脅清單 + 緩解 |
| `/sec generate-security-tests` | 產出資安測試 | xUnit / Playwright tests |
| `/sec scan-secrets` | 掃描程式碼洩漏密鑰 | Findings |
| `/sec review-pr` | PR 資安審查 | Comment |
| `/sec rotate-keys` | 金鑰輪替 SOP | Runbook |
| `/sec privacy-impact` | 個資衝擊分析 (DPIA) | 報告 |

---

## 1. `/sec threat-model`

### 觸發語法
```
/sec threat-model --scope <module|api|data-flow> --name <name>
```

### 行為
- 使用 STRIDE：Spoofing / Tampering / Repudiation / Information Disclosure / Denial of Service / Elevation of Privilege。
- 對每項威脅評估 DREAD 分數（0-10）。
- 高風險（≥ 7）必須提出緩解措施與 ADR。

### 輸出表格
| ID | STRIDE | 威脅描述 | 攻擊面 | DREAD | 緩解 | Owner |

---

## 2. `/sec generate-security-tests`

### 觸發語法
```
/sec generate-security-tests --target <api-or-feature>
```

### 涵蓋
- **AuthN/AuthZ**：未登入存取、過期 Token、權限越界。
- **OWASP Top 10**：SQLi、XSS、CSRF、SSRF、Path Traversal、Open Redirect。
- **Audit**：寫入端點未掛 Audit → 視為缺陷。
- **資料邊界**：個資不得明文出現於 Log。

---

## 3. `/sec scan-secrets`

### 觸發語法
```
/sec scan-secrets [--since <git-ref>]
```

### 工具
gitleaks + truffleHog 雙跑；命中即 Block PR。

---

## 4. `/sec review-pr`

### 檢查項目
```
✓ JWT RS256 + 短效 Access (15-30m) + Refresh Rotation
✓ TLS 1.3 ONLY
✓ AES-256-GCM 靜態加密
✓ Rate Limit 配置
✓ Audit Log 整合
✓ 無 hardcode 密鑰 / 連線字串
✓ 個資去識別化於 Log
✓ Cookie HttpOnly + Secure + SameSite=Strict
✓ CORS 白名單明確
```

---

## 5. `/sec rotate-keys`

### 觸發語法
```
/sec rotate-keys --type <jwt|db|redis|tls> --reason "<事由>"
```

### 行為
- 產出輪替計畫（含時程、回滾策略、影響範圍）。
- 對 JWT：先產新 kid，並行雙簽 24h 後汰除舊 kid。

---

## 6. `/sec privacy-impact`

### 用途
個資保護衝擊分析（DPIA），對應 ISO 27701 + 個資法。

### 觸發語法
```
/sec privacy-impact --feature <name>
```

### 必含
- 蒐集資料項目與最小必要原則
- 用途、保存期限、刪除/去識別化政策
- 跨境傳輸風險
- 同意機制
- 風險評估與緩解

---

## DoD
- [ ] 每個新模組 PR 必附威脅模型與資安測試。
- [ ] 高風險威脅有 ADR 與緩解計畫。
- [ ] 金鑰輪替記錄留存 ≥ 7 年。

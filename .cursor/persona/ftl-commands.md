# `@FTL` 前端技術領導 — Slash Commands

> 主責：ROLE-02-FTL ｜ 技術棧：Angular 20+ / Signals / Zoneless / PrimeNG 20+ / Tailwind v4
> 版本：v1.0 (Cursor AI Edition)
> 載入方式：Cursor AI 對話/Composer 模式下輸入 `@FTL` 或直接調用 `/ftl <command>` 觸發。Cursor 將自動讀取本技能檔並轉換為前端專家視角與工作流程。

---

## 指令總表

| 指令 | 用途 | 產出 |
|------|------|------|
| `/ftl scaffold-module` | 建立功能模組（Standalone + Facade） | TS 檔案群 |
| `/ftl generate-form-reactive` | 產出 Reactive Form（含臨床自動計算） | Form 元件 |
| `/ftl generate-facade` | 為既有模組產出 Signal Facade | `*.facade.ts` |
| `/ftl bundle-check` | 檢查 Bundle 大小是否超標 | Report |
| `/ftl a11y-check` | 可及性 (WCAG 2.1 AA) 檢查 | Report |
| `/ftl review-pr` | 前端 PR 審查 | Comment |

---

## 1. `/ftl scaffold-module`

### 觸發語法
```
/ftl scaffold-module --name <name> [--lazy] [--with-facade] [--with-signal-store]
```

### 產出
```
ClientApp/src/app/features/<name>/
├── <name>.routes.ts            # Standalone routes
├── <name>.facade.ts            # Signal-based facade
├── <name>.api.ts               # HttpClient wrapper
├── components/                 # Smart components
│   └── <name>-page.component.ts
├── ui/                         # Dumb components (no inject!)
└── models/<name>.types.ts      # 嚴禁 any
```

### 強制
- 採用 Standalone Components (`standalone: true`)。
- Routes 採 `loadChildren` 延遲載入。
- 預設加上 `OnPush` 變更檢測。

---

## 2. `/ftl generate-form-reactive` ⭐ 醫療場景主力

### 觸發語法
```
/ftl generate-form-reactive --entity <Name> [--with-auto-calc] [--with-history]
```

### 必達條件
- [ ] Reactive Forms（禁止 Template-Driven）。
- [ ] 同步 OpenAPI DTO 與 ValidatorFn。
- [ ] **臨床邊界值前後端雙重驗證**。
- [ ] 自動計算欄位（如 SF Ratio、OI）由共用 service 呼叫，**不在元件內重算**。
- [ ] 所有 Observable 加 `takeUntilDestroyed()`。
- [ ] 表單未儲存離開 → 二次確認對話框。

### 範例
```
/ftl generate-form-reactive --entity AbgRecord --with-auto-calc --with-history
```

---

## 3. `/ftl generate-facade`

### 用途
為既有模組導入 Signal-based Facade，作為唯一狀態入口。

### 觸發語法
```
/ftl generate-facade --module <name>
```

### 規則
- 僅 Smart Component 可注入 Facade。
- Dumb Component 透過 `@Input() model` / `@Output()` (或 Signals `model()`, `input()`) 與外界互動。

---

## 4. `/ftl bundle-check`

### 觸發語法
```
/ftl bundle-check [--budget initial:500kb,total:2mb]
```

### 行為
- 跑 `ng build --configuration production --stats-json`。
- 比對 Perf Budget；超標時：
  - 建議 lazy load 路由
  - 建議 PrimeNG modular import
  - 列出 Top-10 大檔案

---

## 5. `/ftl a11y-check`

### 觸發語法
```
/ftl a11y-check --route <path>
```

### 行為
- Playwright + axe-core 掃描。
- 重點：警示色彩對比、鍵盤導覽、焦點順序、ARIA labels。
- 對應 IEC 60601-1-8 顏色 + WCAG 2.1 AA。

---

## 6. `/ftl review-pr`

### 檢查項目
```
✓ Smart/Dumb 分離
✓ 無 inject() in Dumb component
✓ takeUntilDestroyed 釋放
✓ 無 setTimeout / setInterval
✓ 無 any 型別
✓ 無 hardcode 色值（使用 CSS Token）
✓ Signal-based State，無重型 NgRx (除非已 ADR)
✓ Bundle 不超標
```

### x.x 護理表單與流程的 UI Review

```bash
@FTL /review-ui-with-nursing --form icu-transfusion
```
- 目的：請 `@NRN-SYS-ICU` 檢查 ICU 輸血相關表單欄位順序、必填欄位與錯誤訊息是否符合臨床操作流程。

```bash
@FTL /review-ui-with-nursing --form ed-triage
```
- 目的：請 `@NRN-SYS-ED` 檢查 ED triage 介面之欄位配置、顏色/優先級與看板顯示是否符合急診護理實務。

---

## DoD
- [ ] scaffolding 預設符合 Golden Rules 與 Angular v20+ / ClientApp 架構。
- [ ] 醫療表單範本含 ABG、Vital、Daily Care 三類典型。

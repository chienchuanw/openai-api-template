# OpenAI API Connector

使用 Express.js （後端服務）建立的 OpenAI API 聊天機器人。

## 專案簡介

這個專案建立了一個簡單的 API 服務器，整合 OpenAI GPT-4o 模型，提供以下功能：

- 繁體中文聊天機器人
- 對話歷史記錄
- 自定義系統提示詞
- 回應內容過濾機制

## 快速開始

### 前置需求

- Node.js (建議版本 18 以上)
- pnpm
- OpenAI API Key

### 安裝步驟

1. **複製專案**

   ```bash
   git clone git@github.com:chienchuanw/openai-api-template.git
   cd openai-api-template
   ```

2. **進入服務器目錄並安裝依賴**

   ```bash
   cd server
   pnpm install
   ```

3. **設定環境變數**

   在 `server` 目錄下建立 `.env` 檔案：

   ```bash
   touch .env
   ```

   在 `.env` 檔案中加入您的 OpenAI API Key：

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **啟動服務器**

   ```bash
   pnpm run server
   ```

5. **驗證服務**

   服務器啟動後會在 `http://localhost:3000` 運行

   測試基本連線：

   ```bash
   curl http://localhost:3000/api/hello
   ```

## API 使用方式

### 1. 健康檢查

```http
GET /api/hello
```

**回應範例：**

```json
{
  "message": "Hello from Express!"
}
```

### 2. 聊天對話

```http
POST /api/chat
Content-Type: application/json

{
  "message": "你好，我是小明"
}
```

**回應範例：**

```json
{
  "reply": "Hi, 小明！，有什麼可以幫助的地方嗎？"
}
```

## 專案結構

```makefile
openai-api-connector/
├── README.md
└── server/
    ├── index.js          # 主要服務器檔案
    ├── package.json      # 專案依賴設定
    ├── pnpm-lock.yaml    # 鎖定版本檔案
    └── .env              # 環境變數（需自行建立）
```

## 常見問題

### Q: 如何取得 OpenAI API Key？

A: 前往 [OpenAI Platform](https://platform.openai.com/api-keys) 註冊帳號並建立 API Key

### Q: 服務器無法啟動怎麼辦？

A: 請檢查：

1. Node.js 版本是否符合需求
2. `.env` 檔案是否正確設定
3. OpenAI API Key 是否有效
4. 端口 3000 是否被其他程式佔用

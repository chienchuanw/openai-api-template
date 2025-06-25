const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Gemini AI 聊天服務
 * 提供簡單的對話功能，不包含複雜的記憶或角色設定
 */
class GeminiService {
  constructor() {
    // 初始化 Google Generative AI 客戶端
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // 使用 gemini-1.5-flash 模型（快速且經濟）
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  /**
   * 處理聊天請求
   * @param {string} message - 使用者訊息
   * @returns {Promise<string>} - AI 回應
   */
  async chat(message) {
    try {
      // 驗證訊息是否存在
      if (!message || typeof message !== 'string') {
        throw new Error('訊息內容不能為空');
      }

      // 呼叫 Gemini API 生成回應
      const result = await this.model.generateContent(message);
      const response = await result.response;
      
      // 取得回應文字
      const reply = response.text();
      
      return reply;
    } catch (error) {
      console.error('Gemini API 錯誤:', error);
      throw new Error('Gemini API 呼叫失敗');
    }
  }

  /**
   * 檢查 API Key 是否已設定
   * @returns {boolean} - 是否已設定 API Key
   */
  isConfigured() {
    return !!process.env.GEMINI_API_KEY;
  }
}

module.exports = GeminiService;

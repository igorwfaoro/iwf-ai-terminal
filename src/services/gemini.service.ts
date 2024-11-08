import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from './config.service';

export class GeminiService {
  constructor(
    private readonly configService: ConfigService = new ConfigService()
  ) {}

  public async query(prompt: string): Promise<string | void> {
    const apiKey = this.configService.get().apiKey;
    if (!apiKey) {
      console.log("API key not configured. Use 'ai-config' to set it.");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.error('Error querying Gemini:', error);
      return 'Sorry, there was an error processing your request.';
    }
  }
}

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} from '@google/generative-ai';
import { Inject, Service } from '../registry/service-registry';
import { ConfigService } from './config.service';

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  }
];

@Service()
export class AiGenerationService {
  @Inject(ConfigService)
  private readonly configService!: ConfigService;

  public async query(prompt: string): Promise<string | void> {
    const { geminiApiKey } = this.configService.get();

    if (!geminiApiKey) {
      console.log("API key not configured. Use 'ai-config' to set it.");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        safetySettings
      });

      const result = await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.error('Error querying Gemini:', error);
      return 'Sorry, there was an error processing your request.';
    }
  }
}

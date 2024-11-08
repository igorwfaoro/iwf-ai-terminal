import readline from 'readline';
import { Command } from '../registry/command-registry';
import { Inject } from '../registry/service-registry';
import { ConfigService } from '../services/config.service';
import { ExecutableCommand } from './contracts/executable-command';

@Command('ai-config')
export class AiConfigCommand implements ExecutableCommand {
  @Inject(ConfigService)
  private readonly configService!: ConfigService;

  public execute(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter your Gemini API key: ', (geminiApiKey) => {
      this.configService.set({ geminiApiKey });
      console.log('API key has been set.');
      rl.close();
    });
  }
}

import readline from 'readline';
import { Command } from './contracts/command';
import { ConfigService } from '../services/config.service';

export class AiConfigCommand extends Command {
  private readonly configService: ConfigService;

  constructor() {
    super();
    this.configService = new ConfigService();
  }

  public execute(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter your API key: ', (apiKey) => {
      this.configService.set({ apiKey });
      console.log('API key has been set.');
      rl.close();
    });
  }
}

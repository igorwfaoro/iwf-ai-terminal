import chalk from 'chalk';
import { sanitizePrompt } from '../helpers/prompt.helper';
import { Command } from './contracts/command';
import { GeminiService } from '../services/gemini.service';

export class AiCommand extends Command {
  private readonly geminiService: GeminiService;

  private readonly args: string[];

  constructor(args: string[]) {
    super();
    this.geminiService = new GeminiService();
    this.args = args;
  }

  public async execute(): Promise<void> {
    const command = this.args.join(' ');

    if (!command.startsWith('ai ')) {
      console.log("Unrecognized command. Use the prefix 'ai'.");
      return;
    }

    const userPrompt = command.slice(3);
    const sanitizedPrompt = sanitizePrompt(userPrompt);

    console.log(
      chalk.blue(`Querying Gemini with your prompt: "${userPrompt}"`)
    );

    const response = await this.geminiService.query(sanitizedPrompt);

    if (!response) {
      console.log(chalk.red('No response from Gemini.'));
      return;
    }

    console.log(chalk.green('\nGemini Response:'));
    console.log(
      chalk.gray(
        response
          .replace(/\*\*(.*?)\*\*/g, chalk.bold('$1'))
          .replace(/`(.*?)`/g, chalk.cyan('$1'))
      )
    );
  }
}

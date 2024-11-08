import chalk from 'chalk';
import { sanitizePrompt } from '../helpers/prompt.helper';
import { Command } from './contracts/command';
import { GeminiService } from '../services/gemini.service';
import { marked } from 'marked';
import { markedTerminal, TerminalRendererOptions } from 'marked-terminal';

marked.use(
  markedTerminal({
    code: chalk.gray,
    blockquote: chalk.gray,
    html: chalk.gray,
    heading: chalk.gray.bold,
    firstHeading: chalk.gray.bold,
    strong: chalk.gray.bold,
    em: chalk.gray.italic,
    listitem: chalk.gray,
    table: chalk.gray,
    paragraph: chalk.gray,
    link: chalk.cyan.underline,
  }) as any
);

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
    const prompt = `${sanitizePrompt(
      command
    )}\nPlease ALWAYS format your response in Markdown.`;

    console.log(chalk.blue('Querying Gemini...\n'));

    const response = await this.geminiService.query(prompt);

    if (!response) {
      console.log(chalk.red('No response from Gemini.'));
      return;
    }

    console.log(marked.parse(response));
  }
}

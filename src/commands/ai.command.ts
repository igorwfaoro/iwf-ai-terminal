import chalk from 'chalk';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import { EnvironmentHelper } from '../helpers/environment.helper';
import { LoaderHelper } from '../helpers/loader.helper';
import { Command } from '../registry/command-registry';
import { Inject } from '../registry/service-registry';
import { AiGenerationService } from '../services/ai-generation.service';
import { ExecutableCommand } from './contracts/executable-command';

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
    link: chalk.cyan.underline
  }) as any
);

@Command('ai')
export class AiCommand implements ExecutableCommand {
  @Inject(AiGenerationService)
  private readonly aiGenerationService!: AiGenerationService;

  public async execute(args: string[]): Promise<void> {
    const command = args.join(' ');

    const {
      getOs,
      getCurrentDir,
      getShell,
      getDesktopSession,
      getTermType,
      getLanguage,
      getUsername
    } = EnvironmentHelper;

    const prompt = `${command}

      CONTEXT:
      - Running terminal on ${getOs()};
      - Current directory: ${getCurrentDir()};
      - Shell: ${getShell()};
      - Desktop session: ${getDesktopSession()};
      - Terminal type: ${getTermType()};
      - Language: ${getLanguage()};
      - Logged in as: ${getUsername()};

      INSTRUCTIONS:
      - Always format response in Markdown;
      - Be concise and to the point;
      - Prioritize command examples, avoid extra explanations;
    `;

    const spinner = LoaderHelper.startSpinner();

    const response = await this.aiGenerationService.query(prompt);

    LoaderHelper.stopSpinner(spinner, '----\n');

    if (!response) {
      console.log(chalk.red('No response.'));
      return;
    }

    console.log((marked.parse(response) as string).trim());
  }
}

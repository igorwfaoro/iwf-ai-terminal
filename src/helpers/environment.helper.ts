const ENVIRONMENT_MAP: { [key: string]: string } = {
  VSCODE_CWD: 'Visual Studio Code',
  TERMINAL_EMULATOR: 'JetBrains (IntelliJ, WebStorm, etc.)',
  TMUX: 'tmux',
  SSH_CONNECTION: 'SSH session'
};

export abstract class EnvironmentHelper {
  public static getOs(): string {
    return process.platform;
  }

  public static getCurrentDir(): string {
    return process.cwd();
  }

  public static getShell(): string {
    return process.env.SHELL || 'unknown shell';
  }

  public static getDesktopSession(): string {
    return process.env.DESKTOP_SESSION || 'unknown session';
  }

  public static getTermType(): string {
    return process.env.TERM || 'unknown terminal';
  }

  public static getLanguage(): string {
    return process.env.LANG || 'unknown language';
  }

  public static getUsername(): string {
    return process.env.USER || process.env.LOGNAME || 'unknown user';
  }
}

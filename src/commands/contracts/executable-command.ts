export interface ExecutableCommand {
  execute(args?: string[]): Promise<void> | void;
}

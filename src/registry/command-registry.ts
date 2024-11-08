import { ExecutableCommand } from '../commands/contracts/executable-command';

export class CommandRegistry {
  private static registry = new Map<string, ExecutableCommand>();

  public static register(commandName: string, command: ExecutableCommand) {
    this.registry.set(commandName, command);
  }

  public static get(commandName: string): ExecutableCommand | undefined {
    return this.registry.get(commandName);
  }
}

export const Command = (commandName: string) => {
  return function (constructor: new () => ExecutableCommand) {
    CommandRegistry.register(commandName, new constructor());
  };
};

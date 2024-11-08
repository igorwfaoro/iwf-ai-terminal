#!/usr/bin/env node

import path from 'path';
import { AiConfigCommand } from './commands/ai-config.command';
import { AiCommand } from './commands/ai.command';
import { Command } from './commands/contracts/command';

type CommandRunner = (args?: string[]) => Command;

const commandName = path.basename(process.argv[1]);
const args = process.argv.slice(2);

const commands: { [key: string]: CommandRunner } = {
  'ai-config': () => new AiConfigCommand(),
  ai: (args?: string[]) => new AiCommand(args!),
};

commands[commandName](args).execute();

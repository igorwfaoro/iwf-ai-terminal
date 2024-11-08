#!/usr/bin/env node

import path from 'path';
import { Bootstrap } from './bootstrap';
import { CommandRegistry } from './registry/command-registry';

Bootstrap.load();

const commandName = path.basename(process.argv[1]);
const args = process.argv.slice(2);

const command = CommandRegistry.get(commandName);

if (command) {
  command.execute(args);
}

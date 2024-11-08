import fs from 'fs';
import path from 'path';

const configPath = path.resolve(__dirname, '../../config.json');

interface Config {
  apiKey?: string;
}

export class ConfigService {
  public get(): Config {
    if (!fs.existsSync(configPath)) {
      return {};
    }
    const configData = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configData);
  }

  public set(newConfig: Config) {
    const config = { ...this.get(), ...newConfig };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}

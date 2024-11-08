import fs from 'fs';
import path from 'path';
import { Service } from '../registry/service-registry';

const configPath = path.resolve(__dirname, '../../config.json');

interface Config {
  geminiApiKey?: string;
}

@Service()
export class ConfigService {
  public get(): Config {
    if (!fs.existsSync(configPath)) {
      return {};
    }
    
    const configData = fs.readFileSync(configPath, { encoding: 'utf-8' });
    return configData ? JSON.parse(configData) : {};
  }

  public set(newConfig: Config) {
    const config = { ...this.get(), ...newConfig };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), {
      encoding: 'utf-8'
    });
  }
}

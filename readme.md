# IWF AI Terminal

An AI-powered terminal tool built for personalized and adaptable command-line assistance using Google's Generative AI.
This project was inspired by other similar tools, but it was developed to allow more customization over time.
Contributions are welcome!

## Features

- **Customizable Commands**: Easily extendable to add more commands as needed.
- **Dependency Injection**: Simple service management for handling dependencies in a modular fashion.
- **Environment Context**: Gathers environment context (e.g., OS, shell, session) to improve AI response relevance.

## Requirements

- Node.js (v18 or later recommended)
- Gemini API Key (Google Generative AI)

## Installation

```bash
npm i -g iwf-ai-terminal
```

## Setting Up API Key

To access AI capabilities, you must configure your Google Gemini API key.

1. Run the configuration command:

   ```bash
   ai-config
   ```

2. Enter your Gemini API key when prompted.

Your API key will be saved locally in a `config.json` file (excluded from source control by `.gitignore`).

## Usage

Run the AI-powered command:

```bash
ai <your-query>
```

For example:

```bash
ai how to find process ID on port 80
```

This will send your prompt to the configured AI model, providing a response in the terminal.

## Command Structure

- **ai**: The main command for querying the AI model with a custom prompt.
- **ai-config**: Configure your Gemini API key.

## Project Structure

- **src/commands**: Contains command classes like `ai` and `ai-config`, each implementing the `ExecutableCommand` interface.
- **src/services**: Service classes like `AiGenerationService` and `ConfigService`, managed by a dependency injection system.
- **src/helpers**: Utility classes such as `EnvironmentHelper`.
- **src/registry**: Manages command and service registration with decorators.

## Contributing

Feel free to submit issues and pull requests to improve the tool. Contributions are encouraged!

## License

This project is licensed under the ISC License.

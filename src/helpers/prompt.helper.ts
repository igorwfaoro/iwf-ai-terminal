export function sanitizePrompt(prompt: string): string {
    return prompt
      .replace(/kill/g, 'terminate')
      .replace(/process/g, 'task')
      .replace(/view/g, 'list')
      .replace(/dir/g, 'directory')
      .replace(/oculted|hidden/g, 'hidden')
      .concat('. Please respond concisely.');
  }
  
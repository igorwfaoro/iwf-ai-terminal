export abstract class LoaderHelper {
  public static startSpinner(): NodeJS.Timeout {
    const frames = ['|', '/', '-', '\\'];
    let i = 0;

    return setInterval(() => {
      process.stdout.write(`\r${frames[i++ % frames.length]}`);
    }, 100);
  }

  public static stopSpinner(
    spinner: NodeJS.Timeout,
    content: string = ''
  ): void {
    clearInterval(spinner);
    process.stdout.write(`\r${content}\n`);
  }
}

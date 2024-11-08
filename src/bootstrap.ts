import { glob } from 'glob';
import { extname, join, relative } from 'path';

export abstract class Bootstrap {
  public static load(): void {
    const files = glob.sync(
      join(process.cwd(), 'src', '**/*.{service,command}.{ts,js}')
    );

    files.forEach((file) => {
      const pathWithoutExtension = file.slice(0, -extname(file).length);
      const relativePath = `./${relative(join(process.cwd(), 'src'), pathWithoutExtension)}`;

      require(relativePath);
    });
  }
}

import { JsonLogOptions } from "./models/json-log-options";
import { JsonLogOptionsFactory } from "./json-log-options-factory";
import { JsonLogFormatter as JsonLogParser } from "./json-log-parser";
import { JsonLogPrinter } from "./json-log-printer";
import fs from "fs";

export class JsonLogViewer {
  constructor(
    private optionsFactory = new JsonLogOptionsFactory(),
    private logParser = new JsonLogParser(),
    private logPrinter = new JsonLogPrinter()
  ) {}

  async main(args: string[]): Promise<void> {
    var options = await this.optionsFactory.getOptions(args);

    await this.loadAndPrint(options);
    fs.watchFile(options.filePath, async () => {
      await this.loadAndPrint(options);
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", process.exit.bind(process, 0));
  }

  private async loadAndPrint(options: JsonLogOptions) {
    var file = await fs.promises.readFile(options.filePath, "utf8");
    var logs = this.logParser.parseAll(file, options);
    this.logPrinter.print(logs, options);
    console.log("Press any key to exit");
  }
}

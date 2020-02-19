import { JsonLogOptionsFactory } from "./json-log-options-factory";
import { JsonLogFormatter as JsonLogParser } from "./json-log-parser";
import { JsonLogPrinter } from "./json-log-printer";
import fs from "fs";

export class JsonLogViewer {
  constructor(
    private optionsFactory: JsonLogOptionsFactory = new JsonLogOptionsFactory(),
    private logParser: JsonLogParser = new JsonLogParser(),
    private logPrinter: JsonLogPrinter = new JsonLogPrinter()
  ) {}

  async main(args: string[]): Promise<void> {
    var options = await this.optionsFactory.getOptions(args);
    var file = await fs.promises.readFile(options.filePath, "utf8");
    var logs = this.logParser.parseAll(file, options);
    this.logPrinter.print(logs, options);
  }
}

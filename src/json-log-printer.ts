import { JsonLogOptions } from "./models/json-log-options";
import chalk from "chalk";

export class JsonLogPrinter {
  print(logs: string[][], options: JsonLogOptions): void {
    var prettyLogs = logs.map(log => {
      if (log.length == 1 && log[0] == "Error") return chalk.keyword("red")(log[0]);
      let logLine = "";
      log.forEach((logColumn, i) => {
        let color = options.colors && options.colors.length >= i ? options.colors[i] : undefined;
        console.log(options);
        logLine += color ? chalk.keyword(color)(logColumn) : logColumn;
      });
      return logLine;
    });
    prettyLogs.forEach(prettyLog => console.log(prettyLog));
  }
}

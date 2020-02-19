import { JsonLogOptions } from "./models/json-log-options";
import chalk from "chalk";

export class JsonLogPrinter {
  print(logs: string[][], options: JsonLogOptions): void {
    logs.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        let chalkFn;
        if (options.colors && options.colors.length > colIdx)
          chalkFn = (chalkFn ?? chalk).keyword(options.colors[colIdx]);
        if (options.bgColors && options.bgColors.length > colIdx)
          chalkFn = (chalkFn ?? chalk).bgKeyword(options.bgColors[colIdx]);
        if (chalkFn) logs[rowIdx][colIdx] = chalkFn(col);
      });
    });
    console.clear();
    console.log(logs.map(row => row.join(" | ")).join("\n"));
  }
}

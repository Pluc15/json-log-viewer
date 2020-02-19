import { JsonLogOptions } from "./models/json-log-options";
import jmespath from "jmespath";

export class JsonLogFormatter {
  parseAll(logContent: string, options: JsonLogOptions): string[][] {
    return logContent
      .split("\n")
      .map(json => json.trim())
      .filter(json => json)
      .map(json => this.parse(json, options));
  }

  private parse(json: string, options: JsonLogOptions): string[] {
    try {
      return jmespath.search(JSON.parse(json), options.jmespath);
    } catch {
      return ["Error"];
    }
  }
}

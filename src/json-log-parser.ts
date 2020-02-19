import { JsonLogOptions } from "./models/json-log-options";
import jmespath from "jmespath";

export class JsonLogFormatter {
  parseAll(logContent: string, options: JsonLogOptions): string[][] {
    return logContent
      .split("\n")
      .map(json => json.trim())
      .filter(json => json)
      .reverse()
      .slice(0, options.maxLines)
      .map(json => this.parse(json, options));
  }

  private parse(json: string, options: JsonLogOptions): string[] {
    return jmespath.search(JSON.parse(json), options.jmespath);
  }
}

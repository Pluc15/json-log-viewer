import { JsonLogOptions } from "./models/json-log-options";
import fs from "fs";
import minimist from "minimist";
import path from "path";
import util from "util";

const exists = util.promisify(fs.exists);

export class JsonLogOptionsFactory {
  async getOptions(args: string[]): Promise<JsonLogOptions> {
    var cliOptions = this.parseArguments(args);
    var fileOptions = await this.getOptionsFromConfigFile(cliOptions.filePath);
    var result = Object.assign({}, fileOptions, cliOptions);
    if (!(await exists(result.filePath))) throw new Error(`File '${result.filePath}' not found`);
    if (result.jmespath == null) throw new Error("--jmespath required");
    return result;
  }

  private async getOptionsFromConfigFile(forLogFilePath: string) {
    const configPath = path.join(path.dirname(forLogFilePath), ".jsonlogviewer.json");
    const configExists = await exists(configPath);
    if (!configExists) return null;
    const configFile = await fs.promises.readFile(configPath, "utf8");
    const configFileJson = JSON.parse(configFile) as JsonLogOptions;
    return configFileJson;
  }

  private parseArguments(args: string[]): JsonLogOptions {
    var obj = minimist(args);
    let result = {} as JsonLogOptions;
    if (obj._ && obj._.length > 0) result.filePath = path.resolve(obj._[0]);
    if (obj.jmespath) result.jmespath = obj.jmespath;
    if (obj.colors) result.colors = (obj.colors as string).split(",").map(color => color.trim());
    if (obj.bgColors) result.bgColors = (obj.bgColors as string).split(",").map(color => color.trim());
    return result;
  }
}

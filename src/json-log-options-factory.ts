import { JsonLogOptions } from "./models/json-log-options";
import fs from "fs";
import minimist from "minimist";
import os from "os";
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
    let configPath = path.join(path.dirname(forLogFilePath));
    return (
      (await this.tryGetOptionsFromConfigFile(configPath)) ??
      (await this.tryGetOptionsFromConfigFile((configPath = path.dirname(configPath)))) ??
      (await this.tryGetOptionsFromConfigFile((configPath = path.dirname(configPath)))) ??
      (await this.tryGetOptionsFromConfigFile((configPath = path.dirname(configPath)))) ??
      (await this.tryGetOptionsFromConfigFile(process.cwd())) ??
      (await this.tryGetOptionsFromConfigFile(os.homedir()))
    );
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

  private async tryGetOptionsFromConfigFile(pathToConfigDirectory: string) {
    const pathToConfigFile = path.join(pathToConfigDirectory, ".jsonlogviewer.json");
    const configExists = await exists(pathToConfigFile);
    if (!configExists) return null;
    const configFile = await fs.promises.readFile(pathToConfigFile, "utf8");
    const configFileJson = JSON.parse(configFile) as JsonLogOptions;
    return configFileJson;
  }
}

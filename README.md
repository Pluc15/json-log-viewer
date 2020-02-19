# JsonLogViewer

## Installation

```bash
npm i -g
npm i ts-node -g
```

## Usage

```bash
jlv path/to/log/file.logs --jmespath [some,jmespath,query]
```

## Configuration

Next to your log file, you can create a `.jsonlogviewer.json` configuration file with the following format:

```json
{
  "jmespath": "[some,and.here]",
  "colors": ["red", "green"],
  "bgColors": ["grey", "yellow"]
}
```

Every log in the same folder as this config will now use those options.

## Roadmap

Done so far

- Parse CLI arguments
- Load config from file
- Apply colors
- Apply jmespath query
- Format in a nice table (still a lot of improvements to be done)
- File watcher
- Check parents for config file
- Check CWD for config file
- Check home for config file

TODO

- Max line
- Invert order
- Build it so you dont have to `npm i ts-node -g`
- Check for config filename with the log filename in it to allow different logs in the same folder to have different configurations (format TBD)
- Conditionnal coloring

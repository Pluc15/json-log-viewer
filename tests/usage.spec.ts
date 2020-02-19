import { JsonLogViewer } from "../src/json-log-viewer";
import path from "path";

test("run", async () => {
  var result = await new JsonLogViewer().main([
    path.join(process.cwd(), "tests", "assets", "logfile.json"),
    "--jmespath",
    "[some,and.here]"
  ]);
  expect(result).toMatchInlineSnapshot(`undefined`);
});

#!/usr/bin/env ts-node

import { JsonLogViewer } from "./src/json-log-viewer";

new JsonLogViewer().main(process.argv.slice(2)).catch(console.error);

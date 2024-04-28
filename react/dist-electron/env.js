"use strict";
const path = require("path");
const os = require("os");
process.env.DIST_ELECTRON = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
process.env.TYPE = os.type();
process.env.TEMP_DIR = os.tmpdir();
process.env.PLATFORM = os.platform();
//# sourceMappingURL=env.js.map

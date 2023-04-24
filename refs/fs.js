const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const base = path.join(__dirname, "temp");

const getContent = () => `
${process.argv[2] ?? ""}`;

async function wrap() {
  try {
    if (fsSync.existsSync(base)) {
      await fs.appendFile(path.join(base, "logs.txt"), getContent());
      const data = await fs.readFile(path.join(base, "logs.txt"), {
        encoding: "utf-8",
      });
      console.log(data);
    } else {
      await fs.mkdir(base);
      await fs.writeFile(path.join(base, "logs.txt"), process.argv[2] ?? "");
    }
  } catch (err) {
    console.log("err", err);
  }
}
wrap();

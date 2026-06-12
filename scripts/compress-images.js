const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = "./public";

(async () => {
  const files = fs.readdirSync(publicDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const input = path.join(publicDir, file);
    const output = input + ".tmp";

    try {
      await sharp(input)
        .resize({
          width: 1920,
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 78,
          mozjpeg: true,
        })
        .toFile(output);

      fs.unlinkSync(input);
      fs.renameSync(output, input);

      console.log("✓", file);
    } catch (err) {
      console.log("Errore:", file);
    }
  }

  console.log("Compressione completata");
})();

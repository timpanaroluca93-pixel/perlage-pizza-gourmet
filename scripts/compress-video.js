const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

const input = "public/perlage-hero.mp4";
const backup = "public/perlage-hero-original.mp4";
const output = "public/perlage-hero-compressed.mp4";

if (!fs.existsSync(backup)) {
  fs.copyFileSync(input, backup);
}

ffmpeg(input)
  .videoCodec("libx264")
  .outputOptions([
    "-preset slow",
    "-crf 26",
    "-movflags +faststart",
    "-vf scale='min(1920,iw)':-2",
    "-an"
  ])
  .save(output)
  .on("end", () => {
    fs.renameSync(output, input);
    console.log("Video compresso completato");
  })
  .on("error", (err) => {
    console.error("Errore:", err.message);
  });

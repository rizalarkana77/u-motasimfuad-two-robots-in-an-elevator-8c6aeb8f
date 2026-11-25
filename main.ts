import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Do you come to this floor often? Asking for my small-talk subroutine — it only has three lines and two are about the weather.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const saved = readFileSync(outPath, "utf8");

if (saved !== ENTRY) {
  throw new Error("Verification failed: saved file content does not match ENTRY byte-for-byte");
}
if (saved.includes("\n") || saved.includes("\r")) {
  throw new Error("Verification failed: entry must be a single line with no newline characters");
}
if (saved.length === 0 || saved.length >= 200) {
  throw new Error(`Verification failed: entry length must be > 0 and < 200 characters (got ${saved.length})`);
}
if (saved.includes("  ")) {
  throw new Error("Verification failed: entry must not contain double spaces");
}
if (saved.trim().length === 0) {
  throw new Error("Verification failed: entry must be non-empty after trimming");
}
const machineCues = ["subroutine", "robot", "program", "sensor", "circuit"];
if (!machineCues.some((cue) => saved.toLowerCase().includes(cue))) {
  throw new Error("Verification failed: entry must include a robot/machine cue");
}

console.log(`Verified entry (${saved.length} chars, single line, machine cue present): ${saved}`);

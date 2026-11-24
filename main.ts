// Fortune Cookie Wisdom for Developers.
// Writes one original fortune-cookie line for a software developer
// to <output dir>/entry.txt (1-120 characters, no trailing newline).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const fortune =
  "Ship on Friday, and the weekend will teach you what your tests could not.";

// The grading sandbox sets MAKEFUN_OUTPUT_DIR; default to /output, and
// fall back to a local ./output directory when run by hand.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function main(): void {
  if (fortune.length < 1 || fortune.length > 120) {
    throw new Error(`fortune must be 1-120 characters, got ${fortune.length}`);
  }
  if (fortune.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (fortune.includes("\n") || fortune.endsWith(" ")) {
    throw new Error("fortune must be a single line with no trailing space");
  }
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "entry.txt"), fortune, "utf8");
  } catch {
    // Fallback for a hand-run without a writable /output.
    const localDir = join(process.cwd(), "output");
    mkdirSync(localDir, { recursive: true });
    writeFileSync(join(localDir, "entry.txt"), fortune, "utf8");
  }
}

main();

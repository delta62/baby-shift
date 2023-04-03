import * as esbuild from "esbuild";
import copy from "esbuild-plugin-copy";
import clean from "esbuild-plugin-clean";

await esbuild.build({
  entryPoints: ["src/index.ts", "src/sw.ts"],
  bundle: true,
  minify: true,
  outdir: "dist",
  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./static/**/*"],
        to: ["dist"],
      },
      copyOnStart: true,
    }),
    clean({
      patterns: ["./dist"],
    }),
  ],
});

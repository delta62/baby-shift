import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/script.ts", "src/sw.ts"],
  bundle: true,
  minify: true,
  outdir: "dist",
});

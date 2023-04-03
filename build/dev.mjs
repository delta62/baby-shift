import * as esbuild from "esbuild";
import copy from "esbuild-plugin-copy";
import clean from "esbuild-plugin-clean";

let ctx = await esbuild.context({
  entryPoints: ["src/index.ts", "src/sw.ts"],
  bundle: true,
  outdir: "dist",
  sourcemap: true,
  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./static/**/*"],
        to: ["dist"],
        watch: true,
      },
      watch: true,
      copyOnStart: true,
    }),
    clean({
      patterns: ["./dist"],
    }),
  ],
});

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: "dist",
  host: "127.0.0.1",
  port: 8080,
});

console.log(`listening on ${host}:${port}`);

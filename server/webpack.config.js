import { resolve as _resolve } from "path";

export const entry = "./server.mjs";
export const target = "node";
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "server.bundle.js",
};
export const resolve = {
  extensions: [".mjs", ".js"],
};
export const module = {
  rules: [
    {
      // Apply Babel to .mjs and .js files
      test: /\.(mjs|js)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          // Presets for Babel to transpile modern JS to ES5
          presets: ["@babel/preset-env"],
        },
      },
    },
  ],
};

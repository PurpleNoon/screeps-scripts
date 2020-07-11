/*
 * @Author: zhangzemeng
 * @Date: 2020-07-11 22:17:08
 * @LastEditors: zhangzemeng
 * @LastEditTime: 2020-07-11 22:17:39
 * @PersonalSignature: JavaScript is the best language!
 */
"use strict";

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if ((cfg = require("./screeps.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
}

export default {
  input: "src/main.ts",
  output: {
    file: "default/main.js",
    format: "cjs",
    sourcemap: true
  },

  plugins: [
    clear({ targets: ["default"] }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    screeps({ config: cfg, dryRun: cfg == null })
  ]
}

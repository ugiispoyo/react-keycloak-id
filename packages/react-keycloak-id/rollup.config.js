import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";

const global = {
    preserveEntrySignatures: true,
    plugins: [
        postcss({
            extensions: [".css"],
        }),
        url(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
        }),
    ],
};

const config = [
    {
        input: "src/index.tsx",
        output: {
            compact: true,
            minifyInternalExports: true,
            exports: "auto",
            dir: "dist",
            format: "es",
        },
        external: ["react", 'keycloak-js'],
        ...global
    },
];

export default config;

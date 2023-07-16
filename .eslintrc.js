module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: "plugin:react/recommended",
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {},
};

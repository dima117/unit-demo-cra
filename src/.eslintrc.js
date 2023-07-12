module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    }, 
    "extends": [
        // "standard-with-typescript",
        // "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "*.ts",
                "*.tsx"
            ],
            "parserOptions": {
                "sourceType": "script",
                "project": [ "../tsconfig.json" ],
                "sourceType": "module",
                "tsconfigRootDir": __dirname,
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}

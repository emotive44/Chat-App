/* eslint-disable */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                singleQuote: true,
                endOfLine:"auto"
            },
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        ...require("eslint-config-prettier").rules,
        ...require("eslint-config-prettier/@typescript-eslint").rules,  
    },
};

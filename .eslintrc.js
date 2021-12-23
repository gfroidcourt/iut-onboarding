module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            { SwitchCase: 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-trailing-spaces": 2,
        "eol-last": 2,
        "semi": 2,
        "space-before-blocks": 2,
        "arrow-spacing": [2, { "before": true, "after": true }],
        "space-before-function-paren": [2, {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "template-curly-spacing": 2,
        "eqeqeq": [2, "smart"],
        "space-infix-ops": 2,
        "quotes": [2, "double"],
        "object-shorthand": 2,
        "prefer-destructuring": [2, { "object": true, "array": false }],
        "prefer-template": 2,
        "no-unused-vars": 1,
    },
};

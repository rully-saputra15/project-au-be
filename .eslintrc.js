module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        camelcase: 'off',
        'import/no-import-module-exports': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    },
};

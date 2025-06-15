module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'react-app',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', 'simple-import-sort'],
    rules: {
        'prettier/prettier': 'warn',

        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',

        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
}

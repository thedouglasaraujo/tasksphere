module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'react-app', // integrações do Create React App
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended', // ativa o Prettier
    ],
    plugins: ['react', 'simple-import-sort'],
    rules: {
        // Prettier
        'prettier/prettier': 'warn',

        // Ordenação de imports
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',

        // Regras adicionais (opcional)
        'react/react-in-jsx-scope': 'off', // desnecessário no React 17+
        'react/prop-types': 'off', // se você não estiver usando PropTypes
    },
}

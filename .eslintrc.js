module.exports = {
    env: {
        browser: true,
        amd: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'max-len': [
            'error',
            100,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],

        'no-trailing-spaces': 'error',

        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',

        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 0,

        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'unknown',
                ],
                pathGroups: [
                    { pattern: 'src/**', group: 'internal' },
                    {
                        pattern: '+(react|react-*)',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '+(zustand)',
                        group: 'external',
                        position: 'before',
                    },
                    { pattern: '**.scss', group: 'unknown', position: 'after' },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'never',
            },
        ],

        'react/jsx-curly-brace-presence': ['error', 'never'],
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/prop-types': 0,
    },
    overrides: [],
};

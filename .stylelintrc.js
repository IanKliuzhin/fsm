module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-idiomatic-css',
        'stylelint-prettier/recommended',
    ],
    plugins: ['stylelint-prettier', 'stylelint-order'],
    rules: {
        'declaration-colon-newline-after': null,
        'value-list-comma-newline-after': null,
        'no-descending-specificity': null,

        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'keyframes-name-pattern': null,
        'scss/at-mixin-pattern': null,
        'scss/dollar-variable-pattern': null,

        'scss/dollar-variable-empty-line-before': null,

        'scss/double-slash-comment-empty-line-before': null,
    },
};

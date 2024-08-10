import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	
      // indentation (Already present in TypeScript)
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { afterColon: true }],
	
      // indentation (Already present in TypeScript)
      'indent': ['error', 2, { SwitchCase: 1 }],
	
      // Enforce trailing comma (Already present in TypeScript)
      'comma-dangle': ['error', 'always-multiline'],
	
      // Enforce consistent spacing inside braces of object (Already present in TypeScript)
      'object-curly-spacing': ['error', 'always'],
	
      // Disable max-len
      'max-len': 'off',
	
      // we don't want it
      'semi': ['error', 'never'],
	
      // add parens ony when required in arrow function
      'arrow-parens': ['error', 'as-needed'],
	
      // add new line above comment
      'newline-before-return': 'error',
	
      // add new line above comment
      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      'array-element-newline': ['error', 'consistent'],
      'array-bracket-newline': ['error', 'consistent'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'expression', next: 'const' },
        { blankLine: 'always', prev: 'const', next: 'expression' },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
        { blankLine: 'always', prev: '*', next: 'multiline-const' },
      ],
	
      // Plugin: 	
      'no-restricted-imports': ['error', 'vuetify/components'],
      'no-shadow': 'off',
	
      // ESLint plugin vue
      'vue/block-tag-newline': 'error',
      'vue/component-api-style': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/custom-event-name-casing': [
        'error',
        'camelCase',
        {
          ignores: ['/^(click):[a-z]+((d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/'],
        },
      ],
      'vue/define-macros-order': 'error',
      'vue/html-comment-content-newline': 'error',
      'vue/html-comment-content-spacing': 'error',
      'vue/html-comment-indent': 'error',
      'vue/match-component-file-name': 'error',
      'vue/no-child-content': 'error',
      'vue/require-default-prop': 'off',
      'vue/no-empty-component-block': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-reserved-component-names': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/v-on-function-call': 'error',
      'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/'],
      'vue/valid-v-slot': [
        'error',
        {
          allowModifiers: true,
        },
      ],
      "vue/multi-word-component-names": ["error", {
        "ignores": ['index', 'home', '[id]']
      }],
	
      // -- Extension Rules
      'vue/no-irregular-whitespace': 'error',
      'vue/template-curly-spacing': 'error',
    },
    ignores: [
      '.vscode',
      'dist',
      'coverage',
      'node_modules',
      '*.d.ts',
    ],
  },
)
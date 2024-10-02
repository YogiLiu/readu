import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import solidPlugin from 'eslint-plugin-solid'

export default [
  { files: ['src/**/*.{ts,tsx}'] },
  { ignores: ['styled-system/', '.vinxi/', '.output/'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  solidPlugin.configs['flat/typescript'],
  eslintConfigPrettier,
]

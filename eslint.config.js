// import js from '@eslint/js';
// import globals from 'globals';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import tseslint from 'typescript-eslint';
// import { globalIgnores } from 'eslint/config';
// import prettier from 'eslint-plugin-prettier'; // <-- Import prettier

// export default tseslint.config([
//   globalIgnores(['dist']),
//   {
//     extends: [
//       js.configs.recommended,
//       ...tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     files: ['**/*.{ts,tsx,mjs,js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       prettier: prettier,
//     },
//     rules: {
//       'prettier/prettier': 'error',
//       '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
//       'react-refresh/only-export-components': 'off',

//       'react-hooks/exhaustive-deps': 'off',
//     },
//   },
// ]);

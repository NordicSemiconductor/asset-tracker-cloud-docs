import config from '@bifravst/eslint-config-typescript'
export default [
	...config,
	{
		ignores: [
			'sphinx_ncs_theme/**',
			'build/**',
			'dist/**',
			'scripts/headline-fixer.js',
		],
	},
]

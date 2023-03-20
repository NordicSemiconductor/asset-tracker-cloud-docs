import type { Static, TSchema } from '@sinclair/typebox'
import Ajv, { type ErrorObject } from 'ajv'

const ajv = new Ajv()
// see @https://github.com/sinclairzx81/typebox/issues/51
ajv.addKeyword('kind')
ajv.addKeyword('modifier')

export const validateWithType = <T extends TSchema>(
	schema: T,
): ((value: unknown) => { errors: ErrorObject[] } | Static<typeof schema>) => {
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors,
			}
		}
		return value as Static<typeof schema>
	}
}

import type { Static, TSchema } from '@sinclair/typebox'
import Ajv, { type ErrorObject } from 'ajv'

const ajv = new Ajv()

export const validateWithType = <T extends TSchema>(
	schema: T,
): ((
	value: unknown,
) => { errors: ErrorObject[] } | { value: Static<typeof schema> }) => {
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors as ErrorObject[],
			}
		}
		return { value: value as Static<typeof schema> }
	}
}

import { Type, type Static } from '@sinclair/typebox'
import { validateWithType } from './validateWithType.js'
import { describe, it } from 'node:test'
import assert from 'node:assert'

const typedInputSchema = Type.Object(
	{
		cell: Type.Number({
			minimum: 1,
		}),
	},
	{ additionalProperties: false },
)

void describe('validateWithType', () => {
	void describe('it should validate', () => {
		const v = validateWithType(typedInputSchema)
		void it('valid input', () => {
			const isValid = v({ cell: 42 })
			assert.equal('errors' in isValid, false)
			assert.equal(
				(isValid as { value: Static<typeof typedInputSchema> }).value.cell,
				42,
			)
		})
		void it('invalid input', () => {
			const isInvalid = v({ cell: -42 })
			assert.equal('errors' in isInvalid, true)
		})
	})
})

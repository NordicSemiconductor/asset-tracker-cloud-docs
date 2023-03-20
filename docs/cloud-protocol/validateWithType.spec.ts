import { Type, type Static } from '@sinclair/typebox'
import { validateWithType } from './validateWithType.js'

const typedInputSchema = Type.Object(
	{
		cell: Type.Number({
			minimum: 1,
		}),
	},
	{ additionalProperties: false },
)

describe('validateWithType', () => {
	describe('it should validate', () => {
		const v = validateWithType(typedInputSchema)
		it('valid input', () => {
			const isValid = v({ cell: 42 })
			expect('errors' in isValid).toEqual(false)
			expect((isValid as Static<typeof typedInputSchema>).cell).toEqual(42)
		})
		it('invalid input', () => {
			const isInvalid = v({ cell: -42 })
			expect('errors' in isInvalid).toEqual(true)
		})
	})
})

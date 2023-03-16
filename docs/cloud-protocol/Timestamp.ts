import { TSchema, Type } from '@sinclair/typebox'

export const Timestamp = (qualifier?: string): TSchema =>
	Type.Integer({
		description: `Timestamp as Unix epoch with millisecond precision (UTC)${
			qualifier !== undefined ? ` ${qualifier}` : ''
		}`,
		minimum: 1234567890123,
		examples: [1584533788029],
	})

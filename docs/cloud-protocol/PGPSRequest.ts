import { Type } from '@sinclair/typebox'
import { $id } from './$id'

export const PGPSRequest = Type.Object(
	{
		n: Type.Optional(
			Type.Integer({
				description:
					'The number of predictions requested. Default is 42 (7 days, 6 predictions per day at default time between predictions).',
				minimum: 1,
				maximum: 168,
				examples: [42],
			}),
		),
		int: Type.Optional(
			Type.Unsafe({
				type: 'integer',
				enum: [120, 240, 360, 480],
				description:
					'The time between predictions, in minutes. Defaults to 240 (4 hours).',
			}),
		),
		day: Type.Optional(
			Type.Integer({
				description:
					'The start day of the prediction set as GPS Day (days since the GPS epoch). Defaults to current GPS day. The minimum is dynamic and always the current GPS Day because devices should not request historic P-GPS data. The maximum depends on the provider for P-GPS data used. It is typically a few weeks in the future.',
				minimum: 15188,
				maximum: 99999,
				examples: [15188],
			}),
		),
		time: Type.Optional(
			Type.Integer({
				description:
					'The start time of the prediction set as seconds in day. Defaults to 0.',
				minimum: 0,
				maximum: 86399,
				examples: [40655],
			}),
		),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('pgps-request'),
		title: 'Asset Tracker v2 P-GPS request',
		description:
			'Describes the format which is used by the device to request P-GPS data.',
		additionalProperties: false,
	},
)

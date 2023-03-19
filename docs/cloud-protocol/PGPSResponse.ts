import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'

export const PGPSResponse = Type.Object(
	{
		host: Type.String({
			description: 'The hostname for downloading the data.',
			examples: ['example.com'],
			minLength: 1,
			maxLength: 253,
		}),
		path: Type.String({
			description: 'The path for downloading the data, without leading slash.',
			examples: ['public/15131-0_15135-72000.bin'],
			minLength: 1,
		}),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('pgps-response'),
		title: 'Asset Tracker v2 P-GPS response',
		description:
			'Describes the format which is used by the cloud to provide P-GPS data to a device.',
		additionalProperties: false,
	},
)

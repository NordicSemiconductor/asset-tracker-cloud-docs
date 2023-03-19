import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { Config } from './Config.js'

export const AWSDesired = Type.Object(
	{
		cfg: Type.Optional(Config),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('state.desired.aws'),
		title: 'Device Data and Configuration for AWS',
		description:
			'Describes the possible properties of the desired device state for nRF Asset Tracker for AWS.',
	},
)

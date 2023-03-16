import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { AzureFOTA } from './AzureFOTA'
import { Config } from './Config'

export const AzureDesired = Type.Object(
	{
		cfg: Type.Optional(Config),
		firmware: Type.Optional(AzureFOTA),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('state.desired.azure'),
		title: 'Device Data and Configuration for Azure',
		description:
			'Describes the possible properties of the desired device state for nRF Asset Tracker for Azure.',
	},
)

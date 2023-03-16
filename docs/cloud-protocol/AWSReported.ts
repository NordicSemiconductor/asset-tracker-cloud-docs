import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { Config } from './Config'
import { Battery, Device, Environment, GNSS, RoamingInfo } from './Reported'

export const AWSReported = Type.Object(
	{
		cfg: Type.Optional(Config),
		dev: Type.Optional(Device),
		roam: Type.Optional(RoamingInfo),
		bat: Type.Optional(Battery),
		env: Type.Optional(Environment),
		gnss: Type.Optional(GNSS),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('state.reported.aws'),
		title: 'Device Data and Configuration for AWS',
		description:
			'Describes the data published by the device and its configuration options for nRF Asset Tracker for AWS.',
	},
)

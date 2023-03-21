import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { Config } from './Config.js'
import {
	Battery,
	DeviceValue,
	Environment,
	GNSS,
	RoamingInfo,
} from './Reported.js'
import { Timestamp } from './Timestamp.js'

export const AWSDevice = Type.Object(
	{
		v: Type.Union([
			Type.Object({
				appV: Type.String({
					description: 'Firmware version',
					minLength: 1,
					examples: ['v1.0.0-rc1-327-g6fc8c16b239f'],
				}),
			}),
			DeviceValue,
		]),
		ts: Timestamp(),
	},
	{
		$id: $id('device'),
		description:
			'Static device information. This information shall be updated by the device once after reboot.',
	},
)

export const AWSReported = Type.Object(
	{
		cfg: Type.Optional(Config),
		dev: Type.Optional(AWSDevice),
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

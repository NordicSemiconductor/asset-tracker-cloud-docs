import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { Config } from './Config'
import { Battery, Device, Environment, GNSS, RoamingInfo } from './Reported'

export const AzureReported = Type.Intersect(
	[
		Type.Object({
			cfg: Type.Optional(Config),
			dev: Type.Optional(Device),
			roam: Type.Optional(RoamingInfo),
			bat: Type.Optional(Battery),
			env: Type.Optional(Environment),
			gnss: Type.Optional(GNSS),
		}),
		Type.Object({
			firmware: Type.Optional(
				Type.Object({
					fwUpdateStatus: Type.Unsafe({
						type: 'string',
						enum: [
							'current',
							'downloading',
							'verifying',
							'applying',
							'rebooting',
							'error',
							'rolledback',
						],
						description:
							'Device FOTA status. See https://docs.microsoft.com/en-us/azure/iot-hub/tutorial-firmware-update',
					}),
					currentFwVersion: Type.String({
						description: 'Application Firmware Version',
						minLength: 1,
						examples: ['v1.0.0-rc1-327-g6fc8c16b239f'],
					}),
					pendingFwVersion: Type.String({
						description:
							'Version of pending Firmware Upgrade (FOTA). Devices may report and empty string.',
						minLength: 0,
						examples: ['v1.0.1-rc1-327-g6fc8c16b239f'],
					}),
				}),
			),
		}),
	],
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('state.reported.azure'),
		title: 'Device Data and Configuration for Azure',
		description:
			'Describes the data published by the device and its configuration options for nRF Asset Tracker for Azure.',
	},
)

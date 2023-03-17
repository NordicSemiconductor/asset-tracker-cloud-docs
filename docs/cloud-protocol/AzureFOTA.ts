import { Type } from '@sinclair/typebox'
import { $id } from './$id'

export const AzureFOTA = Type.Object(
	{
		fwVersion: Type.String({
			description:
				'Version of pending Firmware Upgrade (FOTA). Devices may report and empty string.',
			minLength: 1,
			examples: ['v1.0.1-rc1-327-g6fc8c16b239f'],
		}),
		fwPackageURI: Type.String({
			pattern: '^https?://.+$',
			description:
				'The public download link for the firmware. May expire after 60 minutes.',
			examples: [
				'https://fw.example.com/upgrades/79ca833d-f653-48e8-b691-e0c3cfe1400a.bin',
			],
		}),
		fwFragmentSize: Type.Number({
			minimum: 1,
			description:
				'Specifies the maximum fragment size for the file that should be downloaded in each HTTP request. Should be around 1800 when using TLS.',
			examples: [1800],
		}),
		fwLocation: Type.Object(
			{
				protocol: Type.Unsafe({
					type: 'string',
					enum: ['https:', 'http:'],
				}),
				host: Type.String({
					pattern: '^[\\.a-z0-9]+$',
					examples: ['fw.example.com'],
					description: 'The hostname',
				}),
				path: Type.RegEx(/^[^/]+/, {
					examples: ['upgrades/79ca833d-f653-48e8-b691-e0c3cfe1400a.bin'],
					description: 'The path. Must not include a leading slash.',
				}),
			},
			{
				description: 'Parsed version of fwPackageURI',
			},
		),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('azure.fota'),
		description: 'Schedules a firmware for the device',
	},
)

import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { Timestamp } from './Timestamp.js'

export const WiFiSiteSurvey = Type.Object(
	{
		aps: Type.Array(
			Type.RegEx(/^[A-Fa-f0-9]{12}$/, {
				description:
					'Access point MAC address. String comprised of 6 hexadecimal pairs, without separators',
				examples: ['80e01d098f6e'],
			}),
			{
				description: 'The MAC addresses of the nearby Wi-Fi access points.',
				minItems: 2,
			},
		),
		ts: Timestamp('when the Wi-Fi site survey was created'),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('wifi-site-survey'),
		title: 'Asset Tracker v2 Wi-Fi site survey',
		description:
			'Describes the format used by the device to publish Wi-Fi site surveys.',
		additionalProperties: false,
	},
)

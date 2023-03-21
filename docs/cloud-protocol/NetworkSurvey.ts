import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements.js'
import { WiFiSiteSurvey } from './WiFiSiteSurvey.js'

export const NetworkSurvey = Type.Object(
	{
		// at least one of them will always be set, but this notation simplifies the access
		lte: Type.Optional(NeighboringCellMeasurements),
		wifi: Type.Optional(WiFiSiteSurvey),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('network-survey'),
		title: 'Asset Tracker v2 network surveys',
		description:
			'Describes the format used by the device to report neighboring cell measurements and Wi-Fi site surveys in one message.',
	},
)

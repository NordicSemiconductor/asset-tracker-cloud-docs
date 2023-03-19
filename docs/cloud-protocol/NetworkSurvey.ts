import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements.js'
import { WiFiSiteSurvey } from './WiFiSiteSurvey.js'

export const NetworkSurvey = Type.Union(
	[
		Type.Object({
			lte: Type.Ref(NeighboringCellMeasurements),
		}),
		Type.Object({
			wifi: Type.Ref(WiFiSiteSurvey),
		}),
		Type.Object({
			lte: Type.Ref(NeighboringCellMeasurements),
			wifi: Type.Ref(WiFiSiteSurvey),
		}),
	],
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('network-survey'),
		title: 'Asset Tracker v2 network surveys',
		description:
			'Describes the format used by the device to report neighboring cell measurements and Wi-Fi site surveys in one message.',
	},
)

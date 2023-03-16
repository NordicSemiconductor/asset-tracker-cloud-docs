import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements'
import { WiFiSiteSurvey } from './WiFiSiteSurvey'

export const NetworkSurvey = Type.Object(
	{
		lte: Type.Ref(NeighboringCellMeasurements),
		wifi: Type.Ref(WiFiSiteSurvey),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('network-survey'),
		title: 'Asset Tracker v2 network surveys',
		description:
			'Describes the format used by the device to report neighboring cell measurements and Wi-Fi site surveys in one message.',
	},
)

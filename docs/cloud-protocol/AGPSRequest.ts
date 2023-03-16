import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import {
	Area,
	Cell,
	MCC,
	MNC,
	PhysicalCell,
} from './NeighboringCellMeasurements'

/**
 * The A-GPS data types to return.
 */
enum AGPSTypes {
	UTCParameters = 1,
	Ephemerides = 2,
	Almanac = 3,
	/**
	 * Klobuchar ionospheric correction parameters
	 */
	Klobuchar = 4,
	/**
	 * GPS time of week
	 */
	ToW = 6,
	/**
	 * GPS system clock and time of week
	 */
	ClockAndTow = 7,
	/**
	 * Approximate location
	 */
	approxLocation = 8,
	/**
	 * Satellite integrity data
	 */
	IntegrityData = 9,
}

export const AGPSRequest = Type.Object(
	{
		mcc: MCC,
		mnc: MNC,
		cell: Cell,
		area: Area,
		phycell: Type.Optional(PhysicalCell),
		types: Type.Array(
			Type.Unsafe({
				type: 'integer',
				enum: [
					AGPSTypes.UTCParameters,
					AGPSTypes.Ephemerides,
					AGPSTypes.Almanac,
					AGPSTypes.Klobuchar,
					AGPSTypes.ToW,
					AGPSTypes.ClockAndTow,
					AGPSTypes.approxLocation,
					AGPSTypes.IntegrityData,
				],
				description: 'A-GPS data type.',
				examples: [1],
			}),
			{
				description:
					'The A-GPS data types to return. 1: UTC parameters, 2: Ephemerides, 3: Almanac, 4: Klobuchar ionospheric correction parameters, 6: GPS time of week, 7: GPS system clock and time of week, 8: Approximate location, 9: Satellite integrity data',
				minItems: 1,
				examples: [
					[1, 2, 3, 4, 6, 7, 8, 9],
					[1, 2, 3, 4, 6],
				],
			},
		),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('agps-request'),
		title: 'Asset Tracker v2 A-GPS request',
		description:
			'Describes the format used by the device to request A-GPS data.',
		required: ['mcc', 'mnc', 'cell', 'area', 'types'],
		additionalProperties: false,
	},
)

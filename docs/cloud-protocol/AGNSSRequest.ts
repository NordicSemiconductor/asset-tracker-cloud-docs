import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import {
	Area,
	Cell,
	MCC,
	MNC,
	PhysicalCell,
} from './NeighboringCellMeasurements.js'

/**
 * The A-GNSS data types to return.
 *
 * @see https://api.nrfcloud.com/v1#tag/GNSS/operation/GetAssistanceData
 */
enum AGNSSTypes {
	UTCParameters = 1,
	Ephemerides = 2,
	Almanac = 3,
	/**
	 * Klobuchar ionospheric correction parameters
	 */
	Klobuchar = 4,
	/**
	 * Nequick Ionospheric Correction
	 */
	Nequick = 5,
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
	QZSSAlmanac = 11,
	QZSSEphemerides = 12,
	QZSSIntegrity = 13,
}

export const AGNSSRequest = Type.Object(
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
					AGNSSTypes.UTCParameters,
					AGNSSTypes.Ephemerides,
					AGNSSTypes.Almanac,
					AGNSSTypes.Klobuchar,
					AGNSSTypes.Nequick,
					AGNSSTypes.ToW,
					AGNSSTypes.ClockAndTow,
					AGNSSTypes.approxLocation,
					AGNSSTypes.IntegrityData,
					AGNSSTypes.QZSSAlmanac,
					AGNSSTypes.QZSSEphemerides,
					AGNSSTypes.QZSSIntegrity,
				],
				description: 'A-GNSS data type.',
				examples: [1],
			}),
			{
				description:
					'The A-GNSS data types to return. 1 = GPS UTC, 2 = GPS Ephemerides, 3 = GPS Almanac, 4 = Klobuchar Ionospheric Correction, 5 = Nequick Ionospheric Correction, 6 = GPS Time of Week, 7 = GPS System Clock, 8 = Location (lat/lon of cell), 9 = GPS Integrity, 11 = QZSS Almanac, 12 = QZSS Ephemerides, 13 = QZSS Integrity',
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
		$id: $id('agnss-request'),
		title: 'Asset Tracker v2 A-GNSS request',
		description:
			'Describes the format used by the device to request A-GNSS data.',
		required: ['mcc', 'mnc', 'cell', 'area', 'types'],
		additionalProperties: false,
	},
)

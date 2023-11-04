import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { Area, Cell, EARFCN, RSRP } from './NeighboringCellMeasurements.js'
import { Timestamp } from './Timestamp.js'

export const DeviceValue = Type.Object({
	imei: Type.String({
		description: 'Board IMEI',
		minLength: 15,
		maxLength: 16,
		examples: ['352656106111232'],
	}),
	iccid: Type.Optional(
		Type.String({
			description: 'SIM ICCID',
			minLength: 19,
			maxLength: 20,
			examples: ['89450421180216216095'],
		}),
	),
	modV: Type.String({
		description: 'Modem Firmware Version',
		minLength: 1,
		examples: ['mfw_nrf9160_1.0.0'],
	}),
	brdV: Type.String({
		description: 'Board Version',
		minLength: 1,
		examples: ['thingy91_nrf9160'],
	}),
	bat: Type.Optional(
		Type.String({
			description: 'Battery model',
			minLength: 1,
			examples: ['LP302535', 'LP502540', 'LP602760', 'LP803035'],
		}),
	),
})
export const Device = Type.Object(
	{
		v: DeviceValue,
		ts: Timestamp(),
	},
	{
		$id: $id('device'),
		description:
			'Static device information. This information shall be updated by the device once after reboot.',
	},
)

export const RoamingInfo = Type.Object(
	{
		v: Type.Object({
			band: Type.Optional(EARFCN),
			nw: Type.String({
				description: 'Network mode',
				minLength: 1,
				examples: ['LTE-M', 'NB-IoT'],
			}),
			rsrp: RSRP,
			area: Area,
			mccmnc: Type.Integer({
				description: 'Mobile country code and mobile network code',
				minimum: 10000,
				maximum: 999999,
				examples: [24202, 310410],
			}),
			cell: Cell,
			ip: Type.String({
				description: 'IP address',
				minLength: 1,
				examples: [
					'10.81.183.99',
					'2001:0db8:85a3:0000:0000:8a2e:0370:7334',
					'2001:db8:85a3::8a2e:370:7334',
				],
			}),
			eest: Type.Optional(
				Type.Unsafe({
					type: 'integer',
					enum: [5, 6, 7, 8, 9],
					description:
						'The %CONEVAL AT command returns amongst other data the energy estimate: Relative estimated energy consumption of data transmission compared to nominal consumption. A higher value means smaller energy consumption. 5: Difficulties in setting up connections. Maximum number of repetitions might be needed for data. 6: Poor conditions. Setting up a connection might require retries and a higher number of repetitions for data. 7: Normal conditions for cIoT device. No repetitions for data or only a few repetitions in the worst case. 8: Good conditions. Possibly very good conditions for small amounts of data. 9: Very good conditions. Efficient data transfer estimated also for larger amounts of data.',
					examples: [5, 7],
				}),
			),
		}),
		ts: Timestamp(),
	},
	{
		$id: $id('roaming'),
		description:
			'Roaming information. This information shall be updated by the device every time it publishes primary application data. It is considered low-priority information so it should always be sent after the primary application data has been published.',
	},
)

export const Battery = Type.Object(
	{
		v: Type.Integer({
			description: 'Battery reading read by the modem',
			minimum: 1,
		}),
		ts: Timestamp(),
	},
	{
		$id: $id('battery'),
		description: 'Battery reading in millivolt',
	},
)

/**
 * @see https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/samples/pmic/native/npm1300_fuel_gauge/README.html#npm1300-fuel-gauge
 *
 * Float values are expressed as integers to avoid unneeded transmission of bytes.
 *
 * TTE and TTF can't be present at the same time but to keep the schema simple,
 * this is not reflected in the schema.
 */
export const FuelGauge = Type.Object(
	{
		v: Type.Object({
			V: Type.Integer({
				description: 'Battery voltage in millivolt (mV)',
				minimum: 1,
			}),
			I: Type.Integer({
				description:
					'Current in milliampere (mA). Negative value means the device is charging.',
			}),
			T: Type.Integer({
				description: 'Temperature in decidegree Celsius (d°C)',
			}),
			SoC: Type.Integer({
				description: 'State of Charge in percent',
				minimum: 0,
				maximum: 100,
			}),
			TTE: Type.Optional(
				Type.Integer({
					description: 'Time to empty in seconds',
					minimum: 1,
				}),
			),
			TTF: Type.Optional(
				Type.Integer({
					description: 'Time to full in seconds',
					minimum: 1,
				}),
			),
		}),
		ts: Timestamp(),
	},
	{
		$id: $id('fuelGauge'),
		description: 'Fuel gauge readings from e.g. the nPM1300',
	},
)

export const Environment = Type.Object(
	{
		v: Type.Object(
			{
				temp: Type.Number({
					description: 'Temperature reading from external sensor',
				}),
				hum: Type.Number({
					description: 'Humidity reading from external sensor',
					minimum: 1,
					maximum: 100,
				}),
				atmp: Type.Number({
					description:
						'Atmospheric pressure reading from external sensor in kPa',
					minimum: 0,
				}),
				bsec_iaq: Type.Optional(
					Type.Number({
						description:
							'The Bosch BME680 sensor calculates an Air Quality Index. See https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme680-ds001.pdf',
					}),
				),
			},
			{
				description: 'The individual sensor readings',
			},
		),
		ts: Timestamp(),
	},
	{
		$id: $id('environment'),
		description: 'Environment sensor readings',
	},
)

export const GNSS = Type.Object(
	{
		v: Type.Object({
			lng: Type.Number({
				description: 'Longitude',
				minimum: -180,
				maximum: 180,
			}),
			lat: Type.Number({
				description: 'Latitude',
				minimum: -90,
				maximum: 90,
			}),
			acc: Type.Number({
				description: 'Accuracy (2D 1-sigma) in meters',
				minimum: 0,
			}),
			alt: Type.Number({
				description: 'Altitude above WGS-84 ellipsoid in meters',
			}),
			spd: Type.Number({
				description: 'Horizontal speed in meters',
				minimum: 0,
			}),
			hdg: Type.Optional(
				Type.Number({
					description: 'Heading of movement in degrees',
					minimum: 0,
					maximum: 360,
				}),
			),
		}),
		ts: Timestamp(),
	},
	{
		$id: $id('GNSS'),
		description: 'The GNSS reading',
	},
)

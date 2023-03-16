import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { Timestamp } from './Timestamp'

const RSRP = Type.Number({
	minimum: -199,
	maximum: 0,
	title: 'RSRP',
	description:
		'Reference Signal Received Power (RSRP). The average power level in dBm received from a single reference signal in an LTE (Long-term Evolution) network. Typically this value ranges from -140 to -40 dBm. ',
	examples: [-97, -104],
})
const RSRQ = Type.Number({
	description:
		'Reference Signals Received Quality (RSRQ) of the current cell. Typically this value ranges from -19.5 to −3 dBm.',
	minimum: -99,
	maximum: 0,
	examples: [-11, -18],
})
const TimingAdvance = Type.Integer({
	title: 'Timing advance',
	description:
		'Timing advance value (Ts). Time units as specified in 3GPP TS 36.211. (0–20512: When timing advance is valid, 65535: When timing advance is not valid)',
	minimum: 0,
	maximum: 65535,
	examples: [80],
})

const EARFCN = Type.Integer({
	description:
		'E-UTRA Absolute Radio Frequency Channel Number (EARFCN) of the current cell where the EARFCN is as defined in 3GPP TS 36.101. LTE carrier channel number for unique identification of LTE band and carrier frequency.',
	minimum: 1,
	examples: [262143],
})

export const MNC = Type.Integer({
	description: 'Mobile network code.',
	minimum: 0,
	maximum: 999,
	examples: [2, 410],
})

export const MCC = Type.Integer({
	description:
		'Mobile country code. In contrast to roaming information (which uses the Modem Information data), neighboring cell measurement reports contain mcc and mnc as separate integers, instead of a string.',
	minimum: 100,
	maximum: 999,
	examples: [242],
})

export const PhysicalCell = Type.Integer({
	description: 'Physical cell ID',
	minimum: 1,
	examples: [33703719],
})

export const Cell = Type.Integer({
	description:
		'The cell ID the User Equipment (UE) is camped on. 4-byte Evolved Terrestrial Radio Access Network (E-UTRAN) cell ID.',
	minimum: 1,
	examples: [33703719],
})

export const Area = Type.Integer({
	minimum: 1,
	description: 'Area code.',
	examples: [12],
})

export const NeighboringCellMeasurements = Type.Object(
	{
		mcc: MCC,
		mnc: MNC,
		cell: Cell,
		area: Area,
		rsrp: RSRP,
		rsrq: RSRQ,
		earfcn: EARFCN,
		adv: TimingAdvance,
		nmr: Type.Optional(
			Type.Array(
				Type.Object(
					{
						earfcn: EARFCN,
						cell: PhysicalCell,
						rsrp: RSRP,
						rsrq: RSRQ,
					},
					{ additionalProperties: false },
				),
				{ minItems: 1, description: 'The neighboring cells' },
			),
		),
		ts: Timestamp('when the neighboring cell measurement report was received'),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('ncellmeas'),
		title: 'Asset Tracker v2 neighboring cell measurements report',
		description:
			'Describes the format which is used by the device to report neighboring cell measurements. The report is produced by the %NCELLMEAS AT command. See https://infocenter.nordicsemi.com/topic/ref_at_commands/REF/at_commands/mob_termination_ctrl_status/ncellmeas.html',
		additionalProperties: false,
	},
)

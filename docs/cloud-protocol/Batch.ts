import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { ButtonPress, Impact } from './Message.js'
import { Battery, Environment, GNSS, RoamingInfo } from './Reported.js'

export const Batch = Type.Object(
	{
		bat: Type.Optional(
			Type.Array(Battery, {
				description: 'Battery readings',
			}),
		),
		gnss: Type.Optional(
			Type.Array(GNSS, {
				description: 'GNSS readings',
			}),
		),
		roam: Type.Optional(
			Type.Array(RoamingInfo, {
				description: 'Roaming information updates.',
			}),
		),
		btn: Type.Optional(
			Type.Array(ButtonPress, {
				description: 'Button presses.',
			}),
		),
		impact: Type.Optional(
			Type.Array(Impact, { description: 'Motion impact events.' }),
		),
		env: Type.Optional(
			Type.Array(Environment, {
				description: 'Environmental sensors.',
			}),
		),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('batch'),
		title: 'Asset Tracker v2 Batch Data',
		description: 'Describes the batch data published by the device.',
	},
)

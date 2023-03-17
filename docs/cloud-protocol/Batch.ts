import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { ButtonPress, Impact } from './Message'
import { Battery, Environment, GNSS, RoamingInfo } from './Reported'

export const Batch = Type.Object(
	{
		bat: Type.Optional(
			Type.Array(Type.Ref(Battery), {
				description: 'Battery readings',
			}),
		),
		gnss: Type.Optional(
			Type.Array(Type.Ref(GNSS), {
				description: 'GNSS readings',
			}),
		),
		roam: Type.Optional(
			Type.Array(Type.Ref(RoamingInfo), {
				description: 'Roaming information updates.',
			}),
		),
		btn: Type.Optional(
			Type.Array(Type.Ref(ButtonPress), {
				description: 'Button presses.',
			}),
		),
		impact: Type.Optional(
			Type.Array(Type.Ref(Impact), { description: 'Motion impact events.' }),
		),
		env: Type.Optional(
			Type.Array(Type.Ref(Environment), {
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

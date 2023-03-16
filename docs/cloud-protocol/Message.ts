import { Type } from '@sinclair/typebox'
import { $id } from './$id'
import { Timestamp } from './Timestamp'

export const Message = Type.Object(
	{
		btn: Type.Optional(
			Type.Object(
				{
					v: Type.Integer({
						description: 'ID of the button',
						minimum: 1,
						examples: [1],
					}),
					ts: Timestamp('when the button was released'),
				},
				{
					description: 'The number and the time a button was pushed',
				},
			),
		),
		impact: Type.Object(
			{
				v: Type.Number({
					description: 'Magnitude of the impact in g',
					minimum: 0.0,
					examples: [0.5, 300],
				}),
				ts: Timestamp('when the impact was detected'),
			},
			{
				description: 'The magnitude and time of a motion impact event',
			},
		),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('messages'),
		title: 'Asset Tracker v2 Messages',
		description: 'Describes the messages published by the device',
	},
)

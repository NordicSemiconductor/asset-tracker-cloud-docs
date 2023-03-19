import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'
import { Timestamp } from './Timestamp.js'

export const ButtonPress = Type.Object(
	{
		v: Type.Integer({
			description: 'ID of the button',
			minimum: 1,
			examples: [1],
		}),
		ts: Timestamp('when the button was released'),
	},
	{
		$id: $id('button'),
		description: 'The number and the time a button was pushed',
	},
)

export const Impact = Type.Object(
	{
		v: Type.Number({
			description: 'Magnitude of the impact in g',
			minimum: 0.0,
			examples: [0.5, 300],
		}),
		ts: Timestamp('when the impact was detected'),
	},
	{
		$id: $id('impact'),
		description: 'The magnitude and time of a motion impact event',
	},
)

export const Message = Type.Object(
	{
		btn: Type.Optional(ButtonPress),
		impact: Type.Optional(Impact),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('messages'),
		title: 'Asset Tracker v2 Messages',
		description: 'Describes the messages published by the device',
	},
)

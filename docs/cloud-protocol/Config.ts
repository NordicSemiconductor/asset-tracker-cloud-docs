import { Type } from '@sinclair/typebox'
import { $id } from './$id.js'

export const Config = Type.Object(
	{
		act: Type.Boolean({
			description: 'Whether to enable the active mode.',
			examples: [false],
		}),
		actwt: Type.Integer({
			description:
				'In active mode: Wait this amount of seconds until sending the next update. The actual interval will be this time plus the time it takes to get a GNSS fix.',
			minimum: 1,
			maximum: 2147483647,
			examples: [60],
		}),
		mvres: Type.Integer({
			description:
				'Movement resolution (in seconds): After detecting movement in passive mode send an update and wait this amount of time until movement again can trigger the next update.',
			minimum: 1,
			maximum: 2147483647,
			examples: [300],
		}),
		mvt: Type.Integer({
			description:
				'Movement timeout (in seconds): Send update at least this often in passive mode.',
			minimum: 1,
			maximum: 2147483647,
			examples: [3600],
		}),
		loct: Type.Integer({
			description:
				'Location search timeout (in seconds): Timeout for location search (GNSS fix, cellular, and WiFi positioning).',
			minimum: 1,
			maximum: 2147483647,
			examples: [60],
		}),
		accath: Type.Number({
			description:
				'Accelerometer activity threshold (in m/s²): Minimal absolute value for an accelerometer reading to be considered movement.',
			minimum: 0,
			maximum: 78.4532,
			examples: [10.5],
		}),
		accith: Type.Number({
			description:
				'Accelerometer inactivity threshold (in m/s²): Maximum absolute value for an accelerometer reading to be considered stillness. Must be smaller than the accelerometer activity threshold.',
			minimum: 0,
			maximum: 78.4532,
			examples: [5.2],
		}),
		accito: Type.Number({
			description:
				'Accelerometer inactivity timeout (in s): Hysteresis timeout for stillness detection. Must be smaller than the movement resolution.',
			minimum: 0.08,
			maximum: 5242.88,
			examples: [1.7],
		}),
		nod: Type.Array(Type.String({ minLength: 1 }), {
			description:
				'List of modules which should be disabled when sampling data.',
			type: 'array',
			minItems: 0,
			examples: [['gnss'], ['ncell'], ['gnss', 'ncell']],
		}),
	},
	{
		$schema: 'http://json-schema.org/draft-07/schema#',
		$id: $id('config'),
		description: 'Configures the device',
	},
)

import { readFileSync } from 'fs'
import * as path from 'path'
import { ajv } from './ajv'

const f = (name: string): string =>
	readFileSync(
		path.resolve(process.cwd(), 'docs', 'cloud-protocol', name),
		'utf-8',
	)

describe('schemas', () => {
	it.each([
		['state.reported.aws', undefined],
		['state.reported.azure', undefined],
		['state.desired.azure', undefined],
		['messages', 'message.json'],
		['batch', 'batch-message.json'],
		['ncellmeas', undefined],
		['agps-request', undefined],
		['pgps-request', undefined],
		['pgps-response', undefined],
		['wifi-site-survey', undefined],
		['network-survey', undefined],
	])('%s should validate', async (schema, example) => {
		const validate = ajv.getSchema(
			`https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/protocol/0.0.0-development/${schema}.schema.json`,
		)
		expect(validate).toBeDefined()
		const json = f(example ?? `${schema}.json`)
		const valid = await validate?.(JSON.parse(json))
		expect(validate?.errors).toBeNull()
		expect(valid).toBeTruthy()
	})
})

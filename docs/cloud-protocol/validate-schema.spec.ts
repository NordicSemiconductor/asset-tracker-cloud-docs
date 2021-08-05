import Ajv from 'ajv'
import { readFileSync } from 'fs'
import * as path from 'path'
import * as glob from 'glob'

const f = (name: string): string =>
	readFileSync(
		path.resolve(process.cwd(), 'docs', 'cloud-protocol', name),
		'utf-8',
	)

const ajv = new Ajv({
	schemas: glob
		.sync(
			`${path.resolve(process.cwd(), 'docs', 'cloud-protocol')}/*.schema.json`,
		)
		.map((f) => JSON.parse(readFileSync(f, 'utf-8'))),
})

describe('schemas', () => {
	it.each([
		['state.reported.aws', undefined],
		['state.reported.azure', undefined],
		['messages', 'message.json'],
		['batch', 'batch-message.json'],
		['ncellmeas', undefined],
		['agps-request', undefined],
		['pgps-request', undefined],
		['pgps-response', undefined],
	])('%s should validate', async (schema, example) => {
		const validate = ajv.getSchema(
			`https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/cloud-protocol/${schema}.schema.json`,
		)
		expect(validate).toBeDefined()
		const json = f(example ?? `${schema}.json`)
		const valid = await validate?.(JSON.parse(json))
		expect(validate?.errors).toBeNull()
		expect(valid).toBeTruthy()
	})
})

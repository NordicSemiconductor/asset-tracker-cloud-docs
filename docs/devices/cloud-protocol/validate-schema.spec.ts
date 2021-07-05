import Ajv from 'ajv'
import { readFileSync } from 'fs'
import * as path from 'path'
import * as glob from 'glob'

const f = (name: string): string =>
	readFileSync(
		path.resolve(process.cwd(), 'docs', 'devices', 'cloud-protocol', name),
		'utf-8',
	)

describe('schemas', () => {
	let ajv: Ajv
	beforeEach(async () => {
		ajv = new Ajv({
			schemas: glob
				.sync(
					`${path.resolve(
						process.cwd(),
						'docs',
						'devices',
						'cloud-protocol',
					)}/*.schema.json`,
				)
				.map((f) => JSON.parse(readFileSync(f, 'utf-8'))),
		})
	})

	describe('state.reported.aws.schema.json', () => {
		it('should validate state.reported.aws.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/devices/cloud-protocol/state.reported.aws.schema.json',
			)
			expect(validate).toBeDefined()
			const state = f('state.reported.aws.json')
			const valid = await validate?.(JSON.parse(state))
			expect(validate?.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})

	describe('state.reported.azure.schema.json', () => {
		it('should validate state.reported.azure.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/devices/cloud-protocol/state.reported.azure.schema.json',
			)
			expect(validate).toBeDefined()
			const state = f('state.reported.azure.json')
			const valid = await validate?.(JSON.parse(state))
			expect(validate?.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})

	describe('messages.schema.json', () => {
		it('should validate message.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/devices/cloud-protocol/messages.schema.json',
			)
			expect(validate).toBeDefined()
			const message = f('message.json')
			const valid = await validate?.(JSON.parse(message))
			expect(validate?.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})

	describe('batch.schema.json', () => {
		it('should validate batch-message.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/devices/cloud-protocol/batch.schema.json',
			)
			expect(validate).toBeDefined()
			const state = f('batch-message.json')
			const valid = await validate?.(JSON.parse(state))
			expect(validate?.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})

	describe('ncellmeas.schema.json', () => {
		it('should validate ncellmeas.json', async () => {
			const validate = ajv.getSchema(
				'https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/devices/cloud-protocol/ncellmeas.schema.json',
			)
			expect(validate).toBeDefined()
			const message = f('ncellmeas.json')
			const valid = await validate?.(JSON.parse(message))
			expect(validate?.errors).toBeNull()
			expect(valid).toBeTruthy()
		})
	})
})

import { readFileSync } from 'fs'
import path from 'path'
import { AGPSRequest } from './AGPSRequest'
import { ajv } from './ajv'
import { Cfg } from './Cfg'
import { Message } from './Message'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements'
import { NetworkSurvey } from './NetworkSurvey'
import { PGPSRequest } from './PGPSRequest'
import { PGPSResponse } from './PGPSResponse'
import { validateWithType } from './validateWithType'
import { WiFiSiteSurvey } from './WiFiSiteSurvey'

const f = (name: string, isSchema = false): string =>
	JSON.parse(
		readFileSync(
			path.resolve(
				process.cwd(),
				'docs',
				'cloud-protocol',
				`${name}${isSchema ? '.schema' : ''}.json`,
			),
			'utf-8',
		),
	)

describe('@nordicsemiconductor/asset-tracker-cloud-docs/protocol', () => {
	describe('it should provide the same schema and validate ', () => {
		it.each([
			['cfg', Cfg, null],
			['messages', Message, 'message'],
			['wifi-site-survey', WiFiSiteSurvey, null],
			['ncellmeas', NeighboringCellMeasurements, null],
			['network-survey', NetworkSurvey, null],
			['agps-request', AGPSRequest, null],
			['pgps-request', PGPSRequest, null],
			['pgps-response', PGPSResponse, null],
		])(`%s`, async (message, typeDef, example) => {
			const json = f(example ?? message)
			// Make sure the reference schema validates
			const schemaValidator = ajv.getSchema(
				`https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/protocol/0.0.0-development/${message}.schema.json`,
			)
			expect(schemaValidator).toBeDefined()
			const validBySchema = await schemaValidator?.(json)
			expect(schemaValidator?.errors).toBeNull()
			expect(validBySchema).toBeTruthy()

			// Make sure the type schema is the same
			expect(JSON.parse(JSON.stringify(typeDef))).toMatchObject(
				f(message, true),
			)

			// Make sure the type validates
			const typeValidator = validateWithType(typeDef)
			const validByType = typeValidator(json)
			expect('errors' in validByType).toEqual(false)
		})
	})
})

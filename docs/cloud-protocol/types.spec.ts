import { readFileSync } from 'fs'
import path from 'path'
import { AGPSRequest } from './AGPSRequest.js'
import { AWSDesired } from './AWSDesired.js'
import { AWSReported } from './AWSReported.js'
import { AzureDesired } from './AzureDesired.js'
import { AzureFOTA } from './AzureFOTA.js'
import { AzureReported } from './AzureReported.js'
import { Batch } from './Batch.js'
import { Config } from './Config.js'
import { Message } from './Message.js'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements.js'
import { NetworkSurvey } from './NetworkSurvey.js'
import { PGPSRequest } from './PGPSRequest.js'
import { PGPSResponse } from './PGPSResponse.js'
import { WiFiSiteSurvey } from './WiFiSiteSurvey.js'
import { validateWithType } from './validateWithType.js'

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
			['config', Config, null],
			['messages', Message, 'message'],
			['wifi-site-survey', WiFiSiteSurvey, null],
			['ncellmeas', NeighboringCellMeasurements, null],
			['network-survey', NetworkSurvey, null],
			['agps-request', AGPSRequest, null],
			['pgps-request', PGPSRequest, null],
			['pgps-response', PGPSResponse, null],
			['azure.fota', AzureFOTA, null],
			['state.desired.azure', AzureDesired, null],
			['state.reported.azure', AzureReported, null],
			['state.desired.aws', AWSDesired, null],
			['state.reported.aws', AWSReported, null],
			['batch', Batch, 'batch-message'],
		])(`%s`, async (message, typeDef, example) => {
			const json = f(example ?? message)
			// Make sure the type validates
			const typeValidator = validateWithType(typeDef)
			const validByType = typeValidator(json)
			expect('errors' in validByType).toEqual(false)
		})
	})
})

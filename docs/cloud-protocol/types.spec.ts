import { readFileSync } from 'fs'
import path from 'path'
import { AGPSRequest } from './AGPSRequest'
import { AWSDesired } from './AWSDesired'
import { AWSReported } from './AWSReported'
import { AzureDesired } from './AzureDesired'
import { AzureFOTA } from './AzureFOTA'
import { AzureReported } from './AzureReported'
import { Config } from './Config'
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
		])(`%s`, async (message, typeDef, example) => {
			const json = f(example ?? message)
			// Make sure the type validates
			const typeValidator = validateWithType(typeDef)
			const validByType = typeValidator(json)
			expect('errors' in validByType).toEqual(false)
		})
	})
})

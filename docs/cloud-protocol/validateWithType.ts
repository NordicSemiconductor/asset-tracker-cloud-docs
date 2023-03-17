import type { Static, TSchema } from '@sinclair/typebox'
import Ajv, { ErrorObject } from 'ajv'
import { AGPSRequest } from './AGPSRequest'
import { AWSDesired } from './AWSDesired'
import { AWSReported } from './AWSReported'
import { AzureDesired } from './AzureDesired'
import { AzureFOTA } from './AzureFOTA'
import { AzureReported } from './AzureReported'
import { Batch } from './Batch'
import { Config } from './Config'
import { ButtonPress, Impact, Message } from './Message'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements'
import { NetworkSurvey } from './NetworkSurvey'
import { PGPSRequest } from './PGPSRequest'
import { PGPSResponse } from './PGPSResponse'
import { Battery, Device, Environment, GNSS, RoamingInfo } from './Reported'
import { WiFiSiteSurvey } from './WiFiSiteSurvey'

export const schemas = [
	PGPSRequest,
	AWSDesired,
	AzureFOTA,
	Message,
	AzureDesired,
	AWSReported,
	PGPSResponse,
	Config,
	WiFiSiteSurvey,
	NetworkSurvey,
	AzureReported,
	AGPSRequest,
	NeighboringCellMeasurements,
	Batch,
	ButtonPress,
	Impact,
	Message,
	Device,
	RoamingInfo,
	Battery,
	Environment,
	GNSS,
]

const ajv = new Ajv()
// see @https://github.com/sinclairzx81/typebox/issues/51
ajv.addKeyword('kind')
ajv.addKeyword('modifier')

export const validateWithType = <T extends TSchema>(
	schema: T,
): ((value: unknown) => { errors: ErrorObject[] } | Static<typeof schema>) => {
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors,
			}
		}
		return value as Static<typeof schema>
	}
}

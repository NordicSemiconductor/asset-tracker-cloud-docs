import type { Static, TSchema } from '@sinclair/typebox'
import Ajv, { ErrorObject } from 'ajv'
import { AGPSRequest } from './AGPSRequest'
import { Cfg } from './Cfg'
import { Message } from './Message'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements'
import { NetworkSurvey } from './NetworkSurvey'
import { PGPSRequest } from './PGPSRequest'
import { PGPSResponse } from './PGPSResponse'
import { WiFiSiteSurvey } from './WiFiSiteSurvey'

export const schemas = [
	Cfg,
	Message,
	WiFiSiteSurvey,
	NeighboringCellMeasurements,
	NetworkSurvey,
	AGPSRequest,
	PGPSRequest,
	PGPSResponse,
]

const ajv = new Ajv({
	schemas,
})
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

import { AGNSSRequest } from './AGNSSRequest.js'
import { AWSDesired } from './AWSDesired.js'
import { AWSReported } from './AWSReported.js'
import { AzureDesired } from './AzureDesired.js'
import { AzureFOTA } from './AzureFOTA.js'
import { AzureReported } from './AzureReported.js'
import { Batch } from './Batch.js'
import { Config } from './Config.js'
import { ButtonPress, Impact, Message } from './Message.js'
import { NeighboringCellMeasurements } from './NeighboringCellMeasurements.js'
import { NetworkSurvey } from './NetworkSurvey.js'
import { PGPSRequest } from './PGPSRequest.js'
import { PGPSResponse } from './PGPSResponse.js'
import { Battery, Device, Environment, GNSS, RoamingInfo } from './Reported.js'
import { WiFiSiteSurvey } from './WiFiSiteSurvey.js'

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
	AGNSSRequest,
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

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

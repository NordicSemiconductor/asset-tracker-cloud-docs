import type { Static } from '@sinclair/typebox'
import type { AGNSSRequest } from './docs/cloud-protocol/AGNSSRequest.js'
import type { AWSDesired } from './docs/cloud-protocol/AWSDesired.js'
import type {
	AWSDevice,
	AWSReported,
} from './docs/cloud-protocol/AWSReported.js'
import type { AzureDesired } from './docs/cloud-protocol/AzureDesired.js'
import type { AzureFOTA } from './docs/cloud-protocol/AzureFOTA.js'
import type { AzureReported } from './docs/cloud-protocol/AzureReported.js'
import type { Batch } from './docs/cloud-protocol/Batch.js'
import type { Config } from './docs/cloud-protocol/Config.js'
import type { Message } from './docs/cloud-protocol/Message.js'
import type { NeighboringCellMeasurements } from './docs/cloud-protocol/NeighboringCellMeasurements.js'
import type { NetworkSurvey } from './docs/cloud-protocol/NetworkSurvey.js'
import type { PGPSRequest } from './docs/cloud-protocol/PGPSRequest.js'
import type { PGPSResponse } from './docs/cloud-protocol/PGPSResponse.js'
import type {
	Battery,
	Device,
	Environment,
	GNSS,
	RoamingInfo,
} from './docs/cloud-protocol/Reported.js'
import type { WiFiSiteSurvey } from './docs/cloud-protocol/WiFiSiteSurvey.js'

export * from './docs/cloud-protocol/AGNSSRequest.js'
export * from './docs/cloud-protocol/AWSDesired.js'
export * from './docs/cloud-protocol/AWSReported.js'
export * from './docs/cloud-protocol/AzureDesired.js'
export * from './docs/cloud-protocol/AzureFOTA.js'
export * from './docs/cloud-protocol/AzureReported.js'
export * from './docs/cloud-protocol/Batch.js'
export * from './docs/cloud-protocol/Config.js'
export * from './docs/cloud-protocol/Message.js'
export * from './docs/cloud-protocol/NeighboringCellMeasurements.js'
export * from './docs/cloud-protocol/NetworkSurvey.js'
export * from './docs/cloud-protocol/PGPSRequest.js'
export * from './docs/cloud-protocol/PGPSResponse.js'
export * from './docs/cloud-protocol/Reported.js'
export * from './docs/cloud-protocol/WiFiSiteSurvey.js'
export * from './docs/cloud-protocol/validateWithType.js'

export type AGNSSRequestData = Static<typeof AGNSSRequest>
export type AWSDesiredData = Static<typeof AWSDesired>
export type AWSReportedData = Static<typeof AWSReported>
export type AzureDesiredData = Static<typeof AzureDesired>
export type AzureFOTAData = Static<typeof AzureFOTA>
export type AzureReportedData = Static<typeof AzureReported>
export type BatchData = Static<typeof Batch>
export type ConfigData = Static<typeof Config>
export type MessageData = Static<typeof Message>
export type NeighboringCellMeasurementsData = Static<
	typeof NeighboringCellMeasurements
>
export type NetworkSurveyData = Static<typeof NetworkSurvey>
export type PGPSRequestData = Static<typeof PGPSRequest>
export type PGPSResponseData = Static<typeof PGPSResponse>
export type WiFiSiteSurveyData = Static<typeof WiFiSiteSurvey>
export type BatteryData = Static<typeof Battery>
export type DeviceData = Static<typeof Device>
export type AWSDeviceData = Static<typeof AWSDevice>
export type EnvironmentData = Static<typeof Environment>
export type GNSSData = Static<typeof GNSS>
export type RoamingInfoData = Static<typeof RoamingInfo>

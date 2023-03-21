import { Static } from '@sinclair/typebox'
import { AGPSRequest } from './docs/cloud-protocol/AGPSRequest'
import { AWSDesired } from './docs/cloud-protocol/AWSDesired'
import { AWSDevice, AWSReported } from './docs/cloud-protocol/AWSReported'
import { AzureDesired } from './docs/cloud-protocol/AzureDesired'
import { AzureFOTA } from './docs/cloud-protocol/AzureFOTA'
import { AzureReported } from './docs/cloud-protocol/AzureReported'
import { Batch } from './docs/cloud-protocol/Batch'
import { Config } from './docs/cloud-protocol/Config'
import { Message } from './docs/cloud-protocol/Message'
import { NeighboringCellMeasurements } from './docs/cloud-protocol/NeighboringCellMeasurements'
import { NetworkSurvey } from './docs/cloud-protocol/NetworkSurvey'
import { PGPSRequest } from './docs/cloud-protocol/PGPSRequest'
import { PGPSResponse } from './docs/cloud-protocol/PGPSResponse'
import {
	Battery,
	Device,
	Environment,
	GNSS,
	RoamingInfo,
} from './docs/cloud-protocol/Reported'
import { WiFiSiteSurvey } from './docs/cloud-protocol/WiFiSiteSurvey'

export * from './docs/cloud-protocol/AGPSRequest'
export * from './docs/cloud-protocol/AWSDesired'
export * from './docs/cloud-protocol/AWSReported'
export * from './docs/cloud-protocol/AzureDesired'
export * from './docs/cloud-protocol/AzureFOTA'
export * from './docs/cloud-protocol/AzureReported'
export * from './docs/cloud-protocol/Batch'
export * from './docs/cloud-protocol/Config'
export * from './docs/cloud-protocol/Message'
export * from './docs/cloud-protocol/NeighboringCellMeasurements'
export * from './docs/cloud-protocol/NetworkSurvey'
export * from './docs/cloud-protocol/PGPSRequest'
export * from './docs/cloud-protocol/PGPSResponse'
export * from './docs/cloud-protocol/Reported'
export * from './docs/cloud-protocol/WiFiSiteSurvey'
export * from './docs/cloud-protocol/validateWithType'

export type AGPSRequestData = Static<typeof AGPSRequest>
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

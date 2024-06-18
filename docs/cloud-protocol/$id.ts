export const $id = (id: string): string =>
	`https://docs.nordicsemi.com/bundle/nrf-asset-tracker-saga/${
		process.env.VERSION ?? 'saga'
	}/docs/cloud-protocol/${id}.schema.json`

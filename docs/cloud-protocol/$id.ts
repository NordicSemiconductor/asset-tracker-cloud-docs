export const $id = (id: string): string =>
	`https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/${
		process.env.VERSION ?? 'saga'
	}/docs/cloud-protocol/${id}.schema.json`

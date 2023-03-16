export const $id = (id: string): string =>
	`https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/${
		process.env.VERSION ?? 'saga'
	}/protocol/${id}.schema.json`

export const $id = (id: string): string =>
	`https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/protocol/${
		process.env.VERSION ?? '0.0.0-development'
	}/${id}.schema.json`

import chalk from 'chalk'
import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { schemas } from '../docs/cloud-protocol/validateWithType'

try {
	mkdirSync(path.join(process.cwd(), 'build', 'html', 'docs', 'cloud-protocol'))
} catch {
	// pass
}

for (const schemaType of schemas) {
	const schema = JSON.parse(JSON.stringify(schemaType))
	const target = schema.$id.replace(
		`https://nordicsemiconductor.github.io/asset-tracker-cloud-docs/${
			process.env.VERSION ?? 'saga'
		}/`,
		'',
	)
	const targetFile = path.join(process.cwd(), 'build', 'html', target)
	console.log(chalk.green('writing'), chalk.cyan(target))
	writeFileSync(targetFile, JSON.stringify(schema, null, 2))
}

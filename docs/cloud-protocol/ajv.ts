import Ajv from 'ajv'
import { readFileSync } from 'fs'
import * as glob from 'glob'
import * as path from 'path'

export const ajv = new Ajv({
	schemas: glob
		.sync(
			`${path.resolve(process.cwd(), 'docs', 'cloud-protocol')}/*.schema.json`,
		)
		.map((f) => JSON.parse(readFileSync(f, 'utf-8'))),
})

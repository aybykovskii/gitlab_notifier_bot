import 'dotenv/config'

import { EnvKeys } from '@ts'

import { GenericObject } from './generic-object'

class Environment {
	public keys: Record<EnvKeys, string>

	constructor() {
		this.keys = GenericObject.values(EnvKeys).reduce(
			(acc, key) => ({ ...acc, [key]: process.env[key] || '' }),
			{} as Record<EnvKeys, string>
		)
	}
}

export const ENV = new Environment().keys

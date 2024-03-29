import { StorageEntryModel } from '../models/storageEntry.model'
import destr from 'destr'

export async function getValue<T>(key: string, err?: string): Promise<T> {
	const value = destr((await StorageEntryModel.findOne({ key }))?.value)
	if (!value && err) throw new Error(err)
	return value
}

export async function setValue<T>(key: string, value: T): Promise<void> {
	await StorageEntryModel.findOneAndUpdate(
		{ key },
		{ value: JSON.stringify(value) },
		{ upsert: true }
	)
}

export async function setIfNotExists<T>(key: string, value: T): Promise<void> {
	try {
		await StorageEntryModel.create({ key, value: JSON.stringify(value) })
	} catch (e: any) {
		if (e.__proto__.name != 'MongoServerError' || e.code != 11000)
			throw e
	}
}
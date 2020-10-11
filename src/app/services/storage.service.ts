import { Injectable } from '@angular/core'
import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    async setObject(value: { key: string, value: any }) {
        await Storage.set(value)
    }

    async getObject(key) {
        const ret = await Storage.get({ key })
        return JSON.parse(ret.value)
    }

    async setItem(value: { key: string, value: string }) {
        await Storage.set(value)
    }

    async getItem(key) {
        const { value } = await Storage.get({ key })
        return value
    }

    async removeItem(key) {
        await Storage.remove(key)
    }

    async keys() {
        const { keys } = await Storage.keys()
        return keys
    }

    async clear() {
        await Storage.clear()
    }
}

import { StorageService } from './storage.service'
import { Injectable } from '@angular/core'
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraPhoto } from '@capacitor/core'

const { Camera, Filesystem } = Plugins

@Injectable({
    providedIn: 'root'
})
export class CameraService {

    constructor(
        private storage: StorageService
    ) {
    }

    async ngOnInit() {
    }

    async takePicture(options = {
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        saveToGallery: true
    }) {
        const image = await Camera.getPhoto(options)
        const savedImage = await this.savePicture(image)

        this.storage.setItem({
            key: "avatar",
            value: JSON.stringify(savedImage)
        })

        return savedImage
    }

    async savePicture(cameraPhoto: CameraPhoto) {
        // Convert photo to base64 format, required by Filesystem API to save
        const base64Data = await this.readAsBase64(cameraPhoto)
        // Write the file to the data directory
        const fileName = new Date().getTime() + '.jpeg'
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        })

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory

        return {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath
        }

    }

    public async loadSaved() {
        const photo: any = await this.storage.getObject("avatar")
        try {
            const readFile = await Filesystem.readFile({
                path: photo.filepath,
                directory: FilesystemDirectory.Data
            })
            return `data:image/jpeg;base64,${readFile.data}`
        } catch (err) {
            return null
        }
    }

    private async readAsBase64(cameraPhoto: CameraPhoto) {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(cameraPhoto.webPath!)
        const blob = await response.blob()

        return await this.convertBlobToBase64(blob) as string
    }

    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader
        reader.onerror = reject
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsDataURL(blob)
    });

}

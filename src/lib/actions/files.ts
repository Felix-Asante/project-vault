'use server'

import { getErrorMessage } from '@/utils'
import { Env } from '@/utils/env'
import { v2 as Cloudinary } from 'cloudinary'

Cloudinary.config({
    cloud_name: Env.CLOUDINARY_CLOUD_NAME,
    api_key: Env.CLOUDINARY_KEY,
    api_secret: Env.CLOUDINARY_SECRET,
})

const folderName =
    process.env.NODE_ENV === 'development'
        ? 'project-vault-stg'
        : 'project-vault-prod'
export async function onFileUpload(formData: FormData) {
    const file = formData.get('file') as File

    const fileBuffer = await file.arrayBuffer()
    const mimeType = file.type
    const encoding = 'base64'
    const base64Data = Buffer.from(fileBuffer).toString(encoding)
    return new Promise((resolve, reject) => {
        const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data
        Cloudinary.uploader
            .upload(fileUri, {
                folder: folderName,
            })
            .then((results) => resolve(results.public_id))
            .catch((error) => {
                console.log(error)
                reject({ error: getErrorMessage(error) })
            })
    })
}

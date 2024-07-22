'use client'

import React, { useEffect } from 'react'
import { useController } from 'react-hook-form'

type FileUploaderProps = {
    accept?: string
    multiple?: boolean
    defaultValue?: string[]
    control: any
    name: string
}

export default function FileUploader(props: FileUploaderProps) {
    const {
        control,
        name,
        accept = 'image/png,image/jpg,image/jpeg,image/svg',
        multiple,
        defaultValue = [],
    } = props

    const { field, fieldState } = useController({ name, control })

    useEffect(() => {
        if (defaultValue.length) {
            const defaultFileItems = defaultValue.map((url) => ({
                file: url,
                isDefault: true,
            }))
            field?.onChange(defaultFileItems)
        }
    }, [defaultValue])

    const onDropFiles = (droppedFiles: File[]) => {
        const newFileItems = droppedFiles.map((file) => ({
            file,
            isDefault: false,
        }))

        const files = multiple
            ? [...field?.value, ...newFileItems]
            : newFileItems
        console.log({ files })
        field?.onChange(files)
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-40 border-2 border-input border-dashed rounded-lg cursor-pointer  bg-background hover:bg-input  hover:border-gray-500 hover:bg-gray-600'
            >
                <div
                    className='flex flex-col items-center justify-center pt-5 pb-6'
                    onDrop={(e) => {
                        e.preventDefault()
                        const droppedFiles = Array.from(e.dataTransfer.files)
                        onDropFiles(droppedFiles)
                    }}
                    onDragEnter={(e) => {
                        e.preventDefault()
                    }}
                    onDragOver={(e) => {
                        e.preventDefault()
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                    }}
                >
                    <svg
                        className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 16'
                    >
                        <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                        />
                    </svg>
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold text-primary'>
                            Click to upload
                        </span>{' '}
                        or drag and drop
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                </div>
                <input
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                    multiple={multiple}
                    accept={accept}
                />
            </label>
        </div>
    )
}

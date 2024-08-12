import NoteResourceContent from '@/sections/dashboard/resources/details/NoteResourceContent'

import { onGetResourceById } from '@/lib/actions/projectResources'
import EmptyContent from '@/components/shared/ErrorContent'

type PageProps = {
    params: {
        noteId: string
    }
}
export default async function EditNote(props: PageProps) {
    const { params } = props

    const { resource, error } = await onGetResourceById(params.noteId)

    if (error || !resource) return <EmptyContent title='Something went wrong' />

    return <NoteResourceContent resource={resource} />
}

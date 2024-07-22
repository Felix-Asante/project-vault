import { Label } from '@/components/ui/label'
import FileUploader from '@/components/shared/inputs/FileUploader'
import FormInput from '@/components/shared/inputs/FormInput'
import TextAreaInput from '@/components/shared/inputs/TextAreaInput'

type CreateProjectFormProps = {
    control: any
}
export default function CreateProjectForm(props: CreateProjectFormProps) {
    const { control } = props

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <Label className='block mb-2.5'>Logo</Label>
                <FileUploader control={control} name='photo' />
            </div>
            <FormInput name='title' control={control} label='Project title' />
            <TextAreaInput
                name='description'
                control={control}
                label='Description'
            />
        </div>
    )
}

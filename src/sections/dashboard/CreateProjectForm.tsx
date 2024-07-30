import FormInput from '@/components/shared/inputs/FormInput'
import TextAreaInput from '@/components/shared/inputs/TextAreaInput'

type CreateProjectFormProps = {
    control: any
}
export default function CreateProjectForm(props: CreateProjectFormProps) {
    const { control } = props

    return (
        <div className='flex flex-col gap-6'>
            <FormInput name='name' control={control} label='Project title' />
            <TextAreaInput
                name='description'
                control={control}
                label='Description'
            />
        </div>
    )
}

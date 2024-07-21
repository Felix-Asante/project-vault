'use client'
import Button from '@/components/shared/Button'
import SearchInput from '@/components/shared/inputs/SearchInput'

export default function DashboardHomeHeader() {
  return (
    <div className='px-1 lg:px-4 mt-6'>
        <div className="container flex items-center justify-between ">
            <div className="w-[60%]">
                <SearchInput placeholder='Search Projects' />
            </div>
            <Button className='text-white'>Add new project</Button>
        </div>
    </div>
  )
}

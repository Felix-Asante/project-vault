import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <aside className='fixed top-[4.15rem] left-0 w-56 border-r p-5 h-screen max-h-screen'>
                Sidebar
            </aside>
            <div className='pl-[16rem] pt-5'>{children}</div>
        </div>
    )
}

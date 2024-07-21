'use client'

import { PropsWithChildren } from 'react';


type ProviderProps = PropsWithChildren<{}>

export default function Providers({children}:ProviderProps) {
  return (
    <div>{children}</div>
  )
}

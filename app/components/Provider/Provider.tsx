"use client"

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

type Props = {
    children: ReactNode
}

const Providers = ({children}: Props) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default Providers
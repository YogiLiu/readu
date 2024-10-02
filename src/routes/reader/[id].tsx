import { Component } from 'solid-js'
import { clientOnly } from '@solidjs/start'

const ReaderComp = clientOnly(() => import('~/components/Reader'))

const Reader: Component = () => {
  return <ReaderComp />
}

export default Reader

import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Component, Suspense } from 'solid-js'
import './app.css'
import { SettingProvider } from '~/components/setting'
import { styled } from '~styled-system/jsx'

const App: Component = () => {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Readu</Title>
          <SettingProvider>
            <Suspense>
              <styled.main maxWidth={'2xl'} marginX={'auto'}>
                {props.children}
              </styled.main>
            </Suspense>
          </SettingProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}

export default App

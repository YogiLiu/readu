// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'
import { styled } from '~styled-system/jsx'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang={'zh'}>
        <head>
          <meta charset={'utf-8'} />
          <meta
            name={'viewport'}
            content={'width=device-width, initial-scale=1'}
          />
          <link rel={'icon'} href={'/logo.svg'} />
          {assets}
          <link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
          <link
            rel={'preconnect'}
            href={'https://fonts.gstatic.com'}
            crossOrigin={'anonymous'}
          />
          <link
            href={
              'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif+SC:wght@200..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap'
            }
            rel={'stylesheet'}
          />
        </head>
        <styled.body fontFamily={'sans'}>
          <div id={'app'}>{children}</div>
          {scripts}
        </styled.body>
      </html>
    )}
  />
))

import { Component } from 'solid-js'
import { useSetting } from '~/components/setting'
import { styled } from '~styled-system/jsx'
import TextField from '~/components/setting/TextField'
import Group from '~/components/setting/Group'
import { clientOnly } from '@solidjs/start'
import { A } from '@solidjs/router'
import PhHouse from '~icons/ph/house'

const Username = clientOnly(() => import('~/components/setting/Username'))
const Speech = clientOnly(() => import('~/components/setting/SpeechField'))

const Settings: Component = () => {
  const setting = useSetting()
  return (
    <>
      <styled.div
        paddingY={'4'}
        display={'flex'}
        alignItems={'center'}
        columnGap={'2'}
        padding={'2'}
      >
        <A href={'/'}>
          <PhHouse />
        </A>
        <styled.span>设置</styled.span>
      </styled.div>
      <styled.div
        display={'flex'}
        flexDirection={'column'}
        rowGap={'8'}
        padding={'2'}
      >
        <Group title={'起点'}>
          <TextField
            title={'Cookie'}
            isSecret={true}
            defaultValue={setting.cookie()}
            onChange={(value) => setting.setCookie(value)}
            extra={<Username cookie={setting.cookie()} />}
          />
        </Group>
        <Group title={'Azure TTS'}>
          <TextField
            title={'位置/区域'}
            defaultValue={setting.azureRegion()}
            onChange={(value) => setting.setAzureRegion(value)}
          />
          <TextField
            title={'密钥'}
            isSecret={true}
            defaultValue={setting.azureKey()}
            onChange={(value) => setting.setAzureKey(value)}
          />
          <Speech
            title={'测试'}
            region={setting.azureRegion()}
            key={setting.azureKey()}
          />
        </Group>
      </styled.div>
    </>
  )
}

export default Settings

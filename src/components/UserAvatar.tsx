import { Component, createResource, Show, Suspense } from 'solid-js'
import { useSetting } from '~/components/setting'
import qidian from '~/services/qidian'
import { styled } from '~styled-system/jsx'
import { css } from '~styled-system/css'
import PhSpinnerGapBold from '~icons/ph/spinner-gap-bold'

const UserAvatar: Component = () => {
  const setting = useSetting()
  const [userinfo] = createResource(setting.cookie, (cookie) =>
    qidian.getUserInfo(cookie).catch((e) => {
      console.error(e)
      return null
    }),
  )
  return (
    <styled.div height={'8'}>
      <Suspense
        fallback={<PhSpinnerGapBold class={css({ animation: 'spin' })} />}
      >
        <Show
          when={userinfo()}
          fallback={
            <styled.div
              fontStyle={'italic'}
              fontSize={'sm'}
              fontWeight={'light'}
            >
              未登录
            </styled.div>
          }
        >
          <styled.div
            fontWeight={'light'}
            display={'flex'}
            alignItems={'center'}
            columnGap={'1'}
          >
            <styled.img
              src={userinfo()?.avatarUrl}
              width={'8'}
              height={'8'}
              rounded={'full'}
              borderStyle={'solid'}
              borderWidth={'thin'}
            />
            <styled.span>{userinfo()?.username}</styled.span>
          </styled.div>
        </Show>
      </Suspense>
    </styled.div>
  )
}

export default UserAvatar

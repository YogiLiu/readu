import { Component, createResource, For, Show, Suspense } from 'solid-js'
import { styled } from '~styled-system/jsx'
import { useSetting } from '~/components/setting'
import qidian from '~/services/qidian'
import { css } from '~styled-system/css'
import PhSpinnerGapBold from '~icons/ph/spinner-gap-bold'
import PhEmpty from '~icons/ph/empty'
import { A } from '@solidjs/router'

const Bookcase: Component = () => {
  const setting = useSetting()
  const [bookcase] = createResource(setting.cookie, (cookie) =>
    qidian.getBookcase(cookie).catch((e) => {
      console.error(e)
      return []
    }),
  )
  return (
    <Suspense
      fallback={
        <styled.div marginX={'auto'} marginY={'0'} width={'min-content'}>
          <PhSpinnerGapBold class={css({ animation: 'spin' })} />
        </styled.div>
      }
    >
      <Show when={Boolean(bookcase()?.length)} fallback={<Empty />}>
        <styled.div
          marginY={'2'}
          display={'grid'}
          gridTemplateColumns={'repeat(auto-fill, minmax(144px, 1fr))'}
          justifyItems={'center'}
          gridGap={'5'}
          padding={'2'}
        >
          <For each={bookcase()}>{(book) => <Book {...book} />}</For>
        </styled.div>
      </Show>
    </Suspense>
  )
}

export default Bookcase

type BookProps = {
  id: string
  title: string
  coverUrl: string
  author: string
}

const Book: Component<BookProps> = (props) => {
  return (
    <A href={`/reader/${props.id}`} class={css({ width: 'min-content' })}>
      <styled.div cursor={'pointer'} width={'36'}>
        <styled.div
          width={'36'}
          aspectRatio={'36 / 48'}
          backgroundColor={'zinc.500/30'}
          rounded={'sm'}
          overflow={'hidden'}
        >
          <styled.img src={props.coverUrl} width={'36'} maxHeight={'48'} />
        </styled.div>
        <styled.h2 textAlign={'center'} fontWeight={'bold'}>
          {props.title}
        </styled.h2>
        <styled.div textAlign={'center'} fontSize={'sm'}>
          {props.author}
        </styled.div>
      </styled.div>
    </A>
  )
}

const Empty: Component = () => {
  return (
    <styled.div
      marginX={'auto'}
      marginY={'0'}
      opacity={'0.2'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      width={'full'}
    >
      <styled.div fontSize={'5xl'}>
        <PhEmpty />
      </styled.div>
      <styled.div>空空如也</styled.div>
    </styled.div>
  )
}

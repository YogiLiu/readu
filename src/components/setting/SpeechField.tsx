import {
  Component,
  createResource,
  createSignal,
  createUniqueId,
  For,
  Match,
  Show,
  Suspense,
  Switch,
} from 'solid-js'
import { styled } from '~styled-system/jsx'
import { action } from '@solidjs/router'
import azure from '~/services/azure'
import { css } from '~styled-system/css'
import { Portal } from 'solid-js/web'
import fieldStyle from '~/components/setting/fieldStyle'
import PhSpinnerGapBold from '~icons/ph/spinner-gap-bold'
import PhUserSoundFill from '~icons/ph/user-sound-fill'
import PhContactlessPayment from '~icons/ph/contactless-payment'
import PlayingStatus from '~/components/setting/PlayingStatus'

type Props = {
  title: string
  region: string
  key: string
}

const text = '我能吞下玻璃而不伤身体。'

enum Status {
  READY,
  LOADING,
  PLAYING,
}

const SpeechField: Component<Props> = (props) => {
  const [voices] = createResource(
    () => [props.region, props.key] as [string, string],
    ([region, key]) =>
      azure.getVoices(region, key).catch((e) => {
        console.error(e)
        return []
      }),
  )
  let audioEl: HTMLAudioElement
  // eslint-disable-next-line solid/reactivity
  const handleSubmit = action(async (data: FormData) => {
    const voiceId = data.get('voiceId') as string | null
    const text = data.get('text') as string | null
    const voice = voices()?.find((v) => v.id === voiceId)
    if (!voice || !text) {
      return
    }
    setStatus(Status.LOADING)
    const audio = await azure
      .getAudio(text, voice, props.region, props.key)
      .catch((e) => {
        setStatus(Status.READY)
        throw e
      })
    audioEl.src = URL.createObjectURL(new Blob([audio], { type: 'audio/mpeg' }))
    audioEl.addEventListener('ended', () => {
      setStatus(Status.READY)
    })
    audioEl.addEventListener('error', () => {
      setStatus(Status.READY)
    })
    setStatus(Status.PLAYING)
    await audioEl.play()
  }, 'submitSpeechTest')
  const [status, setStatus] = createSignal(Status.READY)
  const id = createUniqueId()
  return (
    <>
      <styled.div display={'flex'} flexDirection={'column'} rowGap={'2'}>
        <styled.label fontWeight={'bold'}>{props.title}</styled.label>
        <styled.form action={handleSubmit} method={'post'} class={fieldStyle}>
          <styled.textarea
            name={'text'}
            value={text}
            outline={'none'}
            width={'full'}
            resize={'none'}
            rows={'5'}
          />
          <styled.div
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'full'}
            borderStyle={'dashed'}
            borderTopWidth={'thin'}
            borderColor={'zinc.600/50'}
            paddingTop={'1'}
          >
            <Suspense
              fallback={<PhSpinnerGapBold class={css({ animation: 'spin' })} />}
            >
              <styled.div
                display={'flex'}
                alignItems={'center'}
                fontSize={'xs'}
              >
                <label for={id}>
                  <PhUserSoundFill />
                </label>
                <Show
                  when={voices()?.length}
                  fallback={
                    <styled.span
                      fontStyle={'italic'}
                      color={'red.700/60'}
                      marginLeft={'1'}
                    >
                      找不到说话人
                    </styled.span>
                  }
                >
                  <styled.select
                    id={id}
                    name={'voiceId'}
                    required={true}
                    appearance={'none'}
                    outline={'none'}
                    cursor={'pointer'}
                    disabled={!voices()?.length}
                    marginLeft={'1'}
                  >
                    <For each={voices()}>
                      {(voice) => (
                        <styled.option value={voice.id}>
                          {voice.label}
                        </styled.option>
                      )}
                    </For>
                  </styled.select>
                </Show>
              </styled.div>
            </Suspense>
            <styled.button
              type={'submit'}
              cursor={'pointer'}
              disabled={status() !== Status.READY || voices.loading}
              _disabled={{ cursor: 'wait' }}
            >
              <Switch>
                <Match when={status() === Status.READY}>
                  <PhContactlessPayment />
                </Match>
                <Match when={status() === Status.LOADING}>
                  <PhSpinnerGapBold class={css({ animation: 'spin' })} />
                </Match>
                <Match when={status() === Status.PLAYING}>
                  <PlayingStatus />
                </Match>
              </Switch>
            </styled.button>
          </styled.div>
        </styled.form>
      </styled.div>
      <Portal>
        <styled.audio ref={audioEl!} display={'none'} />
      </Portal>
    </>
  )
}

export default SpeechField

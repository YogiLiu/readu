import {
  Accessor,
  createContext,
  createSignal,
  onMount,
  ParentComponent,
  useContext,
} from 'solid-js'

export type Setting = {
  cookie: Accessor<string>
  setCookie: (c: string) => void

  azureRegion: Accessor<string>
  setAzureRegion: (c: string) => void
  azureKey: Accessor<string>
  setAzureKey: (c: string) => void
}

const ctx = createContext<Setting>()

export const useSetting = (): Setting => {
  const _ctx = useContext(ctx)
  if (!_ctx) {
    throw new Error('useSettings must be inside SettingProvider.')
  }
  return _ctx
}

export const SettingProvider: ParentComponent = (props) => {
  const [cookie, setCookie] = useField('user-cookie', '')
  const [azureRegion, setAzureRegion] = useField('azure-region', 'eastasia')
  const [azureKey, setAzureKey] = useField('azure-key', '')
  const setting: Setting = {
    cookie,
    setCookie,

    azureRegion,
    setAzureRegion,
    azureKey,
    setAzureKey,
  }
  return <ctx.Provider value={setting}>{props.children}</ctx.Provider>
}

const useField = <T = unknown,>(
  name: string,
  defaultValue: T,
): [Accessor<T>, (value: T) => void] => {
  const [field, setField] = createSignal(defaultValue)
  const storeName = `setting:${name}`
  onMount(() => {
    const text = localStorage.getItem(storeName)
    if (text) {
      const value = JSON.parse(text) as T
      setField(() => value)
    }
  })
  const setter = (value: T) => {
    const text = JSON.stringify(value)
    localStorage.setItem(storeName, text)
    setField(() => value)
  }
  return [field, setter]
}

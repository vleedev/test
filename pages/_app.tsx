import { Provider } from 'mobx-react'
import { useStore } from '../time_store'

export default function App({ Component, pageProps }) {
  const timeStore = useStore(pageProps.initialState)

  return (
    <Provider store={timeStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

import {Provider} from 'mobx-react'
import {useStore} from '../stores/time_store'

export default function App({Component, pageProps}) {
    const timeStore = useStore(pageProps.initialState)
    const stores = {
        timeStore
    }
    return (
        <Provider store={stores}>
            <Component {...pageProps} />
        </Provider>
    )
}

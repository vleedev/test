import {Provider} from 'mobx-react'
import {useStore} from '../stores/time_store'
import {useSiteInfoStore} from "../stores/site_info_store";

export default function App({Component, pageProps}) {
    const timeStore = useStore(pageProps.initialState)
    const siteInfoStore = useSiteInfoStore(pageProps.initialSiteInfoState)
    const stores = {
        timeStore,
        siteInfoStore
    }
    return (
        <Provider store={stores}>
            <Component {...pageProps} />
        </Provider>
    )
}

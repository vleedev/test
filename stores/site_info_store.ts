import {useMemo} from 'react'
import {applySnapshot, Instance, SnapshotIn, SnapshotOut, types,} from 'mobx-state-tree'

let store: SiteInfoStoreType | undefined

/**
 * Use mobx-state-tree to define a store
 * model : properties
 * This one is your struct state
 *
 * action: methods
 *
 */
const SiteInfoStore = types
    .model({
        siteName: types.string
    })
    .actions((self) => {
        const update = (siteName: string = null) => {
            if (siteName === null){
                self.siteName = "This one is default site name when you dont input info in updating"
            } else {
                self.siteName = siteName
            }
        }
        // We have to return to list of methods
        return { update }
    })

export type SiteInfoStoreType = Instance<typeof SiteInfoStore>
export type SiteInfoStoreTypeSnapshotIn = SnapshotIn<typeof SiteInfoStore>
export type SiteInfoStoreTypeSnapshotOut = SnapshotOut<typeof SiteInfoStore>

export function initializeSiteInfoStore(snapshot: SiteInfoStoreType = null): SiteInfoStoreType {
    const _store = store ?? SiteInfoStore.create({ siteName: "Default site name when creating store" })

    // If your page has Next.js data fetching methods that use a Mobx store, it will
    // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
    if (snapshot) {
        applySnapshot(_store, snapshot)
    }
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return store
}

/**
 * In next_page : you can init your store via ssr or ssg
 * const store = initializeSiteInfoStore()
 * Generate a children props as initialState : return { props: { initialSiteInfoState: getSnapshot(store) } }
 *
 * In parent component like _app: you must use provider from mobx-react to inject your store
 * const store = useSiteInfoStore(pageProps.initialSiteInfoState)
 * <Provider store={store}></Provider>
 *
 * Import this function and use it your component
 * Ex: const { siteName, update } = useSiteInfoStore('')
 * @param initialState
 */
export function useSiteInfoStore(initialState: any) {
    return useMemo(() => initializeSiteInfoStore(initialState), [initialState])
}

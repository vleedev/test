import {useMemo} from 'react'
import {applySnapshot, Instance, SnapshotIn, SnapshotOut, types,} from 'mobx-state-tree'

let store: IStore | undefined

/**
 * Use mobx-state-tree to define a store
 * model : properties
 * This one is your struct state
 *
 * action: methods
 *
 */
const Store = types
  .model({
    lastUpdate: types.Date,
    light: false,
  })
  .actions((self) => {
    let timer: any
    const start = () => {
      // This function will be run automatically.
      // It will call update function
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data.
        // Pass off to another action instead (need to cast self as any
        // because typescript doesn't yet know about the actions we're
        // adding to self here)
        ;(self as any).update()
      }, 1000)
    }
    const update = () => {
      self.lastUpdate = new Date(Date.now())
      self.light = true
    }
    const stop = () => {
      clearInterval(timer)
    }
    // We have to return to list of methods
    return { start, stop, update }
  })

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export function initializeStore(snapshot: IStore = null): IStore {
  const _store = store ?? Store.create({ lastUpdate: 0 })

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
 * const store = initializeStore()
 * Generate a children props as initialState : return { props: { initialState: getSnapshot(store) } }
 *
 * In parent component like _app: you must use provider from mobx-react to inject your store
 * const store = useStore(pageProps.initialState)
 * <Provider store={store}></Provider>
 *
 * Import this function and use it your component
 * Ex: const { lastUpdate, light, start, stop } = useStore('')
 * @param initialState
 */
export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState])
}

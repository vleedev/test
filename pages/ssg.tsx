import { getSnapshot } from 'mobx-state-tree'
import SampleComponent from '../components/SampleComponent'
import { initializeStore } from '../time_store'

export default function Ssg() {
  return <SampleComponent title={'SSG Page'} linkTo="/" />
}

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export function getStaticProps() {
  const timeStore = initializeStore()

  timeStore.update()

  return { props: { initialState: getSnapshot(timeStore) } }
}

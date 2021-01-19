import { getSnapshot } from 'mobx-state-tree'
import SampleComponent from '../components/SampleComponent'
import { initializeStore } from '../time_store'

export default function Ssr() {
  return <SampleComponent title={'SSR Page'} linkTo="/" />
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
  const timeStore = initializeStore()

  timeStore.update()

  return { props: { initialState: getSnapshot(timeStore) } }
}

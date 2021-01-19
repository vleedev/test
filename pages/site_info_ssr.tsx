import { getSnapshot } from 'mobx-state-tree'
import SiteInfo from "../components/site_info";
import {initializeSiteInfoStore} from "../stores/site_info_store";

export default function SiteInfoSsr() {
    return <SiteInfo />
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
    const siteInfoStore = initializeSiteInfoStore()
    siteInfoStore.update("Site name SSR")
    return { props: {
            initialSiteInfoState: getSnapshot(siteInfoStore)
        }
    }
}

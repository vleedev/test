import React from 'react'
import { observer } from 'mobx-react-lite'
import { useSiteInfoStore } from "../stores/site_info_store";

const SiteInfo: React.FC = observer(() => {
    const { siteName, update } = useSiteInfoStore('')
    return (
        <div>
            <h1>{siteName}</h1>
            <input type="text" onChange={e=>update("update:" + e.target.value)} />
        </div>
    )
})

export default SiteInfo

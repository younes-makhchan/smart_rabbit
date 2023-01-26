import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { DefaultSeo } from 'next-seo'
import SEO from "../next-seo.config"
const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return(
      <>
      <DefaultSeo {...SEO}/>
     <Component {...pageProps} />
      </>
     )
}

export default App
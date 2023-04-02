// import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import * as gtag from '../lib/gtag'
import { DefaultSeo } from 'next-seo'
import SEO from "../next-seo.config"
import "./style.css"
import Script from 'next/script'
const App = ({ Component, pageProps }) => {
  // const router = useRouter()
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return(
      <>
        
     <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-VLEB4TRHNW" ></Script>
      <Script strategy='afterInteractive' id="google-analytics">
     {` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VLEB4TRHNW');`}
    </Script>
      <DefaultSeo {...SEO} />

     <Component {...pageProps} />
      </>
     )
}

export default App
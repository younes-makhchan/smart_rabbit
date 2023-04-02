
import { DefaultSeo } from 'next-seo'
import SEO from "../next-seo.config"
import "./style.css"
const App = ({ Component, pageProps }) => {
  

  return(
      <>
        
    
      <DefaultSeo {...SEO} />

     <Component {...pageProps} />
      </>
     )
}

export default App
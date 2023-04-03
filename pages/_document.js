import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default class MyDocument extends Document {

 

  render() {
    let structuredData={
      "@context":"https://schema.org",
      "@graph":[
        {
            "@context":"http://schema.org",
            "@type": "Corporation",
            "name": "Smart Rabbit",
            "alternateName": "The Smart Rabbit",
            "description":"Friendly and humorous Smart Rabbit who loves to answer questions and provide good and funny responses that are suitable for kids.",
            "logo":"https://smart-rabbit.netlify.app/icon-192x192.png",
            "legalName":"Smart Rabbit",
            "sameAs":[
              "https://www.facebook.com/AtSmartRabbit",
              "https://www.linkedin.com/company/the-smart-rabbit"
            ],
            "url":"http://smart-rabbit.netlify.app/"
        },
        {
            "@context":"https://schema.org",
            "@type":"WebSite",
            "url":"http://smart-rabbit.netlify.app/"
        }
      ]
  }
    
    return (
      <Html lang='en'>
        <Head>


        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}>
            </script>
        <Script  strategy='beforeInteractive'>
      {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ghdubkv8u6");
    `}
    </Script>
          {/* <!-- Clarity tracking code for https://smart-rabbit.netlify.app/ --> */}
          <link rel="manifest" href="/manifest.json"></link>
         
        {/* <Script strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9485022839769098"
     crossOrigin="anonymous"></Script> */}
         
    <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-VLEB4TRHNW" ></Script>
      <Script strategy='afterInteractive' id="google-analytics">
     {` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VLEB4TRHNW');`}
    </Script>

    
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
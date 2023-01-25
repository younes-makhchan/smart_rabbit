export const GA_TRACKING_ID="G-0WEC0T8M2S"
///pages
export const pageview=(url)=>{
    window.gtag('config',GA_TRACKING_ID,{
        page_path:url,
    })
}
//event
export const event =({action,category,label,value})=>{
    window.gtag('event',action,{
        event_category:category,
        event_label:label,
        value:value
    })
}
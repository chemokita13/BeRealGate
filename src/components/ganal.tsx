import Script from "next/script";
import React from "react";

function Ganal() {
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-63XQFD1L7Z"
            ></Script>
            <Script id="google-analytics">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-63XQFD1L7Z');
        `}
            </Script>
        </>
    );
}

export default Ganal;

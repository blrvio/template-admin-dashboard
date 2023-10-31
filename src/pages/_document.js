import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="shortcut icon" href="/img/brand/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/flowbite.min.css" rel="stylesheet" />

        </Head>
        <body className="text-slate-700 antialiased">
          <div id="modal-root"></div>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/flowbite.js"></Script>
        
      </Html>
    );
  }
}

export default MyDocument;

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import PageChange from 'src/components/PageChange/PageChange.js';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/index.css';
import { main_config, metadata_config } from 'src/common/app_config';
import { AuthProvider } from 'src/context/auth.context';
import CreateProjectModal from 'src/components/Modal/CreateProjectModal';

let root;

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  root = createRoot(document.getElementById('page-transition'));
  root.render(<PageChange path={url} />);
});

Router.events.on('routeChangeComplete', () => {
  root.unmount();
  document.body.classList.remove('body-page-transition');
});

Router.events.on('routeChangeError', () => {
  root.unmount();
  document.body.classList.remove('body-page-transition');
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(metadata_config.html_comment);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <AuthProvider>
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
              {/* <script src="https://cdn.tailwindcss.com"></script> */}

            <title>{main_config.app_title}</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
            <CreateProjectModal/>
          </Layout>
        </React.Fragment>
      </AuthProvider>
    );
  }
}

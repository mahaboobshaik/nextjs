import React from 'react'
import App from 'next/app';
import auth0 from '../services/auth0';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

const namespace = 'http://localhost:3000'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    // const isAuthenticated = process.browser ? auth0.clientAuth() : auth0.serverAuth(appContext.ctx.req);
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(appContext.ctx.req);
    
    const appProps = await App.getInitialProps(appContext);
    
    const isSiteOwner = user && user[namespace+'/role'] === 'siteOwner';

    const auth = { user, isAuthenticated: !!user, isSiteOwner };
  
    return { ...appProps, auth }
  }

  render() {
    const { Component, pageProps, auth } = this.props
    return <Component {...pageProps} auth={auth} />
  }
}

export default MyApp
import React, { Fragment } from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {

    const { className, children, isAuthenticated, user, isSiteOwner } = props;
    const headerType = props.headerType || 'default';

    return (
        <Fragment>
            <Head>
                <title>Mahaboob Basha</title>
                <script src="https://kit.fontawesome.com/edbfcbba85.js" crossOrigin="anonymous"></script>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            <div className="layout-container">
                <Header className={`port-nav-${headerType}`} 
                    isAuthenticated={isAuthenticated} isSiteOwner={isSiteOwner}/>
                <main className={`cover ${className}`}>
                    <div className="wrapper">
                        {children}
                    </div>
                </main>
            </div>
        </Fragment>
    )
}

export default BaseLayout;
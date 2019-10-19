import React, { Fragment } from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {

    const { className, children, isAuthenticated, user, isSiteOwner, title, canonical } = props;
    const headerType = props.headerType || 'default';

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content="My name is Mahaboob Basha and I am an experienced software engineer. I have a Master's degree in Computer Networks and several years of experience working on a wide range of technologies and projects to modern mobile and web applications in React. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience."/>
                <meta name="keywords" content="mahaboob basha, basha portfolio" />
                <meta property="og:title" content="Mahaboob Basha - Programmer, Developer"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:url" content="http://localhost:3000"/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="My name is Mahaboob Basha and I am an experienced software engineer. I have a Master's degree in Computer Networks and several years of experience working on a wide range of technologies and projects to modern mobile and web applications in React." />

                {canonical && <link rel="canonical" href={`http://localhost:3000${canonical}`} />}
                <link rel="icon" type="image/ico" href="/static/favicon.ico" />
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
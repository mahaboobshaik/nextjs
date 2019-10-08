
import React, { Component, Fragment } from 'react';
import axios from 'axios';
// import Link from 'next/link';
import { Col, Row, Button } from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Router } from '../routes';
import { getPortfolios, deletePortfolio } from '../actions';

import PortfolioCard from '../components/portfolios/PortfolioCard';

class Portfolios extends Component {

    static async getInitialProps(){

        let portfolios = [];
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            portfolios = response.data;
        } catch(err){
            console.error(err);
        }

        return {portfolios: portfolios.splice(0, 10)};

        // let portfolios = [];
        // try{
        //     portfolios = await getPortfolios();
        // } catch(err){
        //     console.log(err);
        // }
        // return { portfolios };

    }

    navigateToEdit(event, index){
        event.stopPropagation();
        Router.pushRoute(`/portfolios/${index}/edit`);
    }

    dispalyDeleteWarning(event, portfolioId){
        event.stopPropagation();
        const isConfirm = confirm('Are you sure you want delete this portfolio???');
        if(isConfirm){
            // delete portfolio
            this.deletePortfolio(portfolioId);
        }
    }

    deletePortfolio(portfolioId){
        deletePortfolio(portfolioId)
            .then(() => {
                Router.pushRoute('/portfolios');
            }).catch(err => console.error(err))
    }

    renderPortfolios(portfolios){

        const { isAuthenticated, isSiteOwner } = this.props.auth;

        return portfolios.map((portfolio, index) => {
            return (
                // <li key={index}>
                //     {/* <Link as={`/portfolio/${post.id}`} href={`/portfolio?id=${post.id}`}><a>{post.title}</a></Link> */}
                //     <Link as={`/portfolio/${post.id}`} href="/portfolio/[id]"><a>{post.title}</a></Link>
                //     {/* <Link as={`/portfolio/${post.id}`} href={`/portfolio?id=${post.id}`}><a>{post.title}</a></Link> */}
                // </li>
                <Col md="4" key={index}>
                    <PortfolioCard portfolio={portfolio} pIndex={index}>
                        {
                            isAuthenticated && isSiteOwner &&
                            <Fragment>
                                {/* <Button onClick={() => Router.pushRoute(`/portfolios/${portfolio._id}/edit`)} color="warning">Edit</Button>{' '} */}
                                <Button onClick={(event) => this.navigateToEdit(event, index)} color="warning">Edit</Button>{' '}
                                <Button onClick={(event) => this.dispalyDeleteWarning(event, index)} color="danger">Delete</Button>
                            </Fragment>
                        }
                    </PortfolioCard>
                </Col>
            )
        })
    }

    render() {
        
        const { portfolios } = this.props;
        const { isAuthenticated, isSiteOwner } = this.props.auth;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolios">
                    {
                        isAuthenticated && isSiteOwner &&
                        <Button onClick={() => Router.pushRoute('/portfolioNew')} 
                            color="success" 
                            className="create-port-btn">Create Portfolio</Button>
                    }
                    <Row>
                        { this.renderPortfolios(portfolios) }
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default Portfolios;


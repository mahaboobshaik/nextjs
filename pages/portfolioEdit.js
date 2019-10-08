
import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';
import PortfolioCreateFrom from '../components/portfolios/PortfolioCreateForm';
import { getPortfolioById, updatePortfolio } from '../actions';

import { Router } from '../routes';

class PortfolioEdit extends Component {

    static async getInitialProps({query}){

        let portfolio = {};

        try {
            portfolio = await getPortfolioById(query.id);
        } catch(error){
            console.error(error);
        }

        console.log(portfolio);
        return { portfolio }
    }

    constructor(props){
        super(props);
        this.state = {
            error: undefined
        }
        this.updatePortFolio = this.updatePortFolio.bind(this);
    }

    updatePortFolio(portfolioData, { setSubmitting }){
        // setSubmitting(true);
        
        updatePortfolio(portfolioData).then((portfolio) => {
            setSubmitting(false);
            this.setState({error: undefined});
            Router.pushRoute('/portfolios');
        }).catch((err) => {
            const error = err.message || 'Server Error!';
            setSubmitting(false);
            this.setState({error});
        })
    }

    render() {

        const { error } = this.state;
        const { portfolio } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Update Portfolio">
                    <Row >
                        <Col md="6">
                            <PortfolioCreateFrom initialValue={portfolio} 
                                                error={error} 
                                                onSubmit={this.updatePortFolio}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth("siteOwner")(PortfolioEdit);


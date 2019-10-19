
import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';
import PortfolioCreateFrom from '../components/portfolios/PortfolioCreateForm';
import { createPortfolio } from '../actions';

import { Router } from '../routes';

const INITIAL_VALUES = {    title: '', 
                            company: '', 
                            location: '', 
                            position: '', 
                            description: '', 
                            startDate: '', 
                            endDate: '' };

class PortfolioNew extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: undefined
        }
        this.savePortFolio = this.savePortFolio.bind(this);
    }

    savePortFolio(portfolioData, { setSubmitting }){
        setSubmitting(true);
        
        createPortfolio(portfolioData).then((portfolio) => {
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

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Create New Portfolio">
                    <Row >
                        <Col md="6">
                            <PortfolioCreateFrom initialValues={INITIAL_VALUES} 
                                                    error={error} 
                                                    onSubmit={this.savePortFolio}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth("siteOwner")(PortfolioNew);


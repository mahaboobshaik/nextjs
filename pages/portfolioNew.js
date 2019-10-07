
import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';
import PortfolioCreateFrom from '../components/portfolios/PortfolioCreateForm';

class PortfolioNew extends Component {

    constructor(props){
        super(props);
        this.savePortFolio = this.savePortFolio.bind();
    }

    savePortFolio(portfolioData){
        alert(JSON.stringify(portfolioData, null, 2));
    }

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Create New Portfolio">
                    <Row >
                        <Col md="6">
                            <PortfolioCreateFrom onSubmit={this.savePortFolio}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth("siteOwner")(PortfolioNew);


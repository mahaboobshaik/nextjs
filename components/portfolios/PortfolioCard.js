import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import PortfolioCardDetails from './PortfolioCardDetail';

class PortfolioCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {

        const { portfolio, children, pIndex } = this.props;
        const { isOpen } = this.state;

        return (
            <span onClick={this.handleToggle}>
                <PortfolioCardDetails toggle={this.handleToggle} portfolio={portfolio} pIndex={pIndex} isOpen={isOpen}/>
                <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">{pIndex}</CardHeader>
                <CardBody>
                    <p className="portfolio-card-city"> Some Location {pIndex} </p>
                    <CardTitle className="portfolio-card-title">Some Company {pIndex}</CardTitle>
                    <CardText className="portfolio-card-text">Some Description {pIndex}</CardText>
                    <div className="readMore"> {children} </div>
                </CardBody>
                </Card>
            </span>
        );
    }
}

export default PortfolioCard;

import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Col, Row, Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class Portfolios extends Component {

    static async getInitialProps(){

        let posts = [];
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = response.data;
        } catch(err){
            console.error(err);
        }

        return {posts: posts.splice(0, 10)};
    }

    renderPosts(posts){
        return posts.map((post, index) => {
            return (
                // <li key={index}>
                //     {/* <Link as={`/portfolio/${post.id}`} href={`/portfolio?id=${post.id}`}><a>{post.title}</a></Link> */}
                //     <Link as={`/portfolio/${post.id}`} href="/portfolio/[id]"><a>{post.title}</a></Link>
                //     {/* <Link as={`/portfolio/${post.id}`} href={`/portfolio?id=${post.id}`}><a>{post.title}</a></Link> */}
                // </li>
                <Col md="4" key={index}>
                    <Fragment >
                        <span>
                            <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">Some Position {index}</CardHeader>
                            <CardBody>
                                <p className="portfolio-card-city"> Some Location {index} </p>
                                <CardTitle className="portfolio-card-title">Some Company {index}</CardTitle>
                                <CardText className="portfolio-card-text">Some Description {index}</CardText>
                                <div className="readMore"> </div>
                            </CardBody>
                            </Card>
                        </span>
                    </Fragment>
                </Col>
            )
        })
    }

    render() {
        
        const { posts } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolios">
                    <Row>
                        { this.renderPosts(posts) }
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default Portfolios;



import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Container, Row, Col } from 'reactstrap';
import { Link } from '../routes';
import moment from 'moment';

class Blog extends Component {
    render() {
        return (
            <BaseLayout headerType={'landing'} className="blog-listing-page" {...this.props.auth}
                    title="Mahaboob Basha - Newest Blogs to Read">
                <div className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
                    <div className="overlay"></div>
                    <Container>
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading">
                            <h1>Fresh Blogs</h1>
                            <span className="subheading">Programming, travelling...</span>
                        </div>
                        </div>
                    </div>
                    </Container>
                </div>
                <BasePage className="blog-body">
                    <Row>
                    <Col md="10" lg="8" className="mx-auto">
                        {
                        <React.Fragment>
                        <div  className="post-preview">
                            <Link route={`/blogs/blogId`}>
                            <a>
                                <h2 className="post-title">
                                Very Nice Blog Post
                                </h2>
                                <h3 className="post-subtitle">
                                How I Start Porgramming...
                                </h3>
                            </a>
                            </Link>
                            <p className="post-meta">Posted by
                            <a href="#"> Filip Jerga </a>
                            {moment().format('LLLL')}</p>
                        </div>
                        <hr></hr>
                        <div  className="post-preview">
                            <Link route={`/blogs/blogId`}>
                            <a>
                                <h2 className="post-title">
                                Very Nice Blog Post
                                </h2>
                                <h3 className="post-subtitle">
                                How I Start Porgramming...
                                </h3>
                            </a>
                            </Link>
                            <p className="post-meta">Posted by
                            <a href="#"> Filip Jerga </a>
                            {moment().format('LLLL')}</p>
                        </div>
                        <hr></hr>
                        <div  className="post-preview">
                            <Link route={`/blogs/blogId`}>
                            <a>
                                <h2 className="post-title">
                                Very Nice Blog Post
                                </h2>
                                <h3 className="post-subtitle">
                                How I Start Porgramming...
                                </h3>
                            </a>
                            </Link>
                            <p className="post-meta">Posted by
                            <a href="#"> Filip Jerga </a>
                            {moment().format('LLLL')}</p>
                        </div>
                        <hr></hr>
                        </React.Fragment>
                        }
                        <div className="clearfix">
                        <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
                        </div>
                    </Col>
                    </Row>

                    <footer>
                    <Container>
                        <Row>
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a target="_blank" href="https://www.facebook.com/mahaboobbashas">
                                <span className="fa-stack fa-lg">
                                    <i className="fas fa-circle fa-stack-2x"></i>
                                    <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a target="_blank" href="https://github.com/mahaboobshaik">
                                <span className="fa-stack fa-lg">
                                    <i className="fas fa-circle fa-stack-2x"></i>
                                    <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                                </a>
                            </li>
                            </ul>
                            <p className="copyright text-muted">Copyright &copy; Mahaboob Basha 2019</p>
                        </div>
                        </Row>
                    </Container>
                    </footer>
                </BasePage>
                <style jsx>
                {`
                    @import url("https://use.fontawesome.com/releases/v5.5.0/css/all.css");
                `}
                </style>
            </BaseLayout>
        );
    }
}

export default Blog;


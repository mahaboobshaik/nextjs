import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Typed from 'react-typed';

import BaseLayout from '../components/layouts/BaseLayout';



class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            isFlipping: false
        }

        this.role = ['Developer', 'Tech Lover', 'Team Player', 'Course Creater', 'React.js', 'Angular'];
    }

    componentDidMount(){
        this.animateCard();
    }

    componentWillUnmount(){
        this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
    }

    animateCard(){
        this.cardAnimationInterval = setInterval(() => {
            this.setState({
                isFlipping : !this.state.isFlipping
            });
        }, 10000)
    }

    render() {
        
        const { isAuthenticated, user} = this.props.auth;
        const { isFlipping } = this.state;

        return (
            <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} {...this.props.auth} 
                    headerType="index"
                    title="Mahaboob Basha - Portfolio">
                <div className="main-section">
                    <div className="background-image">
                        <img src="/static/images/background-index.png" alt="Programming welcome picture"/>
                    </div>

                    <Container>
                    <Row>
                        <Col md="6">
                        <div className="hero-section">
                            <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                                <div className="front">
                                    <div className="hero-section-content">
                                    <h2> Full Stack Web Developer </h2>
                                    <div className="hero-section-content-intro">
                                        Have a look at my portfolio and job history.
                                    </div>
                                    </div>
                                    <img className="image" src="/static/images/section-1.jpg" alt="Programming welcome picture"/>
                                    <div className="shadow-custom">
                                    <div className="shadow-inner"> </div>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="hero-section-content">
                                    <h2> Get Your Porjects Done </h2>
                                    <div className="hero-section-content-intro">
                                        Professional and top quality service in web development.
                                    </div>
                                    </div>
                                    <img className="image" src="/static/images/section-2.jpg" alt="Programming welcome picture"/>
                                    <div className="shadow-custom shadow-custom-2">
                                    <div className="shadow-inner"> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Col>
                        <Col md="6" className="hero-welcome-wrapper">
                        <div className="hero-welcome-text">
                            <h1>
                            Welcome to the portfolio website of Mahboob Basha.
                            Get informed, collaborate and discover projects I was working on through the years!
                            </h1>
                        </div>
                        <Typed
                            loop
                            typeSpeed={60}
                            backSpeed={60}
                            strings={this.role}
                            backDelay={1000}
                            loopCount={0}
                            showCursor
                            className="self-typed"
                            cursorChar="|"
                        />
                        <div className="hero-welcome-bio">
                            <h2>
                            Let's take a look on my work.
                            </h2>
                        </div>
                        </Col>
                    </Row>
                    </Container>
                </div>
                
                <a className="service-link" href="https://www.vecteezy.com/free-vector/programming">Programming Vectors by Vecteezy</a>
            </BaseLayout>

        );
    }
}

export default Home;


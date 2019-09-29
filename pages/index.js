import React, { Component, Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import SuperComponent from '../components/SuperComponent';
import axios from 'axios';

class Home extends SuperComponent {

    static async getInitialProps(){

        let userData = {};
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            userData = response.data;
        } catch(err){
            console.error(err);
        }

        return {initialData: [1, 2, 3, 4], userData};
    }

    constructor(props){
        super(props);
        this.state = {
            title: 'I am Index Page'
        };

        this.updateTitle = this.updateTitle.bind(this);
        console.log("constructor");
    }

    componentDidMount(){
        console.log("component Did Mount");
    }

    componentDidUpdate(){
        console.log("component Did Update");
    }

    componentWillUnmount(){
        console.log("component Will UnMount");
    }

    updateTitle(){
        this.setState({title: 'I am Updated Index Page'});
    }

    render() {
        
        const { title } = this.state;
        const { initialData, userData } = this.props;
        console.log(initialData, userData);

        return (
            <BaseLayout>
                <h1>I am Home From React</h1>
                <h2>{title}</h2>
                <h2>{userData.title}</h2>
                <button onClick={this.updateTitle}>Change</button>
            </BaseLayout>
        );
    }
}

export default Home;


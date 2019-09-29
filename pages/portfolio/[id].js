
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';

import BaseLayout from '../../components/layouts/BaseLayout';

class Portfolio extends Component {

    static async getInitialProps(context){
        
        let post = {};
        const postId = context.query.id;

        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            post = response.data;
        } catch(err){
            console.error(err);
        }

        return {post};
    }


    render() {

        console.log(this.props);
        const { post } = this.props;

        return (
            <BaseLayout>
                <h1>{post.title}</h1>
                <h2>{post.body}</h2>
                <p>{post.id}</p>
            </BaseLayout>
        );
    }
}

export default withRouter(Portfolio);
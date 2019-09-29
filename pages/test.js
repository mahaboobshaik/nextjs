
import React, { Component } from 'react';
import { withRouter } from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout';

class Test extends Component {

    static async getInitialProps({query}){
        
        const testId = query.id;
        return {testId};
    }


    render() {
        const { testId } = this.props;
        return (
            <BaseLayout>
                <h1>I am Test Page of {testId}</h1>
            </BaseLayout>
        );
    }
}

export default withRouter(Test);
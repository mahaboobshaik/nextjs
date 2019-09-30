
import React, { Component } from 'react';
import { withRouter } from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class Test extends Component {

    static async getInitialProps({query}){
        
        const testId = query.id;
        return {testId};
    }


    render() {
        const { testId } = this.props;
        return (
            <BaseLayout>
                <BasePage>
                    <h1>I am Test Page of {testId}</h1>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withRouter(Test);
import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { Link as NextLink } from '../../routes'
import '../../styles/main.scss';

class Header extends Component {
    render() {
        const title = this.props.title;
        return (
            <Fragment>
                <p>{title}</p>
                {this.props.children}
                <p className="customClass">I am styled P element</p>
                <p className="customClassFromFile">I am styled P element</p>
                <Link href="/"><a>Home</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/portfolios"><a>Portfolios</a></Link>
                <Link href="/blog"><a>Blog</a></Link>
                <Link href="/cv"><a>CV</a></Link>
                <NextLink route='test' params={{id: '2'}}> Test2 </NextLink>
                <NextLink route='/test/5'> Test5 </NextLink>
                <style jsx>
                    {`
                        a{
                            font-size: 20px;
                        };
                        .customClass{
                            color: red;
                        }
                    `}
                </style>
            </Fragment>
        );
    }
}

export default Header;
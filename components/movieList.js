import React, { Component, Fragment } from 'react';

class MovieList extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         count: 0
    //     }
        
    // }

    // increment = () => {
    //     const { count } = this.state;
    //     this.setState({
    //         count : count + 1
    //     })
    // }

    // decrement = () => {
    //     const { count } = this.state;
    //     this.setState({
    //         count : count - 1
    //     })
    // }

    shorten = (text, maxLength) => {
        if(text && text.length >= maxLength)
            return text.substr(0, maxLength) +'...';
        else
            return text;
    }

    render() {

        const movies = this.props.movies;

        

        return (
            <Fragment>
                {
                    movies.map((movie) => {
                        return (
                            <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="card h-100">
                                    <a href="#"><img className="card-img-top" src={movie.image} alt="" /></a>
                                    <div className="card-body">
                                    <h4 className="card-title">
                                        <a href="#">{movie.name}</a>
                                    </h4>
                                    <p className="card-text">{this.shorten(movie.description, 100)}</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{movie.rating}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Fragment>
        );
    }
}

export default MovieList;
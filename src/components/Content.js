import React, { Component } from 'react';
import '../styles/Content.css';

class Content extends Component{

    constructor(props){
        super(props);

        this.state = {
            url: 'http://www.omdbapi.com/?apikey=efe412ef&s=',
            loading: true,
            movieList: [],
        }
    }

    async componentDidMount() {

        let searchUrl = this.state.url.concat(this.props.searchQuery);

        const response = await fetch(searchUrl);
        const data = await response.json();

        data.Response === 'True' ? this.setState({ movieList: data.Search, loading: false }) : alert(data.Error);

        console.log(data);
    }

    render() {
        const renderResults = this.state.movieList.map((movie) => {
            return(
                <div className="col-3">
                    <div className="meida">
                        <div className="media-body">
                            
                        </div>
                    </div>
                </div>
            );
        });

        return(
            <div className="row d-flex">
                {this.state.loading? <div><span className="badge badge-secondary">Loading...</span></div> : renderResults}
            </div>
        );
    }
}

export default Content;
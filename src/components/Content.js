import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../styles/Content.css';

class Content extends Component{

    constructor(props){
        super(props);

        this.state = {
            url: 'http://www.omdbapi.com/?apikey=efe412ef&',
            loading: true,
            movieList: [],
            modalIsOpen: false,
            modalID: null,
            movieDetail: null,
            data: null,
        }
    }

    async componentDidMount() {

        let searchUrl = this.state.url.concat('s=', this.props.searchQuery);

        const response = await fetch(searchUrl);
        const data = await response.json();

        data.Response === 'True' ? this.setState({ movieList: data.Search, loading: false }) : alert(data.Error);

        console.log(data);
    }

    async fetchMovieDetails(moviename){
        const response = await fetch(this.state.url.concat('t=', moviename));
        this.setState({ data: await response.json() });

        console.log(this.state.data);
    }


    render() {

        
        
        let modal = false;

        const renderResults = this.state.movieList.map((movie, i) => {
            return(
                
                <div key={i} className="col-3 movieMedia">
                    <div className="media d-inline-block">
                        <img className="mt-2 img-thumbnail align-self-center" src={movie.Poster} />
                        <div className="media-body">
                            <h4>{movie.Title}</h4>
                        </div>
                        <input className="btn btn-primary" value="Movie Details" onClick={(e) => {this.setState({ modalIsOpen: true}); this.fetchMovieDetails(movie.Title)}} id={i} />
                        {this.state.data != null ? <Modal modal-sm isOpen={this.state.modalIsOpen}>
                            <ModalHeader>
                                <div><button className="btn btn-danger" onClick={(e) => this.setState({ modalIsOpen: false})}>Close</button></div>
                            </ModalHeader>
                            <ModalBody className="col col-sm col-sm-first align-items-center">
                                <div className="media">
                                    <img className="ml-2 d-flex order-md-first" src={this.state.data.Poster} />
                                    <div className="media-body">
                                        <h3 className="justify-self-center">{this.state.data.Title}</h3>
                                        <div className="movieDetails">
                                            <dl className="row">
                                                <dt className="col-6">Genre: </dt><dd className="col-6">{this.state.data.Genre}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>
                        </Modal> : <div></div>}
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
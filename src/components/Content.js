import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../styles/Content.css';

class Content extends Component{

    constructor(props){
        super(props);

        this.state = {
            url: 'https://www.omdbapi.com/?apikey=efe412ef&',
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

        const renderResults = this.state.movieList.map((movie, i) => {
            return(
                
                <div key={i} className="col-12 col-md-6 col-lg-3 movieMedia">
                    <div className="media d-inline-block">
                        <img className="mt-2 img-thumbnail align-self-center mainImageThumbnail" src={movie.Poster} alt="poster" />
                        <div className="media-body">
                            <h4>{movie.Title}</h4>
                        </div>
                        <button className="btn btn-primary" onClick={(e) => {this.setState({ modalIsOpen: true}); this.fetchMovieDetails(movie.Title)}} id={i} >Movie Details</button>
                        
                        {/*Modal to display Movie Details */}
                        {this.state.data != null ? <Modal className="modal-lg" size="md" isOpen={this.state.modalIsOpen}>
                            <ModalHeader className="flex-row-reverse">
                                <div className="ml-auto"><button className="btn btn-danger" onClick={(e) => this.setState({ modalIsOpen: false})}>Close</button></div>
                            </ModalHeader>
                            <ModalBody className="align-items-center justify-content-center">
                                <div className="card">
                                    <div className="card-body d-block d-lg-flex">
                                        <img className="ml-2 col-12 col-lg-6 order-first p-4 img-thumbnail thumbImage" src={this.state.data.Poster} alt="poster"/>
                                        <div className="col-12 col-lg-6">
                                            <h3 className="justify-self-center">{this.state.data.Title}</h3>
                                            <div className="movieDetails p-3 d-block">
                                                <dl className="row">
                                                    <dt className="col-6">Genre: </dt><dd className="col-6">{this.state.data.Genre}</dd>
                                                    <dt className="col-6">Released: </dt><dd className="col-6">{this.state.data.Released}</dd>
                                                    <dt className="col-6">Rated: </dt><dd className="col-6">{this.state.data.Rated}</dd>
                                                    <dt className="col-6">IMDB Rating: </dt><dd className="col-6">{this.state.data.imdbRating}</dd>
                                                    <dt className="col-6">Director: </dt><dd className="col-6">{this.state.data.Director}</dd>
                                                    <dt className="col-6">Writer: </dt><dd className="col-6">{this.state.data.Writer}</dd>
                                                    <dt className="col-6">Actors: </dt><dd className="col-6">{this.state.data.Actors}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <h3>Plot</h3><br />
                                        <p>{this.state.data.Plot}</p>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal> : <div></div>}
                    </div>
                </div>
            );
        });

        return(
            <div className="row d-inline-flex">
                {this.state.loading? <div><span className="badge badge-secondary">Loading...</span></div> : renderResults}
            </div>
        );
    }
}

export default Content;
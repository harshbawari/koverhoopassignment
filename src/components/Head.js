import React, { Component } from 'react';
import '../styles/Head.css';
import Content from './Content';

class Head extends Component {
    constructor(){
        super();

        this.state = {
            s: null,
            canPass: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => this.setState({ s: event.target.value, canPass: false });

    handleSubmit = event => {
        this.setState({ canPass: true });
        event.preventDefault();
    }

    
    render() {
        

        return(
            <div className="container-fluid">
                <div className="row d-flex headerSection justify-content-center align-items-center">
                    <div className="col-12 col-lg-3">
                        <h1>MovieSearcher</h1>
                    </div>
                    <div className="col-12 col-lg-6 d-inline-block">
                        <input type="text" placeholder="Search Movie Here" name="searchMovie" id="searchMovie" onChange={this.handleChange}></input>
                    </div>
                    <div className="col-6 col-lg-1">
                        <select>
                            <option>Movie</option>
                        </select>
                    </div>
                    <div className="col-6 col-lg-2">
                        <input className="btn btn-primary" type="submit" id="submitButton" value="Submit" onClick={this.handleSubmit}></input>
                    </div>
                </div>
                <div className="row d-flex contentSection">
                    {this.state.canPass? <Content searchQuery={this.state.s} /> : <div> </div>}
                </div>
            </div>
        );
    }
}

export default Head;
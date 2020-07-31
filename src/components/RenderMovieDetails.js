import React, { Component } from 'react';
import Modal from 'react-modal';

class RenderMovieDetails extends Component {
    constructor(props){
        super(props);


    }

    render(){
        return(
            console.log(this.props.open),
            <Modal isOpen={this.props.open}>
                <h1>this is a modal</h1>
            </Modal>
        );
    }
}

export default RenderMovieDetails;
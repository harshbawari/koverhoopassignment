import React, { Component } from 'react';

class Content extends Component{

    constructor(props){
        super(props);


    }

    render() {
        return(
            <div>
                hello
                {console.log(this.props.searchQuery)}
            </div>
        );
    }
}

export default Content;
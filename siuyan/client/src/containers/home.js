import React, { Component } from 'react';
import { render } from 'react-dom';
import NavBar from '../components/navbar';
import SlideShow from '../components/slideshow';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <NavBar></NavBar>
                <SlideShow></SlideShow>
            </div>
        );
    }
}

export default Home;

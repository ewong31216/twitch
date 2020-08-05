import React, { Component } from 'react';
import { render } from 'react-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="logo">
                    <div className="logo-image">
                        <div className="prefix">Siu</div>
                        <div className="main">Yan</div>
                        <div className="postfix">Hong Kong</div>
                    </div>
                </div>
                <div className="items">
                    <div className="item wish-list">Wish List</div>
                    <div className="item login">Login</div>
                </div>
            </div>
        );
    }
}

export default NavBar;

import React from 'react';
var FontAwesome = require('react-fontawesome');
//require('font-awesome/css/font-awesome.min.css')

class Header extends React.Component {
    handleZoomIn() {
        this.props.onZooIn();
    }
    handleZoomOut() {
        this.props.onZooOut();
    }
    render() {
       return (
            <header>
                <div>
                    <h1>Periodic table</h1>
                    <div className="header-nav">
                        <a href="#" 
                        className="zoomout-link"
                        onClick={(e) => this.handleZoomOut(e, this.props.index)}
                        >
                            <FontAwesome name='minus' />
                        </a>
                        <a href="#" 
                        className="zoomin-link"
                        onClick={(e) => this.handleZoomIn(e, this.props.index)}
                        >
                            <FontAwesome name='plus' />
                        </a>
                    </div>
                    <div className="clear"></div>
                </div>
            </header>
       );
    }
 }
 
export default Header;
import React from 'react';
import Header from './layout/Header.jsx';
import Content from './layout/Content.jsx';
import Footer from './layout/Footer.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: 1.0
        }
    }
    handleZoomIn() {
        if (this.state.scale > 4) {
            return;
        } 
        this.setState({scale: this.state.scale += 0.2});
    }
    handleZoomOut() {
        if (this.state.scale < 0.4) {
            return;
        }
        this.setState({scale: this.state.scale -= 0.2});
    }
    render() {
        return (
            <div>
                <Header 
                    onZooIn={this.handleZoomIn.bind(this)}
                    onZooOut={this.handleZoomOut.bind(this)}
                    />
                <Content 
                    scale={this.state.scale}
                    onZooIn={this.handleZoomIn.bind(this)}
                    onZooOut={this.handleZoomOut.bind(this)}
                    />
                <Footer />
            </div>
        );
    }
}
export default App;
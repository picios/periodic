import React from 'react';
import Header from './layout/Header.jsx';
import Content from './layout/Content.jsx';
import Footer from './layout/Footer.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}
export default App;
import React from 'react';
import Header from './layout/Header.jsx';
import Content from './layout/Content.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Header />
                <Content  />
            </div>
        );
    }
}
export default App;
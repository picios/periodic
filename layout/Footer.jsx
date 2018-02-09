import React from 'react';

class Footer extends React.Component {
    render() {
       return (
            <footer>
                <div>
                    <span className="copyright">&copy;2018</span>&nbsp;<a href="http://picios.pl/" title="picios.pl">@picios</a>&nbsp;with&nbsp;<a href="https://reactjs.org" title="React.js">React.js</a>
                </div>
            </footer>
       );
    }
 }
 
export default Footer;
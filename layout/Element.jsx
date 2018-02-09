import React from 'react';

class Element extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: ""
        };
    }
    handleClick(number) {
        //console.log(number)
        this.setState({selected: number});
        this.props.updateOpenDialog(number);
    }
    getClass(id) {
        var el = this.props.data;
        var classes = [];
        classes.push('element');
        classes.push('period-' + el.period)
        classes.push('posx-' + el.xpos);
        classes.push('posy-' + el.ypos);
        classes.push((id === this.state.selected) ? 'active' : 'default');
        return classes.join(' ');
    }
    render() {
        var el = this.props.data;
        var width = this.props.elWidth;
        var myStyle = {
            left: (el.xpos-1) * width,
            top: (el.ypos-1) * width,
            width: width,
            height: width,
            fontSize: Math.floor(this.props.elWidth / 10)
        };
        return (
            <div 
                className={this.getClass(el.number)} 
                style={myStyle} 
                onClick={() => this.handleClick(this.props.index)}>
                <div className="in-element">
                    <span className="number" title="Atomic number">{el.number}</span>
                    <span className="atomic_mass" title="Atomic mass">{el.atomic_mass}</span>
                    <span className="symbol">{el.symbol}</span>
                    <span className="name">{el.name}</span>
                </div>
            </div>
        );
    }
 }
 
export default Element;
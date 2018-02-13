import React from 'react';

class Element extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "",
            click: {
                down: {
                    x:0, y:0
                },
                up: {
                    x:0, y:0
                }
            }
        };
    }
    handleClick(event, number) {
        //console.log(event.clientX, event.screenX, event.pageX)
        //
        if (this.isShiftBetweenMouseDownAndUp()) {
            return false;
        }
        //event.preventDefault();
        this.setState({selected: number});
        this.props.updateOpenDialog(number);
    }
    handleMouseDown(event, number) {
        this.state.click.down.x = event.clientX;
        this.state.click.down.y = event.clientY;
        //console.log('down', event.clientX)
    }
    handleMouseUp(event, number) {
        this.state.click.up.x = event.clientX;
        this.state.click.up.y = event.clientY;
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
    isShiftBetweenMouseDownAndUp() {
        if (Math.abs(this.state.click.up.x - this.state.click.down.x) > 2) {
            return true;
        }
        if (Math.abs(this.state.click.up.y - this.state.click.down.y) > 2) {
            return true;
        }
        return false;
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
                onClick={(e) => this.handleClick(e, this.props.index)}
                onMouseDown={(e) => this.handleMouseDown(e, this.props.index)}
                onMouseUp={(e) => this.handleMouseUp(e, this.props.index)}>
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
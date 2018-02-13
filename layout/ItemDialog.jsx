import React from 'react';
import ItemRow from './ItemRow.jsx';
var FontAwesome = require('react-fontawesome');

class ItemDialog extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.show) {
            console.log(this.props.data)
        }
    }
    handleCloseClick() {
        this.props.onCloseFilter();
    }
    handlePrevClick() {
        this.props.onPrevFilter();
    }
    handleNextClick() {
        this.props.onNextFilter();
    }
    getClass() {
        return "item";
    }
    render() {
        var el = this.props.data;
        var width = Math.floor(this.props.winWidth * 0.8);
        var height = Math.floor(this.props.winHeight * 0.8);
        //console.log(el)
        var myStyle = {
            display: this.props.show ? 'block' : 'none',
            width: width,
            marginTop: -height / 2,
            marginLeft: -width / 2,
        };
        var inStyle = {
            height: height
        }
        return (
            <div 
                style={myStyle}
                className={this.getClass()}>
                    <div className="menu">
                        <a 
                            href="#" 
                            className="prev-link"
                            onClick={this.handlePrevClick.bind(this)}
                        >
                            <FontAwesome name='chevron-left' />
                        </a>
                        <a 
                            href="#" 
                            className="next-link"
                            onClick={this.handleNextClick.bind(this)}
                        >
                            <FontAwesome name='chevron-right' />
                        </a>
                        <a 
                            href="#" 
                            className="close-link"
                            onClick={this.handleCloseClick.bind(this)}
                        >
                            <FontAwesome name='times' />
                        </a>
                    </div>
                    {this.props.show &&
                        <div 
                        className="in-item"
                        style={inStyle}
                        >
                            <ItemRow 
                                name = "Name"
                                value = {el.name}
                                index = 'name'
                                />
                            <ItemRow 
                                name = "Symbol"
                                value = {el.symbol}
                                index = 'symbol'
                                />
                            <ItemRow 
                                name = "Atomic number"
                                value = {el.number}
                                index = 'number'
                                />
                            <ItemRow 
                                name = "Atomic mass"
                                value = {el.atomic_mass}
                                index = 'atomic_mass'
                                />
                            {el.density &&
                            <ItemRow 
                                name = "Density"
                                value = { <span>{el.density} g/cm&sup3;</span> } 
                                index = 'density'
                                />}
                            {el.melt &&
                            <ItemRow 
                                name = "Melting temp."
                                value = { <span>{el.melt} K</span> }
                                index = 'melt'
                                />}
                            {el.boil &&
                            <ItemRow 
                                name = "Boiling temp."
                                value = { <span>{el.boil} K</span> }
                                index = 'boil'
                                />}
                            <ItemRow 
                                name = "Summary"
                                value = {el.summary}
                                index = 'summary'
                                />
                            <ItemRow 
                                name = "Source"
                                value = { <a href={el.source} target="_blank">{el.source}</a> } 
                                index = 'source'
                                />
                        </div>
                    }
                
            </div>
        );
    }
 }
 
export default ItemDialog;
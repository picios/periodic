import React from 'react';

class ItemRow extends React.Component {

    constructor(props) {
        super(props);
    }
    getClass(index, value)
    {
        return "row " + index;
    }
    render() {
        return (
            <div className={this.getClass(this.props.index, this.props.value)}>
                <label>
                    {this.props.name}
                </label>
                <span className="value">
                    <span className="in-value">
                        {this.props.value}
                    </span>
                </span>
            </div>
        );
    }
 }

export default ItemRow;
import React from 'react';

import _ from 'lodash';

export default class Cell extends React.Component {
    constructor(props){
        super(props);
    }
    isActiveCell(x, y){
        return x === this.props.position[0] && y === this.props.position[1]
    }
    createCellStyle(x, y){
        return {
            display: 'inline-block',
            margin: '0px 0px 0px 0px',
            padding: '0px 0px 0px 0px',
            width: '10px',
            minWidth: '10px',
            height: '10px',
            minHeight: '10px',
            border:'solid 1px black',
            backgroundColor: this.isActiveCell(x, y) ? this.props.color : 'unset'
        }
    }
    render(){
        return (
            <div
                className='cell'
                style={this.createCellStyle(this.props.x, this.props.y)}
            >

            </div>

        )
    }

}

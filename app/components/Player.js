import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';

class MyRect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: 'purple'
      };
      this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <Rect
                x={this.props.position} y={this.props.y} width={10} height={10}
                fill={this.state.color}
                // shadowBlur={10}
            />
        );
    }
}

export default MyRect;
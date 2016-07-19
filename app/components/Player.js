import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';

class MyRect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: 'purple'
      };
    }
    render() {
        return (
            <Rect
                x={this.props.position[0]} y={this.props.position[1]} width={10} height={10}
                fill={this.state.color}
                // shadowBlur={10}
            />
        );
    }
}

export default MyRect;
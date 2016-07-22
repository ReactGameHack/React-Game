import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import _ from 'lodash';

class Trail extends React.Component {
    render() {
        return (
          <Layer><Rect x={this.props.x} y={this.props.y} width={8} height={8} fill={this.props.color}/></Layer>
        );
    }
}

export default Trail;
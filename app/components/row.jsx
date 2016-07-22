import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import _ from 'lodash';
import Trail from './trail';

class Row extends React.Component {
  render() {
    return (
      <Group>
        {
          _.range(this.props.gridSize).map((v, y) => {
            if (this.props.playerMap[this.props.x][y]) {
              var player = this.props.playerMap[this.props.x][y];
              var color = this.props.players[player].color
              return (<Trail key={this.props.x,y} x={this.props.x * this.props.sizeMultiplier} y={y * this.props.sizeMultiplier} color={color} />);
            }
          })
        }
      </Group>
    );
  }
}

export default Row;
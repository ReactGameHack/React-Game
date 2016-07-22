import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import _ from 'lodash';
import Trail from './trail';
import Row from './row'


class Board extends React.Component {
  render() {
    return (
      <Layer>
        <Rect 
          width={this.props.gridSize * this.props.sizeMultiplier} 
          height={this.props.gridSize * this.props.sizeMultiplier} 
          fill='green'
        />
        {
          _.range(this.props.gridSize).map((v, x) => {
            return (<Row key={x} x={x} gridSize={this.props.gridSize} sizeMultiplier={this.props.sizeMultiplier} 
                playerMap={this.props.playerMap} 
                players={this.props.players} />);
          })
        }
      </Layer>
    );
  }
}

export default Board;
import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Player from './Player';
import _ from 'lodash';

/*

            {
              _.range(10).map((v, x) => {
                { 
                  return _.range(10).map((v, y) => {
                    //console.log('x,y', x, y);
                    //console.log(this.props.playerMap);
                    // var xloc = x * 10;
                    // var yloc = y * 10;
                    if (this.props.playerMap[x][y] === 1) {
                     // console.log('displaying', 'x,y', x, y);
                      return <Rect key={x,y} x={x * 10} y={y * 10} width={10} height={10} fill='blue'/>;
                    }
                  })
                }
              })
            }
*/

class MyRect extends React.Component {
    render() {
        return (
          <Layer>
            <Rect
                width={this.props.width} height={this.props.height}
                fill='green'
                // shadowBlur={10}
            />

          </Layer>
        );
    }
}

export default MyRect;
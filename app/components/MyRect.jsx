import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Player from './Player';
import _ from 'lodash';

class MyRect extends React.Component {
    render() {
        return (
          <Layer>
            <Rect
                width={500} height={500}
                fill='green'
                // shadowBlur={10}
            />

            {
              
              _.range(50).map((v, x) => {
                { 
                  return _.range(50).map((v, y) => {
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
          </Layer>
        );
    }
}

export default MyRect;
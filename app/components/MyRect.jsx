import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Player from './Player';

class MyRect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: 'green'
      };
      // this.handleClick = this.handleClick.bind(this);
    }
    // handleClick() {
    //   this.setState({
    //     color: Konva.Util.getRandomColor()
    //   });
    // }
    render() {
        // {console.log(this.props.position, this.props.y)}
        return (
          <Layer>
            <Rect
                width={500} height={500}
                fill={this.state.color}
                // shadowBlur={10}
            />
          </Layer>
        );
    }
}

export default MyRect;
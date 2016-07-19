import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';

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
        {console.log(this.props.position, this.props.y)}
        return (
            <Rect
                x={10} y={10} width={900} height={900}
                fill={this.state.color}
                // shadowBlur={10}
                onClick={this.handleClick}
            />
        );
    }
}

export default MyRect;
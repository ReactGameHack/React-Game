import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import _ from 'lodash';

class Banner extends React.Component {
    constructor(props) {
      super(props);
      this.intervalId = 0;
      this.state = {
        color: 'white'
      };
    }
    //componentWillReceiveProps() {
      // //console.log('props change', this.props.running);
      // if (!this.props.running && !this.state.flashing) {
      //   console.log('flashing')
      //   this.intervalId = setInterval(()=>{
      //     let color = _.sample(['red', 'silver', 'blue', 'yellow', 'white']);
      //     this.setState({color});
      //   }, 200)
      //   this.setState({flashing: true});
      // } else if (this.state.flashing) {
      //   clearInterval(this.intervalId);
      // }
    //}


    render() {
      if (this.props.running === 'over') {
        return (
          <Layer>
            <Text
                x={80} y={20}
                text='Game Over'
                fill={this.state.color}
                fontSize='80'
            />
            <Text
                x={120} y={110}
                text={this.props.loser + ' is the loser'}
                fill='black'
                fontSize='40'
            />
            <Text
                x={120} y={200}
                text='Click to Play Again'
                fill='black'
                fontSize='40'
            />
          </Layer>
        );
      } else if (this.props.running === 'start') {
        return (
          <Layer>
            <Text
                x={150} y={20}
                text='Snakes!'
                fill={this.state.color}
                fontSize='80'
            />
            <Text
                x={180} y={110}
                text='click to start'
                fill='black'
                fontSize='40'
            />
            <Text
                x={100} y={160}
                text='Player 1 uses asdw to control'
                fill='black'
                fontSize='30'
            />
            <Text
                x={130} y={210}
                text='Player 2 uses arrow keys'
                fill='black'
                fontSize='30'
            />
          </Layer>
        );
      } else {
        return (<Layer></Layer>);
      }
    }
}

export default Banner;
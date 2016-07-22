import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';
import _ from 'lodash';

class Banner extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: 'white',
        flashing: false
      };
      //this.message = 'player1 is the loser';
      
      // this.handleClick = this.handleClick.bind(this);
    }
    // handleClick() {
    //   this.setState({
    //     color: Konva.Util.getRandomColor()
    //   });
    // }
    componentDidMount(){

    }
    componentWillReceiveProps() {
      //console.log('props change', this.props.running);
      if (!this.props.running && !this.state.flashing) {
        console.log('setting timeout')
        this.intervalId = setInterval(()=>{
          let color = _.sample(['red', 'silver', 'blue', 'yellow', 'white']);
          this.setState({color});
        }, 200)
        this.setState({flashing:true});
      } else {
        clearInterval(this.intervalId);
      }
    }

    render() {
        if (!this.props.running) {
        return (
          <Layer>
            <Text
                x={80} y={20}
                text='Game Over'
                fill={this.state.color}
                fontSize='60'
            />
            <Text
                x={110} y={80}
                text={this.props.loser + ' is the loser'}
                fill='black'
                fontSize='30'
            />
            <Text
                x={110} y={200}
                text='Click to Play Again'
                fill='black'
                fontSize='30'
            />
          </Layer>
        );
      } else {
        return (<Layer> 

          </Layer>);
      }
    }
}

export default Banner;
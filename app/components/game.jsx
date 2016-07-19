import React from 'react';
import keys from '../constants/keys';
import {gameTickSize} from '../constants/game'
import _ from 'lodash';
import {Layer, Rect, Stage, Group} from 'react-konva';
import MyRect from './MyRect';
import Player from './Player';

import Grid from './Grid.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameTime: 0,
            position: [0, 0],
            color: 'red',
            player1: [],
            p1LastKey: keys.RIGHT
        }
    }
    componentDidMount(){
        this.handleKeyDown();

        setInterval(()=>{
            this.setState({gameTime: this.state.gameTime + gameTickSize })
        }, gameTickSize)

        setInterval(()=>{
            var position = this.state.position;
            var distance = 5;
            switch (this.state.p1LastKey) {
                case keys.LEFT:
                    position[0] = position[0] - distance;
                    break;
                case keys.RIGHT:
                    position[0] = position[0] + distance;
                    break;
                case keys.DOWN:
                    position[1] = position[1] + distance;
                    break;
                case keys.UP:
                    position[1] = position[1] - distance;
                    break;
            }
            this.setState({position})
        }, gameTickSize / 2)

        setInterval(()=>{
            var position = this.state.position;
            var xMax = 500;
            var yMax = 500;
            var playerSize = 10;
            var distanceToWall = playerSize / 2;

            if (position[0] < distanceToWall || position[1] < distanceToWall 
                || position[0] > xMax - distanceToWall || position[1] > yMax - distanceToWall) {
                console.log('EDGE HIT');
            }
        }, gameTickSize)



    }
    handleKeyDown(e){
        window.addEventListener('keydown', (e)=>{
            var position = _.clone(this.state.position);
            var p1LastKey = _.clone(this.state.p1LastKey);
            var color = this.state.color;
            let tmp = this.state.player1;
            switch (e.keyCode){
                case keys.LEFT:
                    --position[0];
                    tmp.push([position[0], position[1]])
                    this.setState({
                        player1: tmp
                    });
                    break;
                case keys.RIGHT:
                    ++position[0];                    
                    tmp.push([position[0], position[1]])
                    this.setState({
                        player1: tmp
                    });
                    break;
                case keys.DOWN:
                    ++position[1];
                    tmp.push([position[0], position[1]])
                    this.setState({
                        player1: tmp
                    });
                    break;
                case keys.UP:
                    --position[1];
                    tmp.push([position[0], position[1]])
                    this.setState({
                        player1: tmp
                    });
                    break;
                case keys.SPACEBAR:
                    color = _.sample(['red', 'green', 'blue', 'yellow']);
                    break;
                case keys.ENTER:
                    break;
            }
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT || e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                p1LastKey = e.keyCode;
            }
            this.setState({position, color, p1LastKey});
        });
    }
    render(){
        //console.log(this.state)
        return (
            <div>
                { this.state.gameTime }
                <Stage width={500} height={500}>
                    <MyRect position={this.state.position} />
                    <Layer>
                        {this.state.player1.map(position => (
                            <Rect
                                x={position[0]} y={position[1]} width={10} height={10}
                                fill='purple'
                                // shadowBlur={10}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        )
    }

}
/*                <Grid 
                      <Player position={this.state.position}  />
                    position={this.state.position} 
                    color={this.state.color}
                /> */

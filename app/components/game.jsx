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
            player1: []
        }
    }
    componentDidMount(){
        this.handleKeyDown();

        setInterval(()=>{
            this.setState({gameTime: this.state.gameTime + gameTickSize })
        }, gameTickSize)
    }
    handleKeyDown(e){
        window.addEventListener('keydown', (e)=>{
            var position = _.clone(this.state.position);
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
            this.setState({position, color});
        });
    }
    render(){
        console.log(this.state)
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

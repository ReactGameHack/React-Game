import React from 'react';
import keys from '../constants/keys';
import {gameTickSize} from '../constants/game'
import _ from 'lodash';
import {Layer, Rect, Stage, Group} from 'react-konva';
import MyRect from './MyRect';
import Player from './Player';
import Banner from './banner';
import update from 'react-addons-update';

import Grid from './Grid.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.intervalId = 0;
        this.state = {
            position: [0, 0],
            color: 'red',
            players: { player1: {x: 150, y:200, color: 'purple', direction: 'RIGHT'}, 
                      player2: { x: 300, y:200, color: 'yellow', direction: 'LEFT'}},
            gameOn: true,
            loser: undefined
        }
        this.restart = this.restart.bind(this);
    }
    restart() {
        this.setState({
            players: { player1: {x: 150, y:200, color: 'purple', direction: 'RIGHT'}, 
                      player2: { x: 300, y:200, color: 'yellow', direction: 'LEFT'}},
            gameOn: true,
            loser: undefined
        })
        this.kickOfTimer();
    }
    checkValidPositions(playername, {x, y}) {
        var xMax = 500;
        var yMax = 500;
        var playerSize = 10;
        var distanceToWall = playerSize / 2;

        if (x < distanceToWall || y < distanceToWall 
            || x > xMax - distanceToWall || y > yMax - distanceToWall) {
            console.log(playername, ' EDGE HIT');
            clearInterval(this.intervalId);
            this.setState({gameOn: false, loser: playername});
        }
    }
    kickOfTimer() {
        this.intervalId = setInterval(()=>{
            // This is pretty dense and deserving of documentation.
            const move_distance = 5;
            //Directions describes the what axis and how to modify a user's position in the state.
            const directions = {
                LEFT: {axis:'x', func:(xpos) => xpos - move_distance},
                RIGHT: {axis:'x', func:(xpos) => xpos + move_distance},
                UP: {axis:'y', func:(ypos) => ypos - move_distance},
                DOWN: {axis:'y', func:(ypos) => ypos + move_distance}
            }
            //  Loop through each player
            Object.keys(this.state.players).map((player) => {
                //  Get the users current motion
                var { direction } = this.state.players[player];
                //  Determine how that updates the users position.
                const { axis, func } = directions[direction];
                //  Update the users new position in the state using the react update addon.
                this.setState((state) => {
                    return {
                        players: update(this.state.players, {
                            [player]: { [axis]: {$apply: func } }
                        })
                    }
                });
                this.checkValidPositions(player, this.state.players[player]);
                // this.recordPosition(player, this.state.players[player]);
            })
        }, gameTickSize)
    }
    componentDidMount(){
        this.handleKeyDown();
        this.kickOfTimer();
    }
    handleKeyDown(e){
        window.addEventListener('keydown', (e)=>{
            // console.log(e.keyCode);
            switch (e.keyCode){
                case keys.LEFT:
                    console.log(e.keyCode);
                    var updatedPlayers = update(this.state.players, {
                        player1: { direction: {$set :'LEFT'} }
                    });
                    this.setState({
                        players: updatedPlayers
                    })
                    break;
                case keys.RIGHT:
                    var updatedPlayers1 = update(this.state.players, {
                        player1: { direction: {$set :'RIGHT'} }
                    });
                    this.setState({
                        players: updatedPlayers1
                    })
                    break;
                case keys.DOWN:
                    var updatedPlayers2 = update(this.state.players, {
                        player1: { direction: {$set :'DOWN'} }
                    });
                    this.setState({
                        players: updatedPlayers2
                    })
                    break;
                case keys.UP:
                    var updatedPlayers3 = update(this.state.players, {
                        player1: { direction: {$set :'UP'} }
                    });
                    this.setState({
                        players: updatedPlayers3
                    })
                    break;
            }
        });
    }

    //  Game Over with winner.
    //  Edge Detection
    //  Path Run into detection.
    //  Second player
    
    render(){
        //console.log(this.state)
        return (
            <div>
                <Stage width={500} height={500} onClick={this.restart}>
                    <MyRect position={this.state.position} />
                    <Banner running={this.state.gameOn} winner={this.state.loser} /> 
                    <Layer>
                        {Object.keys(this.state.players).map((player) => {
                            var {x, y, color, direction} = this.state.players[player];
                            return (<Rect x={x} y={y} width={10} height={10} fill={color} />);
                        })}
                    </Layer>
                </Stage>
            </div>
        )
    }
}


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


// Note if you have problems with some keys and vimium is installed, disable vimium as
// it interferes with some key codes.
export default class Game extends React.Component {
    constructor(props){
        super(props);
        // stores the id of the interval running the game so we can cancel after game over.
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
        clearInterval(this.intervalId);
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
            // from ./constants/keys.js
            if (keys[e.keyCode]) {
                const [player, direction] = keys[e.keyCode];
                var updatedPlayers = update(this.state.players, {
                    [player]: { direction: {$set : direction} }
                });
                this.setState({
                    players: updatedPlayers
                })
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


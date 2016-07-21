import React from 'react';
import keys from '../constants/keys';
import {sizeMultiplier, gridSize, gameTickSize} from '../constants/game'
import _ from 'lodash';
import {Layer, Rect, Stage, Group} from 'react-konva';
import MyRect from './MyRect';
import Player from './Player';
import Banner from './banner';
import Trail from './trail';
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
            playerMap: new Array(gridSize * gridSize).fill(0),
            color: 'red',
            players: { player1: {x: 25, y:10, color: 'purple', direction: 'RIGHT'}, 
                      player2: { x: 75, y:10, color: 'yellow', direction: 'LEFT'}},
            gameOn: true,
            loser: undefined
        }
        this.restart = this.restart.bind(this);
    }
    restart() {
        this.setState({
            players: { player1: {x: 3, y:2, color: 'purple', direction: 'RIGHT'}, 
                      player2: { x: 8, y:2, color: 'yellow', direction: 'LEFT'}},
            gameOn: true,
            loser: undefined
        })
        this.kickOfTimer();
        clearInterval(this.intervalId);
    }
    checkValidPositions(playername, {x, y}) {
        var xMax = gridSize;
        var yMax = gridSize;
         var playerSize = 8;
        // var distanceToWall = playerSize / 2;

        if (x <= 0 || y <= 0 
            || x >= xMax - 1 || y >= yMax - 1) {
            console.log(playername, ' EDGE HIT');
            
            console.log(playername);
            this.setState({gameOn: false, loser: playername});
            clearInterval(this.intervalId);
            //console.table(this.state.playerMap);
        }
    }
    recordPosition(playername, {x, y}) {
        // for (var i = 0; i < 10; i++) {
        //     for (var j = 0; j < 10; j++) {

        //     }
        // }
        //var updateMap = update(this.state.playerMap, {$splice: [[x]][[[y],1, 1]]})
        //console.log(this.state.playerMap);
        var updateMap = this.state.playerMap.slice(0);
        //console.log(updateMap);
        //console.log('x/10', Math.floor(x / 10), 'y/10', Math.floor(y / 10));
        updateMap[x * gridSize + y] = 1;
        //console.log('setting', Math.floor(x / 10), ':', Math.floor(y / 10));
        var position = x * gridSize + y;
        //this.setState({playerMap: updateMap});
        console.log('setting position', position)
        this.setState((state) => {
            return {
                playerMap: update(this.state.playerMap, {[position]: {$set: playername}})
            }
        });
        //console.log(this.state.playerMap)


    }
    kickOfTimer() {
        this.intervalId = setInterval(()=>{
            // This is pretty dense and deserving of documentation.
            const move_distance = 1;
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
                this.recordPosition(player, this.state.players[player]);
                //clearInterval(this.intervalId);
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
                this.setState((state) => {
                    return {
                        players: update(this.state.players, {
                            [player]: { direction: {$set : direction} }
                        })
                    }
                });
            }
        });
    }

    //  Game Over with winner.
    //  Edge Detection
    //  Path Run into detection.
    //  Second player
    
    render(){
        //console.log(this.state)
        // let banner = (<Layer></Layer>);
        // if (!this.state.gameOn) {
        //     let banner = ();
        // }

/*

                {
                    _.range(10000).map((v, c) => {
                        { 
                            let x = Math.floor(c / 500);
                            let y = c % 500;
                            if (this.state.playerMap[x][y] === 1) {
                             // console.log('displaying', 'x,y', x, y);
                              return <Trail x={x} y={y} />;
                            }
                        }
                    })
                }


*/



        return (
            <div>
                <Stage width={gridSize * 8} height={gridSize * 8} onClick={this.restart}>
                    <MyRect height = {gridSize * 8} width = {gridSize * 8} playerMap={this.state.playerMap} />
                    <Banner running={this.state.gameOn} loser={this.state.loser} />

                {
                    _.range(gridSize * gridSize).map((v, c) => {
                        { 

                            //console.log('checking: ', x,':',y)
                            if (this.state.playerMap[c]) {
                                let x = Math.floor(c / gridSize);
                                let y = c % gridSize;
                                var player = this.state.playerMap[c];
                                var color = this.state.players[player].color
                                //console.log('displaying', 'x,y', x, y);
                                return <Trail x={x * sizeMultiplier} y={y * sizeMultiplier} color={color}/>;
                            }
                        }
                    })
                }



                    <Layer>
                        {Object.keys(this.state.players).map((player) => {
                            var {x, y, color, direction} = this.state.players[player];
                            return (<Rect x={x * sizeMultiplier} y={y * sizeMultiplier} width={sizeMultiplier} height={sizeMultiplier} fill={color} />);
                        })}
                    </Layer>



                </Stage>
            </div>
        )
    }
}


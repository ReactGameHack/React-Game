import React from 'react';
import keys from '../constants/keys';
import {sizeMultiplier, gridSize, gameTickSize} from '../constants/game'
import _ from 'lodash';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Banner from './banner';
import Trail from './trail';
import update from 'react-addons-update';
import Board from './board'

// Note if you have problems with some keys and vimium is installed on Chrome, disable vimium as
// it interferes with some key codes.

export default class Game extends React.Component {
  constructor(props){
    super(props);
        // stores the id of the interval running the game so we can cancel after game over.
        this.intervalId = 0;
        this.state = {
          playerMap: new Array(gridSize).fill(0).map(row => new Array(gridSize).fill(0)),
          players: { player1: {x: 20, y:35, color: 'purple', direction: 'RIGHT'}, 
          player2: { x: 55, y:35, color: 'yellow', direction: 'LEFT'}},
          gameOn: true,
          loser: undefined 
        }
        this.restart = this.restart.bind(this);
      }
      restart() {
        clearInterval(this.intervalId);
        //this.setState({gameOn: false, loser: 'player1'});
        this.setState({
          playerMap: new Array(gridSize).fill(0).map(row => new Array(gridSize).fill(0)),
          players: { player1: {x: 20, y:35, color: 'purple', direction: 'RIGHT'}, 
          player2: { x: 55, y:35, color: 'yellow', direction: 'LEFT'}},
          gameOn: true,
          loser: undefined 
        });
        this.kickOfTimer();
      }
      gameOver(player) {
        this.setState({gameOn: false, loser: player});
        clearInterval(this.intervalId);
      }
      checkValidPositions(playername, {x, y}) {
        if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) {
          return false;
        }
        return true;
      }
      kickOfTimer() {
        this.intervalId = setInterval(()=>{
            // This is pretty dense and deserving of documentation.
            const move_distance = 1;
            //moveUser describes the what axis and how to modify a user's position in the state.
            const moveUser = {
              LEFT: (xpos, ypos) => [xpos - move_distance,ypos],
              RIGHT: (xpos, ypos) => [xpos + move_distance, ypos],
              UP: (xpos, ypos) => [xpos, ypos - move_distance],
              DOWN: (xpos, ypos) => [xpos, ypos + move_distance]
            }
            //  Loop through each player
            Object.keys(this.state.players).map((player) => {
                // Get the users current location and motion
                var { direction, x, y } = this.state.players[player];
                // Update the users next position
                var [nextX, nextY] = moveUser[direction](x, y);

                // if user is off the board or the next position has been seen
                if (!this.checkValidPositions(player, {x:nextX, y:nextY})
                  || this.state.playerMap[nextX][nextY]) {
                  
                  this.gameOver(player);
                  return;
                }

                var updatedPlayerMap = this.state.playerMap;
                updatedPlayerMap[nextX][nextY] = player;

                this.setState((state) => {
                  return {
                    players: update(this.state.players, {
                      [player]: { 
                        x: {$set: nextX },
                        y: {$set: nextY }
                      }
                    }),
                    playerMap: updatedPlayerMap
                  }
                });
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
    render(){
        return (
          <div>
          <Stage width={gridSize * sizeMultiplier} height={gridSize * sizeMultiplier} onClick={this.restart}>

            <Board gridSize={gridSize} sizeMultiplier={sizeMultiplier} 
              playerMap={this.state.playerMap} 
              players={this.state.players} />
            <Banner key={this.state.loser} running={this.state.gameOn} loser={this.state.loser} />

            <Layer>
              {Object.keys(this.state.players).map((player) => {
                var {x, y, color, direction} = this.state.players[player];
                return (<Rect key={player} x={x * sizeMultiplier} y={y * sizeMultiplier} width={sizeMultiplier} height={sizeMultiplier} fill={color} />);
              })}
            </Layer>

          </Stage>
          </div>
          )
      }
    }
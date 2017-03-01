import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
//import '../board/Board.less';

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    /*knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired,
    ).isRequired,*/
  };

  renderSquare(i) {



  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    const isKnightHere = x === knightX && y === knightY;
    return isKnightHere ? <Knight /> : null;
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i += 1) {
      squares.push(this.renderSquare(i));
    }
    const x = i % 8;
    const y = Math.floor(i / 8);

    const boarArr = [](64);
    return (


      <div className="Board">


        {
          boarArr.map(item => {
            <div key={i} style={{ width: '12.5%', height: '12.5%' }}>

              <BoardSquare x={x} y={y}>
                {this.renderPiece(x, y)}
              </BoardSquare>
            </div>
            })

        }


      </div>
    );
  }
}

import React, { Component } from 'react';
import { updateElement } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from '../components/board/Board';
import { observe } from '../components/board/Game';

const mapStateToProps = (state) => {
  return { data: state.elements, columns: state.columns };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateElement }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.unobserve = observe(this.handleChange.bind(this));
  }
  static propTypes = {
  };

  handleChange(knightPosition) {
    const nextState = { knightPosition };
    if (this.state) {
      this.setState(nextState);
    } else {
      this.state = nextState;
    }
  }

  /*componentWillUnmount() {
    this.unobserve();
  }*/

  renderElements() {
    const { knightPosition } = this.state;

    return (

      <div className="main-wrapper">
        <div>
          <p>
            <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/00%20Chessboard/Tutorial%20App">Browse the Source</a></b>
          </p>
          <p>
            This is a sample app you&apos;ll build as you work through the <a href="docs-tutorial.html">tutorial</a>.
          </p>
          <p>
            It illustrates creating the drag sources and the drop targets, using the monitors to query the current drag state, and customizing the drag previews.
          </p>
          <div
              style={{
                width: 500,
                height: 500,
                border: '1px solid gray',
              }}
          >
            <Board knightPosition={knightPosition} />
          </div>
          <p>
            Make sure to check out the <a href="docs-tutorial.html">tutorial</a> for step-by-step instructions on building it!
          </p>
        </div>

      </div>


    );
  }
  handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedBoxNames: name ? {
        $push: [name],
      } : {},
    }));
  }
  render() {
    let columns = this.props.columns;
    return (
      <div className={`page start-page columns-${columns}`}>
        <div className="make-form">
          <h3>New form</h3>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {this.renderElements()}
          </form>

        </div>


      </div>

    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import styledComponents from 'styled-components';

import { IDataPoint } from './shared/interfaces/IDataPoint';
import TestDrive from './testdrive';

const Button = styledComponents.button`
  position: absolute;
  left: calc( 5vw + 50px);
  top: calc( 5vw + 25%);
  display: block;
  padding: 15px;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  color: #333;
  z-index: 2;
  cursor: pointer;
`;
interface IAppProps {
  width: number;
  height: number;
}
interface IAppState {
  activeDataPoints: number;
  data: Array<IDataPoint>;
  currentGraph: "bar" | "pie";
}
const getRandomValue = value => {
  return Math.ceil(value * Math.random() * 10);
};
class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      activeDataPoints: 0,
      data: [],
      currentGraph: "pie"
    };
  }
  getData() {
    const data = [
      {
        name: "Plane ticket",
        color: "red",
        y: getRandomValue(100)
      },
      {
        name: "Hotel",
        color: "blue",
        y: getRandomValue(100)
      },
      {
        name: "Rental car",
        color: "green",
        y: getRandomValue(100)
      },
      {
        name: "Dinner",
        color: "yellow",
        y: getRandomValue(100)
      },
      {
        name: "Postcards",
        color: "purple",
        y: getRandomValue(100)
      }
    ];
    return data;
  }
  generateGraph = () => {
    const dataSet = this.getData();
    this.setState({
      activeDataPoints: dataSet.length,
      data: dataSet
    });
  };
  switchGraph = () => {
    if (this.state.currentGraph === "pie") {
      this.setState({ currentGraph: "bar" });
    } else {
      this.setState({ currentGraph: "pie" });
    }
  };

  removeDataPoint = () => {
    if (this.state.activeDataPoints - 1!== 2) {
      this.setState({
        activeDataPoints: this.state.activeDataPoints - 1
      });
    }
  };
  addDataPoint = () => {
    if (this.state.activeDataPoints + 1 <= this.state.data.length) {
      this.setState({
        activeDataPoints: this.state.activeDataPoints + 1
      });
    }
  };
  componentDidMount() {
    this.generateGraph();
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.generateGraph}> Randomize </Button>
        <Button onClick={this.switchGraph} style={{ marginTop: "50px" }}>
          {" "}
          Switch Graph{" "}
        </Button>
        <Button onClick={this.removeDataPoint} style={{ marginTop: "100px" }}>
          {" "}
          Remove One{" "}
        </Button>
        <Button onClick={this.addDataPoint} style={{ marginTop: "150px" }}>
          {" "}
          Add One{" "}
        </Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="container"
          viewBox={`${0} ${0} ${this.props.width} ${this.props.height}`}
        >
          <TestDrive
            {...{
              viewBoxWidth: this.props.width,
              viewBoxHeight: this.props.height,
              data: this.state.data.slice(0, this.state.activeDataPoints),
              activeGraph: this.state.currentGraph
            }}
          />
        </svg>
      </React.Fragment>
    );
  }
}
ReactDOM.render(
  <App width={1920} height={1080} />,
  document.getElementById("root")
);

export default App;
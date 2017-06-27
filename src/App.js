import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wHeight: '',
      scollY: 0,
      scrollEnought: 0,
    }
  }

  componentDidMount() {
    const wHeight = window.innerHeight;
    this.setState({wHeight});
    window.addEventListener('scroll', this.handleScroll, false);
  }

  handleScroll = () => {
    const scrollY = window.pageYOffset;
    const wHeight = this.state.wHeight;
    const scroll = ((scrollY % wHeight) >= wHeight*0.9);
    this.setState(prevState => {scrollEnought: scroll ? prevState.scrollEnought++ : prevState.scrollEnought});
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  render() {

    const height = this.state.scrollEnought
    return (
      <div style={{height: `${(180 + this.state.scrollEnought*100).toString()}vh`, position: 'relative'}}>
        <h2 style={{position: 'fixed', top: 0, left: 0}}>
          <p>Viewport: {this.state.wHeight}</p>
          <p>ScrollY: {this.state.scrollY}</p>
          <p>ScrollEnoght: {this.state.scrollEnought}</p>
        </h2>
      </div>
    );
  }
}

export default App;

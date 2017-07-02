import React, { Component } from 'react';
import InfiniteScroll from './components/infiniteScroll';
import {
  filterNulls,
  mapToFetchImage,
  nextSequence
} from './helpers/helpersRamda';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sequence: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      images: [],
      notLoading: true,
      wHeight: null,
      error: false,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.setState({wHeight: window.innerHeight});
    window.addEventListener('scroll', this.handleScroll, false);
    const images = await Promise.all(mapToFetchImage(this.state.sequence))
    this.setState({images});
  }

  async handleScroll() {
    const scrollToBottom = (this.state.wHeight + window.scrollY) >= (document.body.offsetHeight - 100);

    if (scrollToBottom && this.state.notLoading) {
      this.setState(prevState => ({
        notLoading: !prevState.notLoading,
        error: false,
      }));

      try {
        const newSequence = nextSequence(this.state.sequence)
        const images      = await Promise.all(mapToFetchImage(newSequence))
        const filtered    = filterNulls(images)
        this.setState(prevState => ({
          images: [ ...prevState.images, ...filtered],
          sequence: newSequence,
          notLoading: !prevState.notLoading
        }));
      }
      catch (err) {
        this.setState(prevState => ({
          notLoading: !prevState.notLoading,
          error: err.message,
        }));
      }
    } else {
      return;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  render() {
    return (
      <InfiniteScroll state={this.state} />
    );
  }
}

export default App;

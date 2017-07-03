import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import InfiniteScroll from './components/infiniteScroll';
import {
  filterNulls,
  mapToFetchImage,
  nextSequence
} from './helpers/helpersRamda';
import {
  addBlobs,
  setWHeight,
  toggleNotLoading,
  setNewSequence,
  setErrorMsg,
  clearErrorMsg,
} from './actionCreators/actionCreators';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.props.setWHeight(window.innerHeight);
    window.addEventListener('scroll', throttle(this.handleScroll, 400), false);
    const images = await Promise.all(mapToFetchImage(this.props.sequence))
    this.props.addBlobs(images);
  }

  async handleScroll() {
    const scrollToBottom = (this.props.wHeight + window.scrollY) >= (document.body.offsetHeight - 100);

    if (scrollToBottom && this.props.notLoading) {
      this.props.clearErrorMsg();
      this.props.toggleNotLoading()

      try {
        const newSequence = nextSequence(this.props.sequence)
        const images      = await Promise.all(mapToFetchImage(newSequence))
        const filtered    = filterNulls(images)
        this.props.addBlobs(filtered);
        this.props.setNewSequence(newSequence);
        this.props.toggleNotLoading();
      }
      catch (err) {
        this.props.setErrorMsg(err.message);
        this.props.toggleNotLoading();
      }
    } else {
      return;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 400), false)
  }

  render() {
    return (
      <InfiniteScroll state={this.props} />
    );
  }
}

const mapStateToProps = state => ({
  sequence: state.sequence,
  images: state.blobs,
  notLoading: state.notLoading,
  wHeight: state.wHeight,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  setWHeight: (wHeight) => {
    dispatch(setWHeight(wHeight))
  },
  addBlobs: (blobs) => {
    dispatch(addBlobs(blobs))
  },
  toggleNotLoading: () => {
    dispatch(toggleNotLoading())
  },
  clearErrorMsg: () => {
    dispatch(clearErrorMsg())
  },
  setNewSequence: (sequence) => {
    dispatch(setNewSequence(sequence))
  },
  setErrorMsg: (msg) => {
    dispatch(setErrorMsg(msg))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

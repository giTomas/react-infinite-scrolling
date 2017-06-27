import React, { Component } from 'react';
import R from 'ramda';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wHeight: '',
      scollY: 0,
      scrollEnought: 0,
      images: [],
    }
  }

  async fetchImage(img) {
    const url = `https://unsplash.it/400/400?image=${img}`;
    const response = await fetch(url);
    const blob = await response.blob();

    if (response.status !== 200) {
      throw Error(response.message);
    }

    return blob;
  }

  async componentDidMount() {
    const wHeight = window.innerHeight;
    this.setState({wHeight});
    window.addEventListener('scroll', this.handleScroll, false);
    // const fetchImage1 = R.partial(this.fetchImage, ['101']);
    // const fetchImage2 = R.partial(this.fetchImage,  ['102']);
    // const fetchImage3 = R.partial(this.fetchImage,  ['103']);


    // fetchImage1()
    //   .then(response => response.blob())
    //   .then(image => {
    //     this.setState(prevState => ({image: [ ...prevState.image, image ]})
    //   )})
    // fetchImage2()
    //   .then(response => response.blob())
    //   .then(image => {
    //     this.setState(prevState => ({image: [ ...prevState.image, image]})
    //   )})
    // fetchImage3()
    //   .then(response => response.blob())
    //   .then(image => {
    //     this.setState(prevState => ({image: [ ...prevState.image, image]})
    //   )})
    // const images =  await Promise.all([fetchImage1(), fetchImage2(), fetchImage3()])
    const nums = [101, 103, 104, 109]
    const images = await Promise.all(nums.map(num => this.fetchImage(num)) )
    // console.log(images)
    // this.setState(prevState => ({image: [ ...prevState.images, blob1, blob2, blob3]}));
    this.setState(prevState => ({image: [ ...prevState.images, ...images]}));

  }



  handleScroll = () => {
    const scrollY = window.pageYOffset;
    const wHeight = this.state.wHeight;
    const scroll = ((scrollY % wHeight) >= wHeight*0.9);
    // this.setState(prevState => {scrollEnought: scroll ? prevState.scrollEnought++ : prevState.scrollEnought});
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
          {this.state.image && this.state.image.map((img) => <img src={URL.createObjectURL(img)} />)}
        </h2>
      </div>
    );
  }
}

export default App;

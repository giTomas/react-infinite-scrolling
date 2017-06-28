import React, { Component } from 'react';
import R from 'ramda';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.main`
  font-family: 'Kalam', cursive;
  margin: 0 auto;
  padding: 1em 1em 10em;
  display: flex;
  flex-wrap: wrap;
  max-width: 1300px;
  @media(max-width: 1330px) {
    max-width: 864px;
  }
  @media(max-width: 896px) {
    max-width: 432px;
  }
`;

const HeaderWrapper = styled.main`
  font-family: 'Kalam', cursive;
  margin: 0 auto;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  max-width: 1300px;
  @media(max-width: 1330px) {
    max-width: 864px;
  }
  @media(max-width: 896px) {
    max-width: 432px;
  }
`;

const Link = styled.a`
  transform: translate(10px, 50px);
  transition: color 0.25s ease-out;
  &:hover {
    color: Crimson;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
`;

const ellipsis = keyframes`
  to {
    width: 1.25em;
  }
`
const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  font-size: 30px;
  padding-top: 4em;
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4,end) 900ms infinite;
    content: '...';
    width: 0px;
  }
`;

const Title = styled.h1`
  font-family: 'Kalam', cursive;
  color: Crimson;
  margin: 0;
  padding-left: 1rem;
`;

const Source = styled.h2`
  font-family: 'Kalam', cursive;
  color: Crimson;
  margin: 0;
  padding-right: 1rem;
`;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wHeight: 0,
      scollY: 0,
      scrollEnought: 0,
      range: [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23],
      images: [],
      loading: false,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  async fetchImage(img) {
    const url = `https://unsplash.it/400/400?image=${img}`;
    const response = await fetch(url);
    const blob = await response.blob();

    if (!response.ok) {
      // throw Error(response.statusText);
      return false;
    }

    return blob;
  }

  async componentDidMount() {
    const wHeight = window.innerHeight;
    this.setState({wHeight});
    window.addEventListener('scroll', this.handleScroll, false);

    // const nums = [10, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24, 35, 87, 88, 89, 90, 91, 92, 93, 94, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]
    // try {
    const images = await Promise.all(this.state.range.map(num => this.fetchImage(num)) )
    this.setState(prevState => ({images: [ ...prevState.images, ...images]}));
    // }
    // catch (err) {
    //   console.error(`Error: ${err.message}`)
    // }
    // console.log(images)
    // this.setState(prevState => ({image: [ ...prevState.images, blob1, blob2, blob3]}));


  }



  async handleScroll() {
    // const scrollY = window.pageYOffset;
    // const wHeight = this.state.wHeight;
    // const scroll = ((scrollY % wHeight) >= wHeight*0.8);
    const scroll = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 150);

    if (scroll && !this.state.loading) {
      this.setState({loading: true});
      // make list form
      const len = this.state.range.length;
      console.log(len);
      const toUpdate = this.state.range.slice(len-9, len);
      console.log(toUpdate)
      const updated = toUpdate.map(num => num+10)
      const images = await Promise.all(updated.map(num => this.fetchImage(num)) )
      this.setState(prevState => ({
        images: [ ...prevState.images, ...images],
        range: [ ...prevState.range, ...updated],
        loading: !prevState.loading
      }));
      // add numbers to list
      // htttp reques

    } else {
      return;
    }
    // this.setState(prevState => {scrollEnought: scroll ? prevState.scrollEnought++ : prevState.scrollEnought});
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  render() {

    const height = this.state.scrollEnought
    return (
      <div style={{position: 'relative'}}>
        <Header>
          <HeaderWrapper>
            <Title>
              React infinite scroll
            </Title>
            <Source>
              Images by <Link href='http://unsplash.it/'>unsplash.it</Link>
            </Source>
          </HeaderWrapper>
        </Header>

        <Wrapper>
          {this.state.images
            && this.state.images.map((img, i) =>
            img && <img key={`img-${i.toString()}`} style={{margin:'1em', padding: 0, lineHeight: 0,}} src={URL.createObjectURL(img)} />)}
          <LoaderContainer>
            <Loader>Loading</Loader>
          </LoaderContainer>
        </Wrapper>
      </div>
    );
  }
}

export default App;

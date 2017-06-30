import React, { Component } from 'react';
import R from 'ramda';
import styled, { keyframes } from 'styled-components';

// TODO: mobX versiom
// TODO: redux version

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
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
`;

const ellipsis = keyframes`
  to {
    width: 1.25em;
  }
`
const LoaderContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  font-size: 30px;
  padding: 4em 0 2em;
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
  padding: 0 1rem;
`;

const Source = styled.h2`
  font-family: 'Kalam', cursive;
  color: Crimson;
  margin: 0;
  padding: 0 1rem;
`;

const imageShow = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1;
  }
`;

const Image = styled.img`
  margin: 1em;
  animation: ${imageShow} 0.5s ease-out;
`;

async function fetchImage(img) {
  const url = `https://unsplash.it/400/400?image=${img}`;
  const response = await fetch(url);
  const blob = await response.blob();

  if (!response.ok) {
    // throw Error(response.statusText);
    return null;
  }
  return blob;
}

// ramda composition
const isNotNull = n => n && n;
const filterNulls = R.filter(isNotNull);
const mapToFetchImage = R.map(fetchImage);
const mapIndexed = R.addIndex(R.map);
const mapToImageEls = mapIndexed((img, i) => (
    <Image key={`img-${i.toString()}`} src={URL.createObjectURL(img)} />)
);
const addImageEls = R.compose(
  mapToImageEls,
  filterNulls
)
const sliceLasts = arr => R.slice(arr.length-9, arr.length, arr);
const nextImages = R.compose(
  R.map(R.add(10)),
  sliceLasts
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      range: [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23],
      images: [],
      notLoading: true,
      wHeight: null,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.setState({wHeight: window.innerHeight});
    window.addEventListener('scroll', this.handleScroll, false);
    const images = await Promise.all(mapToFetchImage(this.state.range))
    this.setState(prevState => ({images: [ ...prevState.images, ...images]}));
  }

  async handleScroll() {
    const scrollToBottom = (this.state.wHeight + window.scrollY) >= (document.body.offsetHeight - 150);


    if (scrollToBottom && this.state.notLoading) {
      this.setState(prevState => ({notLoading: !prevState.notLoading}));
      const updated = nextImages(this.state.range)
      const images = await Promise.all(mapToFetchImage(updated))
      this.setState(prevState => ({
        images: [ ...prevState.images, ...images],
        range: [ ...prevState.range, ...updated],
        notLoading: !prevState.loading
      }));
    } else {
      return;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  render() {
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
          {this.state.images && addImageEls(this.state.images)}
          <LoaderContainer>
            <Loader>Loading</Loader>
          </LoaderContainer>
        </Wrapper>
      </div>
    );
  }
}

export default App;

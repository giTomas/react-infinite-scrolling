import React, { Component } from 'react';
import R from 'ramda';
import styled, { keyframes } from 'styled-components';

// TODO: mobX versiom
// TODO: redux version

const PageWrapper = styled.div`
  position: relative;
  font-family: 'Raleway', sans-serif;
`;

const Wrapper = styled.main`
  margin: 0 auto;
  padding: 3.9em 1em 10em;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
`;

const InnerWrapper = styled.div`
  margin: 0 auto;
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  max-width: 1200px;
`;

const Link = styled.a`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  color: black;
  transition: color 0.25s ease-out;
  &:hover {
    color: Grey;
  }
`;

const Header = styled.header`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(to right, rgba(0, 255, 255, 0.85), rgba(127, 255, 212, 0.85));
  ${'' /* background-color: rgba(, 255, 255, 255, 0.8); */}
  box-shadow: 0 2px 3px rgba(0, 51, 51, 0.35);
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
  font-weight: 300;
  font-size: 2em;
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
  font-weight: 300;
  margin: 0 0 0 -3px;
  padding: 0 1rem;
`;

const Source = styled.h2`
  font-weight: 300;
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
  width: calc(25% - 2em);
  margin: 1em;
  box-shadow: 0 1px 2px rgba(0, 51, 51, 0.35);
  animation: ${imageShow} 2s ease-out;
  @media(max-width: 850px) {
    width: calc(33.33% - 2em);
  }
  @media(max-width: 450px) {
    width: calc(50% - 2em);
  }
`;

async function fetchImage(img) {
  const url = `https://unsplash.it/300/300?image=${img}`;
  const response = await fetch(url);
  const blob = await response.blob();

  if (!response.ok) {
    // throw Error(response.statusText);
    return false;
  }
  return blob;
}

// ramda
const isNotFalse = n => n && n;
const filterNulls = R.filter(isNotFalse);
const mapToFetchImage = R.map(fetchImage);
const mapIndexed = R.addIndex(R.map);
const nextSequence = R.map(R.add(16));
const mapToImageEls = mapIndexed((img, i) => (
    <Image key={`img-${i.toString()}`} src={URL.createObjectURL(img)} />)
);

const InfiniteScroll = ({state: {images, notLoading, error}}) => (
  <PageWrapper>
    <Header>
      <InnerWrapper>
        <Title>
          React infinite scroll
        </Title>
        <Source>
          Images by <Link href='http://unsplash.it/'>unsplash.it</Link>
        </Source>
      </InnerWrapper>
    </Header>
    <Wrapper>
      {images && mapToImageEls(images)}
      <LoaderContainer>
        {(!notLoading && !error) && <Loader>Loading</Loader>}
        {error && <p>{error}</p>}
      </LoaderContainer>
    </Wrapper>
  </PageWrapper>
);

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

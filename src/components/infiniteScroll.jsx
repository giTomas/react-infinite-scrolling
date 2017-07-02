import React from 'react';
import styled, { keyframes } from 'styled-components';
import { mapIndexed } from '../helpers/helpersRamda';

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

// const mapIndexed = R.addIndex(R.map);
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

export default InfiniteScroll;

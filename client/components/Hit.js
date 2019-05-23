import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.section`
  padding: 1em;
  margin: 1em;
  background: #FAFAFA;
  width: 400px;
`;

const Hit = props => {
  return (
    <Wrapper>
      <div className="search-hit">
        <p attribute="name">
          <a href={props.hit.url}>
            {props.hit.name}
          </a>
        </p>
        <p attribute="name">
          {props.hit.display_phone}
        </p>
        <div style={{ border: '1px solid black' }} attribute="image">
          <img style={{ maxWidth: '100%' }} src={props.hit.image_url} alt="restaurant image" />
        </div>
      </div>
    </Wrapper>
  )
}

export default Hit;

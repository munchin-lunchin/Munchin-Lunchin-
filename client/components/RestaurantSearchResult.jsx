import React from 'react';
// import Result from '../containers/Result';
import LocationContainer from '../containers/LocationContainer';
// import Icon from '../components/Icon';
import Address from '../components/Address';
import Name from '../components/Name';

const RestaurantSearchResult = (props) => {

  return (
  <article style={{
    display: `flex`,
    borderBottom: `1px solid #F1ECE6`,
    padding: `0.5em 1em 0.75em 1em;`,
  }}>
    <Name>{props.data.name}</Name>
    <LocationContainer>
    <svg width="33px" height="33px" viewBox="0 0 33 33" >
        <defs>
          <linearGradient x1="13.6037069%" y1="-11.8138602%" x2="88.2868611%" y2="136.109501%" id="linearGradient-1">
            <stop stop-color="#FCDFBE" offset="0%"></stop>
            <stop stop-color="#EFA35D" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="Main-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Desktop" transform="translate(-121.000000, -347.000000)" fill="url(#linearGradient-1)" stroke="#D89552" stroke-width="0.5">
            <path d="M137.5,379 C128.939586,379 122,372.060414 122,363.5 C122,354.939586 128.939586,348 137.5,348 C146.060414,348 153,354.939586 153,363.5 C153,372.060414 146.060414,379 137.5,379 Z M138.063636,371.674841 C139.041757,370.304711 143.139886,364.345666 143.139886,360.68911 C143.139886,357.576233 140.6164,355.052747 137.503523,355.052747 C134.390645,355.052747 131.867159,357.576233 131.867159,360.68911 C131.867159,364.345666 135.9655,370.304711 136.943409,371.674841 C137.073024,371.855118 137.281487,371.961989 137.503523,371.961989 C137.725558,371.961989 137.934022,371.855118 138.063636,371.674841 Z M137.503523,357.166453 C138.437808,357.166453 139.333828,357.537597 139.994467,358.198236 C140.655107,358.858876 141.02625,359.754895 141.02625,360.689181 C141.02625,362.634729 139.449071,364.211908 137.503523,364.211908 C135.557974,364.211908 133.980795,362.634729 133.980795,360.689181 C133.980795,358.743632 135.557974,357.166453 137.503523,357.166453 Z" id="Combined-Shape"></path>
          </g>
        </g>
      </svg>
      <Address>{props.data.location.display_address[0]}</Address>
    </LocationContainer>
  </article>
    // <div className="searchResult">
    //   <h4>{props.data.name}</h4>
    //   <h6>{props.data.location.display_address[0]}<br />
    //     {props.data.location.display_address[1]}</h6>
    //   <button onClick={() => { props.likeRestaurant(props.data) }}> Like </button>
    // </div>
  );
}

export default RestaurantSearchResult;

import React from 'react';
import LocationContainer from '../containers/LocationContainer';
import Address from '../components/Address';
import Name from '../components/Name';
import { removeClientSetsFromDocument } from 'apollo-utilities';

const RestaurantSearchResult = (props) => {
  return (
    <article style={{
      display: `flex`,
      alignItems: `center`,
      borderBottom: `1px solid #F1ECE6`,
      padding: `0.5em 1em 0.75em 0`,
    }}>
      <section class="restaurant-info">
        <Name>{props.data.name}</Name>
        <LocationContainer>
          <svg width="18px" height="18px" viewBox="0 0 33 33" >
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
          <Address>{props.data.location.formatted_address}</Address>
        </LocationContainer>
      </section>
      <svg onClick={() => { props.likeRestaurant(props) }} width="35px" height="31px" viewBox="0 0 35 31">
        <g id="Main-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Desktop" transform="translate(-837.000000, -348.000000)" fill="#F57E7E" fill-rule="nonzero">
            <g id="heartempty" transform="translate(837.000000, 348.000000)">
              <path d="M17.5,31 C13.8423587,31 0.000666654284,22.1233614 0.000666654284,10.1347455 C-0.0621934833,4.61079753 4.32826288,0.0775504293 9.81618227,0 C12.8293144,0.0126223264 15.6667421,1.4291946 17.4999992,3.83610909 C19.3332008,1.42912671 22.1706639,0.0125367586 25.1838161,1.25152414e-15 C30.6717684,0.0774734053 35.0622692,4.61076638 34.9993317,10.1347455 C34.9993317,22.1233614 21.1577797,31 17.5,31 Z M25.1838161,2.81818182 C20.6463092,2.81818182 19.1069979,7.04545455 17.4999992,7.04545455 C15.8930005,7.04545455 14.3536892,2.81818182 9.81611227,2.81818182 C5.87396803,2.89430822 2.73625466,6.16664919 2.80055986,10.1347455 C2.80055986,20.773875 15.668449,28.1598364 17.4999992,28.1818182 C19.3314793,28.1598364 32.1994385,20.773875 32.1994385,10.1347455 C32.2637434,6.16662221 29.1259879,2.89426992 25.1838161,2.81818182 L25.1838161,2.81818182 Z" id="Shape"></path>
            </g>
          </g>
        </g>
      </svg>
    </article>
  );
}

export default RestaurantSearchResult;

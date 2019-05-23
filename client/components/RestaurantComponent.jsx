import React from 'react';

const RestaurantComponent  = ({ _id, name, rating, displayAddress, price, reviewCount, deleteLikeMutation, getLikesQuery, userId, longitude, latitude }) => {
  return (
    <article>
      <header>
        <CardName>{name}</CardName>
        <svg onClick={() => {
            console.log('Getlikesquery is', getLikesQuery);
            deleteLikeMutation({
              variables: {
                user_id: parseInt(userId),
                rest_id: parseInt(_id)
              },
              refetchQueries: [{ query: getLikesQuery }]
            });
          }
          }></svg>
      </header>
      <section>
        <Price price={price} />
        <Rating rating={rating} />
        <Status isOpen={true} />
      </section>
      <Map coordinates={{ 'longitude': longitude, 'latitude': latitude }} />
    </article>
   );
}

export default RestaurantComponent; 
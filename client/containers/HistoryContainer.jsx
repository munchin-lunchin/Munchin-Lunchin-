import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

//Graphql query for restaurants our user is trying to find.
const getLikesQuery = gql`
  {
    user(_id: 1) {
      username
    }
  }
  
  `

//Setting up apollo client  - connection to graphql endpoint on server
const client = new ApolloClient ({
  uri: 'http://localhost:3000/graphql'
})

const HistoryContainer = (props) => {
  //Apollo wrapper injects data from the server into the application
  console.log(props);
  return (
    <ApolloProvider client={client}>
      <div>
        <h2> a history container is here! </h2>
      </div>
    </ApolloProvider>
  )
};


//binds our query to the current container by adding the output to props.data.  
//It's like redux when you use connect on map state to props and map dispatch to props
export default graphql(getLikesQuery)(HistoryContainer);
// export default HistoryContainer;

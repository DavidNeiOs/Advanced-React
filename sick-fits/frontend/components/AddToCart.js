import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const ADDTOCART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADDTOCART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading, error }) => {
          if (error) alert(`Error: ${error}`);
          return (
            <button disabled={loading} onClick={addToCart}>
              Add{loading && "ing"} to cart 🛒
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default AddToCart;

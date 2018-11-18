import React, { Component } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import { format } from "date-fns";
import Head from "next/head";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import User from "./User";
import styled from "styled-components";

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      charge
      createdAt
      items {
        title
      }
    }
  }
`;

const OrderPreview = styled.div`
  width: 80%;
  border: 2px solid ${props => props.theme.black};
  margin: 0 auto 1rem auto;
  padding: 2rem;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.7);
  a {
    background: red;
    color: white;
    font-weight: 500;
    border: 0;
    border-radius: 0;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem;
  }
  p {
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

class Orders extends Component {
  render() {
    return (
      <Query query={ALL_ORDERS_QUERY}>
        {({ data: { orders }, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>LOADING...</p>;
          console.log(orders);
          return (
            <div>
              <Head>
                <title>Sick fits | All Orders</title>
              </Head>
              {orders.map(order => (
                <OrderPreview key={order.id}>
                  <p>
                    <span>Items: </span>
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.title}
                        {index === order.items.length - 1 ? "." : ","}
                      </span>
                    ))}
                  </p>
                  <p>
                    <span>Date: </span>
                    <span>
                      {format(order.createdAt, "MMMM d, YYYY h:mm a")}
                    </span>
                  </p>
                  <p>
                    <span>Total price: </span>
                    <span>{formatMoney(order.total)}</span>
                  </p>
                  <Link
                    href={{
                      pathname: "/order",
                      query: { id: order.id }
                    }}
                  >
                    <a>Go to Order</a>
                  </Link>
                </OrderPreview>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Orders;

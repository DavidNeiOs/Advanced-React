import Link from "next/link";
import { Mutation } from "react-apollo";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  My Cart{" "}
                  <CartCount
                    count={me.cart.reduce(
                      (acc, cartItem) => acc + cartItem.quantity,
                      0
                    )}
                  />
                </button>
              )}
            </Mutation>
            <Signout />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

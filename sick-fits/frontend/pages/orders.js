import PleaseSignin from "../components/PleaseSignin";
import Orders from "../components/Orders";

const OrdersPage = props => (
  <div>
    <PleaseSignin>
      <Orders />
    </PleaseSignin>
  </div>
);

export default OrdersPage;

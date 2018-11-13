import PleaseSignin from "../components/PleaseSignin";
import Permissions from "../components/Permissions";

const PermissionPage = props => (
  <div>
    <PleaseSignin>
      <Permissions />
    </PleaseSignin>
  </div>
);
export default PermissionPage;

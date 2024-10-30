import ProfileTemplate from "../../../components/profile-template";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ViewCustomer() {
  return (
    <ProfileTemplate path="/admin" pathapi="/api/customer"></ProfileTemplate>
  );
}

export default ViewCustomer;

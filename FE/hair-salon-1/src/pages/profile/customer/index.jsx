import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProfileTemplate from "../../../components/profile-template";


function ViewCustomer() {

  return (
    <ProfileTemplate
     path="/"
      pathapi="/api/customer"
    >

    </ProfileTemplate>
  );
}

export default ViewCustomer;

import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";




function Logout () {


    const usenavigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        usenavigate("/login");
      }
      <div>
        <Button onClick={logout}>ADSDAS</Button>
      </div>



}
export default Logout
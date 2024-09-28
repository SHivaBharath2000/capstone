import "./nav.css";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { userSignIn } from "../../API/auth";
import { useContext } from "react";
import { MyContext } from "../Routing";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //This context for to send the login user name
  const { token, setToken } = useContext(MyContext);
  const navigate=useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission logic
    try{
    const data = await userSignIn({ email, password });
    if (data.code === 1) {
      localStorage.setItem("token", data.token);
      setToken(data.token)
      alert("Login successfully")
      navigate("/"); // redirect to home page
    } else {
      alert("Please check Your Credentials");
    }
  }catch(err){
    alert("Please check Your Credentials");
    console.log(err)
  }
  };
  
  return (
    <>
      <div className="wrapper">
        <h1>Login</h1>
        <form action="#" onSubmit={handleSubmit}>
          <input className="inputs" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="inputs" type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <div className="terms">
          <input style={{ marginTop: "6px"}} type="checkbox" name="" id="checkbox" />
          <label htmlFor="checkbox">
            I agree to these<Link to='/terms'><a href="#"> Terms & Conditions</a></Link>
          </label>
        </div>
        <button>Login</button>
        </form>
        <div className="member">
          Not a member ? <Link to="/signup">Register here</Link>

          <Link to="/forgotPassword">Forgot Password</Link>
        </div>
      </div>
    </>
  );
}

export default Login;

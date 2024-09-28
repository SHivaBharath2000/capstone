import { Link } from "react-router-dom";
import "./nav.css";
// import img from "/images/background.jpg";
import { useState } from "react";
import { userSignup } from "../../API/auth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreed) {
      alert("You must agree to the terms and conditions");
      return;
    }
    // Handle form submission logic
    const data = await userSignup({ name, email, password, phoneNo });
    if (data.code === 1) {
      alert("User created successfully");
      alert("Check your mail");
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1>Sign Up</h1>
        <form action="#" onSubmit={handleSubmit}>
          <input
            className="inputs"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="inputs"
            type="email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="inputs"
            placeholder="Number"
            type="tel"
            id="phone"
            name="phone"
            value={phoneNo}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="terms">
            <input
              type="checkbox"
              id="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="checkbox">
              I agree to these<Link to='/terms'><a href="#"> Terms & Conditions</a></Link>
            </label>
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className="member">
          Already a Member? <Link to="/login">Login Here</Link>
        </div>
      </div>
    </>
  );
}

export default Signup;

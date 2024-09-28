import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './forgotPassword.css'
import { forgotPassword } from "../../API/auth";
function ForgotPassword() {
//  const navigate=useNavigate()
  const [email, setEmail] = useState('');

  const handleSubmit =  async(e) => {
    e.preventDefault();
    const data=await forgotPassword({email})
    if(data.code==1){
        alert("Email send successfully")
        
    }
   
    else{
        alert("Email not send")
    }
  };

    return (
        <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <div className="form-group">
          <label className="label" htmlFor="email">Email:</label>
          <input
          style={{ height: "54px"}}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="forgot-password-button" type="submit">Submit</button>
      </form>
    </div>
    )
}

export default ForgotPassword
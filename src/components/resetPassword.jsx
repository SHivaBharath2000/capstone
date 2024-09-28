import { useState ,useEffect} from "react";
import "./reset.css";
import { resetPassword } from "../../API/auth";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

function Resetpassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ token: '', password: '' });
  
    useEffect(() => {
      const token = searchParams.get("token");
      if (token) {
        setForm((prevForm) => ({ ...prevForm, token }));
      }
    }, [searchParams]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
    const handleSubmit =async (event) => {
        event.preventDefault();
        try {
            if (!form.token) {
              alert("Invalid request: Missing token.");
              return;
            }
      
            // Making API call
            const data = await resetPassword(form);
      
            // Handling response
            if (data.code === 1) {
              alert("Password reset successfully.");
              navigate("/login"); // Redirect to login page
            } else {
              alert("Reset unsuccessful.");
            }
          } catch (error) {
            console.log(error);
            alert("An error occurred during password reset.");
          }
    }
    return (
        <div className="password-reset-container">
        <form onSubmit={handleSubmit} className="password-reset-form">
          <h2>Reset Your Password</h2>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
          
        </form>
      </div>
    );
}

export default Resetpassword
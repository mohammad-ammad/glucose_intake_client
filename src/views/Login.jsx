import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { loginUser } from "../api/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false); 
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (email === "") {
      setError("Email is required");
      return;
    }

    if (password === "") {
      setError("Password is required");
      return;
    }

    setError(null);

    const response = await loginUser({ email, password });
    
    if (response?.response?.status === 400) {
      setError(response.response.data.message);
      setLoading(false);
      return;
    }

    if(response?.status === 200) {
      localStorage.setItem("User", response.data.token)
      navigate("/dashboard");
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="flex px-5 w-[500px] flex-col gap-4" onSubmit={submitHandler}>
        {
          error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )
        }
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="youremail@gmail.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        
        <Button type="submit">
          {
            loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span>Logging in...</span>
              </div>
            ) : "submit"
          }
        </Button>
      </form>
    </div>
  );
};

export default Login;

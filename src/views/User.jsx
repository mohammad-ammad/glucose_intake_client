import React from "react";
import NavbarComp from "../components/NavbarComp";
import { Button, Label, TextInput} from "flowbite-react";
import { registerUser } from "../api/user";
const User = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "role") {
      setRole(value);
    }
  };

  const submitHandler = async (event) => {
    try {
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

        if (name === "") {
            setError("Name is required");
            return;
        }

        if (role === "") {
            setError("Role is required");
            return;
        }

        setError(null);

        const response = await registerUser({ email, password, name, role });

        if (response?.response?.status === 400) {
            setError(response.response.data.message);
            setLoading(false);
            return;
        }

        if(response?.status === 201) {
            setSuccess("User created successfully");
            setLoading(false);
        }

    } catch (error) {
        setError(error)
        setLoading(false)
        console.log(error)
    }
  };
  return (
    <>
      <NavbarComp />
      <div className="w-full h-screen flex justify-center items-center">
        <form
          className="flex px-5 w-[500px] flex-col gap-4"
          onSubmit={submitHandler}
        >
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {
            success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">{success}</span>
                </div>
                )
          }
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name1" value="Username" />
            </div>
            <TextInput
              id="name1"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Username"
              required
            />
          </div>
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
            <TextInput
              id="password1"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role1" value="Role" />
            </div>
            <select
              name="role"
              onChange={onChange}
              className="w-full rounded-md bg-gray-100"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">Physican</option>
            </select>
          </div>
          <Button type="submit">
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Creating User...</span>
              </div>
            ) : (
              "submit"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default User;

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Button } from "@mui/material";
import Layout from "./Layout";
import { UserContext } from "../contexts/userContext";
import { SignupFormData } from "../utils/types";
import { AuthServices } from "../services/Auth";
import { getErrorMessage } from "../utils/helper";

function Signup() {
  const navigate = useNavigate();
  const { isLoggedIn, setUser } = useContext(UserContext);

  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsDisabled(true);

    try {
      const { data } = await AuthServices.signup(form);

      if (data.success) {
        const user = data.data;

        setUser({
          name: user.name,
          email: user.email,
        });
        toast.success("Logged In");
        setIsDisabled(false);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
      setIsDisabled(false);
    }
  };

  return (
    <Layout title="Todo - Signup">
      <div className="flex justify-center h-screen items-center">
        <div className="w-96 p-4 shadow-lg bg-white rounded-md text-center">
          <h1 className="text-3xl">Signup</h1>
          <form onSubmit={handleSignup}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <div className="mt-2">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled}
                fullWidth
              >
                Signup
              </Button>
            </div>
            <div className="mt-4">
              <p>
                Have account?{" "}
                <Link to="/login" className="text-indigo-600">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;

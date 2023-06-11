import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { UserContext } from "../contexts/userContext";
import { LoginFormData } from "../utils/types";
import { AuthServices } from "../services/Auth";
import { getErrorMessage } from "../utils/helper";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setUser } = useContext(UserContext);

  const [form, setForm] = useState<LoginFormData>({
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

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const { data } = await AuthServices.login(form);

      if (data.success) {
        const user = data.data;
        setUser({
          name: user.name,
          email: user.email,
        });
        toast.success("LoggedIn successfully");
      }
      setIsDisabled(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
      setIsDisabled(false);
    }
  };

  return (
    <Layout title="Todo - Login">
      <div className="flex justify-center h-screen items-center">
        <div className="w-96 p-4 shadow-lg bg-white rounded-md text-center">
          <h1 className="text-3xl">Login</h1>
          <form onSubmit={handleLogin}>
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
                fullWidth
                disabled={isDisabled}
              >
                Login
              </Button>
            </div>
            <div className="mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-600">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;

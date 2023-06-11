import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/userContext";
import { TodoContext } from "../contexts/TodoContext";
import { LayoutProps } from "../utils/types";
import { Button } from "@mui/material";
import { AuthServices } from "../services/Auth";
import { getErrorMessage } from "../utils/helper";

function Layout(props: LayoutProps) {
  const { children, title = "Todo" } = props;
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const { setTodos } = useContext(TodoContext);

  const handleLogout = async () => {
    try {
      const { data } = await AuthServices.logout();

      if (data.success) {
        setUser({
          name: "",
          email: "",
        });
        setTodos([]);
        toast.success("Logout successful");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="shadow-md w-full fixed top-0 left-0">
        <header className="flex items-center justify-between bg-white py-2.5 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <a href="/">
              <div className="flex gap-1 items-center">
                <img src="/logo.png" alt="pocketlink" className="h-10" />
                <span>Todo</span>
              </div>
            </a>
          </div>

          <div>
            {isLoggedIn && (
              <div className="flex items-center gap-5">
                <span className="text-gray-400 font-semibold">
                  Hey, {user.name}!
                </span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </header>
      </div>

      <main className="bg-zinc-100">{children}</main>
    </div>
  );
}

export default Layout;

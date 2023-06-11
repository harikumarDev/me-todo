import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { User, UserProviderProps } from "../utils/types";

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isLoggedIn: boolean;
}

export const UserContext = createContext({
  user: {
    name: "",
    email: "",
  },
  setUser: (user: User) => {},
  isLoggedIn: false,
});

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));

    setIsLoggedIn(Boolean(user.name && user.email));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

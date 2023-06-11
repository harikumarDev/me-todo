import APIManager from "../utils/managers/APIManager";
import { RestEnds } from "./constants";
import { LoginFormData, SignupFormData } from "../utils/types";

const login = async (data: LoginFormData) =>
  APIManager.sendPost(RestEnds.LOGIN, data);

const signup = async (data: SignupFormData) =>
  APIManager.sendPost(RestEnds.SIGNUP, data);

const logout = async () => APIManager.sendGet(RestEnds.LOGOUT);

export const AuthServices = {
  login,
  signup,
  logout,
};

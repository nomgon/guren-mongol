import React, { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restApiUrl } from "../Constant";
const UserContext = createContext();

export const UserState = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (email, password) => {
    axios
      .post(`${restApiUrl}/api/v1/users/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data);
        loginUserSuccessful(
          result.data.token,
          email,
          result.data.user.name,
          result.data.user.role
        );
      })
      .catch((err) => {
        loginFailed(err.message);
      });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`${restApiUrl}/api/v1/users/logout`);
    setEmail(null);
    setIsLoggedIn(false);
    setToken(null);
    setUserName(null);
    setUserRole(null);
  };

  const signUp = (name, email, password) => {
    axios
      .post(`${restApiUrl}/api/v1/users/register`, {
        name: name,
        email: email,
        password: password,
        role: "admin",
      })
      .then((result) => {
        console.log(result.data);
        loginUserSuccessful(result.data.token, email, name, "admin");
      })
      .catch((err) => {
        loginFailed(err.message);
      });
  };

  const loginFailed = (error) => {
    console.log(error);
    setIsLoggedIn(false);
    setEmail(null);
    setToken(null);
    setUserName(null);
    setUserRole(null);
  };

  const loginUserSuccessful = async (token, email, userName, userRole) => {
    setToken(token);
    setEmail(email);
    setUserName(userName);
    setUserRole(userRole);
    setIsLoggedIn("true");

    // AsyncStorage.setItem('user_token', token)
    //     .then(result => {
    //         console.log('Login has been done!!!. Token has been stored as successfully');
    //         setIsLoggedIn(true);
    //     })
    //     .catch(err => {
    //         console.log("token could not been stored..." + err.message);
    //     });

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, userName, userRole, email }),
        console.log("========+++___+++" + token, userName, userRole, email)
      );
    } catch (err) {
      console.log("Info could not stored on phone storage...");
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login,
        userName,
        setUserName,
        email,
        setEmail,
        userRole,
        setUserRole,
        signUp,
        logout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

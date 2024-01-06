import React, { createContext, useState, useEffect } from "react";
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
  const [result, setResult] = useState();

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${restApiUrl}/api/v1/users/login`, {
        email: email,
        password: password,
      });

      setResult(result.data);
      console.log(result.data);
      await loginUserSuccessful(
        result.data.token,
        email,
        result.data.user.name,
        result.data.user.role
      );
    } catch (err) {
      loginFailed(err.message);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`${restApiUrl}/api/v1/users/logout`);
    setEmail(null);
    setIsLoggedIn(false);
    setToken(null);
    setUserName(null);
    setUserRole(null);
    setResult(null); // Reset result on logout
  };

  const deleteAccount = async () => {
    try {
      // Check if the token is available
      if (!token) {
        console.log("Token is missing.");
        return;
      }

      // Use the result from the state
      if (result && result.user && result.user._id) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let response;
        try {
          // Update the result state to null first
          setResult(null);

          response = await axios.delete(
            `${restApiUrl}/api/v1/users/${result.user._id}`,
            config
          );
        } catch (error) {
          console.log("Error deleting account:", error.message);
          return;
        }

        if (response.status === 200) {
          // Successful deletion
          await AsyncStorage.removeItem("user");
          setEmail(null);
          setIsLoggedIn(false);
          setToken(null);
          setUserName(null);
          setUserRole(null);
        } else {
          // Handle unexpected status codes
          console.log("Unexpected status code:", response.status);
        }
      } else {
        // Handle the case where result or result.user or result.user._id is undefined
        console.log("Result or its properties are undefined...");
      }
    } catch (err) {
      console.log("General error:", err.message);
    }
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
    setIsLoggedIn(true);

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, userName, userRole, email })
      );
      console.log("========+++___+++", token, userName, userRole, email);
    } catch (err) {
      console.log("Info could not be stored on phone storage...");
    }
  };

  // const loginUserSuccessful = async (result) => {
  //   setToken(result.token);
  //   setEmail(result.email);
  //   setUserName(result.user.name);
  //   setUserRole(result.user.role);
  //   setIsLoggedIn(true);

  //   try {
  //     await AsyncStorage.setItem(
  //       "user",
  //       JSON.stringify({
  //         token: result.token,
  //         userName: result.user.name,
  //         userRole: result.user.role,
  //         email: result.email,
  //       })
  //     );
  //   } catch (err) {
  //     console.log("Info could not be stored on phone storage...");
  //   }
  // };

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
        deleteAccount,
        isLoading,
        setIsLoading,
        result, // Make result accessible
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

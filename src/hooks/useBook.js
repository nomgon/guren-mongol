import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { restApiUrl } from "../Constant";

export default (id) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const state = useContext(UserContext);

  const loadBook = async () => {
    try {
      const result = await axios.get(`${restApiUrl}/api/v1/books/${id}`);

      setBook(result.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBook = (id) => {
    return axios.delete(`${restApiUrl}/api/v1/books/${id}`, {
      headers: {
        Authorization: "Bearer " + state.token,
      },
    });
  };

  useEffect(() => {
    loadBook();
  }, []);

  return [book, error, deleteBook];
};

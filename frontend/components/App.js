import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Articles from "./Articles";
import LoginForm from "./LoginForm";
import Message from "./Message";
import ArticleForm from "./ArticleForm";
import Spinner from "./Spinner";
import axios from "axios";
import axiosWithAuth from "../axios/index";

const articlesUrl = "http://localhost:9000/api/articles";
const loginUrl = "http://localhost:9000/api/login";

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState(); //edit and delete
  const [spinnerOn, setSpinnerOn] = useState(false);

  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/");
  };

  const redirectToArticles = () => {
    /* ✨ implement */
    // [x] When would I need to redirect to articles? The only other landing pages is login, right?
    navigate("/articles");
  };

  const logout = () => {
    // ✨ implement

    // [x] If a token is in local storage it should be removed,
    localStorage.removeItem("token");
    // [x] and a message saying "Goodbye!" should be set in its proper state.
    setMessage("Goodbye!");
    // [x] In any case, we should redirect the browser back to the login screen, using the helper above.
    redirectToLogin();
  };

  const login = (username, password) => {
    // * args started as {(username, password)}, may need to change it back later
    // [x]  We should flush the message state,
    setMessage("");
    // [x]  turn on the spinner
    setSpinnerOn(true);
    // [x]  and launch a request to the proper endpoint.
    axios
      .post(loginUrl, { username, password })
      .then((res) => {
        // [x]  On success, we should set the token to local storage in a 'token' key,
        localStorage.setItem("token", res.data.token);
        // [x]  put the server success message in its proper state,
        setMessage(res.data.message);
        setSpinnerOn(false);
        // [x]  and redirect to the Articles screen. Don't forget to turn off the spinner!
        redirectToArticles();
        // [x] get articles (but maybe do this as a useEffect somewhere else?)
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getArticles = () => {
    // [x] We should flush the message state, turn on the spinner
    setMessage("");
    setSpinnerOn(true);
    // [x] and launch an authenticated request to the proper endpoint.
    axiosWithAuth()
      .get(articlesUrl)
      .then((res) => {
        // [x] On success, we should set the articles in their proper state and
        setArticles(res.data.articles);
        // [x] put the server success message in its proper state.
        setMessage(res.data.message);
        // [x] Don't forget to turn off the spinner!
        setSpinnerOn(false);
        console.log(res);
      })
      .catch((err) => {
        // [x] If something goes wrong, check the status of the response:
        // [x] if it's a 401 the token might have gone bad, and we should redirect to login.
        err.response.status === 401 ? redirectToLogin() : console.log(err);
        setSpinnerOn(false);
        setMessage(err.message);
        console.log(err);
      });
  };

  const postArticle = (article) => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints to inspect the response from the server.
    // [ ] axios.post(url, article/article_id)
    axiosWithAuth()
      .post(articlesUrl, article)
      .then((res) => {
        setMessage(res.data.message);
        // [ ] setArticles accordingly
        setArticles([...articles, article]);
      })
      .catch((err) => console.log(err));
  };

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // [ ] axios.put(url, article/article_id)
    // [ ] setArticles accordingly
    // [ ] might need to make sure we're loading articles on mount?
  };

  const deleteArticle = (article_id) => {
    // ✨ implement
    // [ ] axios.delete()
    // [ ] setArticles accordingly
    //   ? setArticles(articles.filter((article) => article.article_id !== article_id))
  };

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>
        Logout from app
      </button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        {" "}
        {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">
            Login
          </NavLink>
          <NavLink id="articlesScreen" to="/articles">
            Articles
          </NavLink>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                login={login}
                redirectToArticles={redirectToArticles}
              />
            }
          />
          <Route
            path="articles"
            element={
              <>
                <ArticleForm postArticle={postArticle} />
                <Articles getArticles={getArticles} articles={articles} />
              </>
            }
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  );
}

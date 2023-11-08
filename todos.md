# Where to pick up

- working on getArticles after successful login and navigation to Articles
- props are passed
- currently just need to write the axiosWithAuth().get() and make sure the const URL inside App doesn't clash with the function that also has a variable w/ the url

# Tests to Pass

1. [x] Submit credentials button is disabled until - username (after trimming) is at least 3 chars AND - password (after trimming) is at least 8 chars - Review how to conditionally disable a button element.
2. [x] Attempting to navigate to Articles - renders a redirect back to login screen - articles form never - Review how to implement protected routes using an authentication token and redirect users.
3. [x] Filling out the login form and submitting - article titles, texts, topics render on the page - success message renders on the page - Review how to handle authentication with tokens in a React app (using local storage) and how to render data from state.
4. [ ] Clicking the logout button - redirection to the login screen - the "token" key is removed from local storage - a success message renders on the page - Review how to handle authentication with tokens in a React app (using local storage) and redirect the user.
5. [x] Submit button is disabled on page load, Review how to conditionally disable a button element.
6. [ ] Filling out the article form and submitting - resets the form - adds a new article to the page - a success message renders on the page
7. [ ] Clicking edit button populates the article information into the form - Review how to manipulate and use state and reset a form using initial values.
8. [ ] Editing the form values and submitting - updates the edited article on the page - resets the form - a success message renders on the page - Review how to utilize state to set current values. - Review how to make PUT requests to an external API using Axios and how to manipulate and use state.
9. [ ] Clicking delete button on an article - removes it from the page - a success message renders on the page - Review how to make DELETE requests to an external API using Axios.
10. [ ] Spinner renders on load/fetch

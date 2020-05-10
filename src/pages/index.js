// ./src/pages/index.js
import React from "react"
import { Link } from "gatsby"
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class IndexPage extends React.Component {
  state = {
      name: null,
      email: null,
  }

  _handleChange = (e) => {
      console.log({
          [`${e.target.name}`]: e.target.value,
      });
      this.setState({
          [`${e.target.name}`]: e.target.value,
      });
  }

  _handleSubmit = (e) => {
      e.preventDefault();

      console.log('submit', this.state);

      addToMailchimp(this.state.email, this.state)
          .then(({ msg, result }) => {
              console.log('msg', `${result}: ${msg}`);

              if (result !== 'success') {
                  throw msg;
              }
              alert(msg);
          })
          .catch((err) => {
              console.log('err', err);
              alert(err);
          });
  }

  render() {
      return (
          <div>
              <nav>
                    <Link to="/">Home</Link>{" "}
                    <Link to="/account/">My Account</Link>{" "}
                    <Link to="/account/posts/">Posts</Link>{" "}
                    <Link to="/account/pages/">Pages</Link>{" "}
              </nav>
              <h1>Hi people</h1>
              <p>Submit the form below and check your browser console!</p>
              <div>
                  <form onSubmit={this._handleSubmit}>
                      <input
                          type="email"
                          onChange={this._handleChange}
                          placeholder="email"
                          name="email"
                      />
                      <br />
                      <input type="submit" />
                  </form>
              </div>
          </div>
      );
  }
}
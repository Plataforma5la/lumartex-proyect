import React from "react";
import { connect } from "react-redux";

import "./contact.css";
import Axios from "axios";


class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      text: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validarEmail(email) {
    return /(^[0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test(
      email
    );
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, text } = this.state;
    if (name && text && this.validarEmail(email)) {
      return Axios.post(`${this.props.apiUrl}/api/email/contact`, this.state);
    } else {
      this.setState({ error: true });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="contactContainer">
        <iframe
          className="aboutIframe"
          title="iframe"
          src="https://maps.google.com/?ll=30.274363,-97.8032097&z=17&t=m&output=embed"
          frameBorder="0"
          allowFullScreen
        />
        <div className="contactGrid">
          {this.props.width < 768 ? (
            <div className="contactTitle">CONTACT US</div>
          ) : (
            <div className="contactGridDescription">
              <div className="contactTitle">CONTACT US</div>
              <div className="contactInfo">
                <div className="contactSubInfo">Address</div>
                <div className="contactSubInfo">Telephone</div>
                <div className="contactSubInfo">Email</div>
              </div>
            </div>
          )}
          <div className="contactGridForm">
            <div className="contactInputsContainer">
              <input
                className="contactInput"
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
              />
              <input
                className="contactInput"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <textarea
              className="contactInput"
              type="text"
              name="text"
              placeholder="Your message"
              onChange={this.handleChange}
            />
            <button className="contactButton" onClick={this.handleSubmit}>
              send
            </button>
          </div>
          {this.props.width < 768 ? (
            <div className="contactInfo">
              <div className="contactSubInfo">Address</div>
              <div className="contactSubInfo">Telephone</div>
              <div className="contactSubInfo">Email</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiUrl: state.configReducer.config.apiUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(Contact);

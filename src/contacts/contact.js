import React from "react";
import { Link } from "react-router-dom";
import "./contact.css";
import Axios from "axios";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
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
    const { name, email, message } = this.state;

    if (name && message && this.validarEmail(email)) {
      return Axios.post("https://algunaApi.com", this.state);
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
          {window.innerWidth < 768 ? (
            <div className="contactTitle">CONTACT US</div>
          ) : (
            <div className="contactGridDescription">
              <div className="contactTitle">CONTACT US</div>
              <div className="contactInfo">
                <div className="contactSubInfo">Address</div>
                <Link to="/upload" className="contactSubInfo">
                  Telephone
                </Link>
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
              name="message"
              placeholder="Your message"
              onChange={this.handleChange}
            />
            <button className="contactButton" onClick={this.handleSubmit}>
              send
            </button>
          </div>
          {window.innerWidth < 768 ? (
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

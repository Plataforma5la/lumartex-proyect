import React from "react";
import { connect } from "react-redux";
import Axios from "axios";

import "./contact.css";
import Modal from "../modal/modal";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      text: "",
      error: false,
      succes: false
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
      Axios.post(`${this.props.apiUrl}/api/email/contact`, this.state)
        .then(res => res.data)
        .then(body => {
          this.setState({ succes: true });
        })
        .catch(err => this.setState({ error: true }));
    } else {
      this.setState({ error: true });
    }
  }

  handleSucces = e => {
    this.setState({
      name: "",
      email: "",
      text: "",
      error: false,
      succes: false
    });
  };

  handleError = e => {
    this.setState({
      error: false,
      succes: false
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="contactContainer">
        {this.state.succes ? (
          <Modal
            text="Your message has been sent"
            handleClick={this.handleSucces}
          />
        ) : null}
        {this.state.succes ? (
          <Modal
            text="Your message could not be sent, check all fields"
            handleClick={this.handleError}
          />
        ) : null}

        <iframe
          className="aboutIframe"
          title="iframe"
          src="https://maps.google.com/?ll=30.274363,-97.8032097&z=17&t=m&output=embed"
          frameBorder="0"
          allowFullScreen
          same-site="none"
          secure="true"
        />
        <div className="contactGrid">
          {this.props.width < 768 ? (
            <div className="contactTitle">CONTACT US</div>
          ) : (
            <div className="contactGridDescription">
              <div className="contactTitle">CONTACT US</div>
              <div className="contactInfo">
                <div className="contactSubInfo">
                  Address - 3267 Bee Caves Rd. Suite 107-74
                </div>
                <div className="contactSubInfo">Mail - info@lumartex.com</div>
                <div className="contactSubInfo"></div>
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
                value={this.state.name}
              />
              <input
                className="contactInput"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <textarea
              className="contactInput"
              type="text"
              name="text"
              placeholder="Your message"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button className="contactButton" onClick={this.handleSubmit}>
              send
            </button>
          </div>
          {this.props.width < 768 ? (
            <div className="contactInfo">
              <div className="contactSubInfo">Address - 3267 Bee Caves Rd. Suite 107-74</div>
              {/* <div className="contactSubInfo">Telephone</div> */}
              <div className="contactSubInfo">Mail - info@lumartex.com</div>
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

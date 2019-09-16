import React from "react";
import axios from "axios";

import "./upload.css";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", ...this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:8080/api/upload", formData, config)
      .then(response => {
        console.log(response)
      })
      .catch(error => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files});
  }

  render() {
    console.log(this.state.file);
    return (
      <form onSubmit={this.onFormSubmit} className="uploadContainer">
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange={this.onChange} multiple />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

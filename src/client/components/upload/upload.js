import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./upload.css";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partNumber: "",
      name: "",
      images: [],
      description: "",
      specs: "",
      categories: ""
    };
  }

  onChange = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post(`${this.props.apiUrl}/api/upload`, formData, config)
      .then(photo => {
        this.setState(({ images }) => {
          if (images && images.length > 3) {
            return images;
          } else {
            return {
              images: [...images, photo.data]
            };
          }
        });
      })
      .catch(error => {});
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteImage = e => {
    this.setState(({ images }) => {
      images.shift();
      return images;
    });
  };
  uploadProduct = e => {
    const {
      partNumber,
      name,
      categories,
      specs,
      images,
      description
    } = this.state;
    e.preventDefault();
    axios
      .post(`${this.props.apiUrl}/api/products`, {
        partNumber,
        name,
        categories: categories.split(","),
        specs,
        images: images.map(image => image.fileUrl),
        description
      })
      .then(res => res.data)
      .then(product => {
        alert("tu producto fue subido correctamente");
        this.setState({
          partNumber: "",
          name: "",
          images: [],
          description: "",
          specs: "",
          categories: ""
        });
      });
  };
  render() {
    const { apiUrl } = this.props;
    return (
      <form className="uploadContainer">
        <h1 className="uploadTitle">Upload product</h1>
        <input
          name="partNumber"
          className="uploadInputProduct"
          onChange={this.handleChange}
          placeholder="Part Number"
        />
        <input
          name="name"
          className="uploadInputProduct"
          onChange={this.handleChange}
          placeholder="Name"
          autoComplete="off"
        />
        <input
          name="categories"
          className="uploadInputProduct"
          onChange={this.handleChange}
          placeholder="Categories"
          autoComplete="off"
        />
        <textarea
          name="description"
          className="uploadInputProduct"
          onChange={this.handleChange}
          placeholder="Description"
        />
        <textarea
          name="specs"
          className="uploadInputProduct"
          onChange={this.handleChange}
          placeholder="Specs"
        />
        <div className="uploadGrid">
          <img
            src={
              this.state.images[0] && `${apiUrl}${this.state.images[0].fileUrl}`
            }
            alt=""
            className="uploadImage"
          />
          <img
            src={
              this.state.images[1] && `${apiUrl}${this.state.images[1].fileUrl}`
            }
            alt=""
            className="uploadImage"
          />
          <img
            src={
              this.state.images[2] && `${apiUrl}${this.state.images[2].fileUrl}`
            }
            alt=""
            className="uploadImage"
          />
          <div>
            <input
              type="file"
              name="myImage"
              onChange={this.onChange}
              className="uploadInput"
              id="file1"
            />
            <label htmlFor="file1">Choose a file</label>
          </div>
          <div>
            <input
              type="file"
              name="myImage"
              onChange={this.onChange}
              className="uploadInput"
              id="file2"
            />
            <label htmlFor="file2">Choose a file</label>
          </div>
          <div>
            <input
              type="file"
              name="myImage"
              onChange={this.onChange}
              className="uploadInput"
              id="file3"
            />
            <label htmlFor="file3">Choose a file</label>
          </div>
        </div>
        <div className="deleteImage" onClick={this.deleteImage}>
          Delete Image
        </div>
        <div className="sendProduct" onClick={this.uploadProduct}>
          Send
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiUrl: state.configReducer.config.apiUrl,
    categories: state.configReducer.config.categories
  };
};

export default connect(
  mapStateToProps,
  null
)(Upload);

import "./selectionableCategorie.css";

import React from "react";

import singleCategorieSelected from "../../assets/singleCategorieSelected.svg";
import singleCategorieOption from "../../assets/singleCategorieOption.svg";

export default class SelectionableCategorie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.compareUrlWithNameCategorie = this.compareUrlWithNameCategorie.bind(
      this
    );
  }

  compareUrlWithNameCategorie = (url, name) => {
    if (decodeURI(url).includes(name)) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  };

  componentDidMount() {
    const { search, categorie } = this.props;
    this.compareUrlWithNameCategorie(search, categorie.name);
  }

  componentDidUpdate(prevProps) {
    const { search, categorie } = this.props;
    if (search !== prevProps.search) {
      this.compareUrlWithNameCategorie(search, categorie.name);
    }
  }

  handleClick(history, categorie, search, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.selected) {
      const path = decodeURI(search);
      const newPath = path.replace(`;${categorie.name}`, "");
      history.push(`/products${newPath}`);
      this.setState({ selected: false });
    } else {
      this.setState(
        ({ selected }) => ({ selected: !selected }),
        () => {
          history.push(`/products${search + ";" + categorie.name}`);
        }
      );
    }
  }

  render() {
    const { selected } = this.state;
    const { categorie, history, search } = this.props;
    return (
      <div className="selectionableCategorieContainer">
        <img
          alt=""
          src={selected ? singleCategorieSelected : singleCategorieOption}
          className="selectionableOption"
          onClick={e => this.handleClick(history, categorie, search, e)}
        />
        <div
          className="selectionableTitle"
          onClick={e => this.handleClick(history, categorie, search, e)}
        >
          {categorie.name}
        </div>
      </div>
    );
  }
}

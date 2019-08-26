import "./categorie.css";

import React from "react";

import categorieSelectOption from "../../assets/categorieSelectOption.svg";
import categorieSelectedOption from "../../assets/categorieSelected.svg";
import CategoriesWhitTitle from "../categoriesWhitTitle/categoriesWhitTitle";
import SelectionableCategorie from "../selectionableCategorie/selectionableCategorie";
export default class Categorie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.showChildrens = this.showChildrens.bind(this);
    this.compareUrlWithNameCategorie = this.compareUrlWithNameCategorie.bind(
      this
    );
  }

  compareUrlWithNameCategorie = (url, name) => {
    if (decodeURI(url).includes(name)) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  componentDidMount() {
    const { categorie, search } = this.props;
    this.compareUrlWithNameCategorie(search, categorie.name);
  }

  componentDidUpdate(prevProps) {
    const { categorie, search } = this.props;
    if (prevProps.search !== search) {
      this.compareUrlWithNameCategorie(search, categorie.name);
    }
  }

  showChildrens(childrens, open) {
    if (!open) return;
    return childrens.map((children, i) => {
      if (children.type === "title and categories") {
        return (
          <CategoriesWhitTitle
            categorie={children}
            showChildrens={this.showChildrens}
            key={i}
            history={this.props.history}
          />
        );
      } else if (children.type === "selectionable categorie") {
        return (
          <SelectionableCategorie
            categorie={children}
            key={i}
            history={this.props.history}
            search={this.props.search}
          />
        );
      } else if (children.type === "categorie") {
        return (
          <Categorie
            categorie={children}
            key={i}
            history={this.props.history}
            search={this.props.search}
          />
        );
      }
      return null;
    });
  }

  handleClick(categorie, history, search, e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.open) {
      const path = decodeURI(search);
      const newPath = path.slice(0, path.indexOf(categorie.name));
      history.push(`/products${newPath}`);
      this.setState({ open: false });
    } else {
      this.setState(
        ({ open }) => ({ open: !open }),
        () => {
          history.push(`/products?${categorie.url}`);
        }
      );
    }
  }

  render() {
    const { categorie, history, search } = this.props;
    const { open } = this.state;
    return (
      <div className="categorieContainer">
        <div className="categorie">
          <img
            alt=""
            src={open ? categorieSelectedOption : categorieSelectOption}
            className="categoriaOption"
            onClick={e => this.handleClick(categorie, history, search, e)}
          />
          {categorie && (
            <div
              className="categorieName"
              onClick={e => this.handleClick(categorie, history, search, e)}
            >
              {categorie.name}
            </div>
          )}
        </div>
        {categorie.categories ? (
          <div className="childrenCategorie">
            {this.showChildrens(categorie.categories, open)}
          </div>
        ) : null}
      </div>
    );
  }
}

import React from "react";

import "./sidebarMobile.css";
import Categorie from "./components/categorie/categorie";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          name: "Monitor Arms",
          url: "Monitor Arms",
          categories: [
            {
              title: "Number of Monitors",
              type: "title and categories",
              categories: [
                { type: "selectionable categorie", name: "Single" },
                { type: "selectionable categorie", name: "Dual" },
                { type: "selectionable categorie", name: "Triple" },
                { type: "selectionable categorie", name: "Quadtruple" }
              ]
            },
            {
              type: "title and categories",
              title: "Screen Size",
              categories: [
                { type: "selectionable categorie", name: "Small (Below 21”)" },
                {
                  type: "selectionable categorie",
                  name: "Medium (21” to 27”)"
                },
                { type: "selectionable categorie", name: "Large (Above 27”)" }
              ]
            },
            {
              type: "title and categories",
              title: "Monitor Weight",
              categories: [
                { type: "selectionable categorie", name: "<17.6lbs>" },
                { type: "selectionable categorie", name: "<22lbs>" }
              ]
            }
          ]
        },
        {
          name: "Tablet Mounts",
          url: "Tablet Mounts",
          categories: [{ type: "selectionable categorie", name: "IPAD" }]
        },
        {
          name: "TV Mounts",
          url: "TV Mounts",
          categories: [
            {
              name: "Fixed Mount",
              url: "TV Mounts;Fixed Mount",
              type: "categorie",
              categories: [
                {
                  title: "TV Size",
                  type: "title and categories",
                  categories: [
                    {
                      type: "selectionable categorie",
                      name: "Small (32” and under)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Medium (32” to 47”)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Large (47” to 60”)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Extra Large (61” and over)"
                    }
                  ]
                }
              ]
            },
            {
              name: "Tilt Mount",
              url: "TV Mounts;Tilt Mount",
              type: "categorie",
              categories: [
                {
                  title: "TV Size",
                  type: "title and categories",
                  categories: [
                    {
                      type: "selectionable categorie",
                      name: "Small (32” and under)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Medium (32” to 47”)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Large (47” to 60”)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Extra Large (61” and over)"
                    }
                  ]
                }
              ]
            },
            {
              name: "Full Motion Mount",
              url: "TV Mounts;Full Motion Mount",
              type: "categorie",
              categories: [
                {
                  title: "TV Size",
                  type: "title and categories",
                  categories: [
                    {
                      type: "selectionable categorie",
                      name: "Small (32” and under)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Medium (32” to 47”)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Large (47” to 60”)"
                    },
                    {
                      type: "selectionable categorie",
                      name: "Extra Large (61” and over)"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "TV Carts/Stands",
          url: "TV Carts/Stands",
          categories: [
            { type: "selectionable categorie", name: "Non-Motorized TV Cart" },
            { type: "selectionable categorie", name: "Motorized TV Carts" },
            { type: "selectionable categorie", name: "Mobile AV Cabinet" }
          ]
        },
        {
          name: "Projector Mounts",
          url: "Projector Mounts",
          categories: [
            { type: "selectionable categorie", name: "Ceiling Mount" },
            { type: "selectionable categorie", name: "Wall Mount" }
          ]
        },
        {
          name: "Desk Risers",
          url: "Desk Risers",
          categories: [
            { type: "selectionable categorie", name: "Slim Riser" },
            {
              title: "Standard Riser",
              type: "title and categories",
              categories: [
                {
                  type: "selectionable categorie",
                  name: "Manual Adjustable"
                },
                {
                  title: "Motorized Adjustable",
                  type: "title and categories",
                  categories: [
                    {
                      type: "selectionable categorie",
                      name: "Laptop and monitor combo"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "selectionable categorie",
          url: "Electric Height Adjustable Desks",
          name: "Electric Height Adjustable Desks"
        }
      ]
    };
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.props.history.push("/products");
    this.props.handleOpen();
  }
  render() {
    const { history, search, handleOpen } = this.props;
    return (
      <div className="sidebarContainer">
        <div className="sidebarTitle">Products</div>
        {this.state.categories.map((categorie, i) => {
          return (
            <Categorie
              categorie={categorie}
              key={i}
              history={history}
              search={search}
            />
          );
        })}
        <div className="buttonsContainer">
          <button className="buttonReset" onClick={this.reset}>
            RESET
          </button>
          <button className="buttonApply" onClick={handleOpen}>
            APPLY
          </button>
        </div>
      </div>
    );
  }
}

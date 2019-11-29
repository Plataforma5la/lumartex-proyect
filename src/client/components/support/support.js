import React from "react";

import prueba from "./assets/prueba.pdf";
import arrowDown from "./assets/arrowDown.png";
import arrow from "./assets/arrow.png";
import calendar from "./assets/calendar.png";
import catalogue from "./assets/catalogue.png";

import "./support.css";

export default class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogues: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { catalogues } = this.state;
    return (
      <div className="supportContainer">
        <div className="supportTitle">
          Catalogues
          <div className="supportFilter">
            more recent
            <img src={arrowDown} alt="" className="supportArrowDown" />
          </div>
        </div>

        <div className="supportGrid">
          {catalogues.map(e => (
            <div className="supportCatalogue">
              <img src={catalogue} alt="" className="supportCatalogueImage" />
              <div className="supportCatalogeName">Catalogue Name</div>
              <div className="supportContainer2">
                <div className="supportCatalogeDate">
                  <img src={calendar} alt="" className="supportImage" />
                  <div className="supportDate">May 25, 2018</div>
                </div>
                <a
                  className="supportCatalogeDownload"
                  download={prueba}
                  href={prueba}
                >
                  Download <img alt="" src={arrow} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

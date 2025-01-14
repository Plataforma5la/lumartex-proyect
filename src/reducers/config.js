import "isomorphic-fetch";

export const USERS_LOADED = "@ssr/users/loaded";

const initialState = {
  config: {
    applicationName: "react template",
    apiUrl: process.env.API_URL,
    categories: [
      {
        name: "Monitor Arms",
        url: "Monitor Arms",
        categories: [
          {
            title: "Number of Monitors",
            type: "title and categories",
            categories: [
              {
                type: "selectionable categorie",
                name: "Single"
              },
              {
                type: "selectionable categorie",
                name: "Dual"
              },
              {
                type: "selectionable categorie",
                name: "Triple"
              },
              {
                type: "selectionable categorie",
                name: "Quadruple"
              }
            ]
          },
          {
            type: "title and categories",
            title: "Screen Size",
            categories: [
              {
                type: "selectionable categorie",
                name: "Small (Below 21”)"
              },
              {
                type: "selectionable categorie",
                name: "Medium (21” to 27”)"
              },
              {
                type: "selectionable categorie",
                name: "Large (Above 27”)"
              }
            ]
          },
          {
            type: "title and categories",
            title: "Monitor Weight",
            categories: [
              {
                type: "selectionable categorie",
                name: "<17.6lbs>"
              },
              {
                type: "selectionable categorie",
                name: "<22lbs>"
              }
            ]
          }
        ]
      },
      {
        name: "Tablet Mounts",
        url: "Tablet Mounts",
        categories: [
          {
            type: "selectionable categorie",
            name: "IPAD"
          }
        ]
      },
      {
        name: "Tv Mounts",
        url: "Tv Mounts",
        categories: [
          {
            name: "Fixed Mount",
            url: "Tv Mounts;Fixed Mount",
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
            url: "Tv Mounts;Tilt Mount",
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
            url: "Tv Mounts;Full Motion Mount",
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
        name: "Tv Carts/Stands",
        url: "Tv Carts/Stands",
        categories: [
          {
            type: "selectionable categorie",
            name: "Non-Motorized TV Cart"
          },
          {
            type: "selectionable categorie",
            name: "Motorized TV Carts"
          },
          {
            type: "selectionable categorie",
            name: "Mobile AV Cabinet"
          }
        ]
      },
      {
        name: "Projector Mounts",
        url: "Projector Mounts",
        categories: [
          {
            type: "selectionable categorie",
            name: "Ceiling Mount"
          },
          {
            type: "selectionable categorie",
            name: "Wall Mount"
          }
        ]
      },
      {
        name: "Desk Risers",
        url: "Desk Risers",
        categories: [
          {
            type: "selectionable categorie",
            name: "Slim Riser"
          },
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
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADED:
      return Object.assign({}, state, { config: action.config });

    default:
      return state;
  }
}

export const fetchUsers = () => dispatch => {
  return fetch("https://api.myjson.com/bins/168d2n")
    .then(res => {
      return res.json();
    })
    .then(config => {
      dispatch({
        type: USERS_LOADED,
        config
      });
    });
};

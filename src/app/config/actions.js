export const FETCH_CONFIG_BEGIN = "FETCH_CONFIG_BEGIN";
export const FETCH_CONFIG_SUCCESS = "FETCH_CONFIG_SUCCESS";
export const FETCH_CONFIG_FAILURE = "FETCH_CONFIG_FAILURE";

export const fetchConfigBegin = () => ({
  type: FETCH_CONFIG_BEGIN
});

export const fetchConfigSuccess = config => ({
  type: FETCH_CONFIG_SUCCESS,
  payload: { config }
});

export const fetchConfigFailure = error => ({
  type: FETCH_CONFIG_FAILURE,
  payload: { error }
});

export function fetchConfig() {
  return dispatch => {
    dispatch(fetchConfigBegin());
    return fetch("/config.json")
      .then(result => result.json())
      .then(config => {
        console.log(config);
        dispatch(fetchConfigSuccess(config));
      })
      .catch(error => dispatch(fetchConfigFailure(error)));
  };
}

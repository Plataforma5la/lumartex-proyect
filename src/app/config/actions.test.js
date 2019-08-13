import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions to load config.json', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_CONFIG_SUCCESS when fetching config has been done', () => {
    fetchMock.getOnce('/config.json',
      ['do something']
    )

    const expectedActions = [
      { type: actions.FETCH_CONFIG_BEGIN },
      { type: actions.FETCH_CONFIG_SUCCESS, payload: { config: ['do something'] } }
    ]

    const store = mockStore({ config: [] })

    store.dispatch(actions.fetchConfig()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

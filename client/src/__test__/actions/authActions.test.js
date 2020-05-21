import * as authActions from '../../actions/authActions';
import configureStore from 'redux-mock-store';
import { OPEN_ACC, REGISTER } from '../../actions/type';
import thunk from 'redux-thunk';
let middelwares = [thunk];
let mockStore = configureStore(middelwares);
let store = mockStore({});

describe('authActions', () => {
    beforeEach(() => {
        store.clearActions();
    })
    test('OPEN_ACC Action', () => {
        let account = {
            email: 'aminaouini565@gmail.com',
            password: '123456789'
        }
        return store.dispatch(authActions.loginAction(account))
            .then(() => {
                const actions = store.getActions()
                console.log(actions)
                expect(actions[0]['type']).toEqual(OPEN_ACC)
            })
    })
})

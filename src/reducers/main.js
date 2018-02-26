import update from 'immutability-helper'

let defaultState = {
    user: {
        'name': '',
        'email': '',
        'phone': '',
        'address': '',
        'postcode': '',
        'dateofbirth': null
    }
}

const main = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_STATE_PROPS':
            return update(state, {
                [action.state.prop]: {$set: action.state.value}
            })
        default:
            return state
    }
}

export default main

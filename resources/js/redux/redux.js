const initState = {
    autentication: null,
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "Login":
            return {
                ...state,
                autentication: action.data,
            };
            break;

        default:
            break;
    }
    // console.log(action);
    return state;
};

export default rootReducer;

const initState = {
    autentication: null,
};

const rootReducer = (state = initState, action) => {
    console.log();
    switch (action.type) {
        case "Login":
            return {
                ...state,
                autentication: action.data,
            };
            break;
        case "KATEGORI":
            return {
                ...state,
                kategori: action.data,
            };
            break;
        default:
            break;
    }
    // console.log(action);
    return state;
};

export default rootReducer;

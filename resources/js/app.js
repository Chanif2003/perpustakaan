require("./bootstrap");
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// redux
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import rootReducer from "./redux/redux";
// ////
import Routing from "./router/index";

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routing />
            </div>
        </BrowserRouter>
    );
};

export default App;

// const storeRedux = createStore(rootReducer);

ReactDOM.render(
    // <Provider store={storeRedux}>
    <App />,
    // </Provider>
    document.getElementById("root")
);

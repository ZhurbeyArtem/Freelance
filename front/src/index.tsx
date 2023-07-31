import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import 'antd/dist/antd.css';
import { PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import store, {persister} from "./services/store";

import App from './App';
import {Navbar} from "components/navbar/navbar";
import Footer from "components/footer/footer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persister}>
        <BrowserRouter>
            <Navbar />
        <App />
          <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
          <Footer />
      </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
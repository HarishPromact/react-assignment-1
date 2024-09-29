import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./Component/header/Header";
import AppRoutes from "./Routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

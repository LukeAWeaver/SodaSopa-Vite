import { API } from "@aws-amplify/api";
import config from "@/graphql/configs/aws-exports";
import ItemSelection from "@/components/containers/ItemSelection";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "@/store";
import { Provider } from "react-redux";
import VendingMachine from "@/components/containers/VendingMachine";
import AdminPanel from "@/components/containers/AdminPanel";
import Login from "@/components/containers/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

API.configure(config);
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/VendingMachine" element={<VendingMachine />} />
                <Route
                  path="/VendingMachine/AdminPanel"
                  element={<AdminPanel />}
                />
                <Route path="/ItemSelection" element={<ItemSelection />} />
                <Route path="/" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </AppContainer>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

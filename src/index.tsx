import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, baseTheme, extendTheme } from "@chakra-ui/react";
import { UserProvider } from "context";
import {PetitionDetailAdmin, App, CreatePetition, Developers, Petition, ViewPetitionsAdmin, UserPage,UnauthorizedMessage} from "pages";

import "@fontsource/libre-baskerville";
import "@fontsource/inter";
import '@fontsource/inter/400.css';
import '@fontsource/inter/800.css';
import "./styles/index.css";
import { ScrollToTop } from "components";
import {ManagePetition} from "./components/User/ManagePetition";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
    serif: `'Libre Baskerville', serif`,
  },
  colors: {
    primary: baseTheme.colors.blue,
  },
  withDefaultColorScheme: {
    colorScheme: "primary",
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/petition/:petitionId" element={<Petition />} />
                <Route path="/petition/create" element={<CreatePetition />} />
                <Route path="/manage/:petitionId" element={<ManagePetition />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="/admin/:id" element={<PetitionDetailAdmin/>}/>
                <Route path="/admin" element={<ViewPetitionsAdmin/>}/>
                <Route path="/profile" element={<UserPage />}/>

              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

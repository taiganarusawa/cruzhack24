import { StyledEngineProvider } from "@mui/material";

import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
   return (
      <StyledEngineProvider injectFirst>
         <Component {...pageProps} />
      </StyledEngineProvider>
   )
}
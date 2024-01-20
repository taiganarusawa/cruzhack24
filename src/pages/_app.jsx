import { StyledEngineProvider } from "@mui/material";

import "@/styles/globals.scss"

export default function App({ Component, pageProps }) {
   return (
      <StyledEngineProvider injectFirst>
         <Component {...pageProps} />
      </StyledEngineProvider>
   )
}
import { ChakraProvider, Container, extendTheme, Text } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthGuard from "../components/AuthGuard";
import NavBar, { NAVBAR_HEIGHT } from "../components/NavBar";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
      },
      a: {
        color: "inherit",
        textDecoration: "none",
      },
      "*": {
        boxSizing: "border-box",
      },
    },
  },
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <NavBar />
          <Container
            maxW="container.xl"
            p={0}
            h={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
          >
            {pageProps.protected ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </Container>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

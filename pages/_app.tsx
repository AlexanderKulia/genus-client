import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthGuard } from "../components/utils/AuthGuard";
import { AuthProvider } from "../contexts/AuthContext";
import { NavBar, NAVBAR_HEIGHT } from "../layouts/NavBar";

export interface AuthProps {
  protected: boolean;
}

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Head>
            <title>Genus</title>
          </Head>
          <NavBar />
          <Container
            maxW="container.xl"
            p={0}
            h={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
            as="main"
          >
            {pageProps.protected === false ? (
              <Component {...pageProps} />
            ) : (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            )}
          </Container>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

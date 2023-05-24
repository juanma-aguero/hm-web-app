import MainLayout from "@/components/MainLayout";
import client from "@/libs/graphql/apollo-client";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4925a4",
            },
          }}
        >
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ConfigProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

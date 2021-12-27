import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";
import Layout from '../components/Layout';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Layout>
        <Component {...pageProps} /> 
      </Layout>
    </MoralisProvider>

  )
}

export default MyApp

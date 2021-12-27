
import Head from "next/head";
import { useMoralis } from "react-moralis";
import Link from 'next/link';
import Image from 'next/image'

const Layout = ({ children }) => {

    const { authenticate, isAuthenticated, logout, user, chainId } = useMoralis();

    let left = (
        <div className="left">
            <Image src="/star-logo.svg" alt="Makazo" width={40} height={40} className="logo-spin"/>
          
         
          <h2>Web3Next</h2>
        </div>
      );

     let right = null
      if (!isAuthenticated){
          right = <Link href="/">
          <a>Login</a>
        </Link>
      }

    //   if (isAuthenticated) {
    //       right = (
    //         <h2>Logout</h2>
    //       )
    //   }


  return (
    <>
  <Head>
    <link rel="shortcut icon" href="/favicon.ico" />
  </Head>
    <div className="appflex">
      <nav>
         {left} {right}
      </nav>

      <div className="content">
        { children }

      </div>
      <footer>
        Copyright 2022 Web3Next
      </footer>

    </div>
    </>
  );
}
 
export default Layout;
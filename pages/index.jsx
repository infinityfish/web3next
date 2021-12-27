import Head from 'next/head'
import { useMoralis } from "react-moralis";

import styles from '../styles/Home.module.css'
import Auth from "../components/auth"

export default function Home() {
  const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();


   return (
    <div className={styles.container}>
      <Head>
        <title>Web3 dApp</title>
        <meta name="description" content="Web3 dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Web3Next
        </h1>

        <p className={styles.description}>
          Web3 dApp built with Next.js 
        </p>

        <div>
          <Auth />

        </div>

      {(isAuthenticated)?
        <div className={styles.grid}>
        <a href="/upload" className={styles.card}>
          <h2>Upload Image</h2>
          <p>to IPFS</p>
        </a>

      </div>
      : null
      }

      </main>


    </div>
  )
}

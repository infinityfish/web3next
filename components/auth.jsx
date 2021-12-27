import React from "react";
import { useMoralis } from "react-moralis";

export default function Login() {
  const { authenticate, isAuthenticated, logout, user, chainId } = useMoralis();

  return (
    
    <div className="infoCard">
      { (isAuthenticated)? 
        <div>
          <h4>Welcome user: {user.get("username")}</h4>
          <p>ChainID is: {chainId}</p>
          <button onClick={() => logout()} className="btn-danger">Logout</button>
        </div>
      : <button onClick={() => authenticate()} className="btn-primary">Sign in with Ethereum</button> }
    </div>
  );
}
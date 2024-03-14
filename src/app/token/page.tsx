"use client"

import {useEffect, useState} from "react";


async function getToken(url: string):Promise<string>  {
  const response = await fetch(url);
  const data: string = await response.text();
  return data;
}


export default function Token(){
  const [token , setToken] = useState<string>();

  const handleGetToken = async () => {
    try {
      const newToken = await getToken('http://18.197.131.200:3000/auth/token');
      setToken(newToken);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };
  return(
  <>
    <h1>Token</h1>
    <div>
      <h4>{token}</h4>
      <button onClick={handleGetToken}>Get Token</button>


    </div>
  </>
  );
}
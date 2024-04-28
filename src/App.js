import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState, } from 'react';
import Header from "./Header/index";
import LatestBlocks from "./Latest-Blocks/index";
import EthOverview from "./Eth-Overview/index";

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY || "kqvB5FR0pH1Fn1p5jl5_rDI8ySeOzJOh",
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);


function App() {
  
  return  (
    <div>
      <Header></Header>
      <EthOverview />
    </div>
  );
}

export default App;

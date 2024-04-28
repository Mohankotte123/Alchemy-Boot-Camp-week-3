
import React, { useState,useEffect } from "react";
import axios from "axios";
import "./eth-overview.css";
import { Card, Grid, Icon } from "semantic-ui-react";
import LatestBlocks from "../Latest-Blocks/index.js";
import LatestTxs from "../Latest-Txs/index.js";

const { Alchemy, Network } = require("alchemy-sdk");

// import api key from the env variable

function EthOverview (){
  
    const [ethUSD,setethUSD] = useState(null);
    const [ethBTC,setethBTC] = useState("");
    const [latestBlock, setlatestBlock] = useState("");
    const [difficulty, setdifficulty] = useState(0);
    const [marketCap,setmarketCap] = useState(); 

    useEffect(() => {
        fetchEthPrice();
        fetchMarketCap();
        fetchLatestBlockNumber();
      }, []);
    
      const config = {
        apiKey: "kqvB5FR0pH1Fn1p5jl5_rDI8ySeOzJOh", // Replace with your API key
        network: Network.ETH_MAINNET, // Replace with your network
      };
      
    const alchemy = new Alchemy(config);


    // Fetching Ether Price

    const fetchEthPrice = async () => {
        try {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc'

          );
          console.log(response)
    
          if (!response.ok) {
            throw new Error("Failed to fetch Ethereum price");
          }

         
          const data = await response.json();
          setethUSD(data.ethereum.usd);
          setethBTC(data.ethereum.btc);
        } catch (error) {
          console.error("Error fetching Ethereum price:", error);
        }
      };
      
       // get the market cap of ether in USD

      const fetchMarketCap = async () => {
        try {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/ethereum'
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch Ethereum market cap");
          }
    
          const data = await response.json();
          
          const marketCap = data.market_data.market_cap.usd;
    
          setmarketCap(marketCap);
        } catch (error) {
          console.error("Error fetching Ethereum market cap:", error);
        }
      };
    
      // get the latest block numberaa 

      const fetchLatestBlockNumber = async () => {
        try {
          const blockNumber = await alchemy.core.getBlockNumber();
          setlatestBlock(parseInt(blockNumber));
        } catch (error) {
          console.error("Error fetching latest block number:", error);
        }
      }; 

  const getLatestBlocks = () => {
    if (latestBlock) {
      return <LatestBlocks latestBlock={latestBlock}></LatestBlocks>;
    }
  };

  const getLatestTxs = () => {
    if (latestBlock) {
      return <LatestTxs latestBlock={latestBlock}></LatestTxs>;
    }
  };

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card >
                <Card.Content >
                  <Card.Header style={{ color: "#1d6fa6" }} >
                    <Icon name="ethereum"></Icon> ETHER PRICE
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Icon name="usd"></Icon>
                    {ethUSD} <Icon name="at"></Icon> {ethBTC}{" "}
                    <Icon name="bitcoin"></Icon>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="list alternate outline"></Icon> LATEST BLOCK
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Icon name="square"></Icon> {latestBlock}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="setting"></Icon> DIFFICULTY
                  </Card.Header>
                  <Card.Description textAlign="left">
                    {difficulty}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="world"></Icon> MARKET CAP
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Icon name="usd"></Icon> {marketCap}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid divided="vertically" >
          <Grid.Row columns={2} background-color={"#00000"}>
            <Grid.Column >{getLatestBlocks()}</Grid.Column>
            <Grid.Column>{getLatestTxs()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }


export default EthOverview;
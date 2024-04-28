import React, {  useState, useEffect} from "react";
import axios from 'axios';
import {
  Table,
  Label
} from "semantic-ui-react";

const { Alchemy, Network } = require("alchemy-sdk");
const config = {
  apiKey: "kqvB5FR0pH1Fn1p5jl5_rDI8ySeOzJOh", // Replace with your API key
  network: "https://eth-mainnet.g.alchemy.com/v2/kqvB5FR0pH1Fn1p5jl5_rDI8ySeOzJOh", // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

function LatestBlocks(newBlock) {

    const [blocks, setBlocks] = useState([])
  useEffect(() =>{
      getBlocks()
      console.log((newBlock))
    }, [])

 
  const getBlocks = async () => {
  const latestBlock = newBlock
    let BLK = [];
    if (latestBlock) {
    for (let i = 0; i < 5; i ++) {
    const blockDetail = await axios.post(config.network, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [
          "0x" + parseInt(latestBlock.latestBlock-i, 10).toString(16).toUpperCase() , // block 46147
          true  // retrieve the full transaction object in transactions array
        ]
      
      });
      const  finality  = blockDetail.data.result;
    
        BLK.push(
          <Table.Row key={i}>
            <Table.Cell>
              <Label color="blue">Bk</Label> {latestBlock.latestBlock-i}
            </Table.Cell>
            <Table.Cell>
              Miner {finality.miner} <br></br>
              Txs {finality.transactions.length}
            </Table.Cell>
            <Table.Cell>
              <Label color="blue">Size </Label> {parseInt(finality.size,16)} bytes
            </Table.Cell>
          </Table.Row>
        );
    
      
        
      
    }
    setBlocks(BLK);
  }
    
  };

    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.Cell style={{ color: "#1d6fa5" }}>
              <h4>Latest Blocks</h4>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{blocks}</Table.Body>
      </Table>
    );
  
}
export default LatestBlocks
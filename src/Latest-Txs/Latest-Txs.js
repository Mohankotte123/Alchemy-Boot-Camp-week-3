import React, { useState, useEffect } from "react";
import { Table, Label } from "semantic-ui-react";
import axios from "axios";

const { Alchemy, Network } = require("alchemy-sdk");
const config = {
  apiKey: "kqvB5FR0pH1Fn1p5jl5_rDI8ySeOzJOh", // Replace with your API key
  network: "https://eth-mainnet.g.alchemy.com/v2/kqvB5FR0pH1Fn1p5jl5_rDI8ySeOzJOh", // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

function LatestTxs (blockno ) {
  const [trans, setTrans] = useState([]);

  useEffect(() => {

      getTxs();
    
  }, []);
  const getTxs = async () => {
    const latestBlock = blockno
  try {
    // get the block transaction
    const blockDetail = await axios.post(config.network, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: [
        "0x" + parseInt(latestBlock.latestBlock, 10).toString(16).toUpperCase(), // Convert block number to hexadecimal
        true  // retrieve the full transaction object in transactions array
      ]
    });

    const transaction = blockDetail.data.result.transactions;

    let txsDetails = [];

    // check if there is any transaction
    if (transaction) {
      for (let i = 0; i < 5; i++) {
        const tx = transaction[i];
        txsDetails.push(
          <Table.Row key={i}>
            <Table.Cell>
              <Label color="blue">Tx</Label> {tx.hash}
            </Table.Cell>
            <Table.Cell>
              From {tx.from} <br />
              To {tx.to}
            </Table.Cell>
            <Table.Cell>
              <Label color="blue">Eth</Label> {parseInt(tx.value) / 10 ** 18}
            </Table.Cell>
          </Table.Row>
        );
      }
    }

    setTrans(txsDetails);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};



  return (
    <div>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.Cell style={{ color: "#1d6fa5" }}>
              <h4>Latest Transactions</h4>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{trans}</Table.Body>
      </Table>
    </div>
  );
}

export default LatestTxs;

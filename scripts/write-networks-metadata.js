#!/usr/bin/env node
'use strict'

const development = {
  name: 'Development',
  chain: 'ETH',
  icon: 'ethereum',
  rpc: ['http://localhost:8545'],
  faucets: [],
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  infoUrl: 'https://ethereum.org',
  shortName: 'eth',
  chainId: 8996,
  networkId: 8996,
  slip44: 60,
  ens: {},
  explorers: []
}

const axios = require('axios')

// https://github.com/ethereum-lists/chains
const chainDataUrl = 'https://chainid.network/chains.json'

axios(chainDataUrl).then((response) => {
  response.data.push(development)
  process.stdout.write(JSON.stringify(response.data, null, '  '))
})

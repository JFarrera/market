import { ConfigHelper, Config } from '@oceanprotocol/lib'
// import contractAddresses from '@oceanprotocol/contracts/artifacts/address.json'

export function getDevelopmentConfig(): Config {
  return {
    // config
    chainId: 8996,
    network: 'development',
    nodeUri: process.env.NEXT_PUBLIC_RPC_URL,
    subgraphUri: process.env.NEXT_PUBLIC_SUBGRAPH_URI,
    providerUri: process.env.NEXT_PUBLIC_PROVIDER_URL,
    metadataCacheUri: process.env.NEXT_PUBLIC_METADATACACHE_URI,
    // contracts
    fixedRateExchangeAddress:
      process.env.NEXT_PUBLIC_FIXED_RATE_EXCHANGE_ADDRESS,
    dispenserAddress: process.env.NEXT_PUBLIC_DISPENSER_ADDRESS,
    oceanTokenAddress: process.env.NEXT_PUBLIC_OCEAN_TOKEN_ADDRESS,
    nftFactoryAddress: process.env.NEXT_PUBLIC_NFT_FACTORY_ADDRESS,
    opfCommunityFeeCollector:
      process.env.NEXT_PUBLIC_OPF_COMMUNITY_FEE_COLLECTOR
  } as Config
}

export function getOceanConfig(network: string | number): Config {
  let config = new ConfigHelper().getConfig(
    network,
    network === 'polygon' ||
      network === 'moonbeamalpha' ||
      network === 1287 ||
      network === 'bsc' ||
      network === 56 ||
      network === 'gaiaxtestnet' ||
      network === 2021000 ||
      network === 8996 // barge
      ? undefined
      : process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  ) as Config

  if (network === 8996) {
    config = { ...config, ...getDevelopmentConfig() }
  }
  return config as Config
}

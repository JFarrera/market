const fs = require('fs')
const os = require('os')

function getLocalAddresses() {
  const data = JSON.parse(
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.readFileSync(
      `${os.homedir}/.ocean/ocean-contracts/artifacts/address.json`,
      'utf8'
    )
  )
  return data.development
}

fs.readFileSync('.env', 'utf8', function (err, data) {
  if (err) console.log('read error', err)
  // Display the file content
  console.log('read file data: ', data)
})

const addresses = getLocalAddresses()
console.log('addresses', addresses)
const envVars = []
envVars.push(`NEXT_PUBLIC_NFT_FACTORY_ADDRESS='${addresses.ERC721Factory}'`)
envVars.push(
  `NEXT_PUBLIC_OPF_COMMUNITY_FEE_COLLECTOR='${addresses.OPFCommunityFeeCollector}'`
)
envVars.push(
  `NEXT_PUBLIC_FIXED_RATE_EXCHANGE_ADDRESS='${addresses.FixedPrice}'`
)
envVars.push(`NEXT_PUBLIC_DISPENSER_ADDRESS='${addresses.Dispenser}'`)
envVars.push(`NEXT_PUBLIC_OCEAN_TOKEN_ADDRESS='${addresses.Ocean}'`)
envVars.push(`NEXT_PUBLIC_METADATACACHE_URI='http://localhost:5000'`)
envVars.push(`NEXT_PUBLIC_SUBGRAPH_URI='http://localhost:9000'`)
envVars.push(`NEXT_PUBLIC_PROVIDER_URL='http://172.15.0.4:8030'`)
envVars.push(`NEXT_RBAC_URL='http://localhost:3000'`)
envVars.push(`NEXT_PUBLIC_RPC_URL='http://172.15.0.3:8545'`)
envVars.push(`NEXT_PUBLIC_MARKET_DEVELOPMENT='true'`)

var stream = fs.createWriteStream('.env', { flags: 'a' })

envVars.forEach((envVar) => {
  stream.write(envVar + '\n')
})
stream.end()

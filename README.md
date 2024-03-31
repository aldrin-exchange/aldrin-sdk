# Aldrin DEX SDK
asd
[![GitHub license](https://img.shields.io/badge/license-APACHE-blue.svg)](https://github.com/aldrin-exchange/aldrin-sdk/blob/main/LICENSE)

<p align="center">
  <img src="https://aldrin.com/logo.png" alt="Aldrin logo">
</p>

<p align="center">
  [<a href="https://dex.aldrin.com">Website</a> |  <a href="https://github.com/aldrin-exchange/aldrin-sdk/tree/main/docs">API Reference</a> | <a href="https://github.com/aldrin-exchange/aldrin-sdk/tree/main/examples">Examples</a> ]
</p>

## Getting Started
1. Install one of available [Solana wallets](https://docs.solana.com/wallet-guide)
2. Install library with `npm install @aldrin_exchange/sdk` or `yarn add @aldrin_exchange/sdk` 
3. Check [Usage](#usage) section or take a look at [examples](https://github.com/aldrin-exchange/aldrin-sdk/tree/main/examples) and [API reference](https://github.com/aldrin-exchange/aldrin-sdk/tree/main/docs)

## Usage

***

### Trade (swap tokens)

```js
import { Wallet } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { TokenSwap } from '../../src';


const wallet = Wallet.local() // Or any other solana wallet

async function trade() {
  const tokenSwap = await TokenSwap.initialize()

  const rin = new PublicKey('E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp')
  const usdc = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

  const rinPrice = await tokenSwap.getPrice({ mintFrom: rin, mintTo: usdc })
  const usdRinPrice = await tokenSwap.getPrice({ mintFrom: usdc, mintTo: rin })

  console.log(`RIN/USDC price: ${rinPrice}`, `USDC/RIN price: ${usdRinPrice}` )

  const transactionId = await tokenSwap.swap({
    wallet: wallet,
    // A least 1 of parameters minIncomeAmount/outcomeAmount is required
    minIncomeAmount: new BN(1_000_000_000), // 1 RIN
    // outcomeAmount: new BN(5_000_000) // 5 USDC
    mintFrom: usdc,
    mintTo: rin,
  })
} 
trade()
```

***

### Add [pool](https://dex.aldrin.com/pools) liquidity


```js
import BN from 'bn.js'
import { Wallet } from '@project-serum/anchor';
import { AUTHORIZED_POOLS } from '../../src'

const wallet = Wallet.local() // Or any other solana wallet


async function depositLiquidity() {
   const tokenSwap = await TokenSwap.initialize()

  const transactionId = await tokenSwap.depositLiquidity({
    wallet: wallet,
    poolMint: AUTHORIZED_POOLS.RIN_USDC.poolMint,
    // A least 1 of parameters maxBase/maxQuote is required
    // maxBase: new BN(1_000_000_000), // 1 RIN
    maxQuote: new BN(5_000_000), // 5 USDC
  })

  console.log('Liquidity added: ', transactionId)
}
```

***

### Withdraw liquidity from pool

```js
import BN from 'bn.js'
import { Wallet } from '@project-serum/anchor';
import { AUTHORIZED_POOLS } from '../../src'

const wallet = Wallet.local() // Or any other solana wallet

export async function withdrawLiquidity() {
  const tokenSwap = await TokenSwap.initialize()

  const transactionId = await tokenSwap.withdrawLiquidity({
    wallet: wallet,
    poolMint: AUTHORIZED_POOLS.RIN_USDC.poolMint,
    poolTokenAmount: new BN(100_000), // LP tokens
    // A least 1 of parameters minBase/minQuote is required
    // minBase: new BN(1_000_000), // 1 RIN
    // minQuote: new BN(5_000_000), // 1 RIN
  })

  console.log('Liquidity withdrawed: ', transactionId)
}
```

### Check farming rewards

```js
import { AUTHORIZED_POOLS, TokenSwap } from '../../src';
import { wallet } from '../common';


export async function checkFarmed() {
  const tokenSwap = await TokenSwap.initialize()

  const farmed = await tokenSwap.getFarmed({
    wallet,
    poolMint: AUTHORIZED_POOLS.SOL_USDC.poolMint,
  })


  farmed.forEach((f) => {
    console.log(`Reward for farming: mint ${f.tokenInfo.mint.toBase58()}, amount: ${f.calcAccount.tokenAmount.toString()}`)
  })
}

checkFarmed()

```

### [Staking](https://dex.aldrin.com/staking)

```js
import BN from 'bn.js'
import { wallet } from '../common'
import { StakingClient } from '../../src'

const stakingClient = new StakingClient()
const tokenAmount = new BN(1_100_000)

stakingClient.startStaking({
  wallet,
  tokenAmount,
})
```

### [Unstaking](https://dex.aldrin.com/staking)

```js
import { wallet } from '../common'
import { StakingClient } from '../../src'

const stakingClient = new StakingClient()

stakingClient.endStaking({
  wallet,
})
```

### [Claim staking rewards](https://dex.aldrin.com/staking)

```js
import { wallet } from '../common'
import { StakingClient } from '../../src'

const stakingClient = new StakingClient()

stakingClient.claim({
  wallet,
})
```

You can find more complex examples by [link](https://github.com/aldrin-exchange/aldrin-sdk/tree/main/examples).


## Development

1. Clone [repository](https://github.com/aldrin-exchange/aldrin-sdk)
2. Run `yarn` or `npm install`


## Warning 
The library is under active development. Use it at your own risk.


import { AUTHORIZED_POOLS, PERMISSIONLESS_POOLS } from '../../src'
import { poolClient } from '../common'

export async function getPools() {
  
  console.log('Predefined authorized pools: ', AUTHORIZED_POOLS)
  console.log('Predefined permissionless pools: ', PERMISSIONLESS_POOLS)
  const pools = await poolClient.getPools()
  console.log('All Aldrin pools: ', pools)
}

getPools()

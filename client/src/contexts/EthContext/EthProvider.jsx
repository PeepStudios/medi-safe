import React, { useReducer, useCallback, useEffect } from 'react'
import Web3 from 'web3'
import EthContext from './EthContext'
import { reducer, actions, initialState } from './state'
import artifact from '../../../../hardhat/artifacts/contracts/EHR.sol/EHR.json'

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const init = useCallback(async artifact => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
      const networkID = await web3.eth?.net.getId();
      const { abi } = artifact;


      const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

      const contract = new web3.eth.Contract(abi, address);
      const accounts = await web3.eth.getAccounts();

      const sender = accounts[0];



      try {
        const role = await contract.methods.getSenderRole().call({ from: sender });
        let role2 = await contract.getSenderRole();
      } catch (error) {
        console.error('Contract error', error);
      }

      let role = 'unknown'
      if (contract && accounts) {
        console.log('number 1');
        console.log(accounts[0])
        // role = await contract.methods.getSenderRole().call({ from: accounts[0] })
        console.log(role);
        role = 'doctor';
      }
      console.log('dispatching.... 1');

      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract, role, loading: false },
      })
    }
  }, [])


  useEffect(() => {
    const tryInit = async () => {
      try {
        init(artifact)
      } catch (err) {
        console.error(err)
      }
    }

    tryInit()
  }, [])
  console.log('use effect 2 1');

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged']
    const handleChange = () => {
      init(state.artifact)
    }

    events.forEach(e => window.ethereum?.on(e, handleChange))
    return () => {
      events.forEach(e => window.ethereum?.removeListener(e, handleChange))
    }
  }, [init, state.artifact])

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  )
}

export default EthProvider

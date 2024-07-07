import React, { useReducer, useCallback, useEffect } from 'react'
import Web3 from 'web3'
import EthContext from './EthContext'
import { reducer, actions, initialState } from './state'
import artifact from '../../contracts/EHR.json'

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const init = useCallback(async artifact => {
    console.log(artifact);
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');
      const accounts = await web3.eth?.requestAccounts();
      const networkID = await web3.eth?.net.getId();
      console.log(networkID)
      const { abi } = artifact;
      let address, contract;

      try {
        address = artifact.networks['5777'].address;
        console.log(address);
        contract = new web3.eth.Contract(abi, address);
        console.log(contract)
      } catch (err) {
        console.error(err);
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
  console.log('use effect ...... 1');

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

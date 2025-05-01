import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import DaoVotingABI from "./abi/DaoVoting.json";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [description, setDescription] = useState("");

  const loadBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    const daoContract = new ethers.Contract(CONTRACT_ADDRESS, DaoVotingABI, signer);
    setContract(daoContract);

    const count = await daoContract.proposalCount();
    const items = [];
    for (let i = 0; i < count; i++) {
      const p = await daoContract.getProposal(i);
      items.push(p);
    }
    setProposals(items);
  };

  const createProposal = async () => {
    await contract.createProposal(description);
    alert("Proposal created!");
  };

  const vote = async (id, support) => {
    await contract.vote(id, support);
    alert("Voted!");
  };

  useEffect(() => {
    if (window.ethereum) loadBlockchain();
  }, []);

  return (
    <div>
      <h1>DAO Voting DApp</h1>
      <p>Connected wallet: {account}</p>

      <h2>Create Proposal (Owner only)</h2>
      <input value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={createProposal}>Submit Proposal</button>

      <h2>Active Proposals</h2>
      {proposals.map((p, idx) => (
        <div key={idx}>
          <p>
            #{p[0]}: {p[1]} — YES: {p[2].toString()} / NO: {p[3].toString()}
          </p>
          <button onClick={() => vote(p[0], true)}>Vote YES</button>
          <button onClick={() => vote(p[0], false)}>Vote NO</button>
        </div>
      ))}
    </div>
  );
}

export default App;

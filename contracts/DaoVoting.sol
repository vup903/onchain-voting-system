// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DaoVoting {
    struct Proposal {
        uint id;
        string description;
        uint yesVotes;
        uint noVotes;
        bool executed;
    }

    address public owner;
    uint public proposalCount;
    mapping(uint => Proposal) public proposals;
    mapping(uint => mapping(address => bool)) public voted;

    event ProposalCreated(uint id, string description);
    event Voted(uint proposalId, address voter, bool vote);
    event ProposalExecuted(uint id, bool passed);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createProposal(string memory _description) public onlyOwner {
        proposals[proposalCount] = Proposal(proposalCount, _description, 0, 0, false);
        emit ProposalCreated(proposalCount, _description);
        proposalCount++;
    }

    function vote(uint _proposalId, bool _support) public {
        require(_proposalId < proposalCount, "Invalid proposal");
        require(!voted[_proposalId][msg.sender], "Already voted");

        Proposal storage proposal = proposals[_proposalId];
        if (_support) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }
        voted[_proposalId][msg.sender] = true;

        emit Voted(_proposalId, msg.sender, _support);
    }

    function executeProposal(uint _proposalId) public onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Already executed");

        proposal.executed = true;
        bool passed = proposal.yesVotes > proposal.noVotes;

        emit ProposalExecuted(_proposalId, passed);
    }

    function getProposal(uint _proposalId) public view returns (
        uint id,
        string memory description,
        uint yesVotes,
        uint noVotes,
        bool executed
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.description,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.executed
        );
    }
}

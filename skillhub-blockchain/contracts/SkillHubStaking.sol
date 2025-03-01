// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SkillHubToken.sol";

contract SkillHubStaking {
    SkillHubToken public token;

    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public stakingTime;

    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(SkillHubToken _token) {
        token = _token;
    }

    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        token.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        stakingTime[msg.sender] = block.timestamp;

        emit TokensStaked(msg.sender, _amount);
    }

    function unstakeTokens() external {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "No tokens staked");

        uint256 reward = calculateReward(msg.sender);
        token.transfer(msg.sender, balance + reward);
        stakingBalance[msg.sender] = 0;
        stakingTime[msg.sender] = 0;

        emit TokensUnstaked(msg.sender, balance, reward);
    }

    function calculateReward(address _staker) internal view returns (uint256) {
        uint256 timeStaked = block.timestamp - stakingTime[_staker];
        return (stakingBalance[_staker] * timeStaked) / 100000;
    }
}

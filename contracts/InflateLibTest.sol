// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <0.9.0;

import "./InflateLib.sol";

contract InflateLibTest {
    function puff(bytes calldata source, uint256 destlen)
        external
        pure
        returns (InflateLib.ErrorCode, bytes memory)
    {
        return InflateLib.puff(source, destlen);
    }
}

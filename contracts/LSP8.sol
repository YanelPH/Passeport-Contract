// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
// constants
import {_LSP8_TOKENID_FORMAT_NUMBER} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";
import {_LSP4_TOKEN_TYPE_NFT} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";

contract LSP8Mock is LSP8IdentifiableDigitalAsset {
    constructor(
        string memory name,
        string memory symbol,
        address newOwner
    )
        LSP8IdentifiableDigitalAsset(
            name,
            symbol,
            newOwner,
            _LSP4_TOKEN_TYPE_NFT,
            _LSP8_TOKENID_FORMAT_NUMBER
        )
    {}
    uint256 private _currentTokenId = 0;
    // Override or add functions for testing purposes
    function mint(address to, uint256 amount) public {
        for (uint256 i = 0; i < amount; i++) {
            _currentTokenId += 1;
            _mint(to, bytes32(_currentTokenId), false, "");
        }
    }
}

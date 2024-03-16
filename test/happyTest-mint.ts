import { expect } from "chai";
import { ethers } from "hardhat";

describe("TradeUp UseCase with Mocks", async () => {
  let user1, user2;
  let UP1, UP2, LSP7Chill, DogNFT, DrakeNFT;

  before("Deploy UPs and deploy+ming LSP7 and LSP8", async () => {
    [user1, user2] = await ethers.getSigners();
    const UPFactory = await ethers.getContractFactory("LSP0ERC725Account");
    const LSP8Factory = await ethers.getContractFactory("LSP8Mock");

    //Deploying UPs with LYX
    UP1 = await UPFactory.connect(user1).deploy(user1, {
      value: ethers.parseEther("1000.0"),
    });
    UP2 = await UPFactory.connect(user2).deploy(user2, {
      value: ethers.parseEther("1000.0"),
    });
    //Deploying LSP8
    DogNFT = await LSP8Factory.deploy("Dog NFT", "DNFT", user1.address);
    DrakeNFT = await LSP8Factory.deploy("Drake NFT", "DRAFT", user1.address);

    //mint LSP7 To UPs
    await DogNFT.mint(UP1.getAddress(), 2);
    await DrakeNFT.mint(UP1.getAddress(), 3);

    await DogNFT.mint(UP2.getAddress(), 1);
    await DrakeNFT.mint(UP2.getAddress(), 2);
  });
  it("should mint LSP8 tokens correctly to UPs", async () => {
    // Check balances for UP1
    expect(await DogNFT.balanceOf(UP1.getAddress())).to.equal(2); // UP1 should have 2 DogNFTs
    expect(await DrakeNFT.balanceOf(UP1.getAddress())).to.equal(3); // UP1 should have 1 DrakeNFT

    // Check balances for UP2
    expect(await DogNFT.balanceOf(UP2.getAddress())).to.equal(1); // UP2 should have 1 DogNFT
    expect(await DrakeNFT.balanceOf(UP2.getAddress())).to.equal(2); // UP2 should have 1 DrakeNFT
  });
});

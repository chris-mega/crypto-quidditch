const QuidditchPlayer = artifacts.require('./QuidditchPlayer.sol');
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('QuidditchPlayer', (accounts) => {
  let contract;
  before(async() => {
    contract = await QuidditchPlayer.deployed();
  })
  describe('deployment', async() => {
    it('deploys successfully', async () => {
      const address = contract.address;
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    })
    it('has a name', async () => {
      const name = await contract.name();
      assert.equal(name, 'QuidditchPlayer');
    })
  })

  describe('creation', async() => {
    it('creates a new player', async () => {
      await contract.createPlayer(
        'Harry Potter', 'Gryffindor', 'Seeker', true, 'Hogwarts'
      );
      const player = await contract.players(0);
      assert.equal(player.name, 'Harry Potter', 'name is correct');
      const count = await contract.playersCount();
      assert.equal(count.toNumber(), 1, 'there is one player');
    })
    it('throws exception for not owner', async () => {
      try{
        await contract.createPlayer(
          'Lily Potter', 'Gryffindor', '...', true, 'Hogwarts', {from: accounts[1]}
        );
      }catch(error){
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      }
    })
  })

  describe('adding player', async() => {
    it('owner adds a player to user', async () => {
      const result = await contract.addPlayerToUser(0);
      const supply = await contract.balanceOf(accounts[0]);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 0, 'id is correct');
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct');
      assert.equal(event.to, accounts[0], 'to is correct')
      assert.equal(supply, 1, 'totalSupply is correct')
    })
    it('other user adds a player to user', async () => {
      const result = await contract.addPlayerToUser(1, {from: accounts[1]});
      const supply = await contract.balanceOf(accounts[1]);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct');
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct');
      assert.equal(event.to, accounts[1], 'to is correct')
      assert.equal(supply, 1, 'totalSupply is correct')
    })
  })
})

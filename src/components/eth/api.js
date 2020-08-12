class QuidditchApi{
  constructor(contract){
    this.contract = contract;
  }

  async getPlayers(){
    const numPlayers =  await this.contract.methods.playersCount().call();
    var results = [];
    for(var i = 0; i < numPlayers; i++){
      const player = await this.contract.methods.players(i).call();
      results.push(player);
    }
    return results;
  }

  async getUserPlayers(account){
    const balance = await this.contract.methods.balanceOf(account).call();
    var players = []
    if(balance){
      for(var i = 0; i< balance.toNumber(); i++){
        const token = await this.contract.methods.tokenOfOwnerByIndex(account, i).call();
        players.push(token.toNumber());
      }
    } else{
      throw new Error('No balance')
    }
    return players;
  }

  async buyPlayer(id, account){
    try{
      const response = await this.contract.methods.addPlayerToUser(id).send({from: account});
      return response;
    }catch(error){
      if(error.code === -32603)
        throw new Error('You already own this');
      else throw new Error('Something went wrong');
    }
  }

}

export default QuidditchApi;

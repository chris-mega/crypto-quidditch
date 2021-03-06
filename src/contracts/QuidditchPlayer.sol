pragma solidity ^0.5.0;
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract QuidditchPlayer is ERC721Full{
  struct Player {
    string name;
    string team;
    string position;
    bool cannon;
    string category;
  }

  // dapp owner
  address public dappOwner;

  // Quidditch players created in the systems
  mapping(uint => Player) public players;
  uint public playersCount;

  mapping(uint => address) public playerIndexToUser;

  constructor() ERC721Full("QuidditchPlayer", "QP") public {
    dappOwner = msg.sender;
    createPlayer("Harry Potter", "Gryffindor", "Seeker", true, "Hogwarts");
    createPlayer("Robert Guderian", "Bisons", "Keeper", false, "Canadian League");
    createPlayer("Ginny Potter", "Holyhead Harpies", "Chaser", true, "British League");
    createPlayer("Victor Krum", "Bulgarian National", "Seeker", true, "World Class");
    createPlayer("Aragorn son of Arathorn, called Elessar, the Elfstone, Dúnadan, the heir of Isildur Elendil's son of Gondor", "Gondor National", "Seeker", false, "World Class");
  }

  function createPlayer(
    string memory _name,
    string memory _team,
    string memory _position,
    bool _cannon,
    string memory _category
    ) public {
    require(msg.sender == dappOwner);
    players[playersCount] = Player(_name, _team, _position, _cannon, _category);
    playersCount++;
  }

  function addPlayerToUser(uint _playerId) public {
    address _user = msg.sender;
    playerIndexToUser[_playerId] = _user;
    _mint(_user, _playerId);
  }

  function owns(address _claimant, uint _playerId) public returns (bool) {
    return playerIndexToUser[_playerId] == _claimant;
  }

  function sellPlayer(uint _playerId) public {
    require(ownerOf(_playerId) == msg.sender);
    delete playerIndexToUser[_playerId];
    transferFrom(msg.sender, dappOwner, _playerId);
  }
}

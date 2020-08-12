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
}

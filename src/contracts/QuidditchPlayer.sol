pragma solidity >=0.5.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract QuidditchPlayer is ERC721 {
  struct Player {
    string name;
    string team;
    string position;
    bool cannon;
    string category;
  }

  address public owner;

  mapping(uint => Player) public players;
  uint public playersCount;

  constructor() ERC721() public {
    owner = msg.sender;
  }

  // function mint(Player memory _player) public {
  //   uint _id = players.push(_player);
    // _mint(msg.sender, _id);

  // }

  function createPlayer(
    string memory _name,
    string memory _team,
    string memory _position,
    bool _cannon,
    string memory _category
    ) public {
    require(msg.sender == owner);
    players[playersCount] = Player(_name, _team, _position, _cannon, _category);
    playersCount++;
  }

  function addPlayer(uint _playerId) public{
    _mint(msg.sender, _playerId);
  }
}

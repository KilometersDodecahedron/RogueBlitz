class Tile {
    constructor(pathable, stairs){
        //tells it whether the player can move through it
        this.pathable = pathable;
        //tells whether this block is the stairs
        this.stairs = stairs;
    }
}

module.exports = Tile;
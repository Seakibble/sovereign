# Sovereign Changlog

## Pre-alpha v0.30 - Feature Release
Took some pointers from a really comprehensive online roguelike tutorial: http://trystans.blogspot.com/2016/01/roguelike-tutorial-00-table-of-contents.html
* Refactored virtually everything involving the gameworld, paving the way for future refactoring and further encapsulation.
* Added a world generation class that can make cave-like worlds.
* Pulled colours.js and dice.js into a utility folder.
* Changed the player character's glyph colour to white, so that green can be used for other things in the world.
* Specified that this is a pre-alpha build in the version (and retroactively in the changelog).
* Added a title to the html file, so the tab isn't just the url.

## Pre-alpha v0.21 - Bugfix
* Fixed bug where attack and damage bonuses weren't being applied correctly.

## Pre-alpha v0.20 - Feature Release
* Added weapon table.
* Randomized starting weapon for player.
* Changed default creature XP.

## Pre-alpha v0.11 - Bugfix
* Re-enabled damage.

## Pre-alpha v0.10 - Feature Release
* Added version number.
* Implemented creature and player class.
* Implemented weapon class.
* Added melee combat system.
* Added leveling.
* Improved rollDice() parser to accept keeping x lowest/highest rolls.
* Created Tile class to hold terrain, creatures, and misc things that exist at a particular location, rather than an array.
* Cleaned up formatting of the stat block.

## Pre-alpha v0.01
* Initial commit
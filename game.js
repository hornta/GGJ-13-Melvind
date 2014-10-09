var SCALING = 4;
var UNITSIZE = 16;

var tiles = {
	WOOD: 1,
	STONE: 2,
	TOWER: 3,
	ENEMY: 5,
	BEERCAGE: 6,
	WATER: 7
};

var sounds;

function Game() {
	var path_layer;
	var BEAR_CAGE_POS = [];
	var SPAWNPOINTS = [];
	var player;
	var anim_down
	var anim_left
	var anim_up
	var anim_right
	var player_spritesheet_chop
	var map_objects;
	var background_layer;
	var object_layer;
	var viewport;
	var world_width;
	var world_height;
	var gui_wood;
	var gui_wood_img;
	var gui_stone;
	var gui_stone_img;
	var gui_gold;
	var gui_gold_img;
	var gui_lifes;
	var gui_lifes_img;
	var gui_wave;
	var gui_panel;
	var particles;
	var floatTexts;
	var buildSelectedTile;
	var enemies;
	var attackTowers;
	var arrows;
	var spawn_x;
	var spawn_y;
	var time;
	var grounded_arrows;
	var game_over_fade;
	var hammers;
	var wave;
	var enemy_anim_left;
	var enemy_anim_right;
	var enemy_anim_up;
	var enemy_anim_down;
	var paused;
	
	// DEBUG
	var debug_hammers;
	var debug_arrows;
	var debug_enemies;
	var debug;
	
	var background = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,5,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,5,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
	
	var objects = [
		
[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
[7,8,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,7],
[7,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,7],
[7,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,2,0,0,0,0,1,1,1,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,7],
[7,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,2,2,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,1,0,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,7],
[7,0,1,1,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,0,0,7],
[7,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,2,0,0,0,2,2,0,0,0,7],
[7,0,1,2,2,0,0,0,0,1,1,0,0,1,0,0,2,0,1,0,0,0,0,0,0,0,1,1,0,0,2,0,0,0,0,0,0,0,1,1,2,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,7],
[7,0,2,2,2,2,1,0,0,1,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,1,1,1,0,0,0,0,0,1,1,0,1,2,2,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,7],
[7,0,0,0,2,0,0,0,0,1,0,0,0,2,2,0,0,0,0,0,0,2,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,2,2,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,7],
[7,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2,0,1,1,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,7],
[7,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,7],
[7,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,1,1,0,0,0,0,7],
[7,0,0,2,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,2,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,7],
[7,0,0,0,0,0,1,2,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,2,2,0,1,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,2,1,0,0,0,2,2,0,0,0,2,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,0,1,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,2,1,0,1,1,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,2,0,0,0,0,0,7],
[7,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,7],
[7,0,0,1,1,1,0,0,0,0,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,2,2,0,0,0,0,7],
[7,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,7],
[7,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,1,0,0,1,2,2,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,1,2,2,2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,2,2,2,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,2,2,2,0,0,0,0,0,1,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,2,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,1,0,0,0,1,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,7],
[7,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,4,0,0,0,1,1,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,7],
[7,8,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,8,7],
[7,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,2,2,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,7],
[7,0,1,0,2,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,2,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,7],
[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,2,0,0,0,0,1,0,0,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,7],
[7,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,1,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,7],
[7,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,2,1,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,7],
[7,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,2,2,1,0,0,0,0,2,2,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,7],
[7,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,0,2,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,7],
[7,0,2,0,0,0,1,0,1,0,0,0,0,0,0,2,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,2,1,0,0,1,0,0,0,1,1,0,0,2,1,0,0,0,1,0,0,0,1,0,0,2,0,2,1,0,1,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,7],
[7,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,2,2,2,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,7],
[7,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,2,2,2,0,0,1,1,0,0,2,2,1,0,0,0,0,2,2,0,0,0,1,0,0,0,0,0,0,0,1,1,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,7],
[7,0,1,0,0,0,2,2,1,0,2,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1,1,1,0,0,1,0,0,0,2,2,0,0,0,0,7],
[7,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,2,0,0,1,0,0,0,2,2,0,0,0,1,7],
[7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,7],
[7,0,2,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,1,0,0,2,1,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,7],
[7,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,2,1,0,0,0,0,0,0,1,1,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,2,2,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,7],
[7,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,2,0,0,0,7],
[7,0,0,0,0,0,2,0,0,2,0,0,1,0,0,1,2,0,0,0,0,0,2,1,1,0,0,0,2,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,2,0,0,0,7],
[7,0,1,0,0,0,2,0,0,0,0,0,1,1,1,1,2,0,0,0,0,0,2,1,1,0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,2,2,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,7],
[7,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,0,0,0,2,2,0,0,0,1,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,7],
[7,0,1,0,0,0,0,1,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,2,0,0,0,0,0,1,1,1,1,0,0,7],
[7,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,2,0,1,0,1,7],
[7,0,2,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,2,0,0,1,0,1,1,2,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,7],
[7,1,2,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,2,0,0,1,0,1,0,1,0,0,0,0,0,0,0,2,2,0,0,1,0,0,1,0,0,7],
[7,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,2,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,1,1,0,0,0,0,7],
[7,0,1,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,1,1,0,0,1,2,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,2,0,0,0,0,7],
[7,1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,2,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,7],
[7,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,0,0,0,0,0,7],
[7,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,7],
[7,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
[7,8,0,0,0,0,0,0,0,0,0,1,0,1,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,8,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,8,7],
[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
	]
	
	function rand(from,to) {
		return Math.floor(Math.random()*(to-from+1)+from);
	}
	
	function frand(minValue,maxValue,precision) {
		if(typeof(precision) == 'undefined'){
			precision = 2;
		}
		return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
	}
	
	function randHex() {
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	}
	
	function rgbToHex(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	
	function radToDeg(rad) {
		return rad * (180 / Math.PI)
	}
	
	function degToRad(rad) {
		return rad * (Math.PI / 180)
	}
	
	function getTile(x, y, layer) {
		var layer;
		if(layer == undefined) layer = object_layer;
		if(layer == "background") layer = background_layer;
		for(var i = 0; i < layer.length; i++) {	
			if(layer[i] != undefined) {
				if(
					layer[i].x <= x && 
					x <= layer[i].x + layer[i].width && 
					layer[i].y <= y && 
					y <= layer[i].y + layer[i].height) {
					return i;
				}
			}
		}
		return -1;
	}
	
	function CreateParticles(x, y, color, amount) {
		if(amount == undefined) amount = 1;
		for(var i = 0; i < amount; i++) {
			var color = color;
			var dirX = frand(-2.0, 2.0, 2);
			var dirY = frand(-2.0, 2.0, 2);
			var square = rand(6*SCALING, 8*SCALING);
			var particle = new jaws.Sprite({ x: x, y: y, color: color, width: square, height:square, anchor:"center", stroke: 1});
			particle.dirX = dirX;
			particle.dirY = dirY;
			particle.alpha = 1;
			particle.stroke = true;
			particle.alphaDecrease = frand(0.01, 0.09, 2);
			particle.sizeDecrease = 0.999999;
			particles.push(particle);
		}
	}
	
	function CreateFloatText(x, y, text) {
		var text = new jaws.Text({x: x, y: y, text: text});
		text.fontFace = "Consolas";
		text.fontSize = 18;
		text.color = "white";
		text.style = "bold";
		floatTexts.push(text);
	}
	
	function StrokeTile(x, y, width, height, color) {
		jaws.context.strokeStyle = color;
		jaws.context.lineWidth   = 2;
		jaws.context.strokeRect(x,y, width, height);
	}
	
	function GetEnemyPath(startX, startY, goalX, goalY) {
		
	}
	
	function SpawnEnemy(spawn_locations) {
		var location = rand(0, spawn_locations.length-1);
		location = spawn_locations[location];
		console.log(location);
		enemy = new jaws.Sprite({image: "images/tiles/stone.png", scale: SCALING , anchor: "center"});
		enemy.x = location[0] * 64;
		enemy.y = location[1] * 64;
		enemy.hp = 10;
		enemy.gold = 1;
		enemy.dmg = 1;
		enemy.particleColor = "#4b4b4b";
		enemy.id = 5;
		enemy.sound = "stone_pick";
		enemy.pathStart = [location[0], location[1]];
		enemy.current_point = 0;
		enemy.start = {};
		enemy.start.x = location[0] * 64;
		enemy.start.y = location[1] * 64;
		enemy.pathEnd         = BEAR_CAGE_POS;
		enemy.speed      = player.speed * 0.2256;
		enemy.anim_down  = enemy_anim_down.slice(0,3)
		enemy.anim_up    = enemy_anim_up.slice(0,3)
		enemy.anim_left  = enemy_anim_left.slice(0,3)
		enemy.anim_right = enemy_anim_right.slice(0,3)
		enemy.path       = findPath(path_layer, enemy.pathStart, enemy.pathEnd);
		
		enemies.push(enemy);
	}
	
	function SpawnAttackTower(x, y) {
		var attack_tower = new jaws.Sprite({image: "images/attack_tower.png", anchor: "center", scale: SCALING});
		attack_tower.x            = x;
		attack_tower.y            = y;
		attack_tower.gridx        = x;
		attack_tower.gridy        = y;
		attack_tower.sound        = "stone_pick";
		attack_tower.hp           = 5;
		attack_tower.value        = {};
		attack_tower.value.wood   = 10;
		attack_tower.value.stone  = 10;
		attack_tower.attack_speed = 750;
		attack_tower.attack_damage = 1;
		attack_tower.radius       = 300;
		attack_tower.lastShot     = 0;
		attack_tower.particleColor = "#4b4b4b";
		attack_tower.id           = 3;
		
		attackTowers.push(attack_tower);
		object_layer.push(attack_tower);
	}
	
	function SpawnArrow(dirX, dirY, x, y, angle, max_radius, dmg) {
		var arrow = new jaws.Sprite({ image: "images/sprite_arrow.png", x: x, y: y ,scale: SCALING, anchor: "center"});
		arrow.rotate(angle);
		arrow.dirX = dirX;
		arrow.dirY = dirY;
		arrow.dmg = dmg;
		arrow.max_radius = max_radius;
		arrows.push(arrow);
		
	}
	
	function SpawnGroundedArrow(x, y, angle) {
		var grounded_arrow = new jaws.Sprite({ image: "images/grounded_arrow.png", x: x, y: y ,scale: SCALING, anchor: "center"});
		grounded_arrow.rotate(angle);
		grounded_arrows.push(grounded_arrow);
	}
	
	function SpawnHammer(x, y, angle, speed, dx, dy) {
		var hammer = new jaws.Sprite({image: "images/stonehammer.png", x: x, y: y, scale: SCALING, anchor: "center", angle: angle});
		hammer.dx = dx;
		hammer.dy = dy;
		hammers.push(hammer);
	}
	
	function intersect(a, b) {
		return !(
			(a.x + a.height  * .5 < b.y - b.height * .5) || 
			(a.y - a.height * .5  > b.y + b.height * .5) ||
			(a.x - a.width * .5   > b.x + b.width  * .5) ||
			(a.x + a.width * .5   < b.x - b.width * .5)
		);
	}
	
	function pointisWithinRect(a, b) {
		if(b.x - b.width * .5  <= a[0] && a[0] <= b.x + b.width * .5 && b.y - b.height * .5 <= a[1] && a[1] <= b.y + b.height * .5)
			return true; 
		return false;
	}
	
	function Manhattan(dx, dy) {
		return dx + dy;
	}
	
	function newWave(wave) {
		var amount;
		if(wave == 1) amount = 4; else {
			amount = wave * 4 + (wave - 1);
		}
		
		SpawnEnemy(SPAWNPOINTS);
		var spawned = 0;
		var interval = setInterval(function() {
			spawned++;
			SpawnEnemy(SPAWNPOINTS);
			if(spawned == (amount - 1)) { clearInterval(interval); }
		}, 1000);
	}

	function findPath(world, pathStart, pathEnd) {
		var	abs = Math.abs;
		var	max = Math.max;
		var	pow = Math.pow;
		var	sqrt = Math.sqrt;

		var maxWalkableTileNum = 0;
		
		var worldWidth = world.length;
		var worldHeight = world[0].length;
		var worldSize =	worldWidth * worldHeight;

		var distanceFunction = ManhattanDistance;
		var findNeighbours = function(){};

		function ManhattanDistance(Point, Goal) {
			return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
		}

		function DiagonalDistance(Point, Goal) {
			return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
		}

		function EuclideanDistance(Point, Goal) {
			return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
		}

		function Neighbours(x, y) {
			var	N = y - 1,
			S = y + 1,
			E = x + 1,
			W = x - 1,
			myN = N > -1 && canWalkHere(x, N),
			myS = S < worldHeight && canWalkHere(x, S),
			myE = E < worldWidth && canWalkHere(E, y),
			myW = W > -1 && canWalkHere(W, y),
			result = [];
			if(myN)
			result.push({x:x, y:N});
			if(myE)
			result.push({x:E, y:y});
			if(myS)
			result.push({x:x, y:S});
			if(myW)
			result.push({x:W, y:y});
			findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
			return result;
		}

	// returns every available North East, South East,
	// South West or North West cell - no squeezing through
	// "cracks" between two diagonals
	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
	{
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S});
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns every available North East, South East,
	// South West or North West cell including the times that
	// you would be squeezing through a "crack"
	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
	{
		myN = N > -1;
		myS = S < worldHeight;
		myE = E < worldWidth;
		myW = W > -1;
		if(myE)
		{
			if(myN && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myS && canWalkHere(E, S))
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN && canWalkHere(W, N))
			result.push({x:W, y:N});
			if(myS && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y)
	{
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	function Node(Parent, Point)
	{
		var newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * worldWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};

		return newNode;
	}

	function calculatePath() {
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		var AStar = new Array(worldSize);
		var Open = [mypathStart];
		var Closed = [];
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

}
	
	this.setup = function() {
		debug = false;
		debug_hammers = new jaws.Text({x: 0, y: 10, color: "#fff"});
		debug_arrows  = new jaws.Text({x: 0, y: 30, color: "#fff"});
		debug_enemies = new jaws.Text({x: 0, y: 50, color: "#fff"});
		jaws.resetPressedKeys();
		sounds["loose"].stop();
		sounds["win"].stop();
		sounds["bg"].stop();
		sounds["bg"].play();
		paused = false;
		wave = 1;
		buildSelectedTile = -1;
		background_layer  = [];
		object_layer      = [];
		path_layer        = [];
		particles         = [];
		floatTexts        = [];
		enemies           = [];
		attackTowers      = [];
		arrows            = [];
		grounded_arrows   = [];
		hammers           = [];
		world_width = 0;
		world_height = 0;
		enemy_x = 0;
		enemy_y = 0;
		goal_x = 0;
		goal_y = 0;
		
		// INIT BACKGROUND LAYER OF MAP
		for(var y = 0; y < background.length; y++) {
			for(var x = 0; x < background[0].length; x++) {
				var num = background[y][x];
				var tile;
				switch(num) {
					case 1: // Grass
						tile = new jaws.Sprite({image: "images/tiles/grass.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 2: // Water
						tile = new jaws.Sprite({image: "images/water.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 3: // Dirt
						tile = new jaws.Sprite({image: "images/dirt.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 4:
						tile = new jaws.Sprite({image: "images/dirtTB.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 5:
						tile = new jaws.Sprite({image: "images/dirtRL.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 6:
						tile = new jaws.Sprite({image: "images/dirtbottomleftcorner.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 7:
						tile = new jaws.Sprite({image: "images/dirtbottomrightcorner.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 8:
						tile = new jaws.Sprite({image: "images/dirttoprightcorner.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
					case 9:
						tile = new jaws.Sprite({image: "images/dirttopleftcorner.png", scale: SCALING, anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						background_layer.push(tile);
						break;
				}
				
				// SET DIMENSIONS FOR WORLD
				if(world_width == 0 && world_height == 0) {
					world_width  = 64 * background[0].length + 64;
					world_height = 64 * background.length + 64;
				}
			}
		}
		
		// INIT OBJECT LAYER OF MAP
		for(var y = 0; y < objects.length; y++) {
			for(var x = 0; x < objects[0].length; x++) {
				var num = objects[y][x];
				var tile;
				switch(num) {
					case 1:
						tile = new jaws.Sprite({image: "images/tiles/tree.png", scale: SCALING , anchor: "center"});
						tile.gridx = x;
						tile.gridy = y;
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.hp = 5;
						tile.particleColor = "#7b2e0f";
						tile.id = num;
						tile.sound = "wood_chop";
						object_layer.push(tile);
						break;
					case 2:
						tile = new jaws.Sprite({image: "images/tiles/stone.png", scale: SCALING , anchor: "center"});	
						tile.gridx = x;
						tile.gridY = y;
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.hp = 10;
						tile.particleColor = "#4b4b4b";
						tile.id = num;
						tile.sound = "stone_pick";
						object_layer.push(tile);
						break;
					case 3:
						SpawnAttackTower(x * 64,y * 64);
						break;
					case 4:
						spawn_x = tile.width * x;
						spawn_y = tile.width * y;
						break;
					case 5: // Enemy
						enemy = new jaws.Sprite({image: "images/tiles/stone.png", scale: SCALING , anchor: "center"});						
						enemy.x = tile.width * x;
						enemy.y = tile.height * y;
						enemy.hp = 10;
						enemy.gold = 1;
						enemy.dmg = 1;
						enemy.particleColor = "#4b4b4b";
						enemy.id = num;
						enemy.sound = "stone_pick";
						enemy.pathStart = [x, y];
						enemy.current_point = 0;
						enemy.start = {};
						enemy.start.x = tile.width * x;
						enemy.start.y = tile.height * y;
						enemies.push(enemy);					
						break;
					case 6: // Goal
						tile = new jaws.Sprite({image: "images/ale.png", scale: SCALING , anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.hp = 500;
						tile.id = num;
						object_layer.push(tile);
						path_end = [x,y]
						BEAR_CAGE_POS = [x, y];
						break;
					case 7: // WATER
						tile = new jaws.Sprite({image: "images/water.png", scale: SCALING , anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						tile.id = num;
						object_layer.push(tile);
						break;
					case 8: // CAVE
						tile = new jaws.Sprite({image: "images/caveshadow.png", scale: SCALING , anchor: "center"});
						tile.x = tile.width * x;
						tile.y = tile.height * y;
						tile.gridx = x;
						tile.gridy = y;
						tile.id = num;
						object_layer.push(tile);
						SPAWNPOINTS.push([x, y]);
						break;
				}
				if(path_layer[x] == undefined)
					path_layer[x] = [];
				if(num == 0 || num == 5 || num == 6 || num == 4 || num == 8 || num == 7) {
					path_layer[x][y] = 0;
				} else {					
					path_layer[x][y] = 1;
				}
			}
		}
		
		// INIT VIEWPORT
		viewport = new jaws.Viewport({max_x: world_width - 64 , max_y: world_height - 64})
		viewport.x = -32;
		viewport.y = -32;
		
		// INIT PLAYER
		player              = new jaws.Sprite({image: "images/sprites/player.png", scale: SCALING, anchor: "center"});
		player.x            = spawn_x;
		player.y            = spawn_y;
		player.dx           = 0;
		player.dy           = 0;
		player.wood         = 0;
		player.stone        = 0;
		player.gold         = 0;
		player.lifes        = 5;
		player.speed        = 5;
		player.lifes_icon   = [];
		player.direction    = 1;
		player.attack_timer = 500;
		player.gathering    = false;
		player.canChop      = true;
		player.canThrow     = true;
		player.chopSpeed    = 250;
		player.throwSpeed   = 250;
		player.buildMode    = false;
		
		// PLAYER ANIMATIONS
		anim_down  = new jaws.Animation({sprite_sheet: "images/sprites/player.png", frame_size: [16,16], frame_duration: 100, orientation: "right"})
		anim_up    = new jaws.Animation({sprite_sheet: "images/sprites/player.png", frame_size: [16,16], frame_duration: 100, orientation: "right", offset: 16})
		anim_left  = new jaws.Animation({sprite_sheet: "images/sprites/player.png", frame_size: [16,16], frame_duration: 100, orientation: "right", offset: 32})
		anim_right = new jaws.Animation({sprite_sheet: "images/sprites/player.png", frame_size: [16,16], frame_duration: 100, orientation: "right", offset: 48})
		player_spritesheet_chop   = new jaws.SpriteSheet({image: "images/sprites/player.png", frame_size: [16,16], orientation: "right", offset: 64})
        player.anim_down  = anim_down.slice(0,5)
        player.anim_up    = anim_up.slice(0,5)
        player.anim_left  = anim_left.slice(0,5)
        player.anim_right = anim_right.slice(0,5)
        player.setImage(player.anim_down.next());
		
		player_health_icons = new jaws.SpriteSheet({image: "images/healthbar.png", frame_size: [16, 16], orientation: "right"});
		
		gui_panel      = new jaws.Sprite({x: 0, y: jaws.height - 50, image: "images/panel.png"});
		gui_wood       = new jaws.Text({ x:79, y: jaws.height-17, text: "", color: "white", fontFace: "Consolas", fontSize: 20});
		gui_wood_img   = new jaws.Sprite({ x:40, y: jaws.height-25, image: "images/logs.png", anchor: "center", scale: SCALING});
		
		gui_stone      = new jaws.Text({ x:276, y: jaws.height-17, text: "", color: "white", fontFace: "Consolas", fontSize: 20});
		gui_stone_img  = new jaws.Sprite({ x:250, y: jaws.height-21, image: "images/stone.png", anchor: "center", scale: SCALING});
		
		gui_gold       = new jaws.Text({ x:476, y: jaws.height-17, text: "", color: "white", fontFace: "Consolas", fontSize: 20});
		gui_gold_img   = new jaws.Sprite({ x:450, y: jaws.height-25, image: "images/gold.png", anchor: "center", scale: SCALING});
		
		gui_lifes      = new jaws.Text({ x:700, y: jaws.height-17, text: "Lifes: "+ player.lifes, color: "white", fontFace: "Consolas", fontSize: 20});
		gui_lifes_img  = new jaws.Sprite({x: 650, y: jaws.height-29, image: player_health_icons.frames[player.lifes], anchor: "center", scale: SCALING-1});
		game_over_fade = new jaws.Sprite({x: 0, y: 0, width: jaws.width, height: jaws.height, color: "#FFF", alpha: 0});
		
		gui_waves      = new jaws.Text({ x:900, y: jaws.height-17, text: "Wave: "+ wave + "/5", color: "white", fontFace: "Consolas", fontSize: 20});
		
		// INIT ENEMY PATH (THE BEAR CAGE)
		enemy_anim_left  = new jaws.Animation({sprite_sheet: "images/troll.png", frame_size: [16,16], frame_duration: 100, orientation: "right"})
		enemy_anim_right = new jaws.Animation({sprite_sheet: "images/troll.png", frame_size: [16,16], frame_duration: 100, orientation: "right", offset: 16})
		enemy_anim_up    = new jaws.Animation({sprite_sheet: "images/troll.png", frame_size: [16,16], frame_duration: 100, orientation: "right", offset: 32})
		enemy_anim_down  = new jaws.Animation({sprite_sheet: "images/troll.png", frame_size: [16,16], frame_duration: 100, orientation: "right", offset: 48})
		
		for(var i in enemies) {
			enemies[i].pathEnd    = BEAR_CAGE_POS;
			enemies[i].speed      = player.speed * 0.1;
			enemies[i].anim_down  = enemy_anim_down.slice(0,3)
			enemies[i].anim_up    = enemy_anim_up.slice(0,3)
			enemies[i].anim_left  = enemy_anim_left.slice(0,3)
			enemies[i].anim_right = enemy_anim_right.slice(0,3)
			enemies[i].path       = findPath(path_layer, enemies[i].pathStart, enemies[i].pathEnd);
		}
		jaws.preventDefaultKeys(["up", "down", "right", "left", "f1", "f2", "f3", "f4", "pagedown", "pageup"]);
		newWave(wave);
	}
	
	this.update = function() {
		if(jaws.pressedWithoutRepeat("f4")) debug = !debug;
		debug_hammers.text = "Hammers: " + hammers.length;
		debug_arrows.text = "Arrows: " + arrows.length
		debug_enemies.text = "Trolls: " + enemies.length
		time = new Date;
		gui_wood.text = "Wood: " + player.wood;
		gui_stone.text = "Stone: " + player.stone;
		gui_gold.text = "Gold: " + player.gold;
		player.dx = 0;
		player.dy = 0;
		if(jaws.pressed("left"))  { player.x -= player.speed;  player.direction = 0; player.setImage(player.anim_left.next()) }
		if(jaws.pressed("right")) { player.x += player.speed;  player.direction = 3; player.setImage(player.anim_right.next()) }
		if(jaws.pressed("up"))    { player.y -= player.speed;  player.direction = 1; player.setImage(player.anim_up.next()) }
		if(jaws.pressed("down"))  { player.y += player.speed;  player.direction = 2; player.setImage(player.anim_down.next()) }
		
		// THROW HAMMER
		if(jaws.pressedWithoutRepeat("x") && !player.buildMode && player.canThrow) {
			player.canThrow = false;
			var angle;
			var dx;
			var dy;
			switch(player.direction) {
				case 0: angle = 180; dx = -(player.speed*2); dy = 0;  break;
				case 1: angle = 270; dx = 0; dy = -(player.speed*2);  break;
				case 2: angle = 90; dx = 0; dy = player.speed*2; break;
				case 3: angle = 0; dx = player.speed*2; dy = 0; break;
			}
			
			SpawnHammer(player.x, player.y, angle, player.speed * 2, dx, dy);
			
			setTimeout(function() {
				player.canThrow = true;
			}, player.throwSpeed);
		}
		
		// DESTROY SOMETHING
		if(jaws.pressed("c") && player.canChop && !player.buildMode) {
			player.canChop = false;
			var x;
			var y;
			switch(player.direction) {
				case 0:
					x = player.x - 16;
					y = player.y + player.height * .5;
					player.image = player_spritesheet_chop.frames[player.direction];
					player.gathering = true;
					break;
				case 1:
					x = player.x + player.width * .5;
					y = player.y - 16;
					player.image = player_spritesheet_chop.frames[player.direction];
					player.gathering = true;
					break;
				case 2:
					x = player.x + player.width * .5;
					y = player.y + player.height + 16;
					player.image = player_spritesheet_chop.frames[player.direction];
					player.gathering = true;
					break;
				case 3:
					x = player.x + player.width + 16;
					y = player.y + player.height * .5;
					player.image = player_spritesheet_chop.frames[player.direction];
					player.gathering = true;
					break;
			}
				
			var tile = getTile(x, y);
			
			// IF WE HIT SOMETHING
			if(tile != -1 && object_layer[tile].id != 6) {
				CreateParticles(x - object_layer[tile].width*0.5, y - object_layer[tile].height*0.5, object_layer[tile].particleColor, 10);
				sounds[object_layer[tile].sound].play();
				object_layer[tile].hp -= 1;
				if(object_layer[tile].hp == 0) {
					if(object_layer[tile].id == tiles.WOOD) {
						console.log("Change path_layer in key_x: " + object_layer[tile].gridx);
						console.log("Change path_layer in key_y: " + object_layer[tile].gridy);
						path_layer[object_layer[tile].gridx][object_layer[tile].gridy] = 0;
						player.wood += 1;						
						CreateFloatText(x, y, "+1");
					} else if(object_layer[tile].id  == tiles.STONE) {					
						path_layer[object_layer[tile].gridx][object_layer[tile].gridy] = 0;
						player.stone += 1;						
						CreateFloatText(x, y, "+1");
					} else if(object_layer[tile].id == tiles.TOWER) {					
						path_layer[object_layer[tile].gridx][object_layer[tile].gridy] = 0;
						attackTowers.splice(tile, 1);
						var wood = Math.ceil(object_layer[tile].value.wood * .5);
						var stone = Math.ceil(object_layer[tile].value.stone * .5);
						player.wood += wood;
						player.stone += stone;						
						CreateFloatText(x, y, "+"+wood);
						CreateFloatText(x, y, "+"+stone);
					}
					for(var i in enemies) {
						var pathStart = [];
						var mox = enemies[i].x % 64;
						var moy = enemies[i].y % 64;
						if(mox < 32) {
							pathStart[0] = enemies[i].pathStart[0];
							enemies[i].x = enemies[i].x - mox
						} else {						
							pathStart[0] = enemies[i].pathStart[0];
							enemies[i].x = enemies[i].x + mox
						}
						if(moy < 32) {
							pathStart[1] = enemies[i].pathStart[1];
							enemies[i].y = enemies[i].y - moy
						} else {						
							pathStart[1] = enemies[i].pathStart[1];
							enemies[i].y = enemies[i].y + moy
						}
						
						enemies[i].current_point = 0;
						enemies[i].x = 64 * enemies[i].pathStart[0];
						enemies[i].y = 64 * enemies[i].pathStart[1];
						enemies[i].path = findPath(path_layer, enemies[i].pathStart, enemies[i].pathEnd);
					}
					
					object_layer.splice(tile, 1);
					
					for(var i in enemies) {
						if(tile < enemies[i].key) {
							enemies[i].key--;
						}
					}
				}
			}
			
			setTimeout(function() {
				player.canChop = true;
			}, player.chopSpeed);
			
			setTimeout(function() {
				switch(player.direction) {
					case 0: player.image = player.anim_left.frames[2]; break;
					case 1: player.image = player.anim_up.frames[2]; break;
					case 2: player.image = player.anim_down.frames[2]; break;
					case 3: player.image = player.anim_right.frames[2];  break;
				}
			}, player.chopSpeed * .5);
		}
		
		// BUILD MODE
		if(jaws.pressedWithoutRepeat("f")) {
			player.buildMode = !player.buildMode;
		}	
		
		// BUILD TOWER
		if(jaws.pressedWithoutRepeat("1")) {
			if(player.buildMode && buildSelectedTile != -1) {
				if(player.wood < 20 || player.stone < 10) {
					CreateFloatText(player.x, player.y, "Need 20 wood, 10 stone");
				} else {
					var object_at_tile = getTile(background_layer[buildSelectedTile].x+1, background_layer[buildSelectedTile].y+1);
					console.log();
					if(object_at_tile == -1) {
						console.log("free");
						var goal_x = BEAR_CAGE_POS[0];
						var goal_y = BEAR_CAGE_POS[1];
						
						var selected_x = background_layer[buildSelectedTile].gridx;
						var selected_y = background_layer[buildSelectedTile].gridy;
						
						if(
							selected_x >= goal_x - 1 && selected_x <= goal_x + 1 && selected_y >= goal_y - 1 && selected_y <= goal_y + 1
						) {
							CreateFloatText(player.x, player.y, "You can't build here");
						} else {
							
							var tmpPathLayer = path_layer;
							tmpPathLayer[background_layer[buildSelectedTile].gridx][background_layer[buildSelectedTile].gridy] = 1;
							var blocking = false;
							
							// Set tmpPath of enemies to the new path, change if not blocking for any enemies
							for(var i in enemies) {
								var tmpPath = findPath(tmpPathLayer, enemies[i].pathStart, enemies[i].pathEnd);
								if(tmpPath.length == 0) {
									blocking = true;
								} else {
									enemies[i].tmpPath = tmpPath;
								}
							}
							
							if(!blocking) {
								for(var i in enemies) {
									var pathStart = [];
									var mox = enemies[i].x % 64;
									var moy = enemies[i].y % 64;
									if(mox < 32) {
										pathStart[0] = enemies[i].pathStart[0];
										enemies[i].x = enemies[i].x - mox
									} else {						
										pathStart[0] = enemies[i].pathStart[0];
										enemies[i].x = enemies[i].x + mox
									}
									if(moy < 32) {
										pathStart[1] = enemies[i].pathStart[1];
										enemies[i].y = enemies[i].y - moy
									} else {						
										pathStart[1] = enemies[i].pathStart[1];
										enemies[i].y = enemies[i].y + moy
									}
									enemies[i].current_point = 0;
									enemies[i].x = 64 * enemies[i].pathStart[0];
									enemies[i].y = 64 * enemies[i].pathStart[1];
									
									enemies[i].path = enemies[i].tmpPath;
								}
								player.wood -= 20;
								player.stone -= 10;
								SpawnAttackTower(background_layer[buildSelectedTile].x, background_layer[buildSelectedTile].y);
								path_layer = tmpPathLayer;
							}
						}
					}
				}
			}
		}
		
		if(player.buildMode) {
			var x; 
			var y;
			switch(player.direction) {
				case 0:
					x = player.x - 16;
					y = player.y + player.height * .5;
					break;
				case 1:
					x = player.x + player.width * .5;
					y = player.y - 16;
					break;
				case 2:
					x = player.x + player.width * .5;
					y = player.y + player.height + 16;
					break;
				case 3:
					x = player.x + player.width + 16;
					y = player.y + player.height * .5;
					break;
			}
			var tile = getTile(x, y, "background");
			if(tile != -1) {
				buildSelectedTile = tile;
			}
		}
		
		// UPGRADE
		if(jaws.pressedWithoutRepeat("D")) {
		
		}
		
		// COLLISION
		for(var i = 0; i < object_layer.length; i++) {
			if(object_layer[i] != undefined) {
				var length_x = Math.abs(player.x - object_layer[i].x);
				var length_y = Math.abs(player.y - object_layer[i].y);
				if(length_x < (player.width*.5 + object_layer[i].width*.5) && length_y < (player.height*.5 + object_layer[i].height*.5)) {
					var overflow_x = length_x - (player.width*.5 + object_layer[i].width*.5);
					var overflow_y = length_y - (player.height*.5 + object_layer[i].height*.5);
					if(overflow_x == overflow_y) overflow_x++;
					
					if(overflow_x > overflow_y) {
						if(player.x > object_layer[i].x) {		
							player.x -= overflow_x;	
						} else {							
							player.x += overflow_x;	
						}
					} else if(overflow_x < overflow_y) {
						if(player.y > object_layer[i].y) {
							player.y -= overflow_y;	
						} else {							
							player.y += overflow_y;	
						}
					}
				}
			}
		}
		
		// UPDATE PARTICLES
		for(var i = 0; i < particles.length; i++) {
			particles[i].x += particles[i].dirX;
			particles[i].y += particles[i].dirY;
		}
		
		// UPDATE FLOATTEXTS
		for(var i = 0; i < floatTexts.length; i++) {
			floatTexts[i].x += 1;
			floatTexts[i].y -= 1;
			floatTexts[i].alpha -= 0.03;
			if(floatTexts[i].alpha <= 0) {
				floatTexts.splice(i, 1);
			}
		}
		
		// SHOOT ENEMIES
		for(var i in attackTowers) {
			if(time.getTime() - attackTowers[i].lastShot > attackTowers[i].attack_speed) {
				attackTowers[i].canShoot = false;
				for(var j in enemies) {
					var dx = attackTowers[i].x - enemies[j].x
					var dy = attackTowers[i].y - enemies[j].y;
					var distance = Math.sqrt(dx * dx + dy * dy);
					if(distance <= attackTowers[i].radius + 32) {
						attackTowers[i].lastShot = time.getTime();
						var radians = Math.atan2(enemies[j].y - attackTowers[i].y, enemies[j].x - attackTowers[i].x);
						var dirX = Math.cos(radians);
						var dirY = Math.sin(radians);
						SpawnArrow(dirX, dirY, attackTowers[i].x,attackTowers[i].y, radToDeg(radians), attackTowers[i].radius, attackTowers[i].attack_damage);
						break;
					}
				}
			}
		}
		
		// UPDATE ARROWS
		for(var key in arrows) {
			var point_x = arrows[key].x + Math.cos(degToRad(arrows[key].angle) * arrows[key].width * 0.5);
			var point_y = arrows[key].y + Math.sin(degToRad(arrows[key].angle) * arrows[key].width * 0.5);
			var hit = false;
			for(var j in enemies) {
				if(pointisWithinRect([point_x, point_y], enemies[j])) {
					hit = true;
					enemies[j].hp -= arrows[key].dmg;
					arrows.splice(key, 1);	
					sounds["arrow_flesh"].play();
					
					if(enemies[j].hp <= 0) {
						CreateFloatText(enemies[j].x, enemies[j].y, "+1");
						player.gold += enemies[j].gold;
						CreateParticles(enemies[j].x, enemies[j].y, "#990000", 20);
						enemies.splice(j, 1);
						object_layer.splice(j, 1);
					} else {					
						CreateParticles(enemies[j].x, enemies[j].y, "#990000", 5);
					}
				}
				if(hit)
					break;
			}
				if(hit)
					break;
			arrows[key].x += arrows[key].dirX * 6;
			arrows[key].y += arrows[key].dirY * 6;
			if(arrows[key].x < 0 || arrows[key].x > viewport.width + viewport.x || arrows[key].y < 0 || arrows[key].y > viewport.y + viewport.height) {
				arrows.splice(key, 1);
			}
		}
		
		// UPDATE HAMMERS
		for(var i in hammers) {
			var collided = false;
				
			
			for(var k in enemies) {
				if(enemies[k] != undefined) {
					var length_x = Math.abs(hammers[i].x - enemies[k].x);
					var length_y = Math.abs(hammers[i].y - enemies[k].y);
					if(length_x < (hammers[i].width*.5 + enemies[k].width*.5) && length_y < (hammers[i].height*.5 + enemies[k].height*.5)) {
						collided = true;
						enemies[k].hp -= 1;
						console.log(enemies[k].hp);
						sounds["arrow_flesh"].play();
						CreateParticles(enemies[k].x, enemies[k].y, "#990000", 10);
						if(enemies[k].hp <= 0) {
							CreateFloatText(enemies[k].x, enemies[k].y, "+1");
							enemies.splice(k, 1);
							player.gold += 1;
						}
						hammers.splice(i, 1);
						break;
					}
				}
			}
			
			if(!collided) {
				for(var k in object_layer) {
					if(object_layer[k] != undefined) {
						var length_x = Math.abs(hammers[i].x - object_layer[k].x);
						var length_y = Math.abs(hammers[i].y - object_layer[k].y);
						if(length_x < (hammers[i].width*.5 + object_layer[k].width*.5) && length_y < (hammers[i].height*.5 + object_layer[k].height*.5)) {
							collided = true;
							hammers.splice(i, 1);
							break;
						}
					}
				}
			}
			if(!collided) {
				hammers[i].x += hammers[i].dx;
				hammers[i].y += hammers[i].dy;
			}
		}
		
		// Move enemies
		for(var i in enemies) {
			var current_point = enemies[i].path[enemies[i].current_point];
			if(enemies[i].path.length == 0) {
				console.log("Length is 0 huh?");
			}
			enemies[i].pathStart = [current_point[0], current_point[1]];
			var next_point = enemies[i].path[enemies[i].current_point+1];
			
			
			if(current_point[0] > next_point[0]) {
				enemies[i].x -= enemies[i].speed;
				enemies[i].setImage(enemies[i].anim_left.next());
			} else if(current_point[0] < next_point[0]) {
				enemies[i].x += enemies[i].speed;
				enemies[i].setImage(enemies[i].anim_right.next());
			} else if(current_point[1] > next_point[1]) {
				enemies[i].y -= enemies[i].speed;
				enemies[i].setImage(enemies[i].anim_up.next());
			} else if(current_point[1] < next_point[1]) {
				enemies[i].y += enemies[i].speed;
				enemies[i].setImage(enemies[i].anim_down.next());
			}
			
			var diff_x = Math.abs(next_point[0] * SCALING * UNITSIZE - enemies[i].x);
			var diff_y = Math.abs(next_point[1] * SCALING * UNITSIZE - enemies[i].y);
			if(diff_x <= enemies[i].speed && diff_y <= enemies[i].speed) {
				enemies[i].current_point++;
			}
			
			// If enemy hit the goal
			if(enemies[i].current_point == enemies[i].path.length-2) {
				console.log("ENEMY HIT GOAL! :D");
				player.lifes--;
				gui_lifes.text = "Lifes: " + player.lifes;
				gui_lifes_img.image = player_health_icons.frames[player.lifes];
				enemies.splice(i, 1);
			}
		}
			
		viewport.centerAround(player);
		
		// Game over
		if(player.lifes <= 0) {
			game_over_fade.alpha += 0.01;
			if(game_over_fade.alpha >= 1) {
				jaws.switchGameState(GameOver);
			}
		}
		
		if(jaws.pressed("f1")) { jaws.switchGameState(WinScreen); }
		if(jaws.pressed("f2")) { jaws.switchGameState(GameOver); }
		if(jaws.pressed("f3")) { jaws.switchGameState(MenuState); }
		if(jaws.pressed("pagedown")) { player.wood += 10; }
		if(jaws.pressed("pageup")) { player.stone += 10; }
		
		// New wave ??
		if(enemies.length == 0) {
			wave++;
			if(wave == 6) {
				jaws.switchGameState(WinScreen);
			}
			gui_waves.text = "Wave: " + wave + "/5";
			newWave(wave);
		}
	}
	
	this.draw = function() {
		jaws.fill(0x000000);
		viewport.x -= 32;
		viewport.y -= 32;
		viewport.apply(function() {
			for(var i = 0; i < background_layer.length; i++) {
				background_layer[i].draw();
			}
			
			if(player.buildMode && buildSelectedTile != -1) {
				var color = "#ffffff";

				StrokeTile(background_layer[buildSelectedTile].x - background_layer[buildSelectedTile].width * .5, background_layer[buildSelectedTile].y - background_layer[buildSelectedTile].height * .5,  background_layer[buildSelectedTile].width, background_layer[buildSelectedTile].height, color);
			}
			
			for(var i = 0; i < object_layer.length; i++) {
				if(object_layer[i] != undefined) {
					object_layer[i].draw();
				}
				if(object_layer[i].radius != undefined) {
					jaws.context.beginPath();
					jaws.context.arc(object_layer[i].x, object_layer[i].y, object_layer[i].radius, 0, 2 * Math.PI, false);
					jaws.context.fillStyle = 'rgba(255,255,255,0.1)';
					jaws.context.fill();
				}
			}
			
			for(var i = 0; i < arrows.length; i++) {
				arrows[i].draw();
			}
			
			for(var i in hammers) {
				hammers[i].draw();
			}
			
			player.draw();
			
			for(var i = 0; i < particles.length; i++) {
				particles[i].draw();
				//particles[i].alpha = particles[i].alphaDecrease;
				particles[i].width  -= particles[i].sizeDecrease;
				particles[i].height -= particles[i].sizeDecrease;
				if(particles[i].alpha <= 0 || particles[i].width < 1) {
					particles.splice(i, 1);
				}
			}
			
			for(var i = 0; i < floatTexts.length; i++) {
				floatTexts[i].draw();
			}
			
			for(var i in enemies) {
				enemies[i].draw();
				/*for(var k in enemies[i].path){
					  jaws.context.beginPath();
					  jaws.context.arc(enemies[i].path[k][0]*64, enemies[i].path[k][1] * 64, 16, 0, 2 * Math.PI, false);
					  jaws.context.fillStyle = 'green';
					  jaws.context.fill();
					  jaws.context.lineWidth = 5;
					  jaws.context.strokeStyle = '#003300';
					  jaws.context.stroke();
				}*/	
			}
        });
		viewport.x += 64;
		viewport.y += 64;
		gui_panel.draw();
		gui_wood.draw();
		gui_stone.draw();
		gui_gold.draw();
		gui_wood_img.draw();
		gui_stone_img.draw();
		gui_gold_img.draw();
		gui_lifes.draw();
		gui_lifes_img.draw();
		gui_waves.draw();
		game_over_fade.draw();
		
		if(debug) {
			debug_hammers.draw();
			debug_arrows.draw();
			debug_enemies.draw();
		}
	}
}

function GameOver() {
	function restart() {
		jaws.switchGameState(Game);
		Game.setup();
	}
	var game_over_img;
	var game_over_fade;
	var restart_btn;
	this.setup = function() {	
		sounds["bg"].stop();
		sounds["loose"].play();
		restart_btn    = new jaws.Text({text: "RESTART", color: "#FFF", fontFace: "Consolas", fontSize: 30});
		restart_btn.x  = jaws.width / 2;
		restart_btn.y  = jaws.height / 2;
		restart_btn.x  -= 340;
		restart_btn.y  -= 240;
		game_over_img  = new jaws.Sprite({image: "images/game_over.png", x: 0, y: 0, anchor: "center"});
		game_over_fade = new jaws.Sprite({x: 0, y: 0, width: jaws.width, height: jaws.height, color:"#FFFFFF", alpha: 1});
		game_over_img.x = jaws.width / 2;
		game_over_img.y = jaws.height / 2;
	}
	
	this.update = function() {
		game_over_fade.alpha -= 0.04;
		if(game_over_fade.alpha <= 0)
			game_over_fade.alpha = 0;
			
				
		if(jaws.pressed("enter") || jaws.pressed("space") || jaws.pressed("escape")) {
			restart();
		}
	}
	
	this.draw = function() {
		jaws.clear();
		game_over_img.draw();
		game_over_fade.draw();
	}
}

function WinScreen() {
	function restart() {
		jaws.switchGameState(Game);
		Game.setup();
	}
	var game_over_img;
	var game_over_fade;
	var restart_btn;
	this.setup = function() {
		sounds["bg"].stop();
		sounds["win"].play();
		restart_btn    = new jaws.Text({text: "RESTART", color: "#FFF", fontFace: "Consolas", fontSize: 30});
		restart_btn.x  = jaws.width / 2;
		restart_btn.y  = jaws.height / 2;
		restart_btn.x  -= 340;
		restart_btn.y  -= 240;
		game_over_img  = new jaws.Sprite({image: "images/win_screen.png", x: 0, y: 0, anchor: "center"});
		game_over_fade = new jaws.Sprite({x: 0, y: 0, width: jaws.width, height: jaws.height, color:"#FFFFFF", alpha: 1});
		game_over_img.x = jaws.width / 2;
		game_over_img.y = jaws.height / 2;
	}
	
	this.update = function() {
		game_over_fade.alpha -= 0.04;
		if(game_over_fade.alpha <= 0)
			game_over_fade.alpha = 0;
		
		if(jaws.pressed("enter") || jaws.pressed("space") || jaws.pressed("escape")) {
			restart();
		}
	}
	
	this.draw = function() {
		jaws.clear();
		game_over_img.draw();
		game_over_fade.draw();
	}
}

function MenuState() {
	var game_over_img;
	var game_over_fade;

	var btn_start;
	var btn_faq;
	var dim_start;
	var dim_faq;
	var current;
	var selectTimer;
	
	this.setup = function() {
		game_over_img = new jaws.Sprite({image: "images/melvind_menus.png", x: 0, y: 0, anchor: "center"});
		game_over_fade = new jaws.Sprite({x: 0, y: 0, width: jaws.width, height: jaws.height, color:"#FFFFFF", alpha: 1});
				
		btn_start = new jaws.Text({x: 0, y: 0, text: "START", color:"white", fontFace: "Consolas", fontSize: 40, textAlign: "center"});
		btn_faq = new jaws.Text({x: 0, y: 0, text: "HOW TO PLAY", color:"white", fontFace: "Consolas", fontSize: 40, textAlign: "center"});
		
		btn_start.x = jaws.width / 2;
		btn_start.y = jaws.height / 2 - 40;
		btn_faq.x = jaws.width / 2;
		btn_faq.y = jaws.height / 2 + 20;
		
		game_over_img.x = jaws.width / 2;
		game_over_img.y = jaws.height / 2;
		
		dim_start = btn_start.rect();
		dim_faq = btn_start.rect();
		
		current = 1;
		selectTimer = 0;
		
		jaws.resetPressedKeys();
	}
	
	this.update = function() {
		if(current == 1) 
			btn_start.style = "bold";
		else 
			btn_start.style = "";
		if(current == 2) btn_faq.style   = "bold"; else btn_faq.style   = "";
		
		game_over_fade.alpha -= 0.04;
		if(game_over_fade.alpha <= 0)
			game_over_fade.alpha = 0;
		
		if(jaws.pressed("down") && (new Date()).getTime() - selectTimer > 200) {
			selectTimer = (new Date()).getTime();
			sounds["select"].play();
			if(current == 2) current = 1; else current++;
		}
		if(jaws.pressed("up") && (new Date).getTime() - selectTimer > 200) {
			selectTimer = (new Date()).getTime();
			sounds["select"].play();
			if(current == 1) current = 2; else current--;
		}
		
		if(jaws.pressed("enter") || jaws.pressed("space")) {
			if(current == 1) { jaws.switchGameState(Game); }
			if(current == 2) { jaws.switchGameState(HowToPlayState); }
		}
	}
	
	this.draw = function() {
		jaws.clear();
		game_over_img.draw();
		game_over_fade.draw();
		btn_start.draw();
		btn_faq.draw();
	}
}

function HowToPlayState() {
	var how_to_play_img;
	this.setup = function() {
		how_to_play_img = new jaws.Sprite({image: "images/how_to_play.png", x: 0, y: 0, anchor: "center"});
		how_to_play_img.x = jaws.width / 2;
		how_to_play_img.y = jaws.height / 2;
		jaws.resetPressedKeys();
	}
	
	this.update = function() {
		if(jaws.pressedWithoutRepeat("enter") || jaws.pressedWithoutRepeat("space") || jaws.pressedWithoutRepeat("escape")) {
			jaws.switchGameState(MenuState);
		}
	}
	
	this.draw = function() {
		jaws.clear();
		how_to_play_img.draw();
	}
}
jaws.onload = function() {
	sounds = [];
	var width  = window.innerWidth;
	var height = window.innerHeight;
	
	sounds["wood_chop"]  = new Howl({ urls: ['sounds/wood_chop.wav'] });
	sounds["stone_pick"] = new Howl({ urls: ['sounds/stone_pick.wav'] });
	sounds["arrow_flesh"] = new Howl({ urls: ['sounds/arrow_flesh.wav'] });
	sounds["select"] = new Howl({ urls: ['sounds/select.wav'] });
	sounds["bg"] = new Howl({urls: ['sounds/bg.mp3'],autoplay: true, loop: true, volume: 0.2});
	sounds["win"] = new Howl({urls: ['sounds/win.mp3'],loop: true});
	sounds["loose"] = new Howl({urls: ['sounds/loose.mp3'],loop: true});
	
	jaws.assets.add([
		"images/sprites/player.png",
		"images/tiles/tree.png",
		"images/tiles/stone.png",
		"images/attack_tower.png",
		"images/sprite_arrow.png",
		"images/healthbar.png",
		"images/troll.png",
		"images/panel.png",
		"images/logs.png",
		"images/stone.png",
		"images/melvind_menus.png",
		"images/game_over.png",
		"images/ale.png",
		"images/how_to_play.png",
		"images/gold.png",
		"images/win_screen.png",
		"images/caveshadow.png",
		"images/water.png",
		"images/stonehammer.png",
		"images/dirtRL.png",        // 4
		"images/dirtTB.png",        // 5
		"images/dirtbottomleftcorner.png",    // 6
		"images/dirtbottomrightcorner.png",    // 7
		"images/dirttopleftcorner.png",    // 9
		"images/dirttoprightcorner.png",    // 8
		"images/grounded_arrow.png",
		"images/tiles/grass.png",
		"images/dirt.png"
	]);
	jaws.start(MenuState, {width: width, height: height});
}
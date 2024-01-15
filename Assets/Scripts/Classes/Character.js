/*
the objective is to get these stats to affect the 3d game, and to have these stats customisable within the game

*/

class Character
{
	public var id : String;
	public var race : int;
	public var alignment : int;
	public var classes : Array = new Array();
	public var experience : int;
	public var abilityScores : Array = new Array();
	public var abilityPoints : int;
	public var skills : Array = new Array();
	public var skillPoints : int;
	public var feats : Array = new Array();
	public var featPoints : int;
	public var specializations : Array = new Array();
	public var gold : float;
	public var weightCarried : float;
	public var weapons : Array = new Array();

	public function Character()
	{
		this.id = "unamed";
		this.race = -1;
		this.alignment = -1;
		this.experience = 0;
		this.abilityScores = new Array( 9, 9, 9, 9, 9, 9 );
		this.abilityPoints = 24;
		this.skillPoints = 0;
		this.featPoints = 0;
		this.gold = 0;
		this.classes[0] = new Array( -1, 1 );
	}
}
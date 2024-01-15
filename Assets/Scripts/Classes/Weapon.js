class Weapon
{
	public var id : String;
	public var cost : float;
	public var weight : float;
	public var weapSize : int;
	public var range : int;
	public var reach : int;
	public var weapType : int;// 0 = melee, 1 = thrown, 2 = melee and thrown, 3 = projectile, 4 = unarmed

	public var attacks:Array;
	public var profTypes:Array;

	public function Weapon
	(
	wName : String,
	wCost : float,
	wWeight : float,
	wSize : int,
	wRange : int,
	wReach : int,
	wType : int,
	wAttacks : Array,
	wProfs : Array
	)
	{
		this.id = wName;
		this.cost = wCost;
		this.weight = wWeight;
		this.weapSize = wSize;
		this.range = wRange;
		this.reach = wReach;
		this.weapType = wType;

		this.attacks = wAttacks;
		this.profTypes = wProfs;
	}
}
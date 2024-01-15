class Race
{
	public var id:String;
	public var abilityMods:Array;
	public var raceSize:int;
	public var speed:int;
	public var vision:Array;
	public var favoredClass:int;
	public var automaticLanguages:Array;
	public var bonusLanguages:Array;
	
	public function Race
	(
	rName:String,
	rAbilityMods:Array,/* an array of six ints representing the modifier the race gets towards each of the six abilities */
	rSize:int, /* an int range 0 - 8 representing the size of the race */
	rSpeed:int, /* an int range usually 20 or 30 representing the base speed of the race in feet per round */
	rVision:Array, /* an array of three bools representing whether the race possesses normal vision, low-light vision and/or darkvision */
	rFavoredClass:int,
	rAutoLanguages:Array,
	rBonusLanguages:Array
	)
	{
		this.id = rName;
		this.abilityMods = rAbilityMods;
		this.raceSize = rSize;
		this.speed = rSpeed;
		this.vision = rVision;
		this.favoredClass = rFavoredClass;
		this.automaticLanguages = rAutoLanguages;
		this.bonusLanguages = rBonusLanguages;
	}
}
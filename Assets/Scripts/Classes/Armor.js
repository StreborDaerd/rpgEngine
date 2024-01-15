class Armor
{	
	public var id : String;
	public var cost:float;
	public var weight:float;
	public var bonus : int;
	public var maxDex : int;
	public var checkPen : int;
	public var spellFail : int;
	public var speed30 : int;
	public var speed20 : int;
	public var profType : int;
	
	public function Armor
	(
	aName : String, /* a string representing a unique descriptive identifier */
	aCost : float, /* a float > 0 representing the base cost of the object in gold pieces */
	aWeight : float, /* a float representing the weight of the object in pounds */
	aBonus : int, /* an int > 0 representing the bonus to the base armor class 10 that a character receives when this armor is worn */
	aMaxDex : int, /* an int >= 0 representing the maximum dexterity bonus a character can have when this armmor is worn */
	aCheckPen : int, /* an int <= 0 representing a penalty that many skill checks incur when this armor is worn */
	aSpellFail : int, /* an int >= 0 representing a percentage chance that an arcane spell will fail when cast while this armor is worn */
	aSpeed30 : int, /* speed for a character with base move 30 feet per round */
	aSpeed20 : int, /* speed for a character with base move 20 feet per round */
	aProfType : int /* an int 0 - 2 representing light, medium, or heavy armor proficiency type required to use this armor */
	)
	{
		this.id  = aName;
		this.cost = aCost;
		this.weight = aWeight;
		this.bonus = aBonus;
		this.maxDex = aMaxDex;
		this.checkPen = aCheckPen;
		this.spellFail = aSpellFail;
		this.speed30 = aSpeed30;
		this.speed20 = aSpeed20;
		this.profType = aProfType;
	}
}
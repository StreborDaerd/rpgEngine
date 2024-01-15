class CharacterClass
{
	public var id:String;
	public var alignments:Array = new Array();
	public var hitDie:int;
	public var spellCaster:int;
	public var classSkills:Array = new Array();
	public var skillPoints:int;
	public var initialFeats:Array = new Array();
	public var baseAttBon:int;
	public var savingThrows:Array = new Array();
	public var classType:int;

	public function CharacterClass
	(
	cName:String, /* a string representing a unique descriptive identifier */
	cAlign:Array, /* an array of nine booleans representing whether this class can be LG, NG, CG, LN, N, CN, LE, NE, CE */
	cHitDie:int, /* an int representing the die rolled and added to a character's hit points when the character goes up a level */
	cSpellCaster:int, /* an int 0 - 2 representing whether the class can't cast spells, casts divine spells, or casts arcane spells */
	cSkills:Array, /* an array of ints representing references to skills the class gets, see skills.js */
	cSkillPoints:int, /* an int 2,4,6, or 8 representing the base number of skill points per level the class gets*/
	cInitFeats:Array, /* an array of ints representing references to feats the class gets, see feats.js */
	cBaseAttBon:int, /* an int, range 0 - 2, representing whether the class uses fighter, cleric or wizard attack bonuses */
	cSaves:Array, /* an array of three booleans representing whether this class uses the high saving throws for each of the three types of saving throws */
	cType:int /* an int, range 0 - 2, representing whether this class is standard, prestige or non-player class type */
	)
	{
		this.id = cName;
		this.alignments = cAlign;
		this.hitDie = cHitDie;
		this.spellCaster = cSpellCaster;
		this.classSkills = cSkills;
		this.skillPoints = cSkillPoints;
		this.initialFeats = cInitFeats;
		this.baseAttBon = cBaseAttBon;
		this.savingThrows = cSaves;
		this.classType = cType;
	}
}
class Shield
{	
	public var id : String;
	public var cost:float;
	public var weight:float;
	public var bonus : int;
	public var maxDex : int;
	public var checkPen : int;
	public var spellFail : int;
	public var profType : int;
	
	public function Shield
	(
	sName : String, /* a string representing a unique descriptive identifier */
	sCost : float, /* a float > 0 representing the base cost of the object in gold pieces */
	sWeight : float, /* a float representing the weight of the object in pounds */
	sBonus : int, /* an int > 0 representing the bonus to the base armor class 10 that a character receives when this armor is worn */
	sMaxDex : int, /* an int >= 0 representing the maximum dexterity bonus a character can have when this armmor is worn */
	sCheckPen : int, /* an int <= 0 representing a penalty that many skill checks incur when this armor is worn */
	sSpellFail : int, /* an int >= 0 representing a percentage chance that an arcane spell will fail when cast while this armor is worn */
	sProfType : int /* an int 0 - 2 representing light, medium, or heavy armor proficiency type required to use this armor */
	)
	{
		this.id  = sName;
		this.cost = sCost;
		this.weight = sWeight;
		this.bonus = sBonus;
		this.maxDex = sMaxDex;
		this.checkPen = sCheckPen;
		this.spellFail = sSpellFail;
		this.profType = sProfType;
	}
}
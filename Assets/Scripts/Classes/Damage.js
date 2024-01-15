class Damage
{
	public var diceAmount : int;
	public var damDice : int;
	public var damMod : int;
	public var subdual : boolean;
	public var blunt : boolean;
	public var pierce : boolean;
	public var slash : boolean;
	public var damOther : int;

	function Damage
	(
	 dDiceAmt : int,
	 dDice : int,
	 dMod : int,
	 dSubdual : boolean,
	 dBlunt : boolean,
	 dPierce : boolean,
	 dSlash : boolean,
	 dOther : int
	 )
	{
		this.diceAmount = dDiceAmt;
		this.damDice = dDice;
		this.damMod = dMod;
		this.subdual = dSubdual;
		this.blunt = dBlunt;
		this.pierce =dPierce;
		this.slash = dSlash;
		this.damOther = dOther;
	}
}
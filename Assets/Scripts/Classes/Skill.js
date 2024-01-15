class Skill
{
	public var id:String;
	public var untr:boolean;
	public var keyAb:int;
	public var armCPen:boolean;

	public function Skill
	(
	sName:String,
	sUntr:boolean,
	sKeyAb:int,
	sArmCPen:boolean
	)
	{
		this.id = sName;
		this.untr = sUntr;
		this.keyAb = sKeyAb;
		this.armCPen = sArmCPen;
	}
}
class Feat
{
	public var id:String;
	public var featType:int;
	var prereqs:Array = new Array();
	
	public function Feat
	(
	fName:String,
	fType:int, // an int 0 - 3, representing the type of feat - general, item creation, metamagic, or special
	fPrereqs:Array
	)
	{
		this.id = fName;
		this.featType = fType;
		this.prereqs = fPrereqs;
	}
}
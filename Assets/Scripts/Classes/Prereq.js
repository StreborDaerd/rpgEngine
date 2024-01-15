class Prereq
	{
		public var prqType:int;
		public var prqSubtype:int;
		public var prqMin:int;
		
		public function Prereq
		(
		prType:int, // an int 0 - 6 representing the type of prerequisite - minimum ability score, other feat, skill, minimum base attack, class level, spellcaster level, or special
		prSubtype:int, // an int representing the index of the actual ability, feat, etc within the prereqisite type array, set to 0 or whatever if no subtype
		prMin:int // an int representing the requsite ability, etc needs to equal or exceed to meet the requirements to gain this feat, feats that require other feats don't need this value
		)
		{
			this.prqType = prType;
			this.prqSubtype = prSubtype;
			this.prqMin = prMin;
		}
	}
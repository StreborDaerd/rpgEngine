class Attack
	{
		public var attackBonus:int;
		public var damages:Array;
		public var critMulti:int;
		public var critRange:int;

		function Attack
		(
		wpAttackBonus:int,
		wpDamages:Array,
		wpCritMulti:int,
		wpCritRange:int
		)
		{
			this.attackBonus = wpAttackBonus;
			this.damages = wpDamages;
			this.critMulti = wpCritMulti;
			this.critRange = wpCritRange;
		}
	}
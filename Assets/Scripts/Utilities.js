static function ParseBool( str : String ) : boolean
{
	if( str == "true" ){ return true; }
	
	return false;
}

static function ParseStringToArray( str : String, returnInt : boolean ) : Array
{
	var separator:char = char.Parse( "," );
	
	var splitString = str.Split( separator );
	var i = splitString.length;
	var parsed = new Array();
	
	if( returnInt )
	{
		while( i-- )
			parsed[i] = int.Parse( splitString[i] );
		
		return parsed;
	}
	else
	{
		while( i-- )
		{
			if( splitString[i] == "1" ){ parsed[i] = true; }
			else{ parsed[i] = false; }
		}
		return parsed;
	}
}
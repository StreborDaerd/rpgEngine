private var attributes : Array = new Array();

var aTstyle1 : GUIStyle;
var aTstyle2 : GUIStyle;

function Start()
{
	attributes[0] = new Attribute( "Hit points", "HP", "HIT POINTS" );
	attributes[1] = new Attribute( "Base attack bonus", "BAB", "ATTACK BONUS" );
	attributes[2] = new Attribute( "Armor class", "AC", "ARMOR CLASS" );
	/*attributes[2] = new Attribute( "Touch", "TOUCH", "ARMOR CLASS" );
	attributes[3] = new Attribute( "Flat-footed", "FLAT-FOOTED", "ARMOR CLASS" );
	attributes[4] = new Attribute( "Speed", "SPEED", "PER ROUND" );
	attributes[5] = new Attribute( "Initiative", "INITIATIVE", "MODIFIER" );
	attributes[6] = new Attribute( "Base attack bonus", "BASE ATTACK", "BONUS" );
	attributes[7] = new Attribute( "Grapple", "GRAPPLE", "MODIFIER" );
	attributes[8] = new Attribute( "Spell resistance", "SPELL", "RESISTANCE" );*/
	
	aTstyle1 = GetComponent( Abilities ).abilitiesStyle3;
	aTstyle2 = GetComponent( Abilities ).abilitiesStyle4;
}

function OnGUI()
{
	
}

function DisplayMainAttributes( ch : int ) : void
{
	var rowWidth : int = 100;
	var lineHeight : int = 30;//46;
	var sPX : int = 0;//10;
	var sPY : int = 0;//400;
	var i : int = attributes.length;
	while( i -- )
	{
		var abX : int = rowWidth * i + sPX;
		var rect : Rect = Rect ( abX, sPY, rowWidth, lineHeight );

		GUI.Label( rect, attributes[i].subtitle, aTstyle1 );
		
		rect.y += 12;
		
		GUI.Label( rect, CalcMainAttribute( ch, i ), aTstyle2 );
		
		/*var maTitle_fmt:TextFormat = new TextFormat();
		maTitle_fmt.size = 12;
		maTitle_fmt.font = "Franklin Gothic Medium";
		maTitle_fmt.align = "center";

		var maSub:TextField = new TextField();
		maSub.name = "maSub_" + i;
		maSub.x = abX;
		maSub.y = sPY + 24;
		maSub.width = rowWidth;
		maSub.height = lineHeight;
		maSub.selectable = false;
		maSub.text = attributes[i].subtitle;
		maSub.setTextFormat( maTitle_fmt );
		targetStage.addChild( maSub );
		
		var maVal:TextField = new TextField();
		maVal.name = "maVal_" + i;
		maVal.x = abX;
		maVal.y = sPY + 36;
		maVal.width = rowWidth;
		maVal.height = lineHeight;
		maVal.selectable = false;
		maVal.text = calcMainAttribute( i );
		maTitle_fmt.size = 24;
		maVal.setTextFormat( maTitle_fmt );
		targetStage.addChild( maVal );*/
	}
}

private function CalcMainAttribute( ch : int, att : int ) : String
{
	var maVal : String = "0";
	switch( att )
	{
		case 0:
		maVal = "HP:" + CalcStartHP( ch );
		break;
		case 1:
		maVal = "AB:" + GetComponent( Abilities ).ModSign( CalcStartBAB( ch ) );
		break;
		case 2:
		maVal = "AC:" + CalcStartAC( ch );
		break;
	}
	return  maVal;
}

function CalcStartHP( currentCharacter : int ) : int
{
	//var currentCharacter : int = GetComponent( Characters ).currentCharacter;
	var cClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	if( cClass >= 0 )
	{
		var sHP : int = GetComponent( CharacterClasses ).characterClasses[ cClass ].hitDie;
		sHP += GetComponent( Abilities ).AbilityModifier( GetComponent( Characters ).characters[ currentCharacter ].abilityScores[2] );
		/*if( Main.ftManager.hasFeat( 70 ) >= 0 )
		{
			var toughFts : Array = Main.ftManager.hasFeats( currentCharacter, 70 );
			var toughHP : int = 3 * toughFts.length;
			sHP += toughHP;
		}*/
		return sHP;
	}
	else
	{
		return 0;
	}
}

function CalcStartBAB( currentCharacter : int ) : int
{
	//var currentCharacter : int = GetComponent( Characters ).character;
	var cClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	if( cClass >= 0 )
	{
		if( GetComponent( CharacterClasses ).characterClasses[ cClass ].baseAttBon == 0 )
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	else
	{
		return 0;
	}
}

function CalcStartAC( currentCharacter : int  ) : int
{
	//var currentCharacter : int = GetComponent( Characters ).currentCharacter;
	return 10 + GetComponent( Abilities ).AbilityModifier( GetComponent( Characters ).characters[ currentCharacter ].abilityScores[1] );
}

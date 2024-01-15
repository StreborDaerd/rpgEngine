var abilitiesTitles = new Array( "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma" );
var abilitiesAbbr = new Array( "STR", "DEX", "CON", "INT", "WIS", "CHA" );
var abilityScores = new Array( 9, 9, 9, 9, 9, 9 );

var abilityPoints : int = 24;

//private var abilitiesMenuX : int = 25;
//private var abilitiesMenuY : int = 150;
private var abilitiesMenuX : int = 0;
private var abilitiesMenuY : int = 0;
private var abilitiesMenuW : int = 30;
private var abilitiesMenuH : int = 25;

var abilitiesStyle1 : GUIStyle;
var abilitiesStyle2 : GUIStyle;
var abilitiesStyle3 : GUIStyle;
var abilitiesStyle4 : GUIStyle;

var abButtonPlusMinusStyle : GUIStyle;

function Start()
{
	var currentCharacter : int = GetComponent( Characters ).character;
	abilityScores = GetComponent( Characters ).characters[ currentCharacter ].abilityScores;
	
	abilitiesStyle1 = GetComponent( GUIStuff ).style1;
	abilitiesStyle2 = GetComponent( GUIStuff ).style2;
	//abilitiesStyle3 = GetComponent( GUIStuff ).style4;
	//abilitiesStyle4 = GetComponent( GUIStuff ).style5;
	
	abButtonPlusMinusStyle = GetComponent( GUIStuff ).buttonPlusMinusStyle;
}

function OnGUI()
{
	//DisplayAbilities();
}

function DisplayAbilitiesKey() : void
{
	var ch : int = GetComponent( Characters ).character;
	abilityPoints = GetComponent( Characters ).characters[ ch ].abilityPoints;
	/*var abilityPointsRect1 : Rect = Rect( 0, 0, 60, abilitiesMenuH );
	GUI.Label( abilityPointsRect1, "ABILITY NAME", abilitiesStyle1 );
	abilityPointsRect1.x += 40;
	GUI.Label( abilityPointsRect1, "ABILITY SCORE", abilitiesStyle1 );
	abilityPointsRect1.x += 40;
	GUI.Label( abilityPointsRect1, "ABILITY MOD.", abilitiesStyle1 );*/
	var abilityRect : Rect = Rect( 50, 0, 180, abilitiesMenuH * 2 );
	GUI.Label( abilityRect, "ABILITIES", abilitiesStyle2 );
	
	var abilityPointsRect : Rect = Rect( 180, 0, 60, abilitiesMenuH );
	GUI.Label( abilityPointsRect, "ABILITY POINTS", abilitiesStyle1 );
	abilityPointsRect.x += 40;
	GUI.Label( abilityPointsRect, ":" + abilityPoints, abilitiesStyle2 );
}

function DisplayAbilities( ch : int ) : void
{
	abilityScores = GetComponent( Characters ).characters[ ch ].abilityScores;
	var race : int = GetComponent( Characters ).characters[ ch ].race;
	//print( race );
	//
	//GetComponent( Races ).AddRaceAbMods( race, ch );
	var i = abilitiesAbbr.length;
	while( i-- )
	{
		AbilityGUI( i, ch );
	}
}

function AbilityGUI( abil : int, currentCharacter : int ) : void
{
	//var currentCharacter : int = GetComponent( Characters ).character;
	//UpdateSkillPoints( currentCharacter );
	var abilityRect : Rect = Rect( abilitiesMenuX + 10, abilitiesMenuY + ( ( abilitiesMenuH + 5 ) * abil ), abilitiesMenuW + 20, abilitiesMenuH );
	GUI.Label( abilityRect, abilitiesAbbr[ abil ], abilitiesStyle4 );
	
	abilityRect.x += 60;
	abilityRect.width = abilitiesMenuW;
	var abilityScore : int = abilityScores[ abil ];
	var abilityScoreStr : String = abilityScore.ToString();
	GUI.Label( abilityRect, abilityScoreStr, abilitiesStyle4 );
	
	abilityRect.x += 30;
	var abilityScoreMod : String = ModSign( AbilityModifier( abilityScores[ abil ] ) );
	GUI.Label( abilityRect, abilityScoreMod, abilitiesStyle4 );
	
	abilityRect.x += 40;
	abilityRect.width = 20;
	abilityRect.height = 20;
	if( GUI.Button( abilityRect, "+", abButtonPlusMinusStyle ) )
	{
		AddAbilityPoint( abil, currentCharacter );
		GetComponent( Skills ).UpdateSkillPoints( currentCharacter );
	}
	
	abilityRect.x += 30;
	if( GUI.Button( abilityRect, "-", abButtonPlusMinusStyle ) )
	{
		SubAbilityPoint( abil, currentCharacter );
		GetComponent( Skills ).UpdateSkillPoints( currentCharacter );
	}
	abilityRect = Rect( abilitiesMenuX, 18 + abilitiesMenuY + ( ( abilitiesMenuH + 5 ) * abil ), abilitiesMenuW + 40, abilitiesMenuH );
	GUI.Label( abilityRect, abilitiesTitles[ abil ], abilitiesStyle3 );
}

function AbilityModifier( aScore : int ) : int
{
	var aMod : int = Mathf.Floor( aScore / 2 ) - 5;
	return aMod;
}

function ModSign( modifier : int ) : String
{
	var modAdj : String = "+0";
	if( modifier >= 0 )
	{
		modAdj = "+" + modifier;
	}
	else
	{
		modAdj = "-" + Mathf.Abs( modifier );
	}
	return modAdj;
}

private function AddAbilityPoint( ability : int, ch : int ) : void
{
	var sAScores : Array = abilityScores;
	var sAScoresRaceMods : Array = new Array( 0, 0, 0, 0, 0, 0 );
	var race : int = GetComponent( Races ).race;
	if( race >= 0 )
	{
		sAScoresRaceMods = GetComponent( Races ).races[ race ].abilityMods;
	}
	var okToAdd : boolean = true;
	var aScore : int = sAScores[ ability ];
	var max : int = 18 + sAScoresRaceMods[ ability ];
	
	var pointCost : int = 1;
	if( aScore > 14 + sAScoresRaceMods[ ability ] ){ pointCost = 2; }

	abilityPoints = GetComponent( Characters ).characters[ ch ].abilityPoints;
	if( abilityPoints < pointCost ){ okToAdd = false; }
	if( aScore >= max ){ okToAdd = false; }

	if( okToAdd )
	{
		aScore ++;
		sAScores[ ability ] = aScore;
		abilityPoints -= pointCost;
		GetComponent( Characters ).characters[ ch ].abilityPoints = abilityPoints;
	}
}

private function SubAbilityPoint( ability : int, ch : int ) : void
{
	var sAScores : Array = abilityScores;
	var sAScoresRaceMods : Array = new Array( 0, 0, 0, 0, 0, 0 );
	var race : int = GetComponent( Races ).race;
	if( race >= 0 )
	{
		sAScoresRaceMods = GetComponent( Races ).races[ race ].abilityMods;
	}
	var aScore : int = sAScores[ ability ];
	var min : int = 3;
	var pointCost : int = 1;
	if( aScore > 15 + sAScoresRaceMods[ ability ] ){ pointCost = 2; }

	if( aScore > min )
	{
		aScore --;
		sAScores[ ability ] = aScore;
		abilityPoints = GetComponent( Characters ).characters[ ch ].abilityPoints;
		abilityPoints += pointCost;
		GetComponent( Characters ).characters[ ch ].abilityPoints = abilityPoints;
	}
}
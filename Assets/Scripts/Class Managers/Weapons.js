import System.IO;
import System.Xml;

var weapons = new Array();
var weaponsNames : String[];//unity gui needs to use the built-in array to display a selection grid
var weapon : int = 0;

private var weaponsMenuX : int = 0;
private var weaponsMenuY : int = 0;
private var weaponsMenuW : int = 250;
private var weaponsMenuH : int = 20;

var weaponsDisplayed = true;
var weaponsRowsMax : int = 12;
var weaponsColumns : int = 3;


var weaponsStyle1 : GUIStyle;
var weaponsStyle2 : GUIStyle;
var weaponsStyle3 : GUIStyle;

function Start()
{
	//var weaponsXmlFile = new WWW("file://" + Application.persistentDataPath + "/weapons.xml");
	var weaponsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/weapons.xml");
	yield weaponsXmlFile;
	InitWeapons( weaponsXmlFile.text );
	
	
	
	weaponsStyle1 = GetComponent( GUIStuff ).style1;
	weaponsStyle2 = GetComponent( GUIStuff ).style2;
	weaponsStyle3 = GetComponent( GUIStuff ).style3;

}

function OnGUI()
{
	/*if( GUI.Button ( Rect ( 120, 0, 120, 20 ), "Weapons" ) )
	{
		if( weaponsDisplayed )
		{
			weaponsDisplayed = false;
		}
		else
		{
			weaponsDisplayed = true;
		}
	}
	
	if( weaponsDisplayed )
	{
		weapon = GUI.SelectionGrid( Rect ( 120, 25, 120, weaponsNames.Length * 25 ), weapon, weaponsNames, 1 );
		
		if ( GUI.changed )
		{
			print( weaponsNames[ weapon ] + " was clicked." );
		}
	}*/
}

function DisplayWeaponsKey() : void
{
	var pointsRect : Rect = Rect( 0, 5, 60, weaponsMenuH );
	GUI.Label( pointsRect, "GOLD PIECES", weaponsStyle1 );
	pointsRect.x += 40;
	//GUI.Label( pointsRect, ":" + featPoints, featsStyle2 );
	
	pointsRect = Rect( 70, 0, weaponsMenuW / 2, weaponsMenuH );
	//skillPointsRect = Rect( 100, 20, skillsMenuW / 2, skillsMenuH );
	//pointsRect.x += 80;
	GUI.Label( pointsRect, "(A) = automatic", weaponsStyle1 );
	
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(B) = bonus", weaponsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 80;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(C) = chosen", weaponsStyle1 );
	pointsRect.x += 80;
	pointsRect.y -= 20;
	GUI.Label( pointsRect, "(P) = pass", weaponsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 240;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(F) = fail", weaponsStyle1 );
}

function DisplayWeapons() : void
{		
	var i : int = weaponsNames.length;
	//weaponsRowsMax = i;
	weaponsColumns = 1;// + Mathf.Ceil( i / weaponsRowsMax );
	//print( "weaponsColumns: " + weaponsColumns + "  weaponsRowsMax: " + weaponsRowsMax  + "  i: " + i );
	while( i -- )
	{
		WeaponGUI( i );
	}
}

function WeaponGUI( i : int ) : void
{
	
	//set up some more variables to help position the table of weapons
	//the .floor function offsets the weapons into columns and rows
	var rowsMax : int = weaponsRowsMax;
	var menuW : int = 260;
	var menuH : int = 20;
	var GUIX : int = 0;//Mathf.Floor( i / rowsMax ) * menuW;
	var GUIY : int = i * menuH;// - Mathf.Floor( i / rowsMax ) * rowsMax * menuH;
	
	var currentCharacter : int = GetComponent( Characters ).character;
	//var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	//display the attack bonus for this weapon with the current character
	var GUIRect : Rect = Rect( GUIX + 140, GUIY, 20, 20 );
	GUI.Label( GUIRect, GetComponent( Abilities ).ModSign( CalcWeaponAB( currentCharacter, i ) ) );
	
	//display the damage dice and damage bonus
	var damMod : int = CalcWeaponDB( currentCharacter, i );
	var damModStr : String = " ";
	if( damMod != 0 ){ damModStr = damModStr + GetComponent( Abilities ).ModSign( damMod ); }
	var wDam : String = weapons[ i ].attacks[0].damages[0].diceAmount + "d" + weapons[ i ].attacks[0].damages[0].damDice + damModStr;
	GUIRect = Rect( GUIRect.x + 20, GUIY, 40, 20 );
	GUI.Label( GUIRect, wDam );
	
	//display the critical hit damage multiplier
	var wCrit : String = "X" + weapons[ i ].attacks[0].critMulti;
	GUIRect = Rect( GUIRect.x + 40, GUIY, 20, 20 );
	GUI.Label( GUIRect, wCrit );
			
	//display the threat range
	var wThr : int = CalcThreat( currentCharacter, i );
	var wThrTxt : String = "20";
	if( wThr < 20 ){ wThrTxt = wThr + " -20"; }
	GUIRect = Rect( GUIRect.x + 20, GUIY, 40, 20 );
	GUI.Label( GUIRect, wThrTxt );
	
	//display the weapon's name
	GUIRect = Rect( GUIX, GUIY, menuW, menuH );
	GUI.Label( GUIRect, weaponsNames[ i ] );
}

public function CalcWeaponAB( ch : int, wpn : int ) : int//weapon attack bonus
{
	var strMod : int = GetComponent( Abilities ).AbilityModifier( GetComponent( Characters ).characters[ ch ].abilityScores[0] );
	var dexMod : int = GetComponent( Abilities ).AbilityModifier( GetComponent( Characters ).characters[ ch ].abilityScores[1] );
	//print( "Str: " + strMod + "     Dex: " + dexMod );
	var wAB : int = 0;
	if( ! GetComponent( Feats ).HasProficiency( ch, wpn ) ){ wAB = -4; }
	var wType : int = weapons[ wpn ].weapType;
	var finesse : int = GetComponent( Feats ).HasSpecFeat( ch, 74, wpn );
	//print( finesse );
	if( wType == 1 || wType == 3 || finesse >= 0 ){ wAB += dexMod; }
	else{ wAB += strMod; }
	wAB += weapons[ wpn ].attacks[0].attackBonus;
	//print( wAB );
	wAB += GetComponent( Attributes ).CalcStartBAB( ch );
	//weapon focus bonus
	if( GetComponent( Feats ).HasSpecFeat( ch, 75, wpn ) >= 0 ){ wAB ++; }
	return wAB;
}

public function CalcWeaponDB( ch : int, wpn : int ) : int//weapon damage bonus
{
	var wDB : int = 0;
	if( weapons[ wpn ].weapType != 3 ){ wDB += GetComponent( Abilities ).AbilityModifier( GetComponent( Characters ).characters[ ch ].abilityScores[0] ); }
	wDB += weapons[ wpn ].attacks[0].damages[0].damMod;
	//weapon specialization bonus
	if( GetComponent( Feats ).HasSpecFeat( ch, 76, wpn ) >= 0 ){ wDB += 2; }
	return wDB;
}

// returns a number -1 to 2, representing whether the
// weapon is too big to use, 2-handed, 1-handed, or light
// some extra coding needed for bastard weapons
public function CalcWeaponHand( ch : int, wpn : int ) : int
{
	var race : int = GetComponent( Characters ).characters[ ch ].race;
	var chSize : int = 0;
	if ( race >= 0 ) { chSize = GetComponent( Races ).races[ race ].raceSize; }
	else{ return -1; }
	var wpSize : int = weapons[ wpn ].weapSize;
	var sizeDif : int = chSize - wpSize;
	if( sizeDif > 0 ){ return 2; }
	if( sizeDif == 0 ){ return 1; }
	if( sizeDif == -1 ){ return 0; }
	return -1;
}

public function CalcThreat( ch : int, wpn : int ) : int
{
	var thr : int = weapons[ wpn ].attacks[0].critRange;
	if( GetComponent( Feats ).HasSpecFeat( ch, 31, wpn ) >= 0 )
	{
		return 21 - 2 * ( 21 - thr );
	}
	return thr;
}

function InitWeapons( weaponsXmlFileText : String ) : void
{
	var weaponsXml = new XmlDocument();
	var weaponsNamesArray = new Array();
	
	weaponsXml.LoadXml( weaponsXmlFileText );
	
	var weaponNode = weaponsXml.FirstChild.NextSibling.FirstChild;
	
	while( weaponNode )
	{
		var wName:String = weaponNode.ChildNodes[0].InnerText;
		var wCost:float = float.Parse( weaponNode.ChildNodes[1].InnerText );
		var wWeight:float = float.Parse( weaponNode.ChildNodes[2].InnerText );
		var wSize:int = int.Parse( weaponNode.ChildNodes[3].InnerText );
		var wRange:int = int.Parse( weaponNode.ChildNodes[4].InnerText );
		var wReach:int = int.Parse( weaponNode.ChildNodes[5].InnerText );
		var wType:int = int.Parse( weaponNode.ChildNodes[6].InnerText );
		
		var wAttacks:Array = new Array();
		var attackNode = weaponNode.ChildNodes[7].FirstChild;
		while( attackNode )
		{
			var wAttackBonus:int = int.Parse( attackNode.ChildNodes[0].InnerText );
			var wCritMulti:int = int.Parse( attackNode.ChildNodes[2].InnerText );
			var wCritRange:int = int.Parse( attackNode.ChildNodes[3].InnerText );
			
			var wDamages:Array = new Array();
			var damageNode = attackNode.ChildNodes[1].FirstChild;
			while( damageNode )
			{
				var wDiceAmt:int = int.Parse( damageNode.ChildNodes[0].InnerText );
				var wDamDice:int = int.Parse( damageNode.ChildNodes[1].InnerText );
				var wDamBon:int = int.Parse( damageNode.ChildNodes[2].InnerText );
				var wDamSub:boolean = Utilities.ParseBool( damageNode.ChildNodes[3].InnerText );
				var wDamBlunt:boolean =  Utilities.ParseBool( damageNode.ChildNodes[4].InnerText );
				var wDamPierce:boolean =  Utilities.ParseBool( damageNode.ChildNodes[5].InnerText );
				var wDamSlash:boolean =  Utilities.ParseBool( damageNode.ChildNodes[6].InnerText );
				var wDamOther:int = int.Parse( damageNode.ChildNodes[7].InnerText );
				
				var damage = new Damage( wDiceAmt, wDamDice, wDamBon, wDamSub, wDamBlunt, wDamPierce, wDamSlash, wDamOther );
				wDamages.push( damage );
				damageNode = damageNode.NextSibling;
			}

			var attack = new Attack( wAttackBonus, wDamages, wCritMulti, wCritRange );
			wAttacks.push( attack );
			attackNode = attackNode.NextSibling;
		}
		
		var wProfs:Array = Utilities.ParseStringToArray( weaponNode.ChildNodes[8].InnerText, true );
		
		var weapon = new Weapon( wName, wCost, wWeight, wSize, wRange, wReach, wType, wAttacks, wProfs );
		
		weapons.push( weapon );
		weaponsNamesArray.push( wName );
		
		weaponNode = weaponNode.NextSibling;
	}
	
	weaponsNames = weaponsNamesArray.ToBuiltin( String );
}

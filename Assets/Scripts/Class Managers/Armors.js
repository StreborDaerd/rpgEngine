import System.IO;
import System.Xml;

var armors = new Array();
var armorsNames : String[];//unity gui needs to use the built-in array to display a selection grid
var armor = 0;

private var armorsMenuX : int = 0;
private var armorsMenuY : int = 0;
private var armorsMenuW : int = 200;
private var armorsMenuH : int = 20;

var armorsDisplayed = true;
var armorsRowsMax : int = 12;
var armorsColumns : int = 3;

var armorsStyle1 : GUIStyle;
var armorsStyle2 : GUIStyle;
var armorsStyle3 : GUIStyle;

function Start()
{
	//var armorsXmlFile = new WWW("file://" + Application.persistentDataPath + "/armors.xml");
	var armorsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/armors.xml");
	Debug.Log("test " + Application.dataPath);
	yield armorsXmlFile;
	InitArmors( armorsXmlFile.text );
	
	armorsStyle1 = GetComponent( GUIStuff ).style1;
	armorsStyle2 = GetComponent( GUIStuff ).style2;
	armorsStyle3 = GetComponent( GUIStuff ).style3;
}

function OnGUI()
{
	/*if( GUI.Button ( Rect ( 120, 0, 120, 20 ), "Armors" ) )
	{
		if( armorsDisplayed )
		{
			armorsDisplayed = false;
		}
		else
		{
			armorsDisplayed = true;
		}
	}
	
	if( armorsDisplayed )
	{
		armor = GUI.SelectionGrid( Rect ( 120, 25, 120, armorsNames.Length * 25 ), armor, armorsNames, 1 );
		
		if ( GUI.changed )
		{
			print( armorsNames[ armor ] + " was clicked." );
		}
	}*/
	GUI.skin = GetComponent( GUIStuff ).chaGenSkin;
}

function InitArmors( armorsXmlFileText : String ) : void
{
	var armorsXml = new XmlDocument();
	var armorsNamesArray = new Array();
	
	armorsXml.LoadXml( armorsXmlFileText );
	
	var armorNode = armorsXml.FirstChild.NextSibling.FirstChild;
	
	while( armorNode )
	{
		var aName:String = armorNode.ChildNodes[0].InnerText;
		var aCost : float = float.Parse( armorNode.ChildNodes[1].InnerText );
		var aWeight : float = float.Parse( armorNode.ChildNodes[2].InnerText );
		var aBonus : int = int.Parse( armorNode.ChildNodes[3].InnerText );
		var aMaxDex : int = int.Parse( armorNode.ChildNodes[4].InnerText );
		var aCheckPen : int = int.Parse( armorNode.ChildNodes[5].InnerText );
		var aSpellFail : int = int.Parse( armorNode.ChildNodes[6].InnerText );
		var aSpeed30 : int = int.Parse( armorNode.ChildNodes[7].InnerText );
		var aSpeed20 : int = int.Parse( armorNode.ChildNodes[8].InnerText );
		var aProfType : int = int.Parse( armorNode.ChildNodes[9].InnerText );
		
		var armor = new Armor( aName, aCost, aWeight, aBonus, aMaxDex, aCheckPen, aSpellFail, aSpeed30, aSpeed20, aProfType );
		
		armors.push( armor );
		armorsNamesArray.push( aName );
		
		armorNode = armorNode.NextSibling;
	}
	
	armorsNames = armorsNamesArray.ToBuiltin( String );
}

function DisplayArmorsKey() : void
{
	var pointsRect : Rect = Rect( 0, 5, 60, armorsMenuH );
	GUI.Label( pointsRect, "GOLD PIECES", armorsStyle1 );
	pointsRect.x += 40;
	//GUI.Label( pointsRect, ":" + featPoints, featsStyle2 );
	
	pointsRect = Rect( 70, 0, armorsMenuW / 2, armorsMenuH );
	//skillPointsRect = Rect( 100, 20, skillsMenuW / 2, skillsMenuH );
	//pointsRect.x += 80;
	GUI.Label( pointsRect, "(A) = automatic", armorsStyle1 );
	
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(B) = bonus", armorsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 80;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(C) = chosen", armorsStyle1 );
	pointsRect.x += 80;
	pointsRect.y -= 20;
	GUI.Label( pointsRect, "(P) = pass", armorsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 240;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(F) = fail", armorsStyle1 );
}

function DisplayArmors() : void
{		
	var i : int = armorsNames.length;
	armorsColumns = 1 + Mathf.Ceil( i / armorsRowsMax );
	//print( armorsRowsMax );
	while( i -- )
	{
		ArmorGUI( i );
	}
}

function ArmorGUI( i : int ) : void
{
	
	//set up some more variables to help position the table of skills
	//the .floor function offsets the skills into columns and rows
	var rowsMax : int = armorsRowsMax;
	var menuW : int = armorsMenuW;
	var menuH : int = armorsMenuH;
	var GUIX : int = Mathf.Floor( i / rowsMax ) * menuW;
	var GUIY : int = i * menuH - Mathf.Floor( i / rowsMax ) * rowsMax * menuH;
	
	//var currentCharacter : int = GetComponent( Characters ).character;
	//var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	var GUIRect : Rect = Rect( GUIX, GUIY, 20, 20 );
	
	//display the stat name
	GUIRect = Rect( GUIX, GUIY, menuW, menuH );
	GUI.Label( GUIRect, armorsNames[ i ] );
}
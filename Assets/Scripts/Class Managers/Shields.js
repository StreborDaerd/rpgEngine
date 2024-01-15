import System.IO;
import System.Xml;

var shields = new Array();
var shieldsNames : String[];//unity gui needs to use the built-in array to display a selection grid
var shield = 0;

private var shieldsDisplayed = false;

function Start()
{
	//var shieldsXmlFile = new WWW("file://" + Application.persistentDataPath + "/shields.xml");
	var shieldsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/shields.xml");
	yield shieldsXmlFile;
	
	InitShields( shieldsXmlFile.text );
}

function OnGUI()
{
	if( GUI.Button ( Rect ( 120, 0, 120, 20 ), "Shields" ) )
	{
		if( shieldsDisplayed )
		{
			shieldsDisplayed = false;
		}
		else
		{
			shieldsDisplayed = true;
		}
	}
	
	if( shieldsDisplayed )
	{
		shield = GUI.SelectionGrid( Rect ( 120, 25, 120, shieldsNames.Length * 25 ), shield, shieldsNames, 1 );
		
		if ( GUI.changed )
		{
			print( shieldsNames[ shield ] + " was clicked." );
		}
	}
}

function InitShields( shieldsXmlFileText : String ) : void
{
	var shieldsXml = new XmlDocument();
	var shieldsNamesArray = new Array();
	
	shieldsXml.LoadXml( shieldsXmlFileText );
	
	var shieldNode = shieldsXml.FirstChild.NextSibling.FirstChild;
	
	while( shieldNode )
	{
		var sName:String = shieldNode.ChildNodes[0].InnerText;
		var sCost : float = float.Parse( shieldNode.ChildNodes[1].InnerText );
		var sWeight : float = float.Parse( shieldNode.ChildNodes[2].InnerText );
		var sBonus : int = int.Parse( shieldNode.ChildNodes[3].InnerText );
		var sMaxDex : int = int.Parse( shieldNode.ChildNodes[4].InnerText );
		var sCheckPen : int = int.Parse( shieldNode.ChildNodes[5].InnerText );
		var sSpellFail : int = int.Parse( shieldNode.ChildNodes[6].InnerText );
		var sProfType : int = int.Parse( shieldNode.ChildNodes[7].InnerText );
		
		var shield = new Shield( sName, sCost, sWeight, sBonus, sMaxDex, sCheckPen, sSpellFail, sProfType );
		
		shields.push( shield );
		shieldsNamesArray.push( sName );
		
		shieldNode = shieldNode.NextSibling;
	}
	
	shieldsNames = shieldsNamesArray.ToBuiltin( String );
}
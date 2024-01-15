import System.IO;
import System.Xml;

var characterClasses = new Array();
var classesNames : String[];//unity gui needs to use the built-in array to display a selection grid

private var characterClass = -1;

private var classesMenuX : int = 0;
private var classesMenuY : int = 0;
private var classesMenuW : int = 160;
private var classesMenuH : int = 20;

private var classesDisplayed = false;

var classesStyle1 : GUIStyle;
var classesStyle2 : GUIStyle;

function Start()
{
	//var classesXmlFile = new WWW("file://" + Application.persistentDataPath + "/characterClasses.xml");
	var classesXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/characterClasses.xml");
	yield classesXmlFile;
	
	InitClasses( classesXmlFile.text );
	
	classesStyle1 = GetComponent( Alignments ).alignmentsStyle1;
	classesStyle2 = GetComponent( Alignments ).alignmentsStyle2;
}

function ClassButton( al : int , butRect : Rect, i : int, ch : int , chClass : int )
{
	if( GetComponent( Alignments ).CheckClassAlign( i, al ) )//alignmentChosen
	{
		if( chClass == i )
		{
			GUI.Label( butRect, classesNames[i], classesStyle2 );
		}
		else if( GUI.Button( butRect, classesNames[i] ) )
		{
			GetComponent( Characters ).characters[ ch ].classes[0][0] = i;
		}
	}
	else
	{
		GUI.Label( butRect, classesNames[i], classesStyle1 );
	}
}

var classesScrollViewVector : Vector2 = Vector2.zero;

function Classes( currentCharacter : int )
{
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	var alignment : int = GetComponent( Characters ).characters[ currentCharacter ].alignment;
	
	var menuW : int = classesMenuW;
	var menuH : int = classesMenuH;
	
	var i = classesNames.length;
	
	//var menuW : int = 200;
	//var menuH : int = 20;
	
	var columns : int = 1;
	var rows : int = 7;
	var scrollMenuH : int = i * menuH;
	
	var gUIH : int = menuH * rows;
	var gUIW : int = menuW * columns;

	
	// Begin the scrollView
	classesScrollViewVector = GUI.BeginScrollView( Rect( 0, 0, menuW + 16, gUIH ), classesScrollViewVector, Rect( 0, 0, gUIW, scrollMenuH ) );
	
	// Put something inside the ScrollView
	while( i -- )
	{
		var butRect : Rect = Rect( 0, menuH * i, menuW, menuH );
		ClassButton( alignment, butRect, i, currentCharacter, chClass );
	}
	
	// End the ScrollView
	GUI.EndScrollView();
}

function InitClasses( classesXmlFileText : String ) : void
{
	var classesXml : XmlDocument = new XmlDocument();
	var classesNamesArray : Array = new Array();
	
	classesXml.LoadXml( classesXmlFileText );
	
	var classNode = classesXml.FirstChild.NextSibling.FirstChild;
	
	while ( classNode )
	{
		var clName : String = classNode.ChildNodes[0].InnerText;
		var clHD : int = int.Parse( classNode.ChildNodes[2].InnerText );
		var clSC : int = int.Parse( classNode.ChildNodes[3].InnerText );
		var clSP : int = int.Parse( classNode.ChildNodes[5].InnerText );
		var clBA : int = int.Parse( classNode.ChildNodes[7].InnerText );
		var clType : int = int.Parse( classNode.ChildNodes[9].InnerText );
		
		var clAligns : Array = Utilities.ParseStringToArray( classNode.ChildNodes[1].InnerText, false );
		var clSkills : Array = Utilities.ParseStringToArray( classNode.ChildNodes[4].InnerText, true );
		var clFeats  :Array = Utilities.ParseStringToArray( classNode.ChildNodes[6].InnerText, true );
		var clSaves : Array = Utilities.ParseStringToArray( classNode.ChildNodes[8].InnerText, false );
		
		var characterClass = new CharacterClass( clName, clAligns, clHD, clSC, clSkills, clSP, clFeats, clBA, clSaves, clType );
		
		characterClasses.push( characterClass );
		classesNamesArray.push( clName );
		
		classNode = classNode.NextSibling;
	}
	
	classesNames = classesNamesArray.ToBuiltin( String );
}


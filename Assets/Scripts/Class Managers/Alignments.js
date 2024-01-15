import System.IO;
import System.Xml;

var alignments = new Array();
var alignmentsNames : String[];//unity gui needs to use the built-in array to display a selection grid

private var alignment : int = -1;

private var alignMenuX : int = 0;//145;
private var alignMenuY : int = 0;//25;
private var alignMenuW : int = 160;
private var alignMenuH : int = 20;

var alignmentsStyle1 : GUIStyle;
var alignmentsStyle2 : GUIStyle;

private var alignmentsDisplayed = false;

function DisplayAlignments1() : void
{
	/*var currentCharacter : int = GetComponent( Characters ).character;
	alignment = GetComponent( Characters ).characters[ currentCharacter ].alignment;
	var butRect : Rect = Rect( alignMenuX, alignMenuY, alignMenuW, alignMenuH );
	var menuRect : Rect = Rect( alignMenuX, alignMenuY + alignMenuH + 5, alignMenuW, alignmentsNames.Length * alignMenuH );
	var labelRect : Rect = Rect( alignMenuX, alignMenuY + alignMenuH, alignMenuW, alignMenuH );
	
	var chosenAlignStr : String = "Choose alignment";
	if( alignment > -1 ){ chosenAlignStr = alignments[ alignment ]; }
	
	while( i -- )
	{
		alignment = GUI.Button( butRect, chosenAlignStr );
	}*/
}

function Start()
{
	//var alignmentsXmlFile = new WWW("file://" + Application.persistentDataPath + "/alignments.xml");
	var alignmentsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/alignments.xml" );
	yield alignmentsXmlFile;
	
	InitAlignments( alignmentsXmlFile.text );
	
	
	GetComponent( Characters ).charactersStyle1 = alignmentsStyle2;
}

function AlignmentButton( al : int , butRect : Rect, i : int, ch : int , chClass : int )
{
	if( CheckClassAlign( chClass, i ) )//alignmentChosen
	{
		if( al == i )
		{
			GUI.Label( butRect, alignmentsNames[i], alignmentsStyle2 );
		}
		else if( GUI.Button( butRect, alignmentsNames[i] ) )
		{
			GetComponent( Characters ).characters[ ch ].alignment = i;
		}
	}
	else
	{
		//butRect.y += 0;
		GUI.Label( butRect, alignmentsNames[i], alignmentsStyle1 );
	}
}

var alignmentsScrollViewVector : Vector2 = Vector2.zero;

function Alignments(  currentCharacter : int  ) : void
{
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	alignment = GetComponent( Characters ).characters[ currentCharacter ].alignment;
	
	var i = alignments.length;
	
	var menuW : int = alignMenuW;
	var menuH : int = alignMenuH;
	
	var columns : int = 1;
	var rows : int = 7;
	var scrollMenuH : int = i * menuH;
	
	var gUIH : int = menuH * rows;
	var gUIW : int = menuW * columns;
	
	// Begin the scrollView
	alignmentsScrollViewVector = GUI.BeginScrollView( Rect( 0, 0, menuW + 16, gUIH ), alignmentsScrollViewVector, Rect( 0, 0, gUIW, scrollMenuH ) );
	
	// Put something inside the ScrollView
	
	while( i -- )
	{
		var butRect : Rect = Rect( 0, menuH * i, menuW, menuH );
		AlignmentButton( alignment, butRect, i, currentCharacter, chClass );
	}
	// End the ScrollView
	GUI.EndScrollView();
}

function Alignments1GUI(  currentCharacter : int  )
{
	//var currentCharacter : int = GetComponent( Characters ).character;
	alignment = GetComponent( Characters ).characters[ currentCharacter ].alignment;
	
	var butRect : Rect = Rect( alignMenuX, alignMenuY, alignMenuW, alignMenuH );
	var menuRect : Rect = Rect( alignMenuX, alignMenuY + alignMenuH + 5, alignMenuW, alignmentsNames.Length * alignMenuH );
	var labelRect : Rect = Rect( alignMenuX, alignMenuY + alignMenuH, alignMenuW, alignMenuH );
	
	var chosenAlignStr : String = "Choose alignment";
	if( alignment > -1 ){ chosenAlignStr = alignments[ alignment ]; }
	
	if( GUI.Button( butRect, chosenAlignStr ) )
	{
		if( alignmentsDisplayed )
		{
			alignmentsDisplayed = false;
		}
		else
		{
			alignmentsDisplayed = true;
		}
	}
	
	if( alignmentsDisplayed )
	{
		var alignmentChosen : int = GUI.SelectionGrid( menuRect, alignment, alignmentsNames, 1 );
		
		if( CheckClassAlign( GetComponent( Characters ).characters[ currentCharacter ].classes[0][0], alignmentChosen ) )
		{
			GetComponent( Characters ).characters[ currentCharacter ].alignment = alignmentChosen;
		}
		else
		{
			Debug.Log( "A " + GetComponent( CharacterClasses ).classesNames[ GetComponent( Characters ).characters[ currentCharacter ].classes[0][0] ] + " can't be "
			+ alignmentsNames[ alignmentChosen ]
			+ "." );
		}
		if( GUI.changed )
		{
			//print( alignmentsNames[ alignment ] + " was clicked." );
			alignmentsDisplayed = false;
		}
	}
	else
	{
		GUI.Label( labelRect, "ALIGNMENT" );
	}
}

function InitAlignments( alignmentsXmlFileText )
{
	var alignmentsXml = new XmlDocument();
	
	alignmentsXml.LoadXml( alignmentsXmlFileText );
	
	var alignmentNode = alignmentsXml.FirstChild.NextSibling.FirstChild;
	
	while( alignmentNode )
	{
		alignments.Push( alignmentNode.InnerText );
		alignmentNode = alignmentNode.NextSibling;
	}
	alignmentsNames = alignments.ToBuiltin( String );
}

function CheckClassAlign( chClass : int, align : int ) : boolean
{
	if( align  >= 0 )
	{
		if( chClass >= 0 )
		{
			return GetComponent( CharacterClasses ).characterClasses[ chClass ].alignments[ align ];
		}
	}
	return true;
}
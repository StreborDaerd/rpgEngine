import System.IO;
import System.Xml;

var races = new Array();
var racesNames : String[];

var race = -1;

private var racesMenuX : int = 0;//265;
private var racesMenuY : int = 0;//25;
private var racesMenuW : int = 160;
private var racesMenuH : int = 20;

private var racesDisplayed = false;

var racesStyle1 : GUIStyle;

function OnGUI()
{
	//DisplayStatsToolBar();
}

function Start()
{
	//var racesXmlFile = new WWW("file://" + Application.persistentDataPath + "/races.xml");
	var racesXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/races.xml");
	yield racesXmlFile;
	InitRaces( racesXmlFile.text );
	
	racesStyle1 = GetComponent( Alignments ).alignmentsStyle2;
}

function RaceButton( butRect : Rect, i : int, ch : int , chRace : int )
{
	if( chRace == i )
	{
		GUI.Label( butRect, racesNames[i], racesStyle1 );
	}
	else
	{
		if( GUI.Button( butRect, racesNames[i] ) )
		{
			AddRaceAbMods( i, ch );
			race = i;
			GetComponent( Characters ).characters[ ch ].race = race;
			//print(i);
		}
	}
}

var racesScrollViewVector : Vector2 = Vector2.zero;

function Races( currentCharacter : int )
{
	var chRace : int = GetComponent( Characters ).characters[ currentCharacter ].race;
	
	/*var chRace : int = 0;
	
	if( GetComponent( Characters ).characters.length < currentCharacter )
	{ chRace = GetComponent( Characters ).characters[ currentCharacter ].race; }*/
	
	var menuW : int = racesMenuW;
	var menuH : int = racesMenuH;
	
	var i = racesNames.length;
	
	var columns : int = 1;
	var rows : int = 6;
	var scrollMenuH : int = i * menuH;
	
	var gUIH : int = menuH * rows;
	var gUIW : int = menuW * columns;
	
	// Begin the scrollView
	racesScrollViewVector = GUI.BeginScrollView( Rect( 0, 0, menuW + 16, gUIH ), racesScrollViewVector, Rect( 0, 0, gUIW, scrollMenuH ) );
	
	// Put something inside the ScrollView
	
	while( i -- )
	{
		var butRect : Rect = Rect( 0, menuH * i, menuW, menuH );
		RaceButton( butRect, i, currentCharacter, chRace );
	}
	// End the ScrollView
	GUI.EndScrollView();
	//AddRaceAbMods( chRace );
	//if( GUI.changed )
	//{
		//print( racesNames[ race ] + " was clicked." );
		//AddRaceAbMods( race );
		//var currentCharacter : int = GetComponent( Characters ).character;
		//GetComponent( Skills ).UpdateSkillPoints( currentCharacter );
		//GetComponent( Feats ).UpdateFeatPoints();
		//racesDisplayed = false;
	//}print( "" );
}

/*
function Races1GUI()
{
	var currentCharacter : int = GetComponent( Characters ).character;
	//race = GetComponent( Characters ).characters[ currentCharacter ].race;
	
	var butRect : Rect = Rect( racesMenuX, racesMenuY, racesMenuW, racesMenuH );
	var menuRect : Rect = Rect( racesMenuX, racesMenuY + racesMenuH + 5, racesMenuW, racesNames.Length * racesMenuH );
	var labelRect : Rect = Rect( racesMenuX, racesMenuY + racesMenuH, racesMenuW, racesMenuH );
	
	var chosenRaceStr : String = "Choose race";
	if( race > -1 ){ chosenRaceStr = racesNames[ race ]; }
	
	if( GUI.Button ( butRect, chosenRaceStr ) )
	{
		if( racesDisplayed )
		{
			racesDisplayed = false;
		}
		else
		{
			racesDisplayed = true;
		}
	}
	
	if( racesDisplayed )
	{
		var ra : int = race;
		GetComponent( Characters ).characters[ currentCharacter ].race = GUI.SelectionGrid( menuRect, race, racesNames, 1 );
		race = GetComponent( Characters ).characters[ currentCharacter ].race;
		if ( GUI.changed )
		{
			//print( racesNames[ race ] + " was clicked." );
			//AddRaceAbMods( ra );
			//var currentCharacter : int = GetComponent( Characters ).character;
			GetComponent( Skills ).UpdateSkillPoints( currentCharacter );
			GetComponent( Feats ).UpdateFeatPoints();
			racesDisplayed = false;
		}
	}
	else
	{
		GUI.Label( labelRect, "RACE" );
	}
	
}*/

public function AddRaceAbMods( ra : int, ch : int ) : void
{
	//print( ra + " = " + race );
	if( ra != race )
	{
		//print( ra + " = " + race );
		//remove the current race mods
		//abilityScores = GetComponent( Characters ).characters[ currentCharacter ].abilityScores;
		var sAScores : Array = GetComponent( Characters ).characters[ ch ].abilityScores;//
		var i : int = sAScores.length;
	
		if( race > -1 )//current race is less than 0 because no race has been chosen before 
		{
			var sAScoresRaceMods : Array = races[ race ].abilityMods;
			while( i -- )
			{
				sAScores[i] -= sAScoresRaceMods[i];
			}
			i = 6;//sAScores.length;
		}
	
		var newSAScoresRaceMods : Array = races[ ra ].abilityMods;

		while( i -- )
		{
			sAScores[i] += newSAScoresRaceMods[i];
			if( sAScores[i] < 3 )
			{
				GetComponent( Characters ).characters[ ch ].abilityPoints -= ( 3 - sAScores[i] );
				sAScores[i] = 3;
				
			}
			
		}
		//print( GetComponent( Characters ).characters[ ch ].id + "   " + GetComponent( Characters ).characters[ ch ].abilityScores );
		
	}
	//GetComponent( Characters ).characters[ ch ].race = ra;
	//race = ra;
	//GetComponent( Abilities ).abilityScores = sAScores;
}

function InitRaces( racesXmlFileText : String ):void
{
	var racesXml = new XmlDocument();
	var racesNamesArray = new Array();
	
	racesXml.LoadXml( racesXmlFileText );
	
	var raceNode = racesXml.FirstChild.NextSibling.FirstChild;
	
	while ( raceNode )
	{
		var rName:String = raceNode.ChildNodes[0].InnerText;
		var rSize:int = int.Parse( raceNode.ChildNodes[1].InnerText );
		var rSpeed:int = int.Parse( raceNode.ChildNodes[2].InnerText );
		
		var rAbilityMods:Array = new Array();
		var abilityModNode = raceNode.ChildNodes[3].FirstChild;
		while ( abilityModNode )
		{
			rAbilityMods.push( int.Parse( abilityModNode.InnerText ) );
			abilityModNode = abilityModNode.NextSibling;
		}
		
		var rVision:Array = new Array();
		var visionNode = raceNode.ChildNodes[4].FirstChild.FirstChild;
		while ( visionNode )
		{
			var vision:boolean = false;
			if( visionNode.InnerText == "1" ){ vision = true; }
			
			rVision.push( vision );
			visionNode = visionNode.NextSibling;
		}
		
		var rFavClass:int = int.Parse( raceNode.ChildNodes[5].InnerText );
		
		var rAutoLanguages:Array = new Array();
		var autoLanguageNode = raceNode.ChildNodes[6].FirstChild;
		while ( autoLanguageNode )
		{
			rAutoLanguages.push( int.Parse( autoLanguageNode.InnerText ) );
			//Debug.Log( autoLanguageNode.InnerText );
			autoLanguageNode = autoLanguageNode.NextSibling;
		}
		
		var rBonLanguages:Array = new Array();
		var bonLanguageNode = raceNode.ChildNodes[7].FirstChild;
		while ( bonLanguageNode )
		{
			rBonLanguages.Push( int.Parse( bonLanguageNode.InnerText ) );
			bonLanguageNode = bonLanguageNode.NextSibling;
		}
		
		var race = new Race( rName, rAbilityMods, rSize, rSpeed, rVision, rFavClass, rAutoLanguages, rBonLanguages );
		races.Push( race );
		racesNamesArray.Push( rName );
		
		raceNode = raceNode.NextSibling;
	}
	
	racesNames = racesNamesArray.ToBuiltin( String );
}


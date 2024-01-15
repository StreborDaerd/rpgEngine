var characters = new Array();
//var charactersNames : String[];
var character : int = 0;// index of the current character within the characters array

var charactersStyle1 : GUIStyle;

private var windowCharacter : Rect = Rect( 0, 0, 480, 320 );

function CharacterButton( butRect : Rect, i : int )
{
	if( character == i )
	{
		GUI.Label( butRect, characters[i].id, charactersStyle1 );
	}
	else if( GUI.Button( butRect, characters[i].id ) )
	{
		character = i;
	}
}

var charactersScrollViewVector : Vector2 = Vector2.zero;

function Characters()
{
	var menuW : int = 200;
	var menuH : int = 20;
	
	var columns : int = 1;
	var rows : int = 7;
	var scrollMenuH : int = characters.length * menuH;
	
	var gUIH : int = menuH * rows;
	var gUIW : int = menuW * columns;
	
	var i = characters.length;
	var butRect : Rect = Rect( menuW + 16, 0, menuW / 2 - 16, menuH );
	
	if( GUI.Button( butRect, "Add" ) )
	{
		characters.Push( new Character() );
	}
	
	butRect.y += menuH;
	
	if( i > 1 )
	{
		if( GUI.Button( butRect, "Remove" ) )
		{
			var ch : int = character;
			character = ch - 1;
			if( character < 0 ){ character = 0; }
			characters.Splice( ch, 1 );
			//character = ch - 1;
			i = characters.length;
		}
	}
	
	// Begin the scrollView
	charactersScrollViewVector = GUI.BeginScrollView( Rect( 0, 0, menuW + 16, gUIH ), charactersScrollViewVector, Rect( 0, 0, gUIW, scrollMenuH ) );
	
	// Put something inside the ScrollView
	while( i -- )
	{
		butRect = Rect( 0, menuH * i, menuW, menuH );
		CharacterButton( butRect, i );
	}
	
	// End the ScrollView
	GUI.EndScrollView();
}

function Start()
{
	characters.Push( new Character() );
}

function Name() : void
{
	characters[ character ].id = NameTextField( Rect( 0, 0, 300, 20 ), characters[ character ].id, "NAME" );
}

function Classes() : void
{
	GetComponent( CharacterClasses ).Classes( character );
}

function Alignments() : void
{
	//GetComponent( Alignments ).AlignmentsGUI( character );
	
}

function NameTextField( nameRect : Rect, chaName : String, labelText : String ) : String
{
	GUILayout.BeginArea( Rect( 0, 0, 300, 50 ) );
	GUILayout.BeginVertical();
	
	GUI.Label( nameRect, labelText );//
	nameRect.y += 12;//nameRect.height;
	nameStr = GUI.TextField( nameRect, chaName );//
	
	GUILayout.EndVertical();
	GUILayout.EndArea();
	
	return nameStr;
}


















function ChooseCharacterMenu()
{
	
}

function TestRaces() : void
{
	//get component calls to races and alignments are not working. Why?
	//GetComponent( Races ).RacesGUI( character );
	
	//but component calls to weapons, classes, etc are working. Why?
	print( GetComponent( Abilities ).abilitiesTitles[0] );
	print( GetComponent( CharacterClasses ).classesNames[0] );
	//print( GetComponent( Races ).racesNames[0] );
	print( GetComponent( Skills ).skills[0].id );
	//print( GetComponent( Alignments ).alignmentsNames[0] );
	print( GetComponent( Feats ).feats[0].id );
	print( GetComponent( Weapons ).weaponsNames[0] );
}


/* Make a property containing a reference to the skin you want to use */

//var chaGenSkin : GUISkin;

private var stats : Array = Array( "Characters", "Abilities", "Skills", "Feats", "Equipment", "Magic" );
private var statsBI : String[] = stats.ToBuiltin( String );
private var statsDisplayed : int = 0;
private var statsColumns : int = 3;
private var statsColumnW : int = 100;

private var statsCharacters : Array = Array( "Classes", "Race", "Alignment" );
private var statsCharactersBI : String[] = statsCharacters.ToBuiltin( String );
private var statsCharactersDisplayed : int = 0;

private var statsAbilities : Array = Array( "Saves", "AC HP AB" );
private var statsAbilitiesBI : String[] = statsAbilities.ToBuiltin( String );
private var statsAbilitiesDisplayed : int = 0;

var chaGenSkin : GUISkin;

var style1 : GUIStyle;
var style2 : GUIStyle;
var style3 : GUIStyle;
var style4 : GUIStyle;
var style5 : GUIStyle;

var buttonPlusMinusStyle : GUIStyle;

var skillsColumns : int = 3;
var spSkillsColumns : int = 3;

function Start()
{
	
}

function OnGUI()
{
	GUI.skin = chaGenSkin;
	GUI.Box( Rect ( 0, 0, 640, 960 ), "" );
	StatsGUI();
}

function DisplayStatsToolBar() : void
{
	statsDisplayed = GUI.Toolbar( Rect ( 0, 0, 300, 20 ), statsDisplayed, statsBI );
}

function DisplayStatsSelectionGrid() : void
{
	statsDisplayed = GUI.SelectionGrid( Rect ( 10, 0, 300, 40 ), statsDisplayed, statsBI, 3 );
}

function DisplayStats( whichStats : int ) : void
{
	var character : int = GetComponent( Characters ).character;
	switch( whichStats )
	{
		case 0:
			CharactersGUI( character );
		break;

		case 1:
			AbilitiesGUI( character );
		break;
		
		case 2:
			SkillsGUI();
		break;

		case 3:
			FeatsGUI();
		break;
		
		case 4:
			WeaponsGUI();
		break;

		case 5:
		//GetComponent( Armors ).DisplayArmors();
		break;

		case 6:
		//GetComponent( Equipment ).DisplayEquipment();
		break;

		case 7:
		//GetComponent( Magic ).DisplayMagic();
		break;
	}
}

function StatsGUI()
{
	
	//windowCharacter = GUI.Window( 0, windowCharacter, DoMyStatsWindow, "" );
	DisplayStatsSelectionGrid();
	//DisplayStatsToolBar();
	GUILayout.BeginArea( Rect( 0, 45, 320, 435 ) );
	DisplayStats( statsDisplayed );
	GUILayout.EndArea();
}

function CharactersGUI( character : int ) : void
{
	DisplayCharactersSelectionGrid();
	
	//var character : int = GetComponent( Characters ).character;
	GUILayout.BeginArea( Rect( 10, 0, 300, 35 ) );
	GetComponent( Characters ).Name();
	GUILayout.EndArea();
	GUILayout.BeginArea( Rect( 10, 40, 300, 205 ) );
	GetComponent( Characters ).Characters();
	GUILayout.EndArea();
	GUILayout.BeginArea( Rect( 10, 210, 300, 240 ) );
	switch( statsCharactersDisplayed )
	{
		case 0:
			GetComponent( CharacterClasses ).Classes( character );
		break;
		
		case 1:
			GetComponent( Races ).Races( character );// character 
		break;

		case 2:
			GetComponent( Alignments ).Alignments( character );
		break;
	}
	GUILayout.EndArea();
}

function DisplayCharactersSelectionGrid() : void
{
	statsCharactersDisplayed = GUI.SelectionGrid( Rect ( 10, 185, 300, 20 ), statsCharactersDisplayed, statsCharactersBI, 3 );
}

function AbilitiesGUI( character : int ) : void
{
	GUILayout.BeginArea( Rect( 10, 10, 310, 20 ) );
	GetComponent( Abilities ).DisplayAbilitiesKey();
	GUILayout.EndArea();
	GUILayout.BeginArea( Rect( 55, 45, 210, 180 ) );
	GetComponent( Abilities ).DisplayAbilities( character );
	GUILayout.EndArea();
	GUILayout.BeginArea( Rect( 10, 270, 300, 100 ) );
	//GetComponent( SavingThrows ).DisplaySavingThrows( character );
	GetComponent( Attributes ).DisplayMainAttributes( character );
	GUILayout.EndArea();
	GUILayout.BeginArea( Rect( 10, 340, 300, 100 ) );
	GetComponent( SavingThrows ).DisplaySavingThrows( character );
	//GetComponent( Attributes ).DisplayMainAttributes( character );
	GUILayout.EndArea();
}

function DisplayAbilitiesSelectionGrid() : void
{
	statsAbilitiesDisplayed = GUI.SelectionGrid( Rect ( 10, 185, 300, 20 ), statsAbilitiesDisplayed, statsAbilitiesBI, 3 );
}

var skillsScrollViewVector : Vector2 = Vector2.zero;

var spSkillsNames = new Array( "Craft", "Knowledge", "Perform", "Profession", "Language" );
private var spSkillsNamesBI : String[] = spSkillsNames.ToBuiltin( String );

function SkillsGUI() : void
{
	DisplaySkillsSelectionGrid();
	
	skillsColumns = 1;
	
	var skillsRows : int = 7;//GetComponent( Skills ).skillsRowsMax;
	var skillsMenuW : int = GetComponent( Skills ).skillsMenuW + 16;
	var skillsMenuH : int = GetComponent( Skills ).skillsMenuH;
	
	var scrollMenuH : int = GetComponent( Skills ).skills.length * skillsMenuH;
	
	var skillsGUIH : int = skillsMenuH * skillsRows;
	var skillsGUIW : int = skillsMenuW * skillsColumns;
	
	//windowSkills.height = skillsGUIH + 70;
	//windowSkills.width = skillsGUIW + 16;

	// Display heading info
	//GetComponent( Skills ).DisplaySkillsKey();
	GUILayout.BeginArea( Rect( 10, 10, 300, 30 ) );
	//GUI.Box( Rect ( 0, 0, skillsMenuW - 10, 30 ), "" );
	GetComponent( Skills ).DisplaySkillsKey();
	GUILayout.EndArea();
	// Begin the scrollView
	skillsScrollViewVector = GUI.BeginScrollView( Rect( 12, 50, skillsMenuW, skillsGUIH ), skillsScrollViewVector, Rect( 0, 0, skillsGUIW - 16, scrollMenuH ) );
	// Put something inside the ScrollView
	GetComponent( Skills ).DisplaySkills();
	// End the ScrollView
	GUI.EndScrollView();
	SpSkillsGUI();
}

function DisplaySkillsSelectionGrid() : void
{
	GetComponent( Skills ).spSkillDisplayed = GUI.SelectionGrid( Rect ( 10, 200, 300, 40 ), GetComponent( Skills ).spSkillDisplayed, spSkillsNamesBI, 3 );
}

var spSkillsScrollViewVector : Vector2 = Vector2.zero;

function SpSkillsGUI() : void
{
	
	spSkillsColumns = GetComponent( Skills ).spSkillsColumns;
	
	var spSkillsRows : int = 7;//GetComponent( Skills ).spSkillsRowsMax;
	var spSkillsMenuW : int = 200;//GetComponent( Skills ).spSkillsMenuW;
	var spSkillsMenuH : int = 20;//GetComponent( Skills ).spSkillsMenuH;
	
	var scrollMenuH : int = GetComponent( Skills ).spSkills[ GetComponent( Skills ).spSkillDisplayed ].length * spSkillsMenuH;
	
	var spSkillsGUIH : int = spSkillsMenuH * spSkillsRows;
	var spSkillsGUIW : int = 216;//spSkillsMenuW * spSkillsColumns;
	
	windowSpSkills.height = spSkillsGUIH + 70;
	
	//calculate the number of columns
	//
	// Display heading info
	//GUILayout.BeginArea( Rect( 0, 245, spSkillsMenuW, 30 ) );
	//GetComponent( Skills ).DisplaySpSkillsKey();
	//GUILayout.EndArea();
	// Begin the scrollView
	spSkillsScrollViewVector = GUI.BeginScrollView( Rect( 60, 245, spSkillsGUIW, spSkillsGUIH ), spSkillsScrollViewVector, Rect( 0, 0, spSkillsMenuW, scrollMenuH ) );
	// Put something inside the ScrollView
	GetComponent( Skills ).DisplaySpSkills();
	// End the ScrollView
	GUI.EndScrollView();
}

var featsScrollViewVector : Vector2 = Vector2.zero;

var spFeatsNames = new Array( "Magic", "Skill", "Weapon" );
private var spFeatsNamesBI : String[] = spFeatsNames.ToBuiltin( String );

function FeatsGUI() : void
{
	var columns : int = 1;//GetComponent( Feats ).featsColumns;
	//print( columns );
	var rows : int = 7;//GetComponent( Weapons ).weaponsRowsMax;
	var menuW : int = 260;//GetComponent( Skills ).spSkillsMenuW;
	var menuH : int = 20;//GetComponent( Skills ).spSkillsMenuH;
	
	var GUIW : int = menuW * columns;
	var GUIH : int = menuH * rows;
	var GUIScrollH : int = menuH * GetComponent( Feats ).feats.length;
	
	//windowFeats.height = GUIH + 60;
	//windowFeats.width = GUIW + 36;
	
	DisplayFeatsSelectionGrid();
	//DisplayWpFeatsSelectionGrid();
	
	GUILayout.BeginArea( Rect( 10, 10, 300, 30 ) );
	GetComponent( Feats ).DisplayFeatsKey();
	GUILayout.EndArea();
	
	// Begin the scrollView
	featsScrollViewVector = GUI.BeginScrollView( Rect( 22, 50, menuW + 16, GUIH ), featsScrollViewVector, Rect( 0, 0, menuW, GUIScrollH ) );
	
	// Put something inside the ScrollView
	GetComponent( Feats ).DisplayFeats();
	// End the ScrollView
	GUI.EndScrollView();
	SpFeatsGUI();
}

function DisplayFeatsSelectionGrid() : void
{
	GetComponent( Feats ).spFeatDisplayed = GUI.SelectionGrid( Rect ( 10, 200, 300, 20 ), GetComponent( Feats ).spFeatDisplayed, spFeatsNamesBI, 3 );
}

function SpFeatsGUI() : void
{
	var spFeatDisplayed : int  = GetComponent( Feats ).spFeatDisplayed;
	//print( spFeatDisplayed );
	switch( spFeatDisplayed )
	{
		case 0:
			MgFeatsGUI();
		break;
		
		case 1:
			SkFeatsGUI();
		break;

		case 2:
			WpFeatsGUI();
		break;
	}
}

private var mgFeatsNames = new Array( "Exotic", "Imp. Crit.", "Martial", "Finesse", "Focus", "Specialize" );
private var mgFeatsNamesBI : String[] = mgFeatsNames.ToBuiltin( String );
private var mgFeatsScrollViewVector : Vector2 = Vector2.zero;

function DisplayMgFeatsSelectionGrid() : void
{
	GetComponent( Feats ).mgFeatDisplayed = GUI.SelectionGrid( Rect ( 10, 0, 300, 40 ), GetComponent( Feats ).mgFeatDisplayed, mgFeatsNamesBI, 3 );
}

function MgFeatsGUI() : void
{
	/*var columns : int = 1;//GetComponent( Feats ).spFeatsColumns;
	
	var rows : int = 7;//GetComponent( Feats ).spFeatsRowsMax;
	var menuW : int = 200;//GetComponent( Skills ).spSkillsMenuW;
	var menuH : int = 20;//GetComponent( Skills ).spSkillsMenuH;
	
	var GUIScrollH : int = menuH * GetComponent( Spells ).spells.length;
	
	var GUIH : int = menuH * rows;
	var GUIW : int = menuW * columns;
	
	//windowSpFeats.height = GUIH + 70;
	//print( GUIH + 70 );
	//calculate the number of columns
	//
	// Display the skills feats sub menu
	GUILayout.BeginArea( Rect( 0, 225, 320, 40 ) );
	DisplayMgFeatsSelectionGrid();
	GUILayout.EndArea();
	
	// Begin the scrollView
	mgFeatsScrollViewVector = GUI.BeginScrollView( Rect( 52, 270, menuW + 16, GUIH ), mgFeatsScrollViewVector, Rect( 0, 0, menuW, GUIScrollH ) );
	
	// Put something inside the ScrollView
	GetComponent( Feats ).DisplayMgFeats();
	// End the ScrollView
	GUI.EndScrollView();*/
}

private var skFeatsNames = new Array( "Craft", "Knowledge", "Perform", "Profession", "Standard" );
private var skFeatsNamesBI : String[] = skFeatsNames.ToBuiltin( String );
private var skFeatsScrollViewVector : Vector2 = Vector2.zero;

function DisplaySkFeatsSelectionGrid() : void
{
	GetComponent( Feats ).skFeatDisplayed = GUI.SelectionGrid( Rect ( 10, 0, 300, 40 ), GetComponent( Feats ).skFeatDisplayed, skFeatsNamesBI, 3 );
}

function SkFeatsGUI() : void
{
	var columns : int = 1;//GetComponent( Feats ).spFeatsColumns;
	
	var rows : int = 7;//GetComponent( Feats ).spFeatsRowsMax;
	var menuW : int = 200;//GetComponent( Skills ).spSkillsMenuW;
	var menuH : int = 20;//GetComponent( Skills ).spSkillsMenuH;
	
	var GUIScrollH : int = 0;
	switch( GetComponent( Feats ).skFeatDisplayed )
	{
		case 0:
			GUIScrollH = menuH * GetComponent( Skills ).crafts.length;
		break;
		case 1:
			GUIScrollH = menuH * GetComponent( Skills ).knowledges.length;
		break;
		case 2:
			GUIScrollH = menuH * GetComponent( Skills ).performances.length;
		break;
		case 3:
			GUIScrollH = menuH * GetComponent( Skills ).professions.length;
		break;
		case 4:
			GUIScrollH = menuH * GetComponent( Skills ).skills.length;
		break;
	}
	var GUIH : int = menuH * rows;
	var GUIW : int = menuW * columns;
	
	//Display the skills feats sub menu
	GUILayout.BeginArea( Rect( 0, 225, 320, 40 ) );
	DisplaySkFeatsSelectionGrid();
	GUILayout.EndArea();
	
	// Begin the scrollView
	skFeatsScrollViewVector = GUI.BeginScrollView( Rect( 52, 270, menuW + 16, GUIH ), skFeatsScrollViewVector, Rect( 0, 0, menuW, GUIScrollH ) );
	
	// Put something inside the ScrollView
	GetComponent( Feats ).DisplaySkFeats();
	
	// End the ScrollView
	GUI.EndScrollView();
}

private var wpFeatsNames = new Array( "Exotic", "Imp. Crit.", "Martial", "Finesse", "Focus", "Specialize" );
private var wpFeatsNamesBI : String[] = wpFeatsNames.ToBuiltin( String );
private var wpFeatsScrollViewVector : Vector2 = Vector2.zero;

private function DisplayWpFeatsSelectionGrid() : void
{
	GetComponent( Feats ).wpFeatDisplayed = GUI.SelectionGrid( Rect ( 10, 0, 300, 40 ), GetComponent( Feats ).wpFeatDisplayed, wpFeatsNamesBI, 3 );
}

private function WpFeatsGUI() : void
{
	var columns : int = 1;//GetComponent( Feats ).spFeatsColumns;
	
	var rows : int = 7;//GetComponent( Feats ).spFeatsRowsMax;
	var menuW : int = 200;//GetComponent( Skills ).spSkillsMenuW;
	var menuH : int = 20;//GetComponent( Skills ).spSkillsMenuH;
	
	var GUIScrollH : int = menuH * GetComponent( Weapons ).weapons.length;
	
	var GUIH : int = menuH * rows;
	var GUIW : int = menuW * columns;
	
	//windowSpFeats.height = GUIH + 70;
	//print( GUIH + 70 );
	//calculate the number of columns
	//
	// Display the weapons feats sub menu
	GUILayout.BeginArea( Rect( 0, 225, 320, 40 ) );
	DisplayWpFeatsSelectionGrid();
	GUILayout.EndArea();
	
	// Begin the scrollView
	wpFeatsScrollViewVector = GUI.BeginScrollView( Rect( 52, 270, menuW + 16, GUIH ), wpFeatsScrollViewVector, Rect( 0, 0, menuW, GUIScrollH ) );
	
	// Put something inside the ScrollView
	GetComponent( Feats ).DisplayWpFeats();
	// End the ScrollView
	GUI.EndScrollView();
}

var weaponsScrollViewVector : Vector2 = Vector2.zero;

function WeaponsGUI() : void
{
	var columns : int = GetComponent( Weapons ).weaponsColumns;
	//print( columns );
	var rows : int = 7;//GetComponent( Weapons ).weaponsRowsMax;
	var menuW : int = 260;//GetComponent( Skills ).spSkillsMenuW;
	var menuH : int = 20;//GetComponent( Skills ).spSkillsMenuH;
	
	var GUIW : int = menuW * columns;
	var GUIH : int = menuH * rows;
	var GUIScrollH : int = menuH * GetComponent( Weapons ).weapons.length;
	
	windowWeapons.height = GUIH + 60;
	windowWeapons.width = GUIW + 36;
	
	//calculate the number of columns
	//
	// Display heading info
	GUILayout.BeginArea( Rect( 10, 0, menuW, 30 ) );
	GetComponent( Weapons ).DisplayWeaponsKey();
	GUILayout.EndArea();
	
	// Begin the scrollView
	weaponsScrollViewVector = GUI.BeginScrollView( Rect( 10, 30, menuW + 16, GUIH ), weaponsScrollViewVector, Rect( 0, 0, menuW, GUIScrollH ) );
	// Put something inside the ScrollView
	GetComponent( Weapons ).DisplayWeapons();
	// End the ScrollView
	GUI.EndScrollView();
}

var armorsScrollViewVector : Vector2 = Vector2.zero;

function ArmorsGUI() : void
{
	var columns : int = GetComponent( Armors ).armorsColumns;
	
	var rows : int = GetComponent( Armors ).armorsRowsMax;
	var menuW : int = 200;
	var menuH : int = 20;
	
	var GUIW : int = menuW * columns;
	var GUIH : int = menuH * rows;
	
	windowArmors.height = GUIH + 70;
	
	//calculate the number of columns
	//
	// Display heading info
	GUILayout.BeginArea( Rect( 10, 20, menuW, 30 ) );
	GetComponent( Armors ).DisplayArmorsKey();
	GUILayout.EndArea();
	
	// Begin the scrollView
	armorsScrollViewVector = GUI.BeginScrollView( Rect( 10, 50, menuW, GUIH + 16 ), armorsScrollViewVector, Rect( 0, 0, GUIW, GUIH ) );
	
	// Put something inside the ScrollView
	GetComponent( Armors ).DisplayArmors();
	// End the ScrollView
	GUI.EndScrollView();
}

private var windowCharacter : Rect = Rect( 0, 0, 640, 320 );
private var windowAbilities : Rect = Rect( 50, 50, 230, 240 );
private var windowSkills : Rect = Rect( 100, 100, 260, 400 );
private var windowSpSkills : Rect = Rect( 150, 150, 220, 400 );
private var windowFeats : Rect = Rect( 200, 200, 220, 460 );
private var windowSpFeats : Rect = Rect( 250, 250, 220, 460 );
private var windowWeapons : Rect = Rect( 300, 300, 220, 460 );
private var windowArmors : Rect = Rect( 350, 350, 220, 460 );

// Make the contents of the window
function DoMyStatsWindow( windowID : int )
{
	if( windowID == 0 )
	{ 
		//CharactersGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 20 )
	{ 
		//AbilitiesGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 1 )
	{ 
		SkillsGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 2 )
	{ 
		SpSkillsGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 3 )
	{ 
		FeatsGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 4 )
	{ 
		SpFeatsGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 5 )
	{ 
		WeaponsGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
	if( windowID == 6 )
	{ 
		ArmorsGUI();
		// Make the windows be draggable.
		GUI.DragWindow( Rect( 0, 0, 10000, 10000 ) );
	}
}


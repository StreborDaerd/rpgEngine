import System.IO;
import System.Xml;

var skills = new Array();
var skillsKey = new Array( "U = usable untrained", "P = armor penalty", "X = class skill" );
var skillsKeyBI : String[] = skillsKey.ToBuiltin( String );

var spSkills : Array = new Array();

//var spSkillsKeyBI : String[];

var spSkillIndices : Array = new Array();
var crafts : Array = new Array();
var knowledges : Array = new Array();
var languages : Array = new Array();
var alphabets : Array = new Array();
var performances : Array = new Array();
var professions : Array = new Array();
	
var skillsNames : String[];
var skill : int = 0;
var spSkillName : String = "";

var skillsDisplayed : boolean = false;
var spSkillDisplayed : int = 0;

private var skillPoints : int = 0;
private var langRanks : int = 0;//language ranks are based on a different system to normal skill ranks
/*
private var skillsMenuX : int = 250;
private var skillsMenuY : int = 150;
private var skillsMenuW : int = 240;
private var skillsMenuH : int = 20;
*/
private var skillsMenuX : int = 0;
private var skillsMenuY : int = 0;
var skillsMenuW : int = 240;
var skillsMenuH : int = 20;

var skillsRowsMax : int = 12;
var skillsColumns : int = 3;
var spSkillsRowsMax : int = 12;
var spSkillsColumns : int = 3;

var skillsStyle1 : GUIStyle;
var skillsStyle2 : GUIStyle;
var skillsStyle3 : GUIStyle;

var skillsStyle4 : GUIStyle;
var skillsStyle5 : GUIStyle;
var skillsStyle6 : GUIStyle;
var skillsStyle7 : GUIStyle;

var skButtonPlusMinusStyle : GUIStyle;

function Start()
{
	//var skillsXmlFile = new WWW("file://" + Application.persistentDataPath + "/skills.xml");
	var skillsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/skills.xml");
	yield skillsXmlFile;
	InitSkills( skillsXmlFile.text );
	
	//var spSkillsXmlFile = new WWW("file://" + Application.persistentDataPath + "/specializedSkills.xml");
	var spSkillsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/specializedSkills.xml");
	yield spSkillsXmlFile;
	InitSpSkills( spSkillsXmlFile.text );
	
	//skillsStyle1 = GetComponent( GUIStuff ).style1;
	//skillsStyle2 = GetComponent( GUIStuff ).style2;
	//skillsStyle3 = GetComponent( GUIStuff ).style3;
	//skillsStyle4 = GetComponent( Alignments ).alignmentsStyle1;
	skillsStyle7 = GetComponent( Alignments ).alignmentsStyle2;
	
	skButtonPlusMinusStyle = GetComponent( GUIStuff ).buttonPlusMinusStyle;
}

function InitSkills( skillsXmlFileText : String ) : void
{
	var skillsXml = new XmlDocument();
	var skillsNamesArray = new Array();
	
	skillsXml.LoadXml( skillsXmlFileText );
	
	var skillNode = skillsXml.FirstChild.NextSibling.FirstChild;
	
	while ( skillNode )
	{
		var skName : String = skillNode.ChildNodes[0].InnerText;
		var skUntr : boolean = Utilities.ParseBool( skillNode.ChildNodes[1].InnerText );
		var skKeyAb : int = int.Parse( skillNode.ChildNodes[2].InnerText );
		var skArmCPen : boolean = Utilities.ParseBool( skillNode.ChildNodes[3].InnerText );

		var skill = new Skill( skName, skUntr, skKeyAb, skArmCPen );
		skills.Push( skill );
		skillsNamesArray.Push( skName );
		
		skillNode = skillNode.NextSibling;
	}
	
	skillsNames = skillsNamesArray.ToBuiltin( String );
	
	skillsDisplayed = true;
}

function InitSpSkills( spSkillsXmlFileText : String ) : void
{
	var spSkillsXml = new XmlDocument();
	var spSkillsNamesArray = new Array();
	
	spSkillsXml.LoadXml( spSkillsXmlFileText );
	
	var spSkillNode = spSkillsXml.FirstChild.NextSibling.FirstChild;
	
	//these are the locations of the skills within the main skills array
	spSkillIndices = Utilities.ParseStringToArray( spSkillNode.InnerText, true );
	//print( spSkillIndices );
	var i : int = spSkillIndices.length;
	/*while ( i-- )
		print( skills[ spSkillIndices[i] ].id + "   " + spSkillIndices[i] );*/
	
	
	spSkillNode = spSkillNode.NextSibling;
	
	var craftNode = spSkillNode.FirstChild;
	while ( craftNode )
	{
		crafts.Push( craftNode.ChildNodes[0].InnerText );
		//print( craftNode.ChildNodes[0].InnerText );
		craftNode = craftNode.NextSibling;
	}
	
	spSkillNode = spSkillNode.NextSibling;
	
	var knowledgeNode = spSkillNode.FirstChild;
	while ( knowledgeNode )
	{
		knowledges.Push( knowledgeNode.ChildNodes[0].InnerText );
		//print( knowledgeNode.ChildNodes[0].InnerText );
		knowledgeNode = knowledgeNode.NextSibling;
	}
	
	spSkillNode = spSkillNode.NextSibling;
	
	var languageNode = spSkillNode.FirstChild;
	while ( languageNode )
	{
		languages.Push( languageNode.ChildNodes[0].InnerText );
		//print( languageNode.ChildNodes[0].InnerText );
		languageNode = languageNode.NextSibling;
	}
	
	spSkillNode = spSkillNode.NextSibling;
	
	var alphabetNode = spSkillNode.FirstChild;
	while ( alphabetNode )
	{
		alphabets.Push( alphabetNode.ChildNodes[0].InnerText );
		//print( alphabetNode.ChildNodes[0].InnerText );
		alphabetNode = alphabetNode.NextSibling;
	}
	
	spSkillNode = spSkillNode.NextSibling;
	
	var performanceNode = spSkillNode.FirstChild;
	while ( performanceNode )
	{
		performances.Push( performanceNode.ChildNodes[0].InnerText );
		//print( performanceNode.ChildNodes[0].InnerText );
		performanceNode = performanceNode.NextSibling;
	}
	
	spSkillNode = spSkillNode.NextSibling;
	
	var professionNode = spSkillNode.FirstChild;
	while ( professionNode )
	{
		professions.Push( professionNode.ChildNodes[0].InnerText );
		//print( professionNode.ChildNodes[0].InnerText );
		professionNode = professionNode.NextSibling;
	}
	
	/*spSkills.Push( new Array( spSkillIndices[0], crafts ) );*/
	spSkills[0] = crafts;
	spSkills[1] = knowledges;
	spSkills[2] = performances;
	spSkills[3] = professions;
	spSkills[4] = languages;
	spSkills[5] = alphabets;
	
	spSkillDisplayed = 0;
}

function OnGUI()
{
	//DisplaySkills();
}

function DisplaySkillsKey() : void
{
	//the titles, points and key of the statistics table go here
	//var skillPointsRect : Rect = Rect( skillsMenuX, skillsMenuY - 25, 60, skillsMenuH );
	var rect : Rect = Rect( 70, 0, 100, skillsMenuH * 2 );
	GUI.Label( rect, "SKILLS", skillsStyle2 );
	
	var skillPointsRect : Rect = Rect( 160, 0, 60, skillsMenuH + 4 );
	GUI.Label( skillPointsRect, "SKILL POINTS", skillsStyle1 );
	skillPointsRect.x += 40;
	GUI.Label( skillPointsRect, ":" + skillPoints, skillsStyle2 );
	
	//skillPointsRect = Rect( skillsMenuX + skillsMenuW / 3, skillsMenuY - 25, skillsMenuW / 2, skillsMenuH );
	skillPointsRect = Rect( 80, 0, skillsMenuW / 2, skillsMenuH );
	//GUI.Label( skillPointsRect, "U = usable untrained", skillsStyle1 );
	skillPointsRect.y += 10;
	//GUI.Label( skillPointsRect, "* = armor penalty", skillsStyle1 );
	//skillPointsRect = Rect( skillsMenuX + skillsMenuW, skillsMenuY - 25, skillsMenuW / 2, skillsMenuH );
	skillPointsRect.y += 10;
	//GUI.Label( skillPointsRect, "X = class skill", skillsStyle1 );
}

function DisplaySpSkillsKey() : void
{
	spSkillName = skillsNames[ spSkillIndices[ spSkillDisplayed ] ];
	//the titles, points and key of the statistics table go here
	var skillPointsRect : Rect = Rect( 0, 5, 60, skillsMenuH );
	//GUI.Label( skillPointsRect, "SKILL POINTS", skillsStyle1 );
	//skillPointsRect.x += 40;
	//GUI.Label( skillPointsRect, ":" + skillPoints, skillsStyle2 );
	
	if( spSkillDisplayed == 4 )
	{
		//skillPointsRect = Rect( skillsMenuX + skillsMenuW / 3, skillsMenuY - 25, skillsMenuW / 2, skillsMenuH );
		skillPointsRect = Rect( 80, 0, skillsMenuW / 2, skillsMenuH );
		GUI.Label( skillPointsRect, "A = automatic", skillsStyle1 );
		skillPointsRect.y += 10;
		GUI.Label( skillPointsRect, "B = bonus", skillsStyle1 );
		//skillPointsRect = Rect( skillsMenuX + skillsMenuW, skillsMenuY - 25, skillsMenuW / 2, skillsMenuH );
		skillPointsRect.y += 10;
		GUI.Label( skillPointsRect, "S = secret", skillsStyle1 );
	}
}

function DisplaySkills() : void
{
	UpdateSkillPoints( GetComponent( Characters ).character );
	var i : int = skillsNames.length;
	while( i -- )
	{
		var isSpecSkill : int = IsSpecSkill( i );
		if( isSpecSkill > -1 )
		{  
			//print( isSpecSkill );
			SpSkillGroupGUI( i, skillsNames[i], isSpecSkill );
		}
		else
		{
			//print( skillsNames[i] );
			SkillGUI( i );
		}
	}
}

function DisplaySpSkills() : void
{
	var k : int = spSkills[ spSkillDisplayed ].length;
	spSkillsColumns = 1;// + Mathf.Ceil( k / spSkillsRowsMax );
	//print( spSkillsColumns  + "   " + k );
	if( spSkillDisplayed == 4 )
	{ while( k -- ){ LangGUI( k, spSkills[ spSkillDisplayed ][k], spSkillIndices[ spSkillDisplayed ] ); } }
	else{ while( k -- ){ SpSkillGUI( k, spSkills[ spSkillDisplayed ][k], spSkillIndices[ spSkillDisplayed ] ); } }
}

function SkillGUI( sk : int ) : void
{
	//set up some more variables to help position the table of skills
	//the .floor function offsets the skills into columns and rows
	
	var skY : int = skillsMenuY + sk * skillsMenuH;// - Mathf.Floor( sk / skillsRowsMax ) * skillsRowsMax * skillsMenuH;
	var skX : int = 0;//skillsMenuX + Mathf.Floor( sk / skillsRowsMax ) * skillsMenuW;
	
	var currentCharacter : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	//display the skill name
	var skillRect : Rect = Rect( skX, skY, skillsMenuW - 40, skillsMenuH );
	GUI.Label( skillRect, skillsNames[ sk ], skillsStyle4 );
	
	skillRect = Rect( skillsMenuW - 130, skY + 5, 20, 20 );
	
	//display the class skill symbol if this skill is a class skill
	//skillRect.x += 20;
	var classSkill : String = " ";
	if( chClass >= 0 ){ if( IsAClassSkill( chClass, sk ) ){ classSkill = "X"; } }
	GUI.Label( skillRect, classSkill, skillsStyle6 );
	skillRect.x += 10;
	
	//display the armor check penalty symbol if this skill
	//suffers a penalty when used while wearing armor
	var acPen : String = " ";
	if( skills[ sk ].armCPen ){ acPen = "P"; }
	GUI.Label( skillRect, acPen, skillsStyle6 );
	skillRect.x += 10;
	
	//display the untrained usable symbol if this skill is able to be used without training
	var untrSkill : String = " ";
	if( skills[ sk ].untr ){ untrSkill = "U"; }
	GUI.Label( skillRect, untrSkill, skillsStyle6 );
	skillRect.x += 15;
	
	//display the abbreviation of the key ability for this skill
	skillRect.width = 30;
	var keyAbil : String = GetComponent( Abilities ).abilitiesAbbr[ skills[ sk ].keyAb ];
	GUI.Label( skillRect, keyAbil, skillsStyle6 );
	skillRect.x += 35;
	
	//display the ranks the character has in this skill
	skillRect.width = 20;
	var ranksStr : String = "0";
	var hasThisSkill : int = HasSkill( currentCharacter, sk );
	if( hasThisSkill >= 0 )
	{
		var ranks : int = GetComponent( Characters ).characters[ currentCharacter ].skills[ hasThisSkill ][1];
		ranksStr = ranks.ToString();
	}
	GUI.Label( skillRect, ranksStr, skillsStyle6 );
	skillRect.x += 20;
	skillRect.y -= 5;
	//display a button that allows
	//the user to add a skill point
	if( GUI.Button( skillRect, "+", skButtonPlusMinusStyle ) )
	{
		//print( sk );
		AddSkillRank( currentCharacter, sk );
	}
	
	//display a button that allows the user to remove a skill point
	skillRect.x += 20;
	if( GUI.Button( skillRect, "-", skButtonPlusMinusStyle ) )
	{
		RemSkillRank( currentCharacter, sk );
	}
}

function SpSkillGUI( sk : int, skName : String, skG : int ) : void
{
	//set up some more variables to help position the table of skills
	//the .floor function offsets the skills into columns and rows
	//var rowsAbove : int = 0;
	var rowsMax : int = spSkillsRowsMax;
	//print( rowsMax );
	var skY : int = skillsMenuY + sk * skillsMenuH;// - Mathf.Floor( sk / rowsMax ) * rowsMax * skillsMenuH;
	var skX : int = 0;//skillsMenuX + Mathf.Floor( sk / rowsMax ) * ( skillsMenuW - 40 );
	
	var currentCharacter : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	
	//display the skill name
	var skillRect : Rect = Rect( skX, skY, skillsMenuW - 120, skillsMenuH );
	GUI.Label( skillRect, skName , skillsStyle4 );
	skillRect = Rect( skX, skY, 20, 20 );
	
	//display the ranks the character has in this skill
	skillRect.x += 140;
	skillRect.y += 5;
	var ranksStr : String = "0";
	var hasThisSkill : int = HasSpecSkill( currentCharacter, skG, sk );//HasSkill( currentCharacter, sk );
	//print( hasThisSkill );
	if( hasThisSkill >= 0 )
	{
		var ranks : int = GetComponent( Characters ).characters[ currentCharacter ].skills[ hasThisSkill ][1];
		//print( ranks );
		ranksStr = ranks.ToString();
	}
	GUI.Label( skillRect, ranksStr, skillsStyle6 );
	skillRect.x += 20;
	skillRect.y -= 5;
	//display a button that allows the user to add a skill point
	if( GUI.Button( skillRect, "+", skButtonPlusMinusStyle ) )
	{
		//print( skG );
		//AddSkillRank( currentCharacter, sk );
		AddSpecSkillRank( sk, currentCharacter, skG );
	}
	//display a button that allows the user to remove a skill point
	skillRect.x += 20;
	if( GUI.Button( skillRect, "-", skButtonPlusMinusStyle ) )
	{
		RemSpecSkillRank( sk, currentCharacter, skG );
	}
}

function LangGUI( sk : int, skName : String, skG : int ) : void
{
	//set up some more variables to help position the table of skills
	//the .floor function offsets the skills into columns and rows
	//these should be the same as the above function, SpSkillGUI
	//print( "language" );
	//var rowsAbove : int = 0;
	var rowsMax : int = spSkillsRowsMax;
	var skY : int = skillsMenuY + sk * skillsMenuH;// - Mathf.Floor( sk / rowsMax ) * rowsMax * skillsMenuH;// + ( rowsAbove * skillsMenuH + 20 );
	var skX : int = 0;//skillsMenuX;// + Mathf.Floor( sk / rowsMax ) * ( skillsMenuW - 40 );
	
	var currentCharacter : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	var skillRect : Rect = Rect( skX, skY, 20, 20 );
	
	//display the skill name
	//skillRect = Rect( skX, skY, 180, skillsMenuH );
	//GUI.Label( skillRect, skName, skillsStyle4 );
	
	//display a button that allows the user to add a skill point
	
	//display a button that allows the user to remove a skill point
	//skillRect.x += 20;
	

	//display the ranks the character has in this skill
	//skillRect.x += 160;
	var ranksStr : String = " ";
	var hasThisSkill : int = HasSpecSkill( currentCharacter, skG, sk );//HasSkill( currentCharacter, sk );
	//print( hasThisSkill );
	
	if( IsAutoLanguage( sk ) )
	{
		//ranksStr = " (A)";
		GUI.Label( Rect( skX, skY, 180, skillsMenuH ), skName + " (A)", skillsStyle7 );
	}
	else if( hasThisSkill > -1 )
	{
		//ranksStr = " (C)";
		if( GUI.Button( Rect( skX, skY, 180, skillsMenuH ), skName + " (C)", skillsStyle7 ) )
		{
			RemSpecSkillRank( sk, currentCharacter, skG );
		}
	}
	else
	{
		
		if( IsBonusLanguage( sk ) ){ ranksStr = " (B)"; }
		if( GUI.Button( Rect( skX, skY, 180, skillsMenuH ), skName + ranksStr ) )
		{
			//if( HasSpecSkill( currentCharacter, skG, sk ) < 0 )
			//{
				AddSpecSkillRank( sk, currentCharacter, skG );
			//}
		}
	}
	/*GUI.Label( Rect( skX + 140, skY + 4, 20, 20 ), ranksStr, skillsStyle6 );
	
	//display "A", "B" or nothing depending on whether the
	//language is an automatic language, a bonus language or neither
	//skillRect.x -= 10;
	var autoLang : String = " ";
	if( IsBonusLanguage( sk ) ){ autoLang = "B"; }
	else if( IsAutoLanguage( sk ) ){ autoLang = "A"; }
	GUI.Label( Rect( skX + 130, skY + 4, 20, 20 ), autoLang, skillsStyle6 );
	
	//display the armor check penalty symbol if this skill
	//suffers a penalty when used while wearing armor
	skillRect.x += 15;
	var acPen : String = " ";
	if( skills[ sk ].armCPen ){ acPen = "*"; }
	GUI.Label( skillRect, acPen );;
	
	
	var autoFeat : String = " ";
	if( IsInitClassFeat( chClass, ft ) )
	{
		autoFeat = " (A)";
		GUI.Label( featRect, featsNames[ ft ] + autoFeat, featsStyle5 );
	}
	else if( HasFeat( currentCharacter, ft ) > -1 )
	{
		//print( "you have " + featsNames[ ft ] );
		autoFeat = " (C)";
		if( GUI.Button( featRect, featsNames[ ft ] + autoFeat, featsStyle5 ) )
		{
			//print( "you chose to remove " + featsNames[ ft ] );
			if( chClass > -1 ){ RemFeat( ft ); }
		}
		//GUI.Label( featRect, featsNames[ ft ] + autoFeat, featsStyle5 );
		//autoFeat = "C";
		//featRect.x -= 10;
		//GUI.Label( featRect, autoFeat );
	}
	else if( FulfillsFeatReqs( currentCharacter, ft ) )
	{
		//print( "FulfillsFeatReqs" );
		autoFeat = " (P)";
		if( chClass == 4 ){ if( IsFighterFeat( ft ) ){ autoFeat = " (B)"; } }
		if( GUI.Button( featRect, featsNames[ ft ] + autoFeat ) )
		{
			//print( "you chose to add " + featsNames[ ft ] );
			if( chClass > -1 ){ AddFeat( ft ); }
		}
		//featRect.x -= 10;
		//GUI.Label( featRect, autoFeat );
	}
	else
	{
		autoFeat = " (F)";
		GUI.Label( featRect, featsNames[ ft ] + autoFeat, featsStyle4 );
	}*/
}

function SpSkillGroupGUI( sk : int, skName : String, skI : int ) : void
{
	//set up some more variables to help position the table of skills
	//the .floor function offsets the skills into columns and rows
	var rowsMax : int = skillsRowsMax;
	var skY : int = skillsMenuY + sk * skillsMenuH;// - Mathf.Floor( sk / rowsMax ) * rowsMax * skillsMenuH;
	var skX : int = 0;//skillsMenuX + Mathf.Floor( sk / rowsMax ) * skillsMenuW;
	
	var currentCharacter : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	var skillRect : Rect = Rect( skX, skY, 280, 20 );
	
	//display a button that allows the user to choose this specialized skill menu
	if( spSkillDisplayed == skI )
	{
		GUI.Label( skillRect, skName, skillsStyle5 );
	}
	else if( GUI.Button( skillRect, skName, skillsStyle3 ) )
	{
		//print( sk );
		//AddSkillRank( currentCharacter, sk );
		spSkillDisplayed = skI;
	}
	
	skillRect = Rect( skillsMenuW - 130, skY + 5, 20, 20 );
	
	//display the class skill symbol if this skill is a class skill
	//skillRect.x += 20;
	var classSkill : String = " ";
	if( chClass >= 0 ){ if( IsAClassSkill( chClass, sk ) ){ classSkill = "X"; } }
	GUI.Label( skillRect, classSkill, skillsStyle6 );
	skillRect.x += 10;
	
	//display the armor check penalty symbol if this skill
	//suffers a penalty when used while wearing armor
	var acPen : String = " ";
	if( skills[ sk ].armCPen ){ acPen = "P"; }
	GUI.Label( skillRect, acPen, skillsStyle6 );
	skillRect.x += 10;
	
	//display the untrained usable symbol if this skill is able to be used without training
	var untrSkill : String = " ";
	if( skills[ sk ].untr ){ untrSkill = "U"; }
	GUI.Label( skillRect, untrSkill, skillsStyle6 );
	skillRect.x += 15;
	
	//display the abbreviation of the key ability for this skill
	skillRect.width = 30;
	var keyAbil : String = GetComponent( Abilities ).abilitiesAbbr[ skills[ sk ].keyAb ];
	GUI.Label( skillRect, keyAbil, skillsStyle6 );
	//skillRect.x += 35;
	
	/*//display the ranks the character has in this skill
	skillRect.width = 20;
	var ranksStr : String = "0";
	var hasThisSkill : int = HasSkill( currentCharacter, sk );
	if( hasThisSkill >= 0 )
	{
		var ranks : int = GetComponent( Characters ).characters[ currentCharacter ].skills[ hasThisSkill ][1];
		ranksStr = ranks.ToString();
	}*/
}

function IsAClassSkill( chClass : int, skill : int ) : boolean
{
	if ( chClass >= 0 ) 
	{
		var clSkills : Array = GetComponent( CharacterClasses ).characterClasses[ chClass ].classSkills;
		var i : int = clSkills.length;
		while( i -- )
		{
			if( clSkills[i] == skill )
			{
				return true;
			}
		}
	}
	return false;
}

function HasSkill( cha : int, cSkill : int ) : int
{
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	if( skillsChosen.length > 0 )
	//if( skillsChosen[0] != null )
	{
		var i : int = skillsChosen.length;
		while( i -- )
		{
			if( cSkill == skillsChosen[i][0] )
			{
				return i;
			}
		}
	}
	return -1;
}

// returns the index of the specialized skill within the character's
// list of skills or -1 if the character doesn't have the skill
 function HasSpecSkill( cha : int, skill : int, spec : int ) : int
{
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	var i : int = skillsChosen.length;
	//print( i );
	while( i -- )
	{
		if( skillsChosen[i][0] == skill && skillsChosen[i][2] == spec ){ return i; }
	}
	return -1;
}

function MaxSkillRank( chaClass : int, skill : int ) : int
{	//print( GetComponent( Characters ).characters[ cha ].classes[0][0] );
	//var chaClass : int = GetComponent( Characters ).characters[ cha ].classes[0][0];
	//print( chaClass );
	/*if ( skill == 28 )
	{
		return 1;
		//if (  ) 
		{
			if ( chaCl == 3 ) { return 1; }
			else { return 0; }
		}
	}*/
	if( chaClass >= 0 )
	{
		if( IsAClassSkill( chaClass, skill ) )
		{
			//return cha.cClasses[0][1] + 3;
			//print( "4" );
			return 1 + 3;
		}
		//return ( cha.cClasses[0][1] + 3 ) / 2;
		return ( 1 + 3 ) / 2;
	}
	return 0;
}

function AddSkillRank( cha : int, skill : int ) : void
{
	var skillIndex : int = HasSkill( cha, skill );
	var chaClass : int = GetComponent( Characters ).characters[ cha ].classes[0][0];
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	//print( skill );
	if( skillPoints > 0 )
	{
		//print( skill );
		if( IsAClassSkill( chaClass, skill ) || skillPoints > 1 )
		{
			if( skillIndex >= 0 )
			{
				//print( "ok" );
				if( skillsChosen[ skillIndex ][1] < MaxSkillRank( chaClass, skill ) )
				{
					skillsChosen[ skillIndex ][1] = skillsChosen[ skillIndex ][1] + 1;
				}
			}
			else
			{
				skillsChosen.push( new Array( skill, 1, -1 ) );
			}
			UpdateSkillPoints( cha );
		}
	}
}

private function RemSkillRank( cha : int, skill : int ) : void
{
	var skillIndex : int = HasSkill( cha, skill );
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	
	if( skillIndex >= 0 )
	{
		skillsChosen[ skillIndex ][1] = skillsChosen[ skillIndex ][1] - 1;
		if( skillsChosen[ skillIndex ][1] < 1 )
		{
			skillsChosen.Splice( skillIndex, 1 );
		}
		else
		{
			
		}
		UpdateSkillPoints( cha );
	}
}

function AddSpecSkillRank( specSkill : int, cha : int, skill : int ) : void
{
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	var skillIndex : int = HasSpecSkill( cha, skill, specSkill );
	var characterClass : int = GetComponent( Characters ).characters[ cha ].classes[0][0];
	//print( skillsNames[ skill ] + "    " + spSkills[ IsSpecSkill( skill ) ][ specSkill ] );

	if( skillPoints > 0 )
	{
		
		if( IsAClassSkill( characterClass, skill ) || skillPoints > 1 )
		{
			if( skillIndex >= 0 )
			{
				if( skillsChosen[ skillIndex ][1] < MaxSkillRank( characterClass, skill ) )
				{
					if ( skillsChosen[ skillIndex ][0] == 28 && skillsChosen[ skillIndex ][1] > 0 ){}//do nothing
					else
					{
						skillsChosen[ skillIndex ][1] = skillsChosen[ skillIndex ][1] + 1;
					}
				}
			}
			else
			{
				skillsChosen.push( new Array( skill, 1, specSkill ) );
			}
			UpdateSkillPoints( cha );
		}
	}
}


function RemSpecSkillRank( specSkill : int, cha : int, skill : int ):void
{
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	var skillIndex : int = HasSpecSkill( cha, skill, specSkill );
	if( skillIndex >= 0 )
	{
		skillsChosen[ skillIndex ][1] = skillsChosen[ skillIndex ][1] - 1;
		if( skillsChosen[ skillIndex ][1] < 1 )
		{
			skillsChosen.splice( skillIndex, 1 );
			//TextField( targetStage.getChildByName( "spSkRanks_" + specSkill ) ).text = "0";
		}
		else
		{
			//TextField( targetStage.getChildByName( "spSkRanks_" + specSkill ) ).text = String( skillsChosen[ skillIndex ][1] );
		}
		//var spSkRanks_fmt:TextFormat = new TextFormat();
		//spSkRanks_fmt.size = 10;
		//spSkRanks_fmt.font = "Franklin Gothic Medium";
		//TextField( targetStage.getChildByName( "spSkRanks_" + specSkill ) ).setTextFormat( spSkRanks_fmt );
		UpdateSkillPoints( cha );
	}
}

// This fuction recalculates the number of skill points available
// when changes that would affect the skill point total are made.
// It also reduces the ranks of skills if not enough skill points
// are available to buy the current ranks after a change is made.
// Functions that activate this function are:
// CharacterClassManager.onClickClasses();
// RaceManager.onClickClasses();
// AbilitiesManager.addAbilityPoint();
// AbilitiesManager.subAbilityPoint();
// addSkillRank(); remSkillRank();
// addSpecSkillRank(); remSpecSkillRank();
function UpdateSkillPoints( cha : int ) : void
{
	var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
	var chaClass : int = GetComponent( Characters ).characters[ cha ].classes[0][0];//get the character class
	var chaRace : int = GetComponent( Characters ).characters[ cha ].race;//get the character race
	var intel : int = GetComponent( Characters ).characters[ cha ].abilityScores[3];//get the intelligence score
	//print( intel );
	var intMod : int = GetComponent( Abilities ).AbilityModifier( intel );//get the intelligence modifier
	var bonusLanguagePoints : int = intMod;//characters gets a number of bonus languages based on their intelligence modifier...
	var languageRanks : int = 0;
	if ( bonusLanguagePoints < 0 ){ bonusLanguagePoints = 0; }//...but it can't be less than zero
	
	if( chaClass >= 0 )//make sure a character class has been chosen
	{
		//determine the starting skill point allowance
		var currentSkillPoints : int = ( GetComponent( CharacterClasses ).characterClasses[ chaClass ].skillPoints + intMod ) * 4;
		
		if( chaRace == 6 ){ currentSkillPoints += 4; }//if the character's race is human add 4 extra skill points
		
		if( currentSkillPoints < 0 ){ skillPoints = 0; }//character can't have less than zero skill points
		//print( currentSkillPoints );
		var i : int = skillsChosen.length;//how many skills has the character chosen?
		while( i -- )//iterate through the list if chosen skills (backwards)
		{
			var sPMulti : int = 1;//cost multiplier for skill points
			var skill : int = skillsChosen[i][0];//which skill are we determining the skill point cost of?
			var skillRemoved : boolean = false;
			var sMax : int = MaxSkillRank( chaClass, skill );//maximum rank for the skill
			//print( sMax + "   " + skill );
			if ( skillsChosen[i][1] > sMax ) { skillsChosen[i][1] = sMax; }//reduce the skill rank to the maximum if it is above the max
			//if this is not a class skill make it cost twice as much per rank.
			if( ! IsAClassSkill( chaClass, skill ) ){ sPMulti = 2; }
			var skillPointsCost : int = sPMulti * skillsChosen[i][1];//determine the cost by multiplying the cost per rank by the ranks
			var skillRanks : String = "";

			//deal with language skill differences to other normal and specialized skills
			if ( skillsChosen[i][0] == 28 )//is this skill a language?
			{
				sMax = 1;//the max rank for a sub skill of the language skill is 1
				if ( IsAutoLanguage( skillsChosen[i][2] ) )//is it a language the character gets automatically
				{
					skillPointsCost = 0;
					skillRanks = "1";
				}
				else if ( IsBonusLanguage( skillsChosen[i][2] ) && bonusLanguagePoints > 0 )//is it a bonus language and are there enough bonus language points left
				{
						skillPointsCost = 0;
						skillRanks = "1";
						bonusLanguagePoints --;
				}
				else if ( languageRanks >= MaxSkillRank( chaClass, 28 ) )//you can't have more language ranks ( apart from intelligence bonus and automatic languages ) than your maximum rank for the language skill
				{
					skillPointsCost = 0;
					skillRanks = "0";
					skillRemoved = true;
				}
				else
				{
					languageRanks ++;
					//trace( languageRanks );
				}
			}/**/

			if( skillPointsCost <= currentSkillPoints && ! skillRemoved )//if there are enough skill points left to buy the rank of the current skill that has been chosen...
			{
				currentSkillPoints -= skillPointsCost;//...lower the skill points by the cost to buy the ranks of the current skill.
				var skillChosen : int = skillsChosen[i][1];
				//skillRanks = skillChosen.ToString();//and update the text field that shows the ranks in the current skill.
			}
			else//if there aren't enough skill points left to buy the current skill's rank...
			{
				if( Mathf.Floor( currentSkillPoints / sPMulti ) > 0 && ! skillRemoved )//...are there enough skill points left to buy any ranks?...
				{
					skillsChosen[i][1] = Mathf.Floor( currentSkillPoints / sPMulti );//...set the rank to be the maximum that can be bought with the remaining skill points
					if ( skillsChosen[i][1] > sMax ) { skillsChosen[i][1] = sMax; }//but make sure the rank isn't above the maximum allowable rank
					currentSkillPoints -= skillsChosen[i][1] * sPMulti;//determine the cost by multiplying the cost per rank by the ranks, and subtract the cost from the available skill points
					var skChosen : int = skillsChosen[i][1];
					skillRanks = skChosen.ToString();
				}
				else//there aren't enough skill points left to buy any ranks in the current skill...
				{
					skillRanks = "0";
					skillRemoved = true;
				}
			}
			if ( skillRemoved ) 
			{
				skillsChosen.splice( i, 1 );//and remove the skill from the list of chosen skills
			}
		}
		if( currentSkillPoints < 0 ) { currentSkillPoints = 0; }
		skillPoints = currentSkillPoints;//set the higher up variable to show how many skill points are now available
		//langRanks = languageRanks;//set the higher up variable to show how many ranks in the language skill the character has
	}
}

function IsSpecSkill( sk : int ) : int
{
	var i : int = spSkillIndices.length;
	//print( i );
	while( i -- )
	{
		//print( sk + "    " +spSkillIndices[i] );
		if( sk == spSkillIndices[i] )
		{
			return i;
		}
	}
	return -1;
}

function IsAutoLanguage( lang : int ) : boolean
{
	
	var chCla : int = GetComponent( Characters ).characters[ GetComponent( Characters ).character ].classes[0][0];//get the character class
	//barbarians are the only illiterates
	if ( lang == 0 )
	{
		if ( chCla == 0 ) { return false; }
		else { return true; }
	}
	//druids get druidic for free
	if ( lang == 7 )
	{
		if ( chCla == 3 ) { return true; }
		else { return false; }
	}

	var race : int = GetComponent( Characters ).characters[ GetComponent( Characters ).character ].race;//get the character race
	if ( race >= 0 ) 
	{
		var autoLanguages : Array = GetComponent( Races ).races[ race ].automaticLanguages;//get the race's automatically known languages
		var i : int = autoLanguages.length;
		while ( i -- )
		{
			//print( bonLanguages[i] + "    " + lang );
			if ( autoLanguages[i] == lang ) { return true; }
		}
	}

	return false;
}

function IsBonusLanguage( lang : int ) : boolean
{
	
	if ( lang == 0 ) { return false; }
	var chCla : int  = GetComponent( Characters ).characters[ GetComponent( Characters ).character ].classes[0][0];//get the character class

	var race : int = GetComponent( Characters ).characters[ GetComponent( Characters ).character ].race;//get the character race
	//humans and half elves can choose any language as a bonus language
	if ( race == 3 || race == 6 ) { return true; }

	//cleric outsider languages
	if ( chCla == 2 ){ if ( lang == 1 || lang == 4 || lang == 16 ){ return true; } }
	//druid sylvan language
	if ( chCla == 3 ) { if ( lang == 18 ) { return true; } }
	//wizard draconic language
	if ( chCla == 10 ) { if ( lang == 6 ) { return true; } }

	// check the bonus languages for all the other races
	//trace( race );
	if ( race >= 0 ) 
	{
		var bonLanguages : Array = GetComponent( Races ).races[ race ].bonusLanguages;
		var i : int = bonLanguages.length;
		while ( i -- )
		{
			//trace( bonLanguages[i] + "    " + lang );
			if ( bonLanguages[i] == lang ) { return true; }
		}
	}

	return false;
}
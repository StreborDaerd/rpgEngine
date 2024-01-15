import System.IO;
import System.Xml;

var feats = new Array();
var featsNames : String[];
var feat = 0;

private var featPoints : int = 0;

//private var featsMenuX : int = 200;
//private var featsMenuY : int = 150;
private var featsMenuX : int = 0;
private var featsMenuY : int = 0;
private var featsMenuW : int = 260;
private var featsMenuH : int = 20;

private var spFeatsMenuW : int = 200;

var featsRowsMax : int = 7;
var featsColumns : int = 1;
var spFeatsRowsMax : int = 7;
var spFeatsColumns : int = 1;

var featsStyle1 : GUIStyle;
var featsStyle2 : GUIStyle;
var featsStyle3 : GUIStyle;
var featsStyle4 : GUIStyle;
var featsStyle5 : GUIStyle;
var featsStyle6 : GUIStyle;

var featsDisplayed = true;

public var weaponSpecs : Array = new Array( 22, 31, 40, 74, 75, 76 );

var spFeatName : String = "spFeatName";
var spFeat : int = 22;
var spFeatDisplayed : int = 2;

var mgFeat : int = 22;
var mgFeatDisplayed : int = 0;

//var skFeat : int = 22;
var skFeatDisplayed : int = 4;

var wpFeat : int = 22;
var wpFeatDisplayed : int = 0;


function Start()
{
	//var featsXmlFile = new WWW("file://" + Application.persistentDataPath + "/feats.xml");
	var featsXmlFile = new WWW("file://" + Application.dataPath + "/rpgXML/feats.xml");
	yield featsXmlFile;
	
	InitFeats( featsXmlFile.text );
	featsStyle1 = GetComponent( GUIStuff ).style1;
	featsStyle2 = GetComponent( GUIStuff ).style2;
	featsStyle3 = GetComponent( GUIStuff ).style3;
	featsStyle4 = GetComponent( Alignments ).alignmentsStyle1;
	featsStyle5 = GetComponent( Alignments ).alignmentsStyle2;
	featsStyle6 = GetComponent( Skills ).skillsStyle5;
}


//returns the weaponSpecs array index of a specialized feat given its feats index
function WpSpFtIndex( ft : int ) : int
{
	var i : int = weaponSpecs.length;
	while( i -- )
	{
		if( weaponSpecs[i] == ft ){ return i; }
	}
	//this would be a good place to throw an error
	return -1;
}

function DisplayFeatsKey() : void
{
	//the titles, points and key of the statistics table go here
	//var skillPointsRect : Rect = Rect( skillsMenuX, skillsMenuY - 25, 60, skillsMenuH );
	var rect : Rect = Rect( 75, 0, 120, featsMenuH * 2 );
	GUI.Label( rect, "FEATS", featsStyle2 );
	
	var pointsRect : Rect = Rect( 160, 0, 60, featsMenuH + 4 );
	GUI.Label( pointsRect, "FEAT POINTS", featsStyle1 );
	pointsRect.x += 40;
	GUI.Label( pointsRect, ":" + featPoints, featsStyle2 );
	
	/*pointsRect = Rect( 70, 0, featsMenuW / 2, featsMenuH );
	//skillPointsRect = Rect( 100, 20, skillsMenuW / 2, skillsMenuH );
	//pointsRect.x += 80;
	GUI.Label( pointsRect, "(A) = automatic", featsStyle1 );
	
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(B) = bonus", featsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 80;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(C) = chosen", featsStyle1 );
	pointsRect.x += 80;
	pointsRect.y -= 20;
	GUI.Label( pointsRect, "(P) = pass", featsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 240;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(F) = fail", featsStyle1 );*/
}

function DisplaySpFeatsKey() : void
{
	var ch : int = GetComponent( Characters ).character;
	var pointsRect : Rect = Rect( 0, 5, 60, featsMenuH );
	GUI.Label( pointsRect, "FEAT POINTS", featsStyle1 );
	pointsRect.x += 40;
	labelStr = " :" + GetComponent( Characters ).characters[ ch ].featPoints;
	GUI.Label( pointsRect, labelStr, featsStyle2 );
	
	pointsRect = Rect( 70, 0, featsMenuW / 2, featsMenuH );
	//skillPointsRect = Rect( 100, 20, skillsMenuW / 2, skillsMenuH );
	//pointsRect.x += 80;
	GUI.Label( pointsRect, "(A) = automatic", featsStyle1 );
	
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(B) = bonus", featsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 80;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(C) = chosen", featsStyle1 );
	pointsRect.x += 80;
	pointsRect.y -= 20;
	GUI.Label( pointsRect, "(P) = pass", featsStyle1 );
	
	//pointsRect = Rect( featsMenuX + featsMenuW, featsMenuY - 25, 160, featsMenuH );
	//pointsRect.x += 240;
	pointsRect.y += 10;
	GUI.Label( pointsRect, "(F) = fail", featsStyle1 );
}

function DisplayFeats() : void
{		
	UpdateFeatPoints();
	//WpSpFtIndex( ft : int )
	wpFeat = weaponSpecs[ wpFeatDisplayed ];
	var i : int = featsNames.length;
	featsRowsMax = i;
	featsColumns = 1;// + Mathf.Ceil( i / featsRowsMax );
	while( i -- )
	{
		FeatGUI( i );
	}
}
//not used?
function DisplaySpFeats() : void
{		
	switch( spFeatDisplayed )
	{
		case 0:
		
		break;
		case 1:
		
		break;
		case 2:
			DisplayWpFeats();
		break;
	}
	
	/*var ch : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	var ft : int = wpFeat;
	//var rowStartX : int = 0;
	//var rowStartY : int = 0;
	var rowsMax : int = spFeatsRowsMax;
	var lineHeight : int = featsMenuH;
	var rowWidth : int = spFeatsMenuW;
	
	
	
	var i : int = GetComponent( Weapons ).weapons.length;
	//print( i );
	spFeatsColumns = 1;// + Mathf.Ceil( i / spFeatsRowsMax );
	//print( spFeatsColumns );
	while( i -- )
	{
		var wY : int = i * lineHeight;// - Mathf.Floor( i / rowsMax ) * rowsMax * lineHeight;
		var wX : int = 0;//Mathf.Floor( i / rowsMax ) * rowWidth;
		SpFeatGUI( i, ft, wX, wY, ch, chClass );
	}*/
}

function DisplaySkFeats() : void
{		
	var ch : int = GetComponent( Characters ).character;
	var chCl : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	
	var rowsMax : int = spFeatsRowsMax;
	var lineHeight : int = featsMenuH;
	var rowWidth : int = spFeatsMenuW;
	
	var i : int = 0;
	//print( i );
	spFeatsColumns = 1;// + Mathf.Ceil( i / spFeatsRowsMax );
	
	//is the user choosing a standard skill? 
	if( skFeatDisplayed == 4 )
	{
		i = GetComponent( Skills ).skills.length;
		while( i -- )
		{
			var pY : int = i * lineHeight;// - Mathf.Floor( i / rowsMax ) * rowsMax * lineHeight;
			var pX : int = 0;//Mathf.Floor( i / rowsMax ) * rowWidth;
			
			SkFeatGUI( ch, chCl, i, -1, pX, pY );
		}
	}
	else//the user is not choosing a standard skill
	{
		var spSkills : Array = new Array();
		var spSkill : int = 5;
		switch( skFeatDisplayed )
		{
			case 0:
				spSkills = GetComponent( Skills ).crafts;
				spSkill = 5;
			break;
			case 1:
				spSkills = GetComponent( Skills ).knowledges;
				spSkill = 18;
			break;
			case 2:
				spSkills = GetComponent( Skills ).performances;
				spSkill = 22;
			break;
			case 3:
				spSkills = GetComponent( Skills ).professions;
				spSkill = 23;
			break;
		}
		
		i = spSkills.length;
		
		while( i -- )
		{
			var pY1 : int = i * lineHeight;// - Mathf.Floor( i / rowsMax ) * rowsMax * lineHeight;
			var pX1 : int = 0;//Mathf.Floor( i / rowsMax ) * rowWidth;
			
			SpSkFeatGUI( ch, chCl, spSkill, spSkills[i], i, pX1, pY1 );
		}
	}
}

function DisplayWpFeats() : void
{		
	var ch : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	var ft : int = wpFeat;
	//var rowStartX : int = 0;
	//var rowStartY : int = 0;
	var rowsMax : int = spFeatsRowsMax;
	var lineHeight : int = featsMenuH;
	var rowWidth : int = spFeatsMenuW;
	
	var i : int = GetComponent( Weapons ).weapons.length;
	//print( i );
	spFeatsColumns = 1;// + Mathf.Ceil( i / spFeatsRowsMax );
	//print( spFeatsColumns );
	while( i -- )
	{
		var wY : int = i * lineHeight;// - Mathf.Floor( i / rowsMax ) * rowsMax * lineHeight;
		var wX : int = 0;//Mathf.Floor( i / rowsMax ) * rowWidth;
		WpFeatGUI( i, ft, wX, wY, ch, chClass );
	}
}

function FeatGUI( ft : int ) : void
{
	//set up some more variables to help position the table of skills
	//the .floor function offsets the skills into columns and rows
	var rowsMax : int = featsRowsMax;
	var ftY : int = featsMenuY + ft * featsMenuH - Mathf.Floor( ft / rowsMax ) * rowsMax * featsMenuH;
	var ftX : int = featsMenuX + Mathf.Floor( ft / rowsMax ) * featsMenuW;
	
	var currentCharacter : int = GetComponent( Characters ).character;
	var chClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	
	//var featRect : Rect = Rect( ftX, ftY, 20, 20 );
	
	//display the feat name
	//featRect = Rect( ftX + 45, ftY, featsMenuW, featsMenuH );
	//featRect = Rect( ftX, ftY, featsMenuW, featsMenuH );
	var featRect : Rect = Rect( ftX, ftY, featsMenuW, featsMenuH );
	
	//display "A", "B", "C" or nothing depending on whether the
	//feat is automatic, a bonus feat, chosen, or not selected
	
	var autoFeat : String = " ";
	if( IsInitClassFeat( chClass, ft ) )
	{
		autoFeat = " (A)";
		GUI.Label( featRect, featsNames[ ft ] + autoFeat, featsStyle5 );
	}
	else if( IsWeapSpecFeat( ft ) )
	{
		//is this the special feat that is currently displayed?
		if( wpFeat == ft )
		{
			//display a label instead of a button
			GUI.Label( featRect, featsNames[ ft ] + autoFeat, featsStyle6 );
		}
		else if( GUI.Button( featRect, featsNames[ ft ] + autoFeat ) )
		{
			//print( "you chose " + featsNames[ ft ] );
			//if( chClass > -1 ){ RemFeat( ft ); }
			wpFeatDisplayed = WpSpFtIndex( ft );
			spFeat = ft;
		}
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
	}
	else
	{
		autoFeat = " (F)";
		GUI.Label( featRect, featsNames[ ft ] + autoFeat, featsStyle4 );
	}
}

function SkFeatGUI( ch : int, chCl : int, sk : int, spSk : int, pX : int, pY : int ) : void
{
	var isSpecSkill : int = GetComponent( Skills ).IsSpecSkill( sk );
	
	var menuRect : Rect = Rect( pX, pY, spFeatsMenuW, featsMenuH );
		
	var name : String = GetComponent( Skills ).skillsNames[ sk ];
	
	if( isSpecSkill < 0 )
	{
		var hasFeat : int = -1;
		
		if( chCl > -1){ hasFeat = HasSpecFeat( ch, 61, sk ); }
		
		if( hasFeat < 0 )
		{
			if( GUI.Button( menuRect, name ) )
			{
				if( chCl > -1 )
				{
					AddWeaponFeat( ch, 61, sk );
				}
			}
			/*
			var hasSkFeat : int = GetComponent( Characters ).characters[ ch ].feats[ hasFeat ][1];
			if( hasSkFeat != sk )
			{
				
				if( GUI.Button( menuRect, name ) )
				{
					if( chCl > -1 )
					{
						AddWeaponFeat( ch, 61, sk );
					}
				}
				
			}
			else//the character has the skill focus feat for this skill
			{
				//create a button to allow the removal of this feat
				if( GUI.Button( menuRect, name + " (C)", featsStyle5 ) )
				{
					if( chCl > -1 )
					{
						RemWeaponFeat( ch, 61, sk );
					}
				}
				
			}*/
		}
		else
		{
			if( GUI.Button( menuRect, name + " (C)", featsStyle5 ) )
			{
				if( chCl > -1 )
				{
					RemWeaponFeat( ch, 61, sk );
				}
			}
		}
	}
	else
	{
		 if( isSpecSkill == skFeatDisplayed )
		 {
		 	GUI.Label( menuRect, name + " (S)", featsStyle6 );
		 }
		 else if( GUI.Button( menuRect, name + " (S)" ) )
		 {
		 	//print( "can't add feats for specialized skills yet" );
		 	skFeatDisplayed = isSpecSkill;
		 }
		 
	}
	
}

//SpSkFeatGUI( ch, chCl, i, spSkills[i], spSkill, pX1, pY1 );
function SpSkFeatGUI( ch : int, chCl : int, sk : int, name : String, spSk : int, pX : int, pY : int ) : void
{
	var menuRect : Rect = Rect( pX, pY, spFeatsMenuW, featsMenuH );
	
	//var name : String = GetComponent( Skills ).skillsNames[ sk ];

	var hasFeat : int = -1;
	
	if( chCl > -1){ hasFeat = HasSpSkFeat( ch, sk, spSk ); }
	
	if( hasFeat < 0 )
	{
		if( GUI.Button( menuRect, name ) )
		{
			if( chCl > -1 )
			{
				//print( "can't add feats for specialized skills yet" );
				AddSpSkFeat( ch, sk, spSk );
			}
		}
	}
	else
	{
		if( GUI.Button( menuRect, name + " (C)", featsStyle5 ) )
		{
			if( chCl > -1 )
			{
				RemSpSkFeat( ch, sk, spSk );
			}
		}
	}
}

function WpFeatGUI( wIndex : int, wFt : int, wX : int, wY : int, ch : int, chClass : int ) : void
{
	var menuRect : Rect = Rect( wX, wY, spFeatsMenuW, featsMenuH );
	
	//are we choosing this weapon's feat type?
	var pTypes : Array = GetComponent( Weapons ).weapons[ wIndex ].profTypes;
	var wpName : String = GetComponent( Weapons ).weaponsNames[ wIndex ];
	var i : int = pTypes.length;
	var chooseThisWFt : boolean = false;
	var remThisWFt : boolean = false;

	var key : String = "";
	
	var wHand : int = GetComponent( Weapons ).CalcWeaponHand( ch, wIndex );
	
	//is the character big enough to use the weapon?
	if( wHand < 0 )
	{
		GUI.Label( menuRect, wpName + " (L)", featsStyle4 );
	}
	//martial or exotic
	else if( wFt == 22 || wFt == 40 )
	{
		var featGivesProficiency : boolean = false;
		while( i -- )//check each of the feats that give proficiency in this weapon
		{
			
			if( pTypes[i] == wFt )//is this feat the same as the current iteration's feat
			{
				//this records that a match has been found and that proficiency
				//is gainable with this weapon through the current feat to let the
				//routine know to whether or not to add a label later
				featGivesProficiency = true;
				 
				//yes we are choosing this weapon's feat type
				//chooseThisWFt = true;
				//check if the character can use this weapon? Eg size or minimum attack bonus
			
				//but does the character already have proficiency in this weapon?
				if( HasProficiency( ch, wIndex ) )
				{
					//you can't remove a feat automatically granted by you class
					if( IsInitClassFeat( chClass, wFt ) )
					{
						//remThisWFt = false;
						//chooseThisWFt = false;
						//so just display the same as the autofeats in the non-specialized lists
						GUI.Label( menuRect, wpName + " (A)", featsStyle5 );
					}
					//but this a chosen feat
					else
					{
						//remThisWFt = true;
						//chooseThisWFt = false;
						//auto = " (C)";
						//so diplay the remove button
						if( GUI.Button( menuRect, wpName + " (C)", featsStyle5 ) )
						{
							if( chClass > -1 )
							{
								RemWeaponFeat( ch, wFt, wIndex );
							}
						}
					}
				}
				else if( ! FulfillsFeatReqs( ch, wFt ) )
				{
					GUI.Label( menuRect, wpName + " (F)", featsStyle4 );
				}
				else if( GUI.Button( menuRect, wpName ) )
				{
					if( chClass > -1 )
					{
						AddWeaponFeat( ch, wFt, wIndex );
						//print( wpName + " has been added" );
					}
				}
			}
				
		}
		
		if( ! featGivesProficiency )
		{
			//print( feats[ wFt ].id + "  " + wpName );
			GUI.Label( menuRect, wpName + " (D)", featsStyle4 );
		}
	}
	
	else
	{
		if( wFt == 74 )//weapon finesse
		{
			if( CanFinesse( ch, wIndex ) )
			{
				
				if( HasSpecFeat( ch, wFt, wIndex ) < 0 )
				{
					key = " (C)";
					chooseThisWFt = true;
					
				}
				else
				{
					key = " (P)";
					remThisWFt = true;
				}
			}
		}
		else if( wFt == 75 || wFt == 31 )//weapon focus and improved critical
		{
			if( HasProficiency( ch, wIndex ) )
			{
				if( HasSpecFeat( ch, wFt, wIndex ) < 0 )
				{
					chooseThisWFt = true;
				}
				else
				{
					remThisWFt = true;
				}
			}
		}
		else if( wFt == 76 )//weapon specialization
		{
			if( chClass == 4 )
			{
				//requires weapon focus
				if( HasSpecFeat( ch, 75, wIndex ) >= 0 )
				{
					//is the character already specialized in this weapon
					if( HasSpecFeat( ch, wFt, wIndex ) < 0 )
					{ chooseThisWFt = true; } else { remThisWFt = true; } 
				}
			}
		}
		
		if( ! FulfillsFeatReqs( ch, wFt ) )
		{
			GUI.Label( menuRect, wpName + " (F)", featsStyle4 );
		}
		else if( ! chooseThisWFt && ! remThisWFt )
		{
			/*this[ wFtName ].htmlText = weapons[ wIndex ].id;
			this[ wFtName ].border = true;
			this[ wFtName ].backgroundColor = 0xFF0000;
			this[ wFtName ].background = true;
			wFtName.setBGColor( 0xFF0000 );*/
			//if( GUI.Button( menuRect, wpName ) )
			//{
			//	if( chClass > -1 ){ print( wpName + " has other requirements" ); }
			//}
			//autoFeat = " (F)";
			/*if( GUI.Button( featRect, featsNames[ ft ] + autoFeat ) )
			{
				if( chClass > -1 ){ print( featsNames[ ft ] + " has other requirements" ); }
			}*/
			GUI.Label( menuRect, wpName + key, featsStyle4 );
		}
		else if( chooseThisWFt )
		{
			if( GUI.Button( menuRect, wpName + " (P)" ) )
			{
				if( chClass > -1 )
				{
					AddWeaponFeat( ch, wFt, wIndex );
					//print( wpName + " has been added" );
				}
			}
		}
		else
		{
			if( GUI.Button( menuRect, wpName + " (C)", featsStyle5 ) )
			{
				if( chClass > -1 )
				{
					RemWeaponFeat( ch, wFt, wIndex );
				}
			}
		}
	}
}

function InitFeats( featsXmlFileText ) : void
{
	var featsXml = new XmlDocument();
	var featsNamesArray = new Array();
	
	featsXml.LoadXml( featsXmlFileText );
	
	var featNode = featsXml.FirstChild.NextSibling.FirstChild;
	
	while ( featNode )
	{
		var ftName:String = featNode.ChildNodes[0].InnerText;
		var ftType:int = int.Parse( featNode.ChildNodes[1].InnerText );
		var ftPrereqs:Array = new Array();
		var prereqNode = featNode.ChildNodes[2].FirstChild;
		while ( prereqNode )
		{
			var prType : int = int.Parse( prereqNode.ChildNodes[0].InnerText );
			var prSubType : int = int.Parse( prereqNode.ChildNodes[1].InnerText );
			var prMin : int = int.Parse( prereqNode.ChildNodes[2].InnerText );
			var prereq = new Prereq( prType, prSubType, prMin );
			ftPrereqs.push( prereq );
			prereqNode = prereqNode.NextSibling;
		}
		var feat = new Feat( ftName, ftType, ftPrereqs );
		feats.push( feat );
		featsNamesArray.push( ftName );
		
		featNode = featNode.NextSibling;
	}
	
	featsNames = featsNamesArray.ToBuiltin( String );
}

function IsInitClassFeat( chClass : int, feat : int ) : boolean
{
	if( chClass > -1 )
	{
		var initClassFeats : Array = GetComponent( CharacterClasses ).characterClasses[ chClass ].initialFeats;
		var i : int = initClassFeats.length;
		while( i -- )
		{
			if( initClassFeats[i] == feat )
			{
				return true;
			}
		}
	}
	return false;
}

public function HasFeat( cha : int, cFeat : int ) : int
{
	var featsChosen : Array = GetComponent( Characters ).characters[ cha ].feats;
	var i : int = featsChosen.length;
	//if( featsChosen[0] != null )
	//{
		
		while( i -- )
		{
			if( cFeat == featsChosen[i][0] )
			{
				return i;
			}
		}
	//}
	return -1;
}

function HasFeats( cha : int, chCla : int, ft : int ) : Array
{
	
	var ftIndexes : Array = new Array();
	
	
	var featsChosen : Array = GetComponent( Characters ).characters[ cha ].feats;
	//var featsAuto : Array = GetComponent( CharacterClasses ).characterClasses[ chCla ].initialFeats;
	//var featsAll : Array = new Array();
	//featsAll = featsAll.Concat( featsChosen );
	//featsAll = featsAll.Concat( featsAuto );
	var i : int = featsChosen.length;
	while( i -- )
	{
		//print( i );
		if( featsChosen[i][0] == ft )
		{
			ftIndexes.Push( i );
		}
	}
	//print( chCla );
	var featsAuto : Array = GetComponent( CharacterClasses ).characterClasses[ chCla ].initialFeats;
	i = featsAuto.length;
	//print( i );
	while( i -- )
	{
		//print( i );
		if( featsAuto[i] == ft )
		{
			ftIndexes.Push( new Array( featsAuto[i], -1 ) );
		}
	}
	return ftIndexes;
}

function FulfillsFeatReqs( cha : int, feat : int ) : boolean
{
	var prereqs : Array = feats[ feat ].prereqs;
	//var newCha:Character = characters[ currentCharacter ];
	var i : int = prereqs.length;
	while( i -- )
	{
		var fulfillsPrereq : boolean = FulfillsFeatReq( cha, feat, i );
		if( ! fulfillsPrereq )
		{
			return false;
		}
	}
	return true;
}

function FulfillsFeatReq( cha: int, ft : int, prereq : int ) : boolean
{
	var featPrq : Prereq = feats[ ft ].prereqs[ prereq ];
	var fFR : boolean = true;
	switch( featPrq.prqType )
	{
		case 0:
		var abilityScores : Array = GetComponent( Characters ).characters[ cha ].abilityScores;
		if( abilityScores[ featPrq.prqSubtype ] < featPrq.prqMin ){ fFR = false; }// print( "Ability score not high enough" );
		break;

		case 1:
		if( HasFeat( cha, featPrq.prqSubtype ) < 0 ){ fFR = false; }//print( "Don't have a required feat" );
		break;

		case 2:
		var hasReqSkill : int = GetComponent( Skills ).HasSkill( cha, featPrq.prqSubtype );
		if( hasReqSkill < 0 ){ fFR = false; break; }//print( "Don't have a required skill" );
		var skillsChosen : Array = GetComponent( Characters ).characters[ cha ].skills;
		if( skillsChosen[ hasReqSkill ][1] < featPrq.prqMin ){ fFR = false; }//print( "Don't have a required skill rank" );
		break;

		case 3:
		//fFR = false;
		
		if( featPrq.prqSubtype == 0 ){ if( GetComponent( Attributes ).CalcStartBAB( cha ) < featPrq.prqMin ){ fFR = false; } }//print( "Don't have the required attack bonus" );
		if( featPrq.prqSubtype == 1 ){ fFR = false; }//{ if( calcCasterLevel( 0 ) < featPrq.prqMin ){ fFR = false; } }
		if( featPrq.prqSubtype == 2 ){ fFR = false; }//{ if( calcTurnerLevel( 0 ) < featPrq.prqMin ){ fFR = false; } }
		//if( featPrq.prqSubtype == 3 ){ if( calcTotalLevel( 0 ) < featPrq.prqMin ){ fFR = false; } }
		break;

		case 4:
		var characterClass : int = GetComponent( Characters ).characters[ cha ].classes[0][0];
		if( featPrq.prqSubtype != characterClass ){ fFR = false; break; }//print( "Don't have a required class" );
		/*var hasReqClass:int = hasClass( cha, featPrq.prqSubtype );
		if( hasReqClass < 0 ){ fFR = false; break; }
		if( cha.cClasses[ hasReqClass ][1] < featPrq.prqMin ){ fFR = false; }*/
		break;

		case 5:
		//movement and body prerequisites
		//has more than two arms, automatically false, will have to add number of arms to race class later
		if( featPrq.prqSubtype == 0 ){ fFR = false; }
		//has fly speed, automatically false, will have to add flying speed to race and character classes later
		if( featPrq.prqSubtype == 1 ){ fFR = false; }
		break;
	}
	return fFR;
}

public function UpdateClassFeats( cha : int, oldClass : int, newClass : int ) : void
{
	var newClassFeats  : Array = GetComponent( CharacterClasses ).characterClasses[ newClass ].initialFeats;
	var featsChosen : Array = GetComponent( Characters ).characters[ cha ].feats;
	//remove the previous class' feats
	if ( oldClass >= 0 )
	{
		var oldClassFeats : Array = GetComponent( CharacterClasses ).characterClasses[ oldClass ].initialFeats;
		var i : int = oldClassFeats.length;
		while ( i -- )
		{
			var j : int = featsChosen.length;
			while ( j -- )
			{
				if ( featsChosen[j][0] == oldClassFeats[i] )
				{
					featsChosen.splice( j, 1 );
				}
			}
		}

		//remove any of the new class' free feats so 
		//we don't double up when we add them in later
		var k : int = newClassFeats.length;
		while( k -- )
		{
			var l : int = featsChosen.length;
			while( l -- )
			{
				if( featsChosen[l][0] == newClassFeats[k] )
				{
					featsChosen.Splice( l, 1 );
				}
			}
		}
	}

	//add all the free feats of the new class
	var m : int = newClassFeats.length;
	while( m -- )
	{
		var featArray : Array = new Array();
		featArray[0] = newClassFeats[m];
		featArray[1] = -1;
		featsChosen.push( featArray );
	
	}
}

function AddFeat( feat : int  ) : void
{
	//hideListButtons();

	//var feat : int = e.target.id;
	
	//print( "you chose to add " + featsNames[ feat ] );
	
	var fp : int = featPoints;

	var mustChooseFighterFeat : boolean = false;
	var isFighterFt : boolean = IsFighterFeat( feat );
	//var hasFighterFt:Boolean = hasFighterFeat( currentCharacter );
	
	var isFighter : boolean = false;
	//if ( characters[ currentCharacter ].cClasses[0][0] == 4 ) { isFighter = true; }
	
	var currentCharacter : int = GetComponent( Characters ).character;
	var hasFighterFt : boolean = HasFighterFeat( currentCharacter );
	var characterClass : int = GetComponent( Characters ).characters[ currentCharacter ].classes[0][0];
	var featsChosen : Array = GetComponent( Characters ).characters[ currentCharacter ].feats;
	
	if( characterClass == 4 ){ isFighter = true; }
	if( isFighter && fp == 1 && ! hasFighterFt ){ mustChooseFighterFeat = true; }
	if( ! isFighterFt && mustChooseFighterFeat ){ /*do nothing*/ }
	else
	{
		if( fp > 0 )
		{
			/*if( feat == 22 || feat == 31 || feat == 40 || feat == 74 || feat == 75 || feat == 76 )
			{
				displayWeaponsFeats( feat );
			}
			else if( feat == 61 )
			{
				displaySkillsFeats();
			}
			else*/
			//{
				var featArray : Array = new Array();
				featArray[0] = feat;
				featArray[1] = -1;
				//characters[ currentCharacter ].feats.push( featArray );
				featsChosen.Push( featArray );
				UpdateFeatPoints();
				//updateFeatsDisplay();
				//Main.saManager.updateSavingThrowsDisplay();
				//Main.atManager.updateMainAttributes();
				if( feat == 70 )
				{
					//hideCharacterSpecials();
					//displayCharacterSpecials();
				}
			//}
		}
	}
}

function RemFeat( ft : int ) : void
{
	var currentCharacter : int = GetComponent( Characters ).character;
	var feat : int = HasFeat( currentCharacter, ft );
	var featsChosen : Array = GetComponent( Characters ).characters[ currentCharacter ].feats;
	if( featsChosen.length > 0 )
	{
		featsChosen.Splice( feat, 1 );
		UpdateFeatPoints();
	}
}

function UpdateFeatPointsxxx() : void
{
	var ch : int = GetComponent( Characters ).character;
	var chCla : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	
	//UpdateFeatPoint(ch, chCla );
	while( GetComponent( Characters ).characters[ ch ].featPoints < 0 )
	{
		//UpdateFeatPoint( ch, chCla );
	}
}

//function UpdateFeatPoint( ch : int, chCla : int ) : void
function UpdateFeatPoints() : void
{
	var ch : int = GetComponent( Characters ).character;
	var chCla : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	var race : int = GetComponent( Characters ).characters[ ch ].race;
	var isFighter : boolean = false;
	//check to see if a class and a race has been selected
	if( chCla > -1 && race > -1 )
	{
		GetComponent( Characters ).characters[ ch ].featPoints = 1;
		//print( "starting character gets " + GetComponent( Characters ).characters[ ch ].featPoints );
	
		//humans get an extra feat point at the start
		if( race == 6 )
		{
			GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints + 1;
			//print( "starting human gets + 1, total: " + GetComponent( Characters ).characters[ ch ].featPoints );
		}
	
		//fighters get an extra feat point at the start
		//which must be chosen from a specific list of feats
		
		if( chCla == 4 ){ isFighter = true; }
		if( isFighter )
		{
			GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints + 1;
			//print( "starting fighter gets + 1, total: " + GetComponent( Characters ).characters[ ch ].featPoints );
		}
		//print( "your starting character gets : " + GetComponent( Characters ).characters[ ch ].featPoints );
	
		var featsChosen : Array = GetComponent( Characters ).characters[ ch ].feats;
		var i : int = featsChosen.length;
		var j : int = 0;
		
		while( j < i )
		{
			var ft : int = featsChosen[j][0];
			
			//problem here?
			var wp : int = GetComponent( Characters ).characters[ ch ].feats[j][1];
			var wHand : int = -1;
			//feat 61 is the skill focus feat and doesn't require any weapons related checking
			if( wp > -1 && ft != 61 ){ wHand = GetComponent( Weapons ).CalcWeaponHand( ch, wp ); }
			else if( ft == 61 ){ wp = -1; }
			if( ! IsInitClassFeat( chCla, ft ) )
			{
				//are the feat requirements met?
				if( ! FulfillsFeatReqs( ch, ft ) )
				{
					featsChosen.Splice( j, 1 );
					i --;
					j --;
					print( "feat removed, requirements not met, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
				}
				
				/*else if( ft == 61 )
				{
					print( "skill focus: " + GetComponent( Characters ).characters[ ch ].featPoints );
					
				}*/
				//if this is a specific weapon feat
				//is the character large enough to use this weapon?
				else if( wp >= 0 && wHand < 0 )
				{
					featsChosen.Splice( j, 1 );
					i --;
					j --;
					print( "feat removed, short-ass, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
				}
				//if this is a weapon proficiency, 
				else if( ft == 22 || ft == 40 )
				{
					GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints - 1;
					/*
					if( wp >= 0 && wHand < 0 )
					{
						featsChosen.Splice( j, 1 );
						i --;
						j --;
					}
					else
					{
						GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints - 1;
					}
					*/
				}
				else if( ft == 74 )
				{
					//var fwp : int = GetComponent( Characters ).characters[ ch ].feats[j][1];
					if( ! CanFinesse( ch, wp ) )
					{
						featsChosen.Splice( j, 1 );
						i --;
						j --;
						print( "feat removed, you can't finesse this weapon, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
					}
					else
					{
						GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints - 1;
					}
					
				}
				else if( ft == 75 || ft == 31 )//weapon focus and improved critical
				{
					if( HasProficiency( ch, wp ) )
					{
						GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints - 1;
					}
					else
					{
						featsChosen.Splice( j, 1 );
						i --;
						j --;
						print( "feat removed, you can't choose this weapon feat, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
					}
				}
				else if( ft == 76 )//weapon specialization
				{
					if( isFighter )
					{
						//requires weapon focus
						if( HasSpecFeat( ch, 75, wp ) >= 0 )
						{
							GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints - 1; 
						}
						else
						{
							featsChosen.Splice( j, 1 );
							i --;
							j --;
							print( "feat removed, you can't choose this weapon feat, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
						}
					}
				}//are there enough feat points left?
				else if( GetComponent( Characters ).characters[ ch ].featPoints < 0 )
				{
					featsChosen.Splice( j, 1 );
					//
					i --;
					j --;
					GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints + 1;
					print( "feat removed, no feat points left, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
					
				}
				else
				{
					GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints - 1;
				}
			}
			//remove feats that are given automatically so they
			//don't clutter up the array and possibly cause problems
			//might happen if a player chooses a feat then
			//changes to a class that gets that feat for free
			//this might be redundant because of UpdateClassFeats
			else
			{
				featsChosen.Splice( j, 1 );
				i --;
				j --;
				print( "automatic feat removed, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
			}
			j ++;
		}
		
		while( GetComponent( Characters ).characters[ ch ].featPoints < 0 )
		{
			featsChosen.Splice( featsChosen.length - 1, 1 );
			GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints + 1;
			print( "feat removed, no feat points left, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
		}
		
		var hasFighterFeat : boolean = HasFighterFeat( ch );
		if( ! hasFighterFeat )
		//
		{
			//print( "you're a fighter, have you chosen a fighter feat yet?: " + hasFighterFeat );
			if( isFighter && GetComponent( Characters ).characters[ ch ].featPoints < 1 )
			{
				//print( "you haven't chosen a fighter feat yet!: " + hasFighterFeat );
				featsChosen.Splice( featsChosen.length - 1, 1 );
				GetComponent( Characters ).characters[ ch ].featPoints = GetComponent( Characters ).characters[ ch ].featPoints + 1;
				print( "feat removed, choose a fighter feat, total now: " + GetComponent( Characters ).characters[ ch ].featPoints );
				
			}
		}
		
	}
	else
	{
		GetComponent( Characters ).characters[ ch ].featPoints = 0;
	}
	featPoints = GetComponent( Characters ).characters[ ch ].featPoints;
}

function HasFighterFeat( ch : int ) : boolean
{
	//var currentCharacter : int = GetComponent( Characters ).character;
	var characterClass : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	var featsChosen : Array = GetComponent( Characters ).characters[ ch ].feats;
	var i : int = featsChosen.length;
	while( i -- )
	{
		if( IsFighterFeat( featsChosen[i][0] ) )
		{
			return true;
		}
	}
	return false;
}

private function IsFighterFeat( feat : int ) : boolean
{
	var ftrFeats : Array = new Array( 1, 5, 7, 9, 15, 16, 22, 23, 24, 27, 30, 31, 32, 33, 34, 35, 36, 42, 43, 44, 48, 49, 50, 51, 53, 54, 58, 65, 66, 68, 69, 72, 73, 74, 75, 76, 77  );
	var i : int = ftrFeats.length;
	while( i -- )
	{
		if( feat == ftrFeats[i] )
		{
			return true;
		}
	}
	return false;
}

private function IsWeapSpecFeat( ft : int ) : boolean
{
	var i : int = weaponSpecs.length;
	while( i -- )
	{
		if( ft == weaponSpecs[i] ){ return true; }
	}
	return false;
}

public function DisplaySpFeats0( ft : int ) : void
{
	//weapFeatsDisplayed = true;
	//currentWeaponFeat = ft;
	var i : int = GetComponent( Weapons ).weapons.length;
	var rowStartX : int = 330;
	var rowStartY : int = 140;
	var rowsMax : int = 28;
	var lineHeight : int = 16;
	var rowWidth : int = 160;
	while( i -- )
	{
		var wY : int = rowStartY + i * lineHeight - Mathf.Floor( i / rowsMax ) * rowsMax * lineHeight;
		var wX : int = rowStartX + Mathf.floor( i / rowsMax ) * rowWidth;
		DisplayWeaponFeat( i, ft, wX, wY );
	}
}

/*function DisplaySpFeats() : void
{
	var k : int = spSkills[ spSkillDisplayed ].length;
	spSkillsColumns = 1 + Mathf.Ceil( k / spSkillsRowsMax );
	//print( spSkillsColumns  + "   " + k );
	if( spSkillDisplayed == 4 )
	{ while( k -- ){ LangGUI( k, spSkills[ spSkillDisplayed ][k], spSkillIndices[ spSkillDisplayed ] ); } }
	else{ while( k -- ){ SpSkillGUI( k, spSkills[ spSkillDisplayed ][k], spSkillIndices[ spSkillDisplayed ] ); } }
}*/

function DisplayWeaponFeat( wIndex : int, wFt : int, wX : int, wY : int ) : void
{
	var currentCharacter : int = GetComponent( Characters ).character;
	
	//are we choosing this weapon's feat type?
	var pTypes : Array = GetComponent( Weapons ).weapons[ wIndex ].profTypes;
	var i : int = pTypes.length;
	var chooseThisWFt : boolean = false;

	if( wFt == 22 || wFt == 40 )
	{
		while( i -- )
		{
			if( pTypes[i] == wFt )
			{
				//yes we are choosing this weapon's feat type
				chooseThisWFt = true;
			}
		}
		if( HasProficiency( currentCharacter, wIndex ) )
		{
			chooseThisWFt = false;
		}
	}
	//weapon finesse
	else if( wFt == 74 )
	{
		if( CanFinesse( currentCharacter, wIndex ) && HasSpecFeat( currentCharacter, wFt, wIndex ) < 0 ){ chooseThisWFt = true; }
	}
	else if( wFt == 75 || wFt == 31 )
	{
		if( HasProficiency( currentCharacter, wIndex ) && HasSpecFeat( currentCharacter, wFt, wIndex ) < 0 )
		{
			chooseThisWFt = true;
		}
	}
	else if( wFt == 76 )
	{
		if( HasSpecFeat( currentCharacter, 75, wIndex ) >= 0 && HasSpecFeat( currentCharacter, wFt, wIndex ) < 0 )
		{
			chooseThisWFt = true;
		}
	}
	if( ! chooseThisWFt )
	{
		/*this[ wFtName ].htmlText = weapons[ wIndex ].id;
		this[ wFtName ].border = true;
		this[ wFtName ].backgroundColor = 0xFF0000;
		this[ wFtName ].background = true;
		wFtName.setBGColor( 0xFF0000 );*/
	}
	else
	{
		//wFtName.addEventListener( MouseEvent.CLICK, function ( event:MouseEvent ):void { addWeaponFeat( event ); } );
	}

	/*var wFtName_fmt:TextFormat = new TextFormat();
	wFtName_fmt.size = 9;
	wFtName_fmt.font = "Franklin Gothic Medium";
	this[ wFtName ].setTextFormat( wFtName_fmt );
	targetStage.addChild( wFtName );*/
}

public function HasProficiency( ch : int, wpn : int ) : boolean
{
	//this is the value we will eventually return
	var hasFeat : boolean = false;
	
	//get the feats that give proficiency in this weapon
	var pFeats : Array = GetComponent( Weapons ).weapons[ wpn ].profTypes;
	
	//print( GetComponent( Weapons ).CalcWeaponHand( ch, wpn ) );
	
	var chCla : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	//var featsAuto : Array = GetComponent( CharacterClasses ).characterClasses[ chCla ].initialFeats;
	
	//check to see if the character is large enough to use this weapon
	var hand : int = GetComponent( Weapons ).CalcWeaponHand( ch, wpn );
	if( hand > -1 )
	{
		//set i to be the length of the array of feats
		var i : int = pFeats.length;
		
		//iterate through the array of feats
		while( i -- )
		{
			//set pFeat to the value at i in the array of feats
			var pFeat : int = pFeats[i];
			if( IsInitClassFeat( chCla, pFeat ) )
			{
				hasFeat = true;
			}
			//check to see if pFeat is the martial or exotic feat
			//because these feats only apply to a single weapon
			//unless you are a fighting class, eg fighter, ranger, barbarian, paladin
			else if( pFeat == 40 || pFeat == 22 )
			{
				//check to see if ch has the specialized wpn feat
				if( HasSpecFeat(  ch, pFeat, wpn ) >= 0 ){ hasFeat = true; }
			}
			else//if not a martial or exotic feat it's a simple or class weapons feat 
			{
				//these types of feats automatically give proficiency
				//in all the weapons associated with them so
				//if they have the feat there is no need to check
				//for anything more than just the feat
				if( HasFeat( ch, pFeat ) >= 0 ){ hasFeat = true; }
			}
		}
		
		/*var chCla : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
		var featsAuto : Array = GetComponent( CharacterClasses ).characterClasses[ chCla ].initialFeats;
		
		var j : int = featsAuto.length;
		
		while( j -- )
		{
			if( featsAuto[j] == ft )
			{
				print( "Specialized in all" );
				return j;
			}
		}*/
	}
	return hasFeat;
}

public function HasSpecFeat( cha : int, ft : int, spec : int ) : int
{
	//get the character's class first
	var chCla : int = GetComponent( Characters ).characters[ cha ].classes[0][0];
	//so that if a character class hasn't been chosen
	//then we can skip everything and just return -1
	if( chCla > -1 )
	{	
		//get the feats the user has chosen
		//featsChosen[i][0] is the index of
		//the feat in the feats array so to
		//get the names of the feat would be
		//print( feats[ featsChosen[i][0] ].id );
		//featsChosen[i][1] is the index of the
		//weapon or skill that the feat affects
		var featsChosen : Array = GetComponent( Characters ).characters[ cha ].feats;
		
		var i : int = featsChosen.length;
		while( i -- )
		{
			if( featsChosen[i][0] == ft )
			{
				var specialty : int = featsChosen[i][1];
				
				if( specialty == -1 )
				{
					//print( "Specialized in all" );
					return i;
				}
				else if( specialty == spec )
				{
					//print( "Not specialized in all" );
					return i;
				}
			}
		}
		
		
		
		//
		//var specFeats : Array = HasFeats( cha, chCla, ft );
		//print( specFeats );
		//var i : int = specFeats.length;
		//print( i );
		/*while( i -- )
		{
			//print( feats[ featsChosen[i][0] ].id );
			var wpn : int = featsChosen[ specFeats[i] ][1];
			if( wpn == spec || wpn == -1 )
			{
				return specFeats[i];
			}
		}*/
	}
	return -1;
}

public function CanFinesse( ch : int, wpn : int ) : boolean
{
	//only for melee weapons
	var wType : int = GetComponent( Weapons ).weapons[ wpn ].weapType;
	if( wType == 0 || wType == 2 || wType == 4 )
	{
		//need to be proficient
		if( HasProficiency( ch, wpn ) )
		{
			//can't get it twice for same weapon
			//if( hasSpecFeat( ch, 74, wpn ) < 0 )
			//{
				var wHand : int = GetComponent( Weapons ).CalcWeaponHand( ch, wpn );
				var raceSize : int = GetComponent( Races ).races[ GetComponent( Characters ).characters[ ch ].race ].raceSize;
				if( wHand == 2 ){ return true; }
				else if( wpn == 29 && wHand > 0 ){ return true; }
				else if( wpn == 59 && raceSize > 3 ){ return true; }
			//}
		}
	}
	return false;
}

function AddWeaponFeat( ch : int, ft : int, wpn : int ) : void
{
	
	if( GetComponent( Characters ).characters[ ch ].featPoints > 0 )
	{
		var featArr : Array = new Array();
		featArr[0] = ft;
		featArr[1] = wpn;
		
		//print( GetComponent( Weapons ).weaponsNames[ wpn ] + " " + featsNames[ft] + " added" );// + " " + feats[ currentWeaponFeat ].id );
		
		GetComponent( Characters ).characters[ ch ].feats.Push( featArr );
		UpdateFeatPoints();
	}
	else
	{
		print( GetComponent( Weapons ).weaponsNames[ wpn ] + " " + featsNames[ft] + " not added due to lack of feat points: " + GetComponent( Characters ).characters[ ch ].featPoints );
	}
	//displayFeats();
	//hideCharacterSpecials();
	//displayCharacterSpecials();
	
	
}

function RemWeaponFeat( ch : int, ft : int, wpn : int ) : void
{
	//var sp:Number = Number( specIndex );
	//var ft:Number = characters[ currentCharacter ].specializations[sp][0];
	//var spec : int = GetComponent( Characters ).characters[ ch ].specializations[ wpn ][1];
	
	
	var ftIndex : int = HasSpecFeat( ch, ft, wpn );
	if( ftIndex > -1 )
	{
		GetComponent( Characters ).characters[ ch ].feats.Splice( ftIndex, 1 );
		UpdateFeatPoints();
	}
	
	
	
	
	//updateFeatsDisplay();
	//updateWeaponsDisplay();
	//updateWeaponsFeatsDisplay();
	
	if( ft == 70 )
	{
		//updateMainAttributes();
		//updateMainAttrDisplay();
	}
	
	//hideCharacterSpecials();
	//displayCharacterSpecials();
}

function AddSpSkFeat( ch : int, sk : int, spSk : int ) : void
{
	
	if( GetComponent( Characters ).characters[ ch ].featPoints > 0 )
	{
		var featArr : Array = new Array();
		featArr[0] = 61;
		featArr[1] = sk;
		featArr[2] = spSk;
		//print( GetComponent( Weapons ).weaponsNames[ wpn ] + " " + featsNames[ft] + " added" );// + " " + feats[ currentWeaponFeat ].id );
		
		GetComponent( Characters ).characters[ ch ].feats.Push( featArr );
		UpdateFeatPoints();
	}
	else
	{
		//print( GetComponent( Weapons ).weaponsNames[ wpn ] + " " + featsNames[ft] + " not added due to lack of feat points: " + GetComponent( Characters ).characters[ ch ].featPoints );
	}
	//displayFeats();
	//hideCharacterSpecials();
	//displayCharacterSpecials();
	
	
}

function RemSpSkFeat( ch : int, sk : int, spSk : int ) : void
{
	//var sp:Number = Number( specIndex );
	//var ft:Number = characters[ currentCharacter ].specializations[sp][0];
	//var spec : int = GetComponent( Characters ).characters[ ch ].specializations[ wpn ][1];
	
	
	var ftIndex : int = HasSpSkFeat( ch, sk, spSk );
	if( ftIndex > -1 )
	{
		GetComponent( Characters ).characters[ ch ].feats.Splice( ftIndex, 1 );
		UpdateFeatPoints();
	}
	
	
	
	
	//updateFeatsDisplay();
	//updateWeaponsDisplay();
	//updateWeaponsFeatsDisplay();
	
	//if( ft == 70 )
	//{
		//updateMainAttributes();
		//updateMainAttrDisplay();
	//}
	
	//hideCharacterSpecials();
	//displayCharacterSpecials();
}

public function HasSpSkFeat( ch : int, sk : int, spSk : int ) : int//, spSk1 : int
{
	//get the character's class first
	var chCl : int = GetComponent( Characters ).characters[ ch ].classes[0][0];
	//so that if a character class hasn't been chosen
	//then we can skip everything and just return -1
	if( chCl > -1 )
	{	
		//get the feats the user has chosen
		//featsChosen[i][0] is the index of
		//the feat in the feats array so to
		//get the names of the feat would be
		//print( feats[ featsChosen[i][0] ].id );
		//featsChosen[i][1] is the index of the
		//weapon or skill that the feat affects
		var featsChosen : Array = GetComponent( Characters ).characters[ ch ].feats;
		
		var i : int = featsChosen.length;
		//check through all the feats chosen
		while( i -- )
		{
			//is it a skill focus feat?
			if( featsChosen[i][0] == 61 )
			{
				//what skill does this chosen feat focus on?
				var skill : int = featsChosen[i][1];
				
				//does this chosen feat focus on the same skill
				//the function parameter is looking for? if not
				//we can move on to checking the next chosen feat in the array
				if( skill == sk )
				{
					//this feat chosen is of the same skill but is it a specialized skill?
					
					var isSpecSkill : int = GetComponent( Skills ).IsSpecSkill( skill );
				
					if( isSpecSkill > -1 )
					{
						//this feat chosen is for a specialized skill, which one?
						var specSkill : int = featsChosen[i][2];
						
						//does this chosen feat focus on the same specialized skill
						//the function parameter is looking for? if so we can
						//return this feat's location in the chosen feats array
						if( specSkill == spSk )
						{
							return i;
						}
					}
				}
			}
		}
	}
	return -1;
}
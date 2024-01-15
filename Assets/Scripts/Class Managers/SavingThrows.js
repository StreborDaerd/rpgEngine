public var savingThrows : Array;
public var savesDisplayed : boolean = true;
var sTstyle1 : GUIStyle;
var sTstyle2 : GUIStyle;

function Start()
{
	InitSavingThrows();
	
	sTstyle1 = GetComponent( Abilities ).abilitiesStyle3;
	sTstyle2 = GetComponent( Abilities ).abilitiesStyle4;
}

function OnGUI()
{
	//DisplayAbilities();
}

private function InitSavingThrows() : void
{
	savingThrows = new Array();

	savingThrows[0] = new SavingThrow( "Fortitude", "FORT.", 2 );
	savingThrows[1] = new SavingThrow( "Reflex", "REFLEX", 1 );
	savingThrows[2] = new SavingThrow( "Will", "WILL", 4 );
}

function DisplaySavingThrows( ch : int ) : void
{
	if( savesDisplayed )
	{
		
		var cClass : int = GetComponent( Characters ).characters[ ch ].classes[0][0];//characters[ currentCharacter ].cClasses[0][0];
		//Main.weManager.hideCharacterWeapons();
		//hideCharacterSpecials();
		var rowWidth : int = 100;
		var lineHeight : int = 30;
		var sPX : int = 0;
		var sPY : int = 0;
		
		
		
		var i : int = savingThrows.length;
		while( i -- )
		{
			
			var abX : int = rowWidth * i + sPX;
			var rect : Rect = Rect ( abX, sPY, rowWidth, lineHeight );

			/*var stTitle_fmt:TextFormat = new TextFormat();
			stTitle_fmt.size = 20;
			stTitle_fmt.font = "Franklin Gothic Medium";
			stTitle_fmt.align = "center";

			var sTName:TextField = new TextField();
			sTName.name = "sTName_" + i;
			sTName.x = abX;
			sTName.y = sPY;
			sTName.width = rowWidth;
			sTName.height = lineHeight;
			sTName.text = savingThrows[i].nameCaps;
			sTName.selectable = false;
			sTName.setTextFormat( stTitle_fmt );
			targetStage.addChild( sTName );*/
			
			GUI.Label( rect, savingThrows[i].nameCaps, sTstyle2 );

			/*var sTAbil:TextField = new TextField();
			sTAbil.name = "sTAbil_" + i;
			sTAbil.x = abX;
			sTAbil.y = sPY + 24;
			sTAbil.width = rowWidth;
			sTAbil.height = lineHeight;
			sTAbil.text = Main.abManager.abilities[ savingThrows[i].ability ].id;
			sTAbil.selectable = false;
			stTitle_fmt.size = 12;
			sTAbil.setTextFormat( stTitle_fmt );
			targetStage.addChild( sTAbil );*/
			
			rect.x += 2;
			rect.y += 24;
			var labelStr : String = GetComponent( Abilities ).abilitiesTitles[ savingThrows[i].ability ];
			//print( labelStr );
			GUI.Label( rect, labelStr, sTstyle1 );

			
			var useHighSaves :  boolean = false;
			if( cClass >= 0 ){ useHighSaves = GetComponent( CharacterClasses ).characterClasses[ cClass ].savingThrows[i]; }
			
			//print( useHighSaves );
			
			/*var sTMod:TextField = new TextField();
			sTMod.name = "sTMod_" + i;
			sTMod.x = abX;
			sTMod.y = sPY + 36;
			sTMod.width = rowWidth;
			sTMod.height = lineHeight;
			sTMod.text = Main.abManager.modSign( updateSaveMod( 1, i, useHighSaves ) );
			sTMod.selectable = false;
			stTitle_fmt.size = 24;
			sTMod.setTextFormat( stTitle_fmt );
			targetStage.addChild( sTMod );*/
			
			labelStr = GetComponent( Abilities ).ModSign( UpdateSaveMod( ch, 1, i, useHighSaves ) );
			rect.x -= 5;
			rect.y = sPY + 36;
			GUI.Label( rect, labelStr, sTstyle2 );

			/*this.createTextField( "sTName_" + i, this.getNextHighestDepth(), abX, sPY, rowWidth, 30 );
			this[ "sTName_" + i ].selectable = false;
			this[ "sTName_" + i ].text = savingThrows[i].nameCaps;
			this[ "sTName_" + i ].setTextFormat( stTitle_fmt );

			stTitle_fmt.size = 12;
			this.createTextField( "sTAbil_" + i, this.getNextHighestDepth(), abX, sPY + 24, rowWidth, 30 );
			this[ "sTAbil_" + i ].selectable = false;
			this[ "sTAbil_" + i ].text = abilities[ savingThrows[i].ability ].id;
			this[ "sTAbil_" + i ].setTextFormat( stTitle_fmt );

			var cClass:Number = characters[ currentCharacter ].cClasses[0][0];
			var useHighSaves:Boolean = false;
			if( cClass >= 0 )
			{
				useHighSaves = characterClasses[ cClass ].savingThrows[i];
			}

			stTitle_fmt.size = 24;
			this.createTextField( "sTMod_" + i, this.getNextHighestDepth(), abX, sPY + 36, rowWidth, 30 );
			this[ "sTMod_" + i ].selectable = false;
			this[ "sTMod_" + i ].text = modSign( updateSaveMod( 1, i, useHighSaves ) );
			this[ "sTMod_" + i ].setTextFormat( stTitle_fmt );*/
		}

		savesDisplayed = true;
		//Main.atManager.updateAttributes();
	}
}

public function HideSavingThrows() : void
{
	if ( savesDisplayed ) 
	{
		var i : int = savingThrows.length;
		while( i -- )
		{
			//this[ "sTName_" + i ].removeTextField();
			//this[ "sTAbil_" + i ].removeTextField();
			//this[ "sTMod_" + i ].removeTextField();
			//targetStage.removeChild( targetStage.getChildByName( "sTName_" + i ) );
			//targetStage.removeChild( targetStage.getChildByName( "sTAbil_" + i ) );
			//targetStage.removeChild( targetStage.getChildByName( "sTMod_" + i ) );
		}
		savesDisplayed = false;
	}
}

public function UpdateSavingThrowsDisplay() : void
{
	if( savesDisplayed )
	{
		HideSavingThrows();
		//DisplaySavingThrows();
	}
}

public function UpdateSaveMod( ch : int, level : int, savingThrow : int, high : boolean ) : int
{
	var saveModifier : int = 0;
	//var abilityScore:int = characters[ currentCharacter ].abilityScores[ savingThrows[ savingThrow ].ability ];
	//GetComponent( Abilities ).abilities[ savingThrows[i].ability ].id;
	var abilityScore : int = GetComponent( Characters ).characters[ ch ].abilityScores[ savingThrows[ savingThrow ].ability ];
	switch( savingThrow )
	{
		case 0:
		if( GetComponent( Feats ).HasFeat( ch, 28 ) >= 0 ){ saveModifier += 2; }
		break;
		case 1:
		if( GetComponent( Feats ).HasFeat( ch, 39 ) >= 0 ){ saveModifier += 2; }
		break;
		case 2:
		if( GetComponent( Feats ).HasFeat( ch, 37 ) >= 0 ){ saveModifier += 2; }
		break;
	}

	if( high )
	{
		saveModifier += Mathf.Floor( level / 2 + ( 2 + GetComponent( Abilities ).AbilityModifier( abilityScore ) ) );
	}
	else
	{
		saveModifier += Mathf.Floor( level / 3 + GetComponent( Abilities ).AbilityModifier( abilityScore ) );
	}
	return saveModifier;
}

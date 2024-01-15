import System.IO;
import System.Xml;

class AlignmentsManager
{
	var alignments = new Array();
	var alignmentsNames : String[];
	
	private var alignmentsDisplayed = false;
	private var alignment : int = 0;
	
	public function AlignmentsManager()
	{
		var alignmentsXmlFile = new WWW( "file://" + Application.persistentDataPath + "/alignments.xml" );
		//yield alignmentsXmlFile; place this somewhere else
		
		InitAlignments( alignmentsXmlFile.text );
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
	
	function OnGUI()
	{
		if( GUI.Button ( Rect ( 300, 0, 120, 25 ), "Alignments" ) )
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
			alignment = GUI.SelectionGrid( Rect ( 300, 30, 120, alignmentsNames.Length * 25 ), alignment, alignmentsNames, 1 );
			
			if ( GUI.changed )
			{
				print ( alignmentsNames[ alignment ] + " was clicked." );
			}
		}
	}
}
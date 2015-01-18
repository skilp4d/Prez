function saveTextAsFile()
{
	var saveFile = {};
	
	saveFile.html = $("#presentationArea").html();
	saveFile.data = JSON.stringify(slideArray);
	saveFile.componentsList = $("#addedHere").html();
	saveFile.globals  = {
		currentSlide:currentSlide,
		currentState:currentState,
		PresentingNow:PresentingNow,
		BarGraphCount:BarGraphCount,
		TextCount:TextCount,
		BarCount:BarCount,
		RectangleCount:RectangleCount,
		ImageCount:ImageCount,
		VideoCount:VideoCount,
		editingText:editingText,
		statePerSlide:statePerSlide,
		currentTransform:currentTransform,
		currentShadow:currentShadow,
		MIN_STATE:MIN_STATE,
		MAX_STATE:MAX_STATE
	}
	var textToWrite = JSON.stringify(saveFile);
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var savedObj = eval('(' + fileLoadedEvent.target.result + ')');
		$("#presentationArea").html(savedObj.html + ' ');
		$("#addedHere").html(savedObj.componentsList + ' ');
		$(".ui-resizable-handle").remove();
		slideArray = eval('(' + savedObj.data + ')' );
		 currentSlide = savedObj.globals.currentSlide;
		 currentState = savedObj.globals.currentState;
		 PresentingNow = savedObj.globals.PresentingNow;
		 BarGraphCount = savedObj.globals.BarGraphCount;
		 TextCount = savedObj.globals.TextCount;
		 BarCount = savedObj.globals.BarCount;
		 RectangleCount = savedObj.globals.RectangleCount;
		 ImageCount = savedObj.globals.ImageCount;
		 VideoCount = savedObj.globals.VideoCount;
		 editingText = savedObj.globals.editingText;
		 statePerSlide = savedObj.globals.statePerSlide;
		 currentTransform = savedObj.globals.currentTransform;
		 currentShadow = savedObj.globals.currentShadow;
		 MIN_STATE = savedObj.globals.MIN_STATE;
		 MAX_STATE = savedObj.globals.MAX_STATE;
		isPresenting(false);
		
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}


var slideArray = ["My First Presentation"];


// Constructor for Slide
function P_Slide(){
	currentSlide++
	this.name = "Slide" + currentSlide;
	this.textArr = [];
	this.barGraphArr = [];
	this.rectangleArr = [];
	this.imageArr = [];
	this.videoArr = [];
	$('#presentationArea').append("<div class='slide' id='" + this.name + "' data-objectType='Slide'></div>");
	$("#addedHere").append("<h3 class='componentListSlide' data-represents='" + this.name + "' data-slideNo='" + currentSlide + "'>" + this.name + "</h3>");
	$("#addedHere").append("<div class='slideContents' id='slideContents" + currentSlide + "' ></div>");
	$("#Slide" + currentSlide).droppable({
		activeClass: "ui-state-default",
		hoverClass: "ui-state-hover",
		drop: function( event, ui ) {
		 	if($(ui.draggable).attr("id") === "newText"){
		 		var temp = slideArray[currentSlide].textArr;
		 		temp.push(new P_Text());
				$(temp[temp.length - 1].represents).css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});

		 	}else if($(ui.draggable).attr("id") === "newBarGraph"){
		 		var temp = slideArray[currentSlide].barGraphArr;
		 		temp.push(new BarGraph());		 		
		 		temp[temp.length - 1].PREZ_add();
		 		$(temp[temp.length - 1].represents).css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
		 		temp[temp.length - 1].PREZ_render();
		 	}else if($(ui.draggable).attr("id") === "newRectangle"){
		 		var temp = slideArray[currentSlide].rectangleArr;
		 		temp.push(new Rectangle());		 		
		 		$(temp[temp.length - 1].represents).css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
		 	}else if($(ui.draggable).attr("id") === "newImage"){
		 		var temp = slideArray[currentSlide].imageArr;
		 		temp.push(new Image());		 		
		 		$(temp[temp.length - 1].represents).css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
		 	}else if($(ui.draggable).attr("id") === "newSlide"){
		 		$("#Slide" + currentSlide).fadeOut(100);
				slideArray.push(new P_Slide());
				statePerSlide.push(currentState);
				$("#Slide" + currentSlide).effect("bounce");
		 	}else if($(ui.draggable).attr("id") === "newVideo"){
				var temp = slideArray[currentSlide].videoArr;
		 		temp.push(new Video());		 		
		 		$(temp[temp.length - 1].represents).css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
		 	}

		 	}
		
	});
}




// Constructor for Text
function P_Text(){
	TextCount++;
	this.text = "Double Click to Edit !!!!!!";
	$("#Slide" + currentSlide).append("<span class='Text' id='Text" + TextCount + "' data-objectType='Text'  data-animDel='0' data-name='Text" + TextCount +  "'>" + this.text + "</span>");
	var temp = $("#Text" + TextCount);
	this.name = "Text" + TextCount ;
	this.represents = "#Text" + TextCount;
	$("#slideContents" + currentSlide).append("<h3 class='componentList' data-represents='" + this.name + "'>" + this.name + "</h3>");
	temp.draggable();
	temp.click(function(){
	activeObject = $(this);
	refreshProp();
	$("#selectedItemName").html(activeObject.attr('data-name'));
	}).dblclick(function(){
		toRenameObject = $(this);
		editingText = true;
		$(".ui-dialog").each(function(){
			if($(this).attr('aria-describedby')=="renamePrompt"){
				$(this).fadeIn(200);
			}
		});
		$("#promptInput").val(toRenameObject.html());
	});
	this.currentState = currentState;
	this.statesArrOb = {};
	this.goToState = function(i){
		currentState = i;
		var animationObj = this.statesArrOb["state" + i];
		if(animationObj){
			$(this.represents).html(animationObj.text);
			$(this.represents).finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			$(this.represents).fadeOut();
		}

	};
}

function textToState(i,context){
	currentState = i;
		var animationObj = context.statesArrOb["state" + i];
		if(animationObj){
			$(context.represents).html(animationObj.text);
			$(context.represents).finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			$(context.represents).fadeOut();
		}
}


// Constructor for Rectangle
function Rectangle(){
	RectangleCount++;
	$("#Slide" + currentSlide).append("<div class='Rectangle' id='Rectangle" + RectangleCount + "' data-objectType='Rectangle' data-animDel='0'  data-name='Rectangle" + RectangleCount +  "'></div>");
	var temp = $("#Rectangle" + RectangleCount);
	this.represents = "#Rectangle" + RectangleCount;
	this.name = "Rectangle" + RectangleCount ;
	$("#slideContents" + currentSlide).append("<h3 class='componentList' data-represents='" + this.name + "'>" + this.name + "</h3>");
	temp.draggable();
	temp.click(function(){
	activeObject = $(this);
	refreshProp();
	}).resizable({
		handles:"e,s,se"
	});
	this.currentState = currentState;
	this.statesArrOb = {};
	this.goToState = function(i){
		currentState = i;
		var animationObj = this.statesArrOb["state" + i];
		if(animationObj){
			$(this.represents).finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			$(this.represents).fadeOut();
		}

	};
	
}

function rectToState(i,context){
	currentState = i;
		var animationObj = context.statesArrOb["state" + i];
		if(animationObj){
			$(context.represents).finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			$(context.represents).fadeOut();
		}

}

// Constructor for Image
function Image(){
	ImageCount++;
	this.text = "Double Click to Edit !!!!!!";
	$("#Slide" + currentSlide).append("<div class='Image' id='Image" + ImageCount + "'  data-objectType='Image' data-animDel='0'  data-name='Image" + ImageCount +  "'></div>");
	var temp = $("#Image" + ImageCount);
	this.name = "Image" + ImageCount ;
	this.represents = "#Image" + ImageCount;
	$("#slideContents" + currentSlide).append("<h3 class='componentList' data-represents='" + this.name + "'>" + this.name + "</h3>");
	temp.click(function(){
	activeObject = $(this);
	refreshProp();
	}).dblclick(function(){
		activeObject = $(this);
		$(".ui-dialog").each(function(){
			if($(this).attr('aria-describedby')=="imgPrompt"){
				$(this).fadeIn(200);
			}
		});
	}).draggable().resizable();
	this.currentState = currentState;
	this.statesArrOb = {};
	this.goToState = function(i){
		currentState = i;
		var animationObj = this.statesArrOb["state" + i];
		if(animationObj){
			temp.finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			this.fadeOut();
		}

	};
}


function imgToState(i,context){
		currentState = i;
		var animationObj = context.statesArrOb["state" + i];
		if(animationObj){
			$(context.represents).finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			$(context.represents).fadeOut();
		}
}

// Constructor for Video
function Video(){
	VideoCount++;
	this.text = "Double Click to Edit !!!!!!";
	$("#Slide" + currentSlide).append("<video class='Video' id='Video" + VideoCount + "'  data-objectType='Video' data-animDel='0'  data-name='Video" + VideoCount +  "' controls></video>");
	var temp = $("#Video" + VideoCount);
	this.name = "Video" + VideoCount ;
	this.represents = "#Video" + VideoCount ;
	$("#slideContents" + currentSlide).append("<h3 class='componentList' data-represents='" + this.name + "'>" + this.name + "</h3>");
	temp.click(function(){
	activeObject = $(this);
	refreshProp();
	}).dblclick(function(){
		activeObject = $(this);
		$(".ui-dialog").each(function(){
			if($(this).attr('aria-describedby')=="imgPrompt"){
				$(this).fadeIn(200);
			}
		});
	}).draggable().resizable();
	this.currentState = currentState;
	this.statesArrOb = {};
	this.goToState = function(i){
		currentState = i;
		var animationObj = this.statesArrOb["state" + i];
		if(animationObj){
			temp.finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			this.fadeOut();
		}

	};
}


function vidToState(i,context){
		currentState = i;
		var animationObj = context.statesArrOb["state" + i];
		if(animationObj){
			$(context.represents).finish().fadeIn(200).delay(animationObj.delay).animate(animationObj.animate).css(animationObj.css);
		}else{
			$(context.represents).fadeOut();
		}
}

// Constructor for BarGraph
function BarGraph(){
	BarGraphCount++;
	$("#Slide" + currentSlide ).append("<div class='BarGraph' id='BarGraph" + BarGraphCount + "'  data-animDel='0'  data-graphNo='"+ (slideArray[currentSlide].barGraphArr.length) + "' data-name='BarGraph"+ BarGraphCount + "' data-objectType='BarGraph'></div>");
	var temp = $("#BarGraph" + BarGraphCount);
	this.PREZ_name = "BarGraph" + BarGraphCount;
	this.represents = "#BarGraph" + BarGraphCount;
	temp.click(function(){
		activeObject = $(this);
		refreshProp();
	});
	
	$("#slideContents" + currentSlide).append("<h3 class='componentList' data-represents='" + this.PREZ_name + "'>" + this.PREZ_name + "</h3><div id='subBarsList" + this.PREZ_name +  "'></div>");
	this.PREZ_bar = [];
	this.PREZ_barGap = 50;
	this.PREZ_barWidth = 50;
	this.PREZ_barHeight = 300;
	this.PREZ_add = function(){
		BarCount++;
		temp.append("<div  class='bar' id='" + this.PREZ_name + "_bar_" + BarCount + "' style='bottom:0px'  data-animDel='0' ></div>");
		$("#subBarsList" + this.PREZ_name).append("<ol class='componentListSub' data-represents='" + this.PREZ_name + "_bar_" + BarCount + "'>" + (this.PREZ_bar.length + 1) + ". Bar" + BarCount + "</ol>");

		this.PREZ_bar.push("#" + this.PREZ_name + "_bar_" + BarCount);
	};
	this.PREZ_render = function(){
		temp.draggable( {
		 disabled: PresentingNow 
		}).resizable({
		 disabled: PresentingNow ,
		 handles:"e,ne",
		 create:function(event,ui){

		 },
		resize:function(event,ui){
		    	$(".bar").css({"position":"absolute","top":""});
		    },
		    stop:function(event,ui){
		    	$(".bar").each(function(){
		    		$(this).css({
		    			
		    			"top":$(this).parent().height() - $(this).height() + "px"
		    		})
		    	});
		    }
		});
		var itr;
		for(itr = 0;itr<this.PREZ_bar.length;itr++){
		$(this.PREZ_bar[itr]).animate({
			left: (itr)*(this.PREZ_barWidth + this.PREZ_barGap) + "px"
		}).resizable( { 
			disabled: PresentingNow , 
			grid:[5,2],
			handles:"n,e"
		}).css({"position":"absolute"});
	}
	};
	this.currentState = currentState;
	this.statesArrOb = {};
	this.nextState = function(){
		//currentState++;
		var animationObj = this.statesArrOb["state" + currentState];
		if(animationObj){
		$(this.represents).fadeIn().animate({
			position:animationObj.position,
			top:animationObj.top,
			left:animationObj.left,
			opacity:animationObj.opacity
		});
		var itr;
		for(itr=0;itr<this.PREZ_bar.length;itr++){
			var currentBar = $(this.PREZ_bar[itr]);
			currentBar.animate(animationObj.barArr[itr]);
		}
	}else{
			this.fadeOut();
		}
		
	};
	this.goToState = function(i){
		currentState = i;
		var animationObj = this.statesArrOb["state" + i];
		if(animationObj){
		$(this.represents).fadeIn(100).delay(animationObj.myself.delay).animate(animationObj.myself.animate).css(animationObj.myself.css);
		var itr;
		for(itr=0;itr<this.PREZ_bar.length;itr++){
			var currentBar = $(this.PREZ_bar[itr]);
			currentBar.delay(animationObj.barArr[itr].delay).animate(animationObj.barArr[itr].animate).css(animationObj.barArr[itr].css);
		}
	}else{
			this.fadeOut();
		}

	};
}

function barGraphToState(i,context){
	currentState = i;
		var animationObj = context.statesArrOb["state" + i];
		if(animationObj){
		$(context.represents).fadeIn(100).delay(animationObj.myself.delay).animate(animationObj.myself.animate).css(animationObj.myself.css);
		var itr;
		for(itr=0;itr<context.PREZ_bar.length;itr++){
			var currentBar = $(context.PREZ_bar[itr]);
			currentBar.delay(animationObj.barArr[itr].delay).animate(animationObj.barArr[itr].animate).css(animationObj.barArr[itr].css);
		}
	}else{
			$(context.represents).fadeOut();
		}
}
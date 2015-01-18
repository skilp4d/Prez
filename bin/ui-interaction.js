//globals here

var currentSlide = 0;
var activeObject = {};
var currentState = 1;
var toRenameObject = {};
var PresentingNow = false;
var BarGraphCount = 0;
var TextCount = 0;
var BarCount = 0;
var RectangleCount = 0;
var ImageCount = 0;
var VideoCount = 0;
var editingText = false;
var statePerSlide = ["filler"];
var currentTransform = {translateZ:"(0px)",rotateX:"(0deg)",rotateY:"(0deg)",rotateZ:"(0deg)"};
var currentShadow = {shadowLeft:"1px",shadowTop:"1px",shadowBlur:"5px",shadowColor:"#D2691E",shadowSpread:"2px"};
var MIN_STATE = 0;
var MAX_STATE =0;

function isPresenting(arg){
	PresentingNow = arg;
	
	if(arg){
		$(".bar").css({"position":"absolute","top":""}).resizable('destroy');
		$(".BarGraph,.Rectangle,.Image,.Video").draggable('destroy').resizable('destroy');
		$(".Text").draggable('destroy');
	}else{
		$(".slide").droppable({
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
		$(".bar").resizable({
		 disabled: PresentingNow ,
		 grid:[5,2],
		 handles:"e,n",
		 create:function(event,ui){
		 	$(this).css({
		 		"position":"",
		 		"top":$(this).parent().height() - $(this).height() + "px"
		 	});
		 }
		}).css({"position":"absolute"});
		$(".BarGraph").draggable({
		 disabled: PresentingNow
		}).resizable({ 
			disabled: PresentingNow ,
		    handles:"e,ne",
		    resize:function(event,ui){
		    	$(".bar").css({"position":"absolute","top":""});
		    },
		    stop:function(event,ui){
		    	$(".bar").each(function(){
		    		$(this).css({
		    			"position":"",
		    			"top":$(this).parent().height() - $(this).height() + "px"
		    		})
		    	});
		    }

		});
		$(".Rectangle,.Image").draggable().resizable();
		$(".Video").draggable();
		$(".Text").draggable();
	}
}

$(document).ready(function(){
	
	slideArray.push(new P_Slide());
	$("#newText,#newBarGraph,#newRectangle,#newImage,#newSlide,#newVideo").draggable({revert:"valid",helper:"clone"});
	// $(".slide").droppable({
	// 	// activeClass: "ui-state-default",
	// 	// hoverClass: "ui-state-hover",
	// 	drop: function( event, ui ) {
	// 	 	if($(ui.draggable).attr("id") === "newText"){
	// 	 		var temp = slideArray[currentSlide].textArr;
	// 	 		temp.push(new P_Text());
	// 			temp[temp.length - 1].css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});

	// 	 	}else if($(ui.draggable).attr("id") === "newBarGraph"){
	// 	 		var temp = slideArray[currentSlide].barGraphArr;
	// 	 		temp.push(new BarGraph());		 		
	// 	 		temp[temp.length - 1].PREZ_add();
	// 	 		temp[temp.length - 1].css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
	// 	 		temp[temp.length - 1].PREZ_render();
	// 	 	}else if($(ui.draggable).attr("id") === "newRectangle"){
	// 	 		var temp = slideArray[currentSlide].rectangleArr;
	// 	 		temp.push(new Rectangle());		 		
	// 	 		temp[temp.length - 1].css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
	// 	 	}else if($(ui.draggable).attr("id") === "newImage"){
	// 	 		var temp = slideArray[currentSlide].imageArr;
	// 	 		temp.push(new Image());		 		
	// 	 		temp[temp.length - 1].css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
	// 	 	}else if($(ui.draggable).attr("id") === "newSlide"){
	// 	 		$("#slide" + currentSlide).fadeOut(100);
	// 			slideArray.push(new P_Slide());
	// 			statePerSlide.push(currentState);
	// 			$("#slide" + currentSlide).effect("bounce");
	// 	 	}else if($(ui.draggable).attr("id") === "newVideo"){
	// 			var temp = slideArray[currentSlide].videoArr;
	// 	 		temp.push(new Video());		 		
	// 	 		temp[temp.length - 1].css({"position":"absolute","top": event.clientY + "px","left": event.clientX + "px"});
	// 	 	}

	// 	 	}
		
	// });
	// $("#newSlide").click(function(){
	// 	$("#slide" + currentSlide).fadeOut(100);
	// 	slideArray.push(new P_Slide());
	// 	statePerSlide.push(currentState);
	// 	$("#slide" + currentSlide).effect("bounce");
	// })

	$("#addedHere").on('click','.componentList,.componentListSub,.componentListSlide',function(){
		activeObject = $("#" + $(this).attr('data-represents'));
		$("#selectedItemName").html(" " + $(this).html());
		if(activeObject.attr("data-objectType")=="Slide"){
			$("#Slide" + currentSlide).fadeOut();
			currentSlide = parseInt($(this).attr('data-slideNo'));
			activeObject.fadeIn();
		}else{
			activeObject.effect("highlight");
		}
		refreshProp();
	});

	$("#renamePrompt").dialog({
		width:400,
		close: function() {
			$(".ui-dialog").fadeOut(400);
        }
	});
	$("#imgPrompt").dialog({
		width:400,
		close: function() {
			$(".ui-dialog").fadeOut(400);
        }
	});
	$("#savePrompt").dialog({
		width:400,
		close: function() {
			$(".ui-dialog").fadeOut(500);
        }
	});
	$("#imgInput").change(function(){
		var url = $(this).val().split('\\');
		var requrl = url.pop();
		if(activeObject.attr('data-objectType')=="Image"){
			activeObject.css({
				"background-image": "url('images/" + requrl + "')"
			});
		}else if(activeObject.attr('data-objectType')=="Video"){
			activeObject.html("<source src='videos/"+ requrl +"' type='video/mp4'>");
		}else if(activeObject.attr('data-objectType')=="Slide"){
			activeObject.css({
				"background-image": "url('images/" + requrl + "')"
		});
		}
		$(".ui-dialog").fadeOut(200);
	})
	$("#selectBgImg").click(function(){
		$(".ui-dialog").each(function(){
			if($(this).attr('aria-describedby')=="imgPrompt"){
				$(this).fadeIn(200);
			}
		});
	})
	$(".ui-dialog").hide().css({"z-index":"5000"});


	$("#addedHere").on('dblclick','.componentList,.componentListSub,.componentListSlide',function(){
		toRenameObject = $(this);
		editingText = true;
		$(".ui-dialog").each(function(){
			if($(this).attr('aria-describedby')=="renamePrompt"){
				$(this).fadeIn(200);
			}
		});
		$("#promptInput").val(toRenameObject.html());
		
	});
	$("#promptInput").change(function(){
		toRenameObject.html($("#promptInput").val());
		if(toRenameObject.attr('data-objectType')  !== "Text"){
			activeObject.attr('data-name',$("#promptInput").val());
			$("#selectedItemName").html($("#promptInput").val());
		}
		if(toRenameObject.html()==""){
			toRenameObject.html("Rename");
		}else{
		$(".ui-dialog").fadeOut(400);
		editingText = false;
	}
	}).keyup(function(){
		toRenameObject.html($("#promptInput").val());
		if(toRenameObject.attr('data-objectType')  !== "Text"){
			activeObject.attr('data-name',$("#promptInput").val());
			$("#selectedItemName").html($("#promptInput").val());
		}
		if(toRenameObject.html()==""){
			toRenameObject.html("Rename");
		}
	});


	// shows tooltips (looks for title attr and displays it as a tooltip)
	 $( document ).tooltip();
	 
	 $("#save").click(function(){
			$(".ui-dialog").each(function(){
			if($(this).attr('aria-describedby')=="savePrompt"){
				$(this).fadeIn(200);
			}
		});
	 })

});

 /// keyboard events here
	 $(document).keydown(function(event){
	 	if(!editingText){
	 		if(PresentingNow){	 		
           		if(event.which == 37){
           			prev();
            	}else if(event.which == 39){  //next key
           			next();
            	}else if(event.which == 69){  //e key
            		isPresenting(false);
            		$(".presenting").removeClass("presenting");
					$(".left-tabs,#rightProperties").fadeIn(400);
                	$(".slide").animate({left:"106px"});
				}
            }else{ 
            	if(event.which == 80){  //p key
                	isPresenting(true);
                	currentState--; 
                	$("*").addClass("presenting");
					$(".left-tabs,#rightProperties").fadeOut(400);
                	$(".slide").animate({left:($(document).width() - $(".slide").width())/2 + "px"}); 
            	}else if(event.which == 83){  //s key
					save();
    			}
    		}
    	}
	});


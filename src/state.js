$(function(){


	


	$(".slide").unbind('click')
	$("#Properties_accordion").accordion({
		heightStyle: "content",
		collapsible: true
	});
	// $(".BarGraph").bind('click',function(){
	// 	activeObject = $(this);
	// 	alert("asjf");
	// 	$("input").each(function(){
	// 		var currentProp = $(this).attr("data-style");
	// 		$(this).val(activeObject.css(currentProp));
	// 	});
	// });
	
		$("input").change(function(){
			//var temp = {};
			//temp[$(this).attr("data-style")] = $(this).val();
				if($(this).attr("data-bars")){
				var i;
				var graph = slideArray[currentSlide].barGraphArr[parseInt(activeObject.attr('data-graphNo'))];
				for(i=graph.PREZ_bar.length;i<$(this).val();i++){
					graph.PREZ_add();
				}
				graph.PREZ_render();
				$(".bar").each(function(){ $(this).css({"position":"absolute","top":$(this).parent().height() - $(this).height() + "px"});});
				}else if($(this).attr("data-style")=="font-size"){
					activeObject.css($(this).attr("data-style"),$(this).val() + "px");
				}else if($(this).attr("data-style")=="shadowLeft" || $(this).attr("data-style")=="shadowTop" || $(this).attr("data-style")=="shadowBlur" || $(this).attr("data-style")=="shadowColor" || $(this).attr("data-style")=="shadowSpread"){
					var temp = $(this).attr("data-style");
					if(temp == "shadowColor"){
						currentShadow[temp] = $(this).val();
					}else{
						currentShadow[temp] = $(this).val() + "px ";
					}
					if(activeObject.attr("data-objectType")=="Text"){
						activeObject.css("text-shadow", currentShadow.shadowLeft + currentShadow.shadowTop + currentShadow.shadowBlur + currentShadow.shadowColor);
					}else{
						activeObject.css("box-shadow", currentShadow.shadowLeft + currentShadow.shadowTop + currentShadow.shadowBlur + currentShadow.shadowSpread +  currentShadow.shadowColor);
					}
					
					//alert(currentShadow.shadowLeft + currentShadow.shadowTop + currentShadow.shadowBlur + currentShadow.shadowColor);
					
				}else if($(this).attr("data-style") == "animation-delay" ){
						activeObject.attr("data-animDel",$(this).val());
					
				}else{
					activeObject.css($(this).attr("data-style"),$(this).val());
				}
		
			
		}).keyup(function(){
				if($(this).attr("data-bars")){
				var i;
				var graph = slideArray[currentSlide].barGraphArr[parseInt(activeObject.attr('data-graphNo'))];
				for(i=graph.PREZ_bar.length;i<$(this).val();i++){
					graph.PREZ_add();
				}
				graph.PREZ_render();
				}else if($(this).attr("data-style")=="translateZ" || $(this).attr("data-style")=="rotateX" || $(this).attr("data-style")=="rotateY" || $(this).attr("data-style")=="rotateZ" ){
					var temp = $(this).attr("data-style");
					currentTransform[temp] = "(" +  $(this).val() + ")";
					activeObject.css("transform", 
						"rotateX" + currentTransform.rotateX + 
						"rotateY" + currentTransform.rotateY +
						"rotateZ" + currentTransform.rotateZ +
						"translateZ" + currentTransform.translateZ);
				}else if($(this).attr("data-style") == "animation-delay" ){
						activeObject.attr("data-animDel",$(this).val());
					
				}else{
					activeObject.css($(this).attr("data-style"),$(this).val());
				}
		});
});

function save(){
	MAX_STATE++;
	var slide = slideArray[currentSlide];
	var barGraphArr = slide.barGraphArr;
	var textArr = slide.textArr;
	var rectangleArr = slide.rectangleArr;
	var imageArr = slide.imageArr;
	var videoArr = slide.videoArr;
	var Oiterator = 0;
	var Iiterator = 0;

	//Saving data of Bar Graphs here
	for(Oiterator = 0;Oiterator<barGraphArr.length;Oiterator++){
		var currentbarGraph = $(barGraphArr[Oiterator].represents);
		var animState = {myself :{
			animate:{},
			css:"matrix(1, 0, 0, 1, 0, 0)"
		}};
		animState.barArr = [];
		animState.myself.animate = currentbarGraph.css(["position","width","height","opacity","background-color","color","left","top"]);
		animState.myself.css = currentbarGraph.css(["transform","box-shadow"]);
		animState.myself.delay = parseInt(currentbarGraph.attr("data-animDel"));
		for(Iiterator = 0 ; Iiterator<barGraphArr[Oiterator].PREZ_bar.length;Iiterator++){
			
			var currentbar =  $(barGraphArr[Oiterator].PREZ_bar[Iiterator]);
			var tempBarObject  = {
				animate:currentbar.css(["position","width","height","opacity","scale","left"]),
				css:currentbar.css(["background-color","color"]),
				delay:parseInt(currentbar.attr("data-animDel"))

			};
			animState.barArr.push(tempBarObject);
		}
		barGraphArr[Oiterator].statesArrOb["state" + currentState] = animState;
	}

	//Saving data of Texts here
	for(Oiterator = 0;Oiterator<textArr.length;Oiterator++){
		var currentText = $(textArr[Oiterator].represents);
		var animState = {};
		animState.animate = currentText.css(["font-size","left","top"]);
		animState.css = currentText.css(["color","transform","text-shadow"]);
		animState.delay = parseInt(currentText.attr("data-animDel"));
		animState.text = currentText.html();
		textArr[Oiterator].statesArrOb["state" + currentState] = animState;
	}


	//Saving data of Rectangles here
	for(Oiterator = 0;Oiterator<rectangleArr.length;Oiterator++){
		var currentRectangle = $(rectangleArr[Oiterator].represents);
		var animState = {};
		animState.animate = currentRectangle.css(["left","top","width","height"]);
		animState.css = currentRectangle.css(["background","transform","border","box-shadow"]);
		//animState.text = currentText.html();
		animState.delay = parseInt(currentRectangle.attr("data-animDel"));
		rectangleArr[Oiterator].statesArrOb["state" + currentState] = animState;
	} 


	//Saving data of Images here
	for(Oiterator = 0;Oiterator<imageArr.length;Oiterator++){
		var currentImage = $(imageArr[Oiterator].represents);
		var animState = {};
		animState.animate = currentImage.css(["left","top","width","height"]);
		animState.css = currentImage.css(["transform","border","box-shadow"]);
		//animState.text = currentText.html();
		animState.delay = parseInt(currentImage.attr("data-animDel"));
		imageArr[Oiterator].statesArrOb["state" + currentState] = animState;
	}

	//Saving data of Videos here
	for(Oiterator = 0;Oiterator<videoArr.length;Oiterator++){
		var currentVideo = $(videoArr[Oiterator].represents);
		var animState = {};
		animState.animate = currentVideo.css(["left","top","width","height"]);
		animState.css = currentVideo.css(["transform"]);
		//animState.text = currentText.html();
		animState.delay = parseInt(currentVideo.attr("data-animDel"));
		videoArr[Oiterator].statesArrOb["state" + currentState] = animState;
	}

	currentState++;

};

function next(){
	if(currentState <= MAX_STATE){
		currentState++;
		if(statePerSlide[currentSlide] == currentState){
			$("#Slide" + currentSlide).fadeOut(400);
			currentSlide++;
			$("#Slide" + currentSlide).fadeIn(400);
		}
		var textToItr = slideArray[currentSlide].textArr;
		var graphToItr = slideArray[currentSlide].barGraphArr;
		var rectToItr = slideArray[currentSlide].rectangleArr;
		var imgToItr = slideArray[currentSlide].imageArr;
		var vidToItr = slideArray[currentSlide].videoArr;
		var itr = 0;
		//Animating all the graphs to next state
		for(itr=0;itr<graphToItr.length;itr++){
		 	//graphToItr[itr].goToState(currentState);
			barGraphToState(currentState,graphToItr[itr]);
		}

		//Animating all the texts to next state
		for(itr=0;itr<textToItr.length;itr++){
			//textToItr[itr].goToState(currentState);
			textToState(currentState,textToItr[itr]);
		}

		//Animating all the rectangles to next state
		for(itr=0;itr<rectToItr.length;itr++){
			//rectToItr[itr].goToState(currentState);
			rectToState(currentState,rectToItr[itr]);
		}


		//Animating all the images to next state
		for(itr=0;itr<imgToItr.length;itr++){
			//imgToItr[itr].goToState(currentState);
			imgToState(currentState,imgToItr[itr]);
		}

		//Animating all the videos to next state
		for(itr=0;itr<vidToItr.length;itr++){
			//vidToItr[itr].goToState(currentState);
			vidToState(currentState,vidToItr[itr]);
		}
	}	
};
function prev(){
	if(currentState > 0){
		if(statePerSlide[currentSlide-1] == currentState){
			$("#Slide" + currentSlide).fadeOut();
			currentSlide--;
			$("#Slide" + currentSlide).fadeIn();
		}
		currentState--;
		var textToItr = slideArray[currentSlide].textArr;
		var graphToItr = slideArray[currentSlide].barGraphArr;
		var rectToItr = slideArray[currentSlide].rectangleArr;
		var imgToItr = slideArray[currentSlide].imageArr;
		var vidToItr = slideArray[currentSlide].videoArr;
		var itr = 0;
		//Animating all the graphs to previous state
		for(itr=0;itr<graphToItr.length;itr++){
		 	//graphToItr[itr].goToState(currentState);
			barGraphToState(currentState,graphToItr[itr]);
		}

		//Animating all the texts to previous state
		for(itr=0;itr<textToItr.length;itr++){
			//textToItr[itr].goToState(currentState);
			textToState(currentState,textToItr[itr]);
		}

		//Animating all the rectangles to previous state
		for(itr=0;itr<rectToItr.length;itr++){
			//rectToItr[itr].goToState(currentState);
			rectToState(currentState,rectToItr[itr]);
		}


		//Animating all the images to previous state
		for(itr=0;itr<imgToItr.length;itr++){
			//imgToItr[itr].goToState(currentState);
			imgToState(currentState,imgToItr[itr]);
		}

		//Animating all the videos to previous state
		for(itr=0;itr<vidToItr.length;itr++){
			//vidToItr[itr].goToState(currentState);
			vidToState(currentState,vidToItr[itr]);
		}
	}	
};








function refreshProp(){
	$("#selectedItemName").html(activeObject.attr("data-name"));
	$("input").each(function(){
			var currentProp = $(this).attr("data-style");
			if(currentProp === "color" || currentProp === "background" || currentProp === "border-color"){
				var temp = jQuery.Color( activeObject, currentProp ).toHexString();
				$(this).val(temp);
			}else if($(this).attr('data-bars')){
				if(activeObject.attr('data-graphNo')){
				var noOfBars = slideArray[currentSlide].barGraphArr[parseInt(activeObject.attr('data-graphNo'))].PREZ_bar.length;
				$(this).val(noOfBars);
			}
			}else if($(this).attr("data-style")=="shadowLeft" || $(this).attr("data-style")=="shadowTop" || $(this).attr("data-style")=="shadowBlur" || $(this).attr("data-style")=="shadowColor" || $(this).attr("data-style")=="shadowSpread"){
				if($(this).attr("data-style")=="shadowColor"){
					$(this).val(currentShadow[currentProp]);				
				}else{
					var num = parseInt(currentShadow[currentProp]);
					$(this).val(num);
				}
			}else if($(this).attr('type') === "number"){
				var num = parseInt(activeObject.css(currentProp));
				$(this).val(num);
			}else{
				$(this).val(activeObject.css(currentProp));
			}
		});
}
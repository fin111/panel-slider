$(document).ready(function(){

	/*------ Variables -------*/

	var currentIndex = -1;
	var curPagIndex = 0;
	var panelsContainer = $('.panels-container');
	var panels = $('.panels-container .panel');
	var numPanels = panels.length;
	var dots = $('.dots');
	var sliderHeight = $('.curtain-slider').height();
	var nextBtn = $('.next-button');
	var animating = false;

	/*------ Initialise -------*/

	panels.css({top: "0"});
	panels.eq(-1).addClass('current-panel');
	console.log(numPanels);
	console.log(sliderHeight);

	/*---------------------- Dot Pagination -----------------------*/

	panelsContainer.after('<ul class="dot-pagination"></ul>');
	for(var i = 0; i < numPanels; i++){
		$('.dot-pagination').append('<li class="dots"></li>');
	};

	// Center pagination on slider 
	
	var pagHeight = $('.dot-pagination').height();
	var pagTopPosition = (sliderHeight - pagHeight) / 2;
	var pagTopPercentage = (pagTopPosition / sliderHeight) * 100;
	
	$('.dot-pagination').css({top: pagTopPercentage + '%'});
	$('.dots').eq(0).addClass('selected');

	/*---------------------- Next and Previous Scroll -----------------------*/
	 
	// Still need to get prev working
	$('.panels-container').on('wheel mousewheel', function(){

		if(animating === false){

			animating = true;
			//if(!e.originalEvent.wheelDelta > 0) {
				if(currentIndex > -numPanels){
					changeImage(currentIndex - 1);
					changePag(curPagIndex + 1);
				}else{
					panels.eq(0).css({'z-index': '10'});
					panels.animate({top: '0'}, 100);
					changeImage(-1);
					changePag(0);
				}	
		 	// }else{
		 	// 	if(currentIndex < numPanels-1){
				// 	//changeImage(currentIndex+1);
				// }else{
				// 	//changeImage(0);
				// }		 					 					
		 	//}
		 }else{
		 	return false;
		 }

	});

	// option for click, arrow at bottom of image
	nextBtn.on('click', function(){

		if(animating === false){

			animating = true;
			if(currentIndex > -numPanels){
				changeImage(currentIndex - 1);
				changePag(curPagIndex + 1);
			}else{
				panels.eq(0).css({'z-index': '10'});
				panels.animate({top: '0'}, 100);
				changeImage(-1);
				changePag(0);
			}	
		 }else{
		 	return false;
		 }

	});

	/*---------------------- Change Image Function -----------------------*/
	
	function changeImage(newIndex){

		//slides up top image and removes class current-panel
		panels.eq(currentIndex).animate({top: '-100%'}, 1000, function(){
			panels.eq(0).css({top: '0', 'z-index': '0'});
			$(this).removeClass('current-panel');
			animating = false;
		});

		//updates current image
		currentIndex = newIndex;

		//adds class to current image
		panels.eq(currentIndex).addClass('current-panel');

	};

	function changePag(newPagIndex){

		$('.dots').eq(curPagIndex).removeClass('selected');
		curPagIndex = newPagIndex;
		$('.dots').eq(curPagIndex).addClass('selected');

	};

});//end of ready function


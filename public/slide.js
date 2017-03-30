$(document).ready(function(){
	//Set Options
	var speed = 500;
	var autoswitch = true;
	var autoswitch_speed = 4000;
	
	//Add initial active class
	$('.slide').first().addClass('active');
	
	//Hide all slides
	$('.slide').hide();
	
	//Show first slide
	$('.active').show();
	
	//Next Handler
	$('#next').on('click',nextSlider);
	
	//Previous Handler
	$('#prev').on('click',prevSlider);
	
	if(autoswitch == true){
		setInterval(nextSlider,autoswitch_speed);
	}
	
	function nextSlider(){
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':last-child')){
			$('.slide').first().addClass('active');
		}else{
			$('.oldActive').next().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}
	
	function prevSlider(){
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':first-child')){
			$('.slide').last().addClass('active');
		}else{
			$('.oldActive').prev().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}
});
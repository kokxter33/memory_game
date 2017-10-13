var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'];
var memory_values = [];
var high_score = [];


Array.prototype.memory_tile_shuffle = function(){
	var i = this.length, j, temp;
	while(--i > 0){
		j = Math.floor(Math.random() * (i + 1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}
var memory = {
	"probalkozas" : 0,
	"parok_szama" : 0,
	"init" : function(){
	memory.highScore();
	memory.probalkozas = 0;
	memory.parok_szama = 0;
	var output = '';
	jQuery('.probalkozas').html('Hibák száma: '+memory.probalkozas);
		memory_array.memory_tile_shuffle();
		for(var i = 0; i < memory_array.length; i++){
			output += '<section class="cardContainer">';
			output +='<div class="card" id="tile_'+i+'" data-id="'+memory_array[i]+'">';
			output +='<div class="front" data-id="'+memory_array[i]+'"></div>';
			output +='<div class="back" data-id="'+memory_array[i]+'">'+memory_array[i]+'</div>';
			output +='</div>';
			output +='</div>';
		}
	jQuery('.game_wrap').html(output);
	memory.click();

	},
	"highScore" : function(){
		high_score.sort();
		console.log(high_score);
		if(high_score.length == 1){
			jQuery('.n1').html(high_score[0]);
		} else if(high_score.length == 2){
			jQuery('.n1').html(high_score[0]);
			jQuery('.n2').html(high_score[1]);
		} else {
			high_score.sort();
			jQuery('.n1').html(high_score[0]);
			jQuery('.n2').html(high_score[1]);
			jQuery('.n3').html(high_score[2]);
			console.log(high_score);
		}
	},
	"openCount"	: function() {
		/* mennyi van nyitva */
		var opened = jQuery('.cardContainer .flipped').length;
		var pairs = jQuery('.cardContainer .pair').length;
		return (opened - pairs);
	},
	"close_cards" : function(){
		var idozito = setTimeout(function(){
			jQuery('.flipped').each(function(){
				if(!jQuery(this).hasClass('pair')){
					jQuery(this).removeClass('flipped');	
				}
			});
		}, 900);
	},
	"pair" : function(opened_letter, akt) {
		jQuery('.flipped').each(function(){
			if(jQuery(this).data('id') == opened_letter || jQuery(this).data('id') == akt){
				jQuery(this).addClass('pair');
			}
		});
	},
	"click" : function() {
		jQuery('.card').click(function(){
		if(!jQuery(this).hasClass('flipped')){
			if(memory.openCount() == 0){
				jQuery(this).addClass('flipped');
			}else if(memory.openCount() == 1){
				/*ha 1 akkor nyitni és hasonlítani kell*/
				jQuery(this).addClass('flipped');
				var opened_letter = '';
				jQuery('.flipped').each(function(){	
					if(!jQuery(this).hasClass('pair')){
						var akt = jQuery(this).data('id');
						if(opened_letter == ''){
							opened_letter = akt;
						}else {
							if(opened_letter == akt){
								/*egyezik*/
								memory.pair(opened_letter, akt);
								memory.parok_szama++;
								if(memory.parok_szama == (memory_array.length / 2)){
									high_score.push(memory.probalkozas);
									high_score.sort();
									alert("Minden párt megtaláltál");
								}
							} else {
								/*nem egyezik*/
								memory.close_cards();
								memory.probalkozas++;
								jQuery('.probalkozas').html('Hibák száma: '+memory.probalkozas);

							}
						}
					}
				});
			}
		}
	});
	}
}
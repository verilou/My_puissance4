(function($) {
// définition du plugin jQuery
$.fn.puissance_4 = function(largeur = 6, hauteur = 7, couleur1 = "", couleur2 = "") {
	if (couleur1 == couleur2 && couleur1 !== "" && couleur2 !== "") { return; }
	var player = 1;
	var str = "";
	var couleur1_fin;
	var couleur1_bis;
	var couleur2_fin;
	var couleur2_bis;
	if (couleur1 === "") { 
		couleur1_fin = "radial-gradient(circle, white, #bb377d)";
		couleur1_bis = "radial-gradient(circle, #bb377d, white)";
	} else {
		couleur1_fin = "radial-gradient(circle, white, " + couleur1 +")";
		couleur1_bis = "radial-gradient(circle, " + couleur1 +", white)";
	}
	if (couleur2 === "") { 
		couleur2_fin = "radial-gradient(circle, #185D4C, #009A73)";
		couleur2_bis = "radial-gradient(circle, #009A73, #185D4C)";
	} else {
		couleur2_fin = "radial-gradient(circle, white, " + couleur2 +")";
		couleur2_bis = "radial-gradient(circle, " + couleur2 + ", white)";
	}
	$(this).css({"margin" : " 2% 3%"});
	$(this).prepend("<table id=\"puissance4\"></table>");
	$(this).prepend("<div id=\"animation\"></div>");
	$("#animation").prepend("<table id=\"table_anim\"><tr id=\"tr_anim\"></tr></table>");
	for (var i = 0; i < largeur; i++) {
		$("#tr_anim").append("<td class=\"anim casehidden"+ i +"\"></td>");
	}
	for (var j = 0; j < hauteur; j++) {
		str += `<tr class="ligne${j}">`;
		for (i = 0; i < largeur; i++) {
			str += "<td data-status=\"\" col=\"" + i + "\" ligne=\"" + j + "\" id=\"" + i + "-" + j +"\"></td>";
		}
		str += "</tr>";
	}
	var player1  = 0;
	var player2 = 0;
	$("body").css({
		  	"background" : "linear-gradient(to right, #aaffa9, #11ffbd)"
	});
	$("#puissance4").append(str);
	$("table").css({
		"border" : "5px solid #fbd3e9",
		"border-radius" : "30px",
		"margin-top" : "100px",
		"background" : "linear-gradient(to left, #00d2ff, #3a7bd5)", 
	});
	$("tr").css({
		'width' : '100px',
		'height' : '100px',
		'border-collapse' : 'collapse',
	});
	$("td").css({
		'position': 'relative',
		'width' : '100px',
		'height' : '100px',
		"border" : "solid 3px #fbd3e9",
		'border-collapse' : 'collapse',
		'border-radius' : "50%",
		'background' : "linear-gradient(to left, #ddd6f3, #faaca8)"

  	});
	$("#tr_anim").css({
		"background-color" : "white",
		"border" : "white",
	});
	$("#table_anim").css({
		"position" : "absolute",
		"top" : "-500px",
		"background-color" : "white",
	});
	$('.anim').css({
		"z-index" : "100",
		"border" : "white 3px solid",
	});
	$('#puissance4 tr td').each(function(e){
		$(this).attr("data-status", 0);
	});
	$(this).append("<div class=\"score\"><p id='tour'>C'est au joueur 1</p></div>");
	$(".score").css({
		"display" : "block",
	});
	$(".score").append("<p id='score'><p>");
	$(".score").css({
		"border-radius" : "10px",
		"margin" : "2%",
		"padding" : "1% 1% 1% 2%",
		"height" : "75px",
		"width" : "25%",
		"background" : " linear-gradient(to right, #c9ffbf, #ffafbd)",
		"box-shadow" : "0px 0px 65px 5px rgba(191,90,191,1)",
	});
	console.log($("#score"));
	function check_win(coord, couleur, stade, rule = "") {
		if (stade >= 4) {
			reset(couleur, rule);

		}
		//console.log(".case" + coord.attr('class').substring(4,5) + coord.attr('class').substring(5,6), "test");
		var in_touch = {
			"top" : $("#" + coord.attr('col') + "-" + (parseInt(coord.attr('ligne')) - 1)),
			"top-right" : $("#" + (parseInt(coord.attr('col')) + 1) + "-" + (parseInt(coord.attr('ligne')) - 1)),
			"top-left" : $("#" + (parseInt(coord.attr('col')) - 1) + "-" + (parseInt(coord.attr('ligne')) - 1)),
			"bottom" : $("#" + coord.attr('col') + "-" + (parseInt(coord.attr('ligne')) + 1)),
			"bottom-right" : $("#" + (parseInt(coord.attr('col')) + 1) + "-" + (parseInt(coord.attr('ligne')) + 1)),
			"bottom-left" : $("#" + (parseInt(coord.attr('col')) - 1) + "-" + (parseInt(coord.attr('ligne')) + 1)),
			"left" : $("#" + (parseInt(coord.attr('col')) - 1) + "-" + coord.attr('ligne')),
			"right" : $("#" + (parseInt(coord.attr('col')) + 1) + "-" + coord.attr('ligne'))
		};
		console.log(in_touch);
		$.each(in_touch, function(i, value){
			if (value[0]) {
				if(value[0].attributes[0].value === couleur){
					if (rule === "") {
						if(in_touch[debug(i)] && in_touch[debug(i)][0] && in_touch[debug(i)][0].attributes[0].value === couleur){
							stade = stade + 1;
						}
				 		check_win($("#" + value[0].id), couleur, stade + 1, i);
				 	} else if (rule === i) {
				 		if(	in_touch[debug(i)] && 
				 			in_touch[debug(i)][0] &&
				 			in_touch[debug(i)][0].attributes[0].value === couleur &&
				 			debug(rule) === debug(i)){ 
				 			stade = stade + 1;
				 		}
				 		check_win($("#" + value[0].id), couleur, stade + 1, i);

				 	}
				}
			}
		});
	}
	function debug(index){
		switch (index) {
			case "top" : return "bottom";
			case "top-right" : return "bottom-left";
			case "top-left" : return "bottom-right";
			case "bottom" : return "top";
			case "bottom-right" : return "top-left";
			case "bottom-left" : return "top-right";
			case "left" : return "right";
			case "right" : return "left";
			default:
				console.log("erreur mauvais arguemnt \"" + index + "\"");
		}

	}
	function reset(my_color, rule){
		if (my_color === "") {
			$("#tour").replaceWith("<p id='tour'>Egalité</p>");

		} else {
			if (my_color == 1) { player1++; }
			if (my_color == 2) { player2++; }
			$("#score").replaceWith("<p id='score'>Score : joueur 1 = " + player1 + " joueur 2 = " + player2 + "<p>");
			$("#tour").replaceWith("<p id='tour'>Le joueur " + my_color + " a gagnée</p>");
		} 
		$('#puissance4 tr td').attr("data-status", 0);
		$("#tour").css({"color" : "#00d2ff"});
		$("#score").css({"color" : "#00d2ff"});
		rule = "";
		setTimeout(function(){
				$('#puissance4 tr td').css({
				'background' : '',
				'background-color' : '#B2F885',
			});
		}, 2000);
		return rule;
	}
	function free_case(arg, col_lvl) {
		var ligne = parseInt(arg.attr('col'));
		var sujet = $("#" + ligne + "-" + col_lvl);
		//console.log($(".case" + col_lvl + ligne).attr("data-status"));
		if (parseInt(sujet.attr("data-status")) === 0) {
			//console.log($(".case" + col_lvl + ligne)[0].offsetTop, "test2");
			var hauteur_anim =  sujet[0].offsetTop + (hauteur - col_lvl) * 90;
			//console.log(hauteur - 1 - col_lvl);
			var animate = "-=" + (300 + hauteur_anim - (hauteur - 1 - col_lvl) * 104) + "px";
			var min_animate = "+=" + (300 + hauteur_anim - (hauteur - 1 - col_lvl) * 104) + "px";
			if (player === 1) {
				$('.casehidden' + ligne).css({
					"background" : couleur1_bis,
				});
					$( ".casehidden" + ligne ).animate({ "bottom": animate }, "slow", function(){
					sujet.css({"background" : couleur1_fin});
					$( ".casehidden" + ligne ).css({"background-color" : "white"});
					$( ".casehidden" + ligne ).animate({ "bottom": min_animate }, 1);
				});
				$("#tour").replaceWith("<p id='tour'>C'est au tour du player 2</p>");
				$("#tour").css({"color" : "#00d2ff"});
				player = 2;
				//console.log($(".case" + col_lvl + ligne).data("status"));
				sujet.attr("data-status", 1);
				//console.log($(".case" + col_lvl + ligne).data("status"));
				return sujet;
			}else if (player === 2) {
				$('.casehidden' + ligne).css({
					"background" : couleur2_bis,
				});
				//console.log(950 - animate);
				player = 1;
				$("#tour").replaceWith("<p id='tour'>C'est au tour du player 1</p>");
				$("#tour").css({"color" : "#00d2ff"});
				$( ".casehidden" + ligne ).animate({ "bottom": animate }, "slow", function(e){
					$("#" + ligne  + "-" + col_lvl).css({"background" : couleur2_fin});
					$( ".casehidden" + ligne ).css({"background-color" : "white"});					
					$( ".casehidden" + ligne ).animate({ "bottom": min_animate }, 1);
				});
				$("#" + ligne + "-" + col_lvl).attr("data-status", 2);
				return sujet;
			}
		}else if (parseInt(sujet.attr("data-status")) === 1 || parseInt(sujet.attr("data-status")) === 2) {
			var value = free_case(arg, col_lvl - 1);
			return value;
		}
	}
	var last_click = 0;
	var click_count = 0;
	$('#puissance4 tr').children().on('click', function(){
		if(Date.now() - last_click > 800) {
			console.log("Joueur" , player);
	        last_click = Date.now();
			var new_piece = free_case($(this), hauteur - 1);
			if (new_piece) {
				if(new_piece.data("status") === 1) {
					check_win(new_piece, "1", 0);
					click_count++;
				}else {
					check_win(new_piece, "2", 0);
					click_count++;
				}
			}
		}
		console.log(click_count, hauteur*largeur);
		if (click_count === hauteur * largeur) {
			reset("", "");
		}
	});
	$("#tour").css({"color" : "#00d2ff"});
	return this;
};
})(jQuery);
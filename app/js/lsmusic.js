/*
 * Manage the layout content.
 */
var Layout = {
	createContainer: function(id, element){
    	var container = document.createElement(element);
		container.id = id;

		return container;
    },
    createFigureWithImage: function(input_img_src, input_img_id, input_type_txt, input_class_txt, input_value_txt, input_img_txt, input_onclick, id){
    	var container =document.createElement("figure");

    	var input_img = document.createElement("input");
    	if (input_img_id != 0) {
    		input_img.id = input_img_id;
    	}
    	input_img.src = input_img_src;
    	input_img.type = "image";

		if (input_onclick == "MusicRecommender.setData(3,") {

			var onclick = input_onclick + ' " '+input_value_txt+ ' ","","") ';  
    	
    	} else if (input_onclick == "MusicRecommender.setData(1,") {
    				//var onclick = input_onclick + " '',"+input_value_txt+' " ' ")";
					var onclick = input_onclick + '"","' + input_value_txt + '","'+ id + '")'; 
    			}
    	input_img.setAttribute("onclick", onclick);

    	var input = document.createElement("input");
    	input.type = input_type_txt;
    	input.setAttribute("class",input_class_txt);
    	if (input_img_txt == 0) {
    		input.src = input_value_txt;
    		input.setAttribute("onclick", input_onclick);
    	} else {
    		input.value = input_value_txt;
	       	if (input_onclick == "MusicRecommender.setData(3,") {
				//var onclick = input_onclick + '"'+input_value_txt+'"' + ", '')";
				var onclick = input_onclick + '"'+input_value_txt+ '","","")';
	    	} else if (input_onclick == "MusicRecommender.setData(1,") {
    				//var onclick = input_onclick + "''"+'"'+input_value_txt+'"' + ")";
					var onclick = input_onclick + '"","' + input_value_txt + '","'+ id + '")';
    			}
	    	input.setAttribute("onclick", onclick);
    	}
		container.appendChild(input_img);
		container.appendChild(input);
	    return container;
    },

    createText: function(element, text) {
    	var container = document.createElement(element);
    	var txt = document.createTextNode(text);
    	container.appendChild(txt);

    	return container;
    },

    createHeaderTable : function () {

		var container = document.createElement("table");
		container.setAttribute("class", "info_song");
		var linia = document.createElement("tr");
		linia.id = "cap";
		/*Afegim cada un dels elements del header de la taula. L'estructura haurà de quedar per l'estil:
		<table class="info_song">
		  <tr>
		    <th>Nº</th>
		    <th>Name</th>
		    ...
		  </tr>
		  <tr>
		    <td><input type="button" value="1"></td>
		    <td><input type="button" value=nom de la cançó></td>
		    ...
		*/
		var header_table = document.createElement("th");
		var data = document.createTextNode("Nº");
		header_table.appendChild(data);
		linia.appendChild(header_table);

		header_table = document.createElement("th");
		data = document.createTextNode("Name");
		header_table.appendChild(data);
		linia.appendChild(header_table);

		header_table = document.createElement("th");
		data = document.createTextNode("Time");
		header_table.appendChild(data);
		linia.appendChild(header_table);

		header_table = document.createElement("th");
		data = document.createTextNode("Album");
		header_table.appendChild(data);
		linia.appendChild(header_table);

		header_table = document.createElement("th");
		data = document.createTextNode("Artist");
		header_table.appendChild(data);
		linia.appendChild(header_table);

		container.appendChild(linia);

		return container;
    },

	createInfoSong : function ( url, num_song, name_song, min, seg, album_name, artist_name, table) {
		var linia = document.createElement("tr");
		linia.type = "button";
		var contingut = document.createElement("td");
		var input = document.createElement("input");

		input.type = "button";
		input.value = num_song;
		input.setAttribute("onclick", "Player.playSong('"+url+"')");
		contingut.appendChild(input);
		linia.appendChild(contingut);

		contingut = document.createElement("td");
		input = document.createElement("input");
		input.type = "button";
		input.value = name_song;
		input.setAttribute("onclick", "Player.playSong('"+url+"')");
		contingut.appendChild(input);
		linia.appendChild(contingut);

		contingut = document.createElement("td");
		input = document.createElement("input");
		input.type = "button";
		input.setAttribute("onclick", "Player.playSong('"+url+"')");
		if (seg < 10) input.value = min + ":0"+seg;
		else input.value = min + ":"+seg;
		contingut.appendChild(input);
		linia.appendChild(contingut);

		contingut = document.createElement("td");
		input = document.createElement("input");
		input.type = "button";
		input.value = album_name;
		input.setAttribute("onclick", "Player.playSong('"+url+"')");
		contingut.appendChild(input);
		linia.appendChild(contingut);

		contingut = document.createElement("td");
		input = document.createElement("input");
		input.type = "button";
		input.value = artist_name;
		input.setAttribute("onclick", "Player.playSong('"+url+"')");
		contingut.appendChild(input);
		linia.appendChild(contingut);

		table.appendChild(linia);
	},
}

/**
 * Simple object to manage the AJAX calls.
 */
var AJAX = {
	request: function(url){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send();

		return JSON.parse(xhr.responseText);
	}
}

//Per guardar les dades a la BBDD
var Data = {

	get: function (id_artista){
			var xhr = new XMLHttpRequest();
			xhr.open("PUT","http://api.hipermedia.local/query");
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send("SELECT id_artista FROM music WHERE id_artista="+id_artista);
			xhr.responseText;
	},

	save: function (id_artista){
			var xhr = new XMLHttpRequest();
			xhr.open("PUT","http://api.hipermedia.local/query");
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send("INSERT INTO music VALUES("+id_artista+")");
			xhr.responseText;
	},
}

//Per reproduir les cançons al donar-li al play

var is_playing=false,sound,currentSong;

var Player = {

	playSong : function (url) {

        if (currentSong != url){  

        	if (sound) sound = false;
        	if (is_playing){
        		is_playing = false;
        		audioObject.pause();  
        	} 
        	
        	audioObject = new Audio(url);
        	audioObject.play();
        	sound = true;
	      	is_playing = true;
	      	currentSong = url;        
        }

        else{
        	if(sound) {
		        if(is_playing) {
		            audioObject.pause();
		            is_playing = false;
		        } else {
		            audioObject.play();
		            is_playing = true;
		        }
		    }
        }
	}
}

var MusicRecommender = {
	dades : " ",
	seccio : " ",
	dades_ok : " ",
	artista_select : " ",
	album_select : " ",
	album_id : " ",

	detail: function (){

	},

	search: function (number){
	var nomBuscat = document.forms["buscadorMusica"]["nomMusica"].value;

		if (nomBuscat != ""){
			switch(number){
				case 1:
					MusicRecommender.setData(5, nomBuscat, "", "");
					break;
				case 2:
					MusicRecommender.setData(4, nomBuscat, "", "");
					break;
				case 3:
					MusicRecommender.setData(3, nomBuscat, "", "");
					break;
			}
		}
		
	},

	setData : function (opc, nomArtista, nomAlbum, album_id) {
		this.artista_select = nomArtista;
		this.album_select = nomAlbum;

		switch (opc) {
			//Per mostrar les cançons quan ens fan click a l'àlbum
			case 1:
				var aux = 'https://api.spotify.com/v1/albums/'+album_id+'/tracks';
				var link = encodeURI(aux);
				dades = AJAX.request(link);
	      		console.log(dades);
	      		if (dades.error == null) {
	      			MusicRecommender.listSongs();
	      		} else alert("Error");
	      		

				break;
				//Per mostrar els top albums al principi
			case 2:
				
				var aux = 'https://api.spotify.com/v1/search?q=tag:new&type=album';
	      		var link = encodeURI(aux);
	      		dades = AJAX.request(link);
	      		console.log(dades);
	      		MusicRecommender.listAlbum();

				break;
				//Per mostrar els àlbums quan ens fan click 
			case 3:
				var aux = 'https://api.spotify.com/v1/search?q='+nomArtista+'&type=album';
				var link = encodeURI(aux);
				dades = AJAX.request(link);
	      		console.log(dades);
	      		if (dades.albums.items.length != 0) {
	      			MusicRecommender.listAlbum();
	      		} else alert("Error. Album not found!!");
				break;
				//Per mostrar els artistes quan ens fan click
			case 4:
				var aux = 'https://api.spotify.com/v1/search?q='+nomArtista+'&type=artist';
				var link = encodeURI(aux);
				dades = AJAX.request(link);
	      		console.log(dades);
	      		Data.save(dades.artists.items[0].id);
	      		if (dades.artists.items.length != 0) {
					MusicRecommender.listArtist();
	      		} else alert("Error. Artist not found!!");

				break;
			case 5:
				//var aux = 'https://api.spotify.com/v1/search?q='+nomAlbum+'&type=track';
				var aux = 'https://api.spotify.com/v1/search?q='+nomArtista+'&type=track';
				var link = encodeURI(aux);
				dades = AJAX.request(link);
	      		console.log(dades);
	      		if (dades.error != null || dades.tracks.items.length != 0) {
	      			MusicRecommender.listSongs2();
	      		} else alert("Error. Song not found!!");
	      		

				break;
		}
	},

	listArtist : function () {
		MusicRecommender.deletePreviousData();
		this.seccio = Layout.createContainer("llistaArtistes", "section");
		var opcio = Layout.createText("h2", "Artists");

		this.seccio.appendChild(opcio);

		//Creem el llistat de tots els artistes
		var ul = Layout.createContainer("artists", "ul");

		var i = 0;
		for (i = 0; i < dades.artists.limit; i++) {
			if (i < dades.artists.total){
				//Creem cada element del llistat
				var li = Layout.createContainer("artists_"+i, "li");

				//Creem la figure que contindrà l'input i la imatge
				if (dades.artists.items[i].images.length == 0){
						var figure = Layout.createFigureWithImage("default_image.png", "", "button", "the_buttons", dades.artists.items[i].name, 1, "MusicRecommender.setData(3,", dades.artists.items[i].id);	
				} 
				else{
					
				//	MusicRecommender.scaleSize(300,300,dades.artists.items[i].images[1].width, dades.artists.items[i].images[1].height);

					if (dades.artists.items[i].images[1].width == 300 && dades.artists.items[i].images[1].height == 300) var figure = Layout.createFigureWithImage(dades.artists.items[i].images[1].url, "", "button", "the_buttons", dades.artists.items[i].name, 1, "MusicRecommender.setData(3,", dades.artists.items[i].id);	
					else var figure = Layout.createFigureWithImage(dades.artists.items[i].images[2].url, "", "button", "the_buttons", dades.artists.items[i].name, 1, "MusicRecommender.setData(3,", dades.artists.items[i].id);	
				}
				
				//Ho posem tot en un div
				var div = document.createElement("div");
				div.setAttribute("class", "show-artist");

				div.appendChild(figure);
				li.appendChild(div);
				ul.appendChild(li);
			}
		}

		this.seccio.appendChild(ul);
		document.body.appendChild(this.seccio);

	},

	listAlbum : function () {
		MusicRecommender.deletePreviousData();
		//Creem la secció on posarem tot el llistat d'artistes
		this.seccio = Layout.createContainer("llistaAlbums", "section");

		//Creem el text
		if (this.artista_select = " ") {
			var opcio = Layout.createText("h2", "Albums");
		} else var opcio = Layout.createText("h2", "Albums - "+this.artista_select);
		this.seccio.appendChild(opcio);

		//Creem el llistat de tots els artistes
		var ul = Layout.createContainer("album", "ul");

		var i = 0;

		for (i = 0; i < dades.albums.limit ; i++) {
			//Creem cada element del llistat

			if (i < dades.albums.total){
				var li = Layout.createContainer("album_"+ i, "li");
				if (dades.albums.items[i].images.length == 0){
					var figure = Layout.createFigureWithImage("default_image.png", "", "button", "the_buttons", dades.albums.items[i].name, 1, "MusicRecommender.setData(1,", dades.albums.items[i].id);
				} 
				else{
					var figure = Layout.createFigureWithImage(dades.albums.items[i].images[1].url, "", "button", "the_buttons", dades.albums.items[i].name, 1, "MusicRecommender.setData(1,", dades.albums.items[i].id);
				}

				//Ho posem tot en un div
				var div = document.createElement("div");
				div.setAttribute("class", "show-album");

				div.appendChild(figure);
				li.appendChild(div);
				ul.appendChild(li);
			}

		}
		
		this.seccio.appendChild(ul);
		document.body.appendChild(this.seccio);
	},
	
	deletePreviousData : function () {
		var art = document.getElementById("llistaArtistes");
		var song = document.getElementById("llistaCancons");
		var alb = document.getElementById("llistaAlbums");
		if (art != null | song != null | alb != null) {
			if (art != null) art.parentNode.removeChild(art);
			if (song != null) song.parentNode.removeChild(song);
			if (alb != null) alb.parentNode.removeChild(alb);
		}
	},

	listSongs : function () {
		MusicRecommender.deletePreviousData();
		this.seccio = Layout.createContainer("llistaCancons", "section");

		//Creem el text
		if (this.album_select == " ") {
			var opcio = Layout.createText("h2", "Songs");
		} else {
			var opcio = Layout.createText("h2", "Songs - "+this.album_select);
		}
		this.seccio.appendChild(opcio);

		var i = 0;
		var table = Layout.createHeaderTable(this.seccio);

		
		for (i = 0; i < dades.total; i++) {
			var flag_minut = 1;
			var time = dades.items[i].duration_ms /1000;
			var minutes = Math.floor(time / 60);
			var seconds = time - minutes * 60;
			seconds = Math.floor(seconds);
			Layout.createInfoSong(dades.items[i].preview_url, dades.items[i].track_number, dades.items[i].name, minutes, seconds ,this.album_select, dades.items[i].artists[0].name, table);
		}		
		this.seccio.appendChild(table);
		document.body.appendChild(this.seccio);
	},

	listSongs2 : function () {
		MusicRecommender.deletePreviousData();
		this.seccio = Layout.createContainer("llistaCancons", "section");

		//Creem el text
		var opcio = Layout.createText("h2", "Songs");
		this.seccio.appendChild(opcio);

		var i = 0;
		var table = Layout.createHeaderTable(this.seccio);

		for (i = 0; i < dades.tracks.total; i++) {
			if( i<dades.tracks.limit){
				var flag_minut = 1;
				var time = dades.tracks.items[i].duration_ms /1000;
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				seconds = Math.floor(seconds);
				//createInfoSong : function ( url, num_song, name_song, min, seg, album_name, artist_name, table)
				Layout.createInfoSong(dades.tracks.items[i].preview_url, i+1, dades.tracks.items[i].name, minutes, seconds , dades.tracks.items[i].album.name, dades.tracks.items[i].name, table);
				
			}
		}		

		this.seccio.appendChild(table);
		document.body.appendChild(this.seccio);
	},

	main: function (){
		var html = [''];
		html.push('<div id="buscador"><form name="buscadorMusica" method="GET"><input id="txt" type="text" name="nomMusica" placeholder="Song / Artist / Album" required><img id="lupa" src="buscador.png"><br><button type="button" onclick="MusicRecommender.search(1)">SONG</button><button type="button" onclick="MusicRecommender.search(2)">ARTIST</button><button type="button" onclick="MusicRecommender.search(3)">ALBUM</button></form>');
		document.write(html.join(''));
		document.body.setAttribute("background", "fons.png");
		MusicRecommender.setData(2,"","");
	},

}

MusicRecommender.main();

/*<?php
$servername = "192.168.33.1";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>*/
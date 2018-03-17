var app = {
	inicio: function(){
		this.iniciaFastClick()
	},

	iniciaFastClick: function(){
		FastClick.attach(document.body)
	},

	dispositivoListo: function(){
		// navigator.geolocation.getCurrentPosition(app.dibujaCoordenadas, app.errorAlSolicitarLocalizacion)
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion)
	},

	cambioPosicion: function(){
		navigator.geolocation.watchPosition(onSuccess, onError, {timeout: 3000})
	},

	// dibujaCoordenadas: function(position){
	// 	var coordsDiv = document.querySelector('#coords')

	// 	coordsDiv.innerHTML = 'Latitud: '+position.coords.latitude+' Longitud: '+position.coords.longitude
	// },

	pintaCoordenadasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13)

		 L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29sbGluc21kZnAiLCJhIjoiY2plaXVid2d3MDVsbjJ3bXBkNGk0aXJrMyJ9.F-Qgq97xVlo7FU5ZALGr9w', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">openstreetmap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/"CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18
		}).addTo(miMapa)

		// app.pintaMarcador([position.coords.latlng, position.coords.longitude], '¡Estoy aquí!', miMapa)

		app.pintaMarcadorPersonal([position.coords.latitude, position.coords.longitude], '¡Aquí estoy!', miMapa)

		app.pintaCirculo([position.coords.latitude, position.coords.longitude], miMapa)

		miMapa.on('click', function(ev){
			var texto = 'Marcador en lat('+ev.latlng.lat.toFixed(2)+') y lon('+ev.latlng.lng.toFixed(2)+')'
			app.pintaMarcador(ev.latlng, texto, miMapa)
		})
	},

	pintaMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng, {icon:L.icon({
			iconUrl: 'css/images/marker-icon.png',
			popupAnchor: [12,0]})
	}).addTo(mapa)
		
		marcador.bindPopup(texto)
				.openPopup()
	},

	pintaMarcadorPersonal: function(latlng, texto, mapa){
		var miIcono = L.icon({
	 		iconUrl:"css/images/marker-iconr.png",
	 		// iconRetinaUrl:"css/images/marker-iconr-2x.png",
	 		shadowUrl:"css/images/marker-shadow.png",
	 		iconSize:[25,41],
	 		iconAnchor:[12,41],
	 		popupAnchor:[0,-41],
	 	// 	tooltipAnchor:[16,-28],
	 		shadowSize:[41,41]
	 	})

	 	var marcador = L.marker(latlng, {icon: miIcono}).addTo(mapa)
		
		marcador.bindPopup(texto)
				.openPopup()
	},

	pintaCirculo: function(latlng, mapa){
		var circle = L.circle(latlng, {
			color: 'orange',
			radius: 1000
		}).addTo(mapa)
	},

	errorAlSolicitarLocalizacion: function(error){
		console.log(error.code+': '+error.message)
	},

	onSuccess: function(position){
		var element = document.getElementById('geolocation')

		alert('lat:('+position.coords.latitude+') lon:('+position.coords.longitude+')')
	},

	onError: function(error){
		alert('código: '+error.code+'\nmensaje: '+error.message)
	}
}

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio()
	})
	document.addEventListener('deviceready', function(){
		app.dispositivoListo()
		app.cambioPosicion()
	})
}


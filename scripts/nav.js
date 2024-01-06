
const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		//Mover Nav (meterlo en pantalla)
		nav.classList.toggle('nav-active');

		
		//Animacion Links
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else 
				link.style.animation = `navLinkFade 2.0s ease forwards ${index / 7 + 0.4}s`; 
		});

		//Animacion burger
		burger.classList.toggle('toggle');
	});
}

navSlide();

/*
function mostrar_Pagina(pagina){
	if (document.querySelector("#html5").innerHTML == ("")){

		let promise	= fetch(pagina);
		promise.then(response => {
			response.text().then(text => {
				document.querySelector("#html5").innerHTML = text;
			});
		})
		.catch(error => {
			console.log(error);
			document.querySelector("#html5").innerHTML = "<h1>Error</h1>"
		})
	}
	else document.querySelector("#html5").innerHTML = "";
	
}
*/
const CardGrid = document.getElementById("CardGrid");
const cardList = []

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;   
console.log(target);
}, false);


start();

async function start(){
	await createDeck();
}




class Card {
  constructor(Cvalue, Csrc) {
    this.Cvalue = Cvalue;
	this.Csrc = Csrc;
  }

  test() {
    return 'I have a ' + this.value; 
  }
}



async function createDeck() {
	const myObj = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
	const myText = await myObj.json();

	var deckID = myText.deck_id;
	CardGrid.setAttribute("deckid", deckID);
	
	console.log(myText);
	var card = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=52");
	var cardText = await card.json();
	console.log(cardText);
	
	for (let i = 0; i < 52; i++) {
		
		var tmp = cardText.cards[i].value;
		
		if(tmp == "KING"){
			tmp = 13;
		} else if (tmp == "QUEEN"){
			tmp = 12;
		} else if (tmp == "JACK"){
			tmp = 11;
		} else if (tmp == "ACE"){
			tmp = 1;
		}
		
		cardList[i] = Card(tmp, cardText.cards[i].image);
		console.log(cardList[i]);
		
		CardGrid.innerHTML += "<div><img src='https://media.istockphoto.com/photos/bicycle-rider-back-playing-card-design-picture-id157772536?k=20&m=157772536&s=170667a&w=0&h=46bM0a2wuwcddiOzNOHTfS9PcUzjXwNTTCy33SrkC_0=' width='115' height='167' index='" + i + "'></div>";
	}
}





/*

async function higher(){
	await getNextCard(divTest.getAttribute("deckid"));
	
	if(parseInt(card.getAttribute("cardVal")) >= parseInt(nextcard.getAttribute("cardVal"))){
		result.innerText = "Lose";
	} else {
		result.innerText = "Win";
	}
}

async function lower(){
	await getNextCard(divTest.getAttribute("deckid"));
	
	if(parseInt(card.getAttribute("cardVal")) <= parseInt(nextcard.getAttribute("cardVal"))){
		result.innerText = "Lose";
	} else {
		result.innerText = "Win";
	}
}




async function getCard(deckID) {
	const myObj = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
	const myText = await myObj.json();
	
	
	var tmp = myText.cards[0].value;
	
	if(tmp == "KING"){
		tmp = 13;
	} else if (tmp == "QUEEN"){
		tmp = 12;
	} else if (tmp == "JACK"){
		tmp = 11;
	} else if (tmp == "ACE"){
		tmp = 1;
	}
	
	card.setAttribute("cardVal", tmp);
	img.setAttribute("src", myText.cards[0].image);
	nextcard.innerText = "Current Card: " + tmp;
}

async function getNextCard(deckID) {
	card.setAttribute("cardVal", nextcard.getAttribute("cardVal"));
	
	const myObj = await fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
	const myText = await myObj.json();
	
	
	var tmp = myText.cards[0].value;
	
	if(tmp == "KING"){
		tmp = 13;
	} else if (tmp == "QUEEN"){
		tmp = 12;
	} else if (tmp == "JACK"){
		tmp = 11;
	} else if (tmp == "ACE"){
		tmp = 1;
	}
	
	nextcard.innerText = "Current Card: " + tmp;
	img.setAttribute("src", myText.cards[0].image);
	nextcard.setAttribute("cardVal", tmp);
}


*/
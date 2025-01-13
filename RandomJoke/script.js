const JokeBody = document.getElementById("JokeContent");

function speakJoke(joke) {
        const speech = new SpeechSynthesisUtterance(joke);
        speech.lang = 'en-US';  // Set the language (English)
        window.speechSynthesis.speak(speech);  // Speak the joke
}

document.getElementById("JokeButton").addEventListener("click",()=>{
        JokeBody.innerHTML = "";
        let Joke = document.createElement("p");
        fetch("https://icanhazdadjoke.com/",{
                        headers:{
                                'Accept':"application/json"    // fetch has a second argument "options"
                        }
        })
        .then((response)=>{ return response.json(); })
        .then((obj)=>{
                Joke.innerText = obj.joke;
                speakJoke(Joke.innerText);
        })
        .catch(()=>{ Joke.innerText = " I Don't Have One !"; })
        .finally(()=>{ JokeBody.append(Joke); });
});



const map = {
        0: "images/clear.png", // Clear
        1: "images/cloud.png", // Cloudy
        3: "images/overcast.png", //  Overcast
        2: "images/cloud.png", // Partly Cloudy
        45: "images/mist.png", // Fog
        48: "images/mist.png", // Mist
        51: "images/rain.png", // Drizzle
        61: "images/rain.png", // Rain
        71: "images/snow.png", // Snow
};

const main = document.querySelector(".main");
const SearchBar = document.querySelector(".SearchBar");

document.querySelector(".SearchButton").addEventListener("click",()=>{
        while(main.children.length>1) main.lastElementChild.remove();

        let city = SearchBar.value;

        let ImageCard = document.createElement("div");
        ImageCard.className = "placeholder";

        let ResultArea = document.createElement("div");
        ResultArea.className = "ResultArea";

        let temp = document.createElement("div");
        temp.className = "childs";

        let wind = document.createElement("div");
        wind.className = "childs";

        ResultArea.append(temp,wind);

        fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
        .then((response)=>{ return response.json(); })
        .then((data)=>{
                console.log(data);
                if(data.length>4 || data.length===0) throw new Error("not found");
                const { lat, lon } = data[0];
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        })
        .then((response)=>{ return response.json(); })
        .then((obj)=>{ 
                let t = obj.current_weather.temperature;
                let w = obj.current_weather.windspeed;
                let w_code = obj.current_weather.weathercode;
                console.log(w_code);

                w_image = map[w_code] || "Images/404.png";
                ImageCard.style.backgroundImage = `url(${w_image})`;

                temp.innerText = `${t} °C\n Temprature`;
                wind.innerText = `${w} KM/H\n WindSpeed`;
                main.append(ImageCard,ResultArea);
        })
        .catch((error)=>{
                ImageCard.style.backgroundImage = "url(images/404.png)";
                main.append(ImageCard,ResultArea);
        })
        .catch(()=>{
                ImageCard.style.backgroundImage = "url(images/404.png)";
                main.append(ImageCard,ResultArea);
        });
});


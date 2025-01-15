setInterval(() =>{
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    let time = h + ":" + m;
    document.getElementById('time').innerHTML = time;
},1000);

function checkTime(i){
    if(i<10){
        i = "0" + i;
    }
    return i;
}

// notifications 
function getWeekday(){
    let newDate = new Date();
    let today = newDate.getDay();
    let notificationsMsg = document.getElementById('notifications');
    if(today == 1){
        notificationsMsg.innerHTML = "â€œAll Motivation Mondays need are a little more coffee and a lot more mascara.â€ â€”Unknown"
    } else if(today == 2) {
        notificationsMsg.innerHTML = "â€œWhatever you are, be a good one.â€ â€•Abraham Lincoln"
    } else if(today == 3) {
        notificationsMsg.innerHTML = "â€œEverything you can imagine is real.â€â€•Pablo Picasso"
    } else if(today == 4) {
        notificationsMsg.innerHTML = "â€œYour passion is waiting for your courage to catch up.â€ â€”Isabelle Lafleche"
    } else if(today == 5) {
        notificationsMsg.innerHTML = "â€œI challenge you to let every day be a Friday. Permit yourself to be happy every day.â€ â€”Joel Osteenâ€ â€”John D. Rockefeller"
    } else if(today == 6) {
        notificationsMsg.innerHTML = "â€œDonâ€™t be afraid to give up the good to go for the great.â€ â€”John D. Rockefeller"
    } else {
        notificationsMsg.innerHTML = "No one is to blame for your future situation but yourself. If you want to be successful, then become Successful.â€™â€ â€•Jaymin Shah"
    }   
}

getWeekday();

// Weather 

const weather_Icon = document.querySelector('.weatherIcon');
const weather_Title = document.querySelector('.weatherTitle');
function getWeather(){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=43.4501&lon=-76.1497&units=imperial&appid=a2be3846af608efedf8c8c1ae48c74d7')
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        weather_Title.innerHTML = data.weather[0].description;
        weather_Icon.innerHTML = data.main.temp;
    })
    .catch(err => {

    })
}

getWeather();

// assistant 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end");

let p = document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result", (e) =>{
    const transcript = Array.from(e.results)
    .map(result => result [0])
    .map(result => result.transcript)
    .join("");
    p.textContent = transcript;
    if(e.results[0].isFinal){
        p = document.createElement("p")
        p.textContent = transcript;
        transcript_element.appendChild(p);
        p.textContent = "";

        if(transcript.includes("hello") || transcript.includes("hi")){
            let command = document.createElement("p");
            command.classList.add("command");
            command.textContent = "Hi, I am Eva";
            transcript_element.appendChild(command)
        } 

        if(transcript.includes("Wally")){
            let command = document.createElement("p");
            command.classList.add("command");
            command.textContent = "Waleyyyy";
            transcript_element.appendChild(command)
        } 

        if(transcript.includes("joke")){
            let command = document.createElement("p");
            command.classList.add("command");
            command.textContent = " What do you call an ant who fights crime? A vigilANTe!" || "haha";
            transcript_element.appendChild(command)
        } 

        if(transcript.includes("YouTube")){
            window.open('https://www.youtube.com/')
      
         } else if(transcript.includes("Weather")){
            window.open('weather.html')
         } else if(transcript.includes("Google")){
            window.open('https://www.google.com/')
         }
    } else if(transcript.includes("Github")){
        window.open('https://www.github.com/')

     } else if(transcript.includes("Weather")){
         window.open('http://cs.oswego.edu/~kedward8/capstone/#anchorWeather')
     }

});

recognition.addEventListener("end", ()=>{
    end_button.disabled = false;
    talk_button.disabled = true;
});
talk_button.addEventListener("click", () =>{
    end_button.disabled = false;
    talk_button.disabled = true;
    recognition.start();
});
end_button.addEventListener("click", () => {
    end_button.disabled = true;
    talk_button.disabled = false;
    recognition.stop();
});

// assistant talk 


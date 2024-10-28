const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I help you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open discord")) {
        window.open("https://discord.com", "_blank");
        speak("Opening Discord...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('https://www.online-calculator.com/', "_blank");
        speak("Opening Calculator...");
    } else if (message.includes('weather')) {
        getWeather();
    } else if (message.includes('tell me a joke')) {
        tellJoke();
    } else if (message.includes('motivate me') || message.includes('inspire me')) {
        motivateMe();
    } else if (message.includes('remind me in')) {
        setReminder(message);
    } else if (message.includes('news')) {
        getNews();
    } else if (message.includes('play music')) {
        window.open("https://music.youtube.com", "_blank");
        speak("Opening YouTube Music...");
    } else if (message.includes('tell me a fact')) {
        funFact();
    } else if (message.includes('set a timer')) {
        setTimer(message);
    } else if (message.includes('calculate')) {
        const expression = message.replace('calculate', '').trim();
        calculate(expression);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=YOUR_CITY&appid=YOUR_API_KEY&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weather = `The current temperature is ${data.main.temp}°C with ${data.weather[0].description}`;
            speak(weather);
        })
        .catch(() => speak("Sorry, I couldn't retrieve the weather information."));
}

function tellJoke() {
    const jokes = [
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "I'm reading a book on anti-gravity. It's impossible to put down!",
        "What did the zero say to the eight? Nice belt!"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}

function motivateMe() {
    const quotes = [
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "The only way to do great work is to love what you do."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    speak(randomQuote);
}

function setReminder(message) {
    const time = parseInt(message.match(/\d+/)[0]);
    speak(`Setting a reminder for ${time} minutes.`);
    setTimeout(() => speak("This is your reminder!"), time * 60000);
}

function getNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const newsHeadlines = data.articles.slice(0, 5).map(article => article.title).join(". Next, ");
            speak("Here are the top news headlines: " + newsHeadlines);
        })
        .catch(() => speak("Sorry, I couldn't retrieve the news."));
}

function funFact() {
    const facts = [
        "Did you know? Honey never spoils.",
        "Bananas are berries, but strawberries aren't.",
        "The Eiffel Tower can be 15 cm taller during the summer."
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    speak(randomFact);
}

function setTimer(message) {
    const minutes = parseInt(message.match(/\d+/)[0]);
    speak(`Setting a timer for ${minutes} minutes.`);
    setTimeout(() => speak("Time's up!"), minutes * 60000);
}

function calculate(expression) {
    try {
        const result = eval(expression);
        speak(`The answer is ${result}`);
    } catch (e) {
        speak("Sorry, I couldn't calculate that.");
    }
}

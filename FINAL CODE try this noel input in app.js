const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
let todoList = [];  // Array to store tasks
let currentVolume = 1;  // Default volume

// Function to make JARVIS speak
function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = currentVolume;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
}

// Greet user based on time of day
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Initialize JARVIS on page load
window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
    speak("Sorry, I didn't catch that. Please try again.");
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Main function to handle recognized commands
function takeCommand(message) {
    if (message.includes('hello') || message.includes('hey')) {
        speak("Hello Sir, How may I assist you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open discord")) {
        window.open("https://discord.com", "_blank");
        speak("Opening Discord...");
    } else if (message.includes("add task")) {
        const task = message.replace("add task", "").trim();
        if (task) {
            todoList.push(task);
            speak(`Task added: ${task}`);
        } else {
            speak("Please specify a task to add.");
        }
    } else if (message.includes("show tasks")) {
        const tasks = todoList.length ? todoList.join(", ") : "You have no tasks.";
        speak(`Your tasks are: ${tasks}`);
    } else if (message.includes("clear tasks")) {
        todoList = [];
        speak("All tasks cleared.");
    } else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        const date = new Date().toLocaleDateString([], { month: 'long', day: 'numeric' });
        speak("Today's date is " + date);
    } else if (message.includes("remind me to")) {
        setReminder(message);
    } else if (message.includes("increase volume")) {
        adjustVolume('increase');
    } else if (message.includes("decrease volume")) {
        adjustVolume('decrease');
    } else if (message.includes("mute")) {
        adjustVolume('mute');
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}

// Function to set reminders using browser notifications
function setReminder(message) {
    const reminderText = message.replace("remind me to", "").trim();
    if (!reminderText) {
        speak("Please specify what you want to be reminded about.");
        return;
    }
    speak(`Reminder set for: ${reminder

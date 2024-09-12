// scripts.js

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        appendMessage('user', message);
        userInput.value = '';
        setTimeout(() => {
            generateResponse(message);
        }, 500);
    }
}

function appendMessage(sender, text) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function generateResponse(message) {
    let response = '';
    switch (message.toLowerCase()) {
        case 'hi':
        case 'hello':
            response = 'Hello! How can I help you today?';
            break;
        case 'how are you?':
            response = 'I am an AI, so I do not have feelings, but thank you for asking!';
            break;
        case 'what is your name?':
            response = 'I am Gemini AI, your virtual assistant.';
            break;
        case 'what can u do?':
            response = 'I can do various tasks like searching web etc.'
            break;
        case 'which is best ai accoording to you?':
            response = 'Gemini Ai by google is the best ai according to me.'
            break;
        default:
            response = 'I am sorry, I do not understand that. Can you please rephrase?';
            break;
    }
    appendMessage('bot', response);
}

function showPage(page) {
    const pages = ['chat-container', 'help-container', 'activity-container', 'settings-container'];
    pages.forEach(p => {
        document.getElementById(p).classList.add('hidden');
    });
    document.getElementById(page + '-container').classList.remove('hidden');
}

async function searchWeb() {
    const query = document.getElementById('user-input').value.trim();
    if (!query) return;

    const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

function displaySearchResults(data) {
    const chatBody = document.getElementById('chat-body');
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('message', 'bot');

    if (data.AbstractText) {
        resultsContainer.innerHTML = `<p>${data.AbstractText}</p>`;
    } else if (data.RelatedTopics && data.RelatedTopics.length) {
        resultsContainer.innerHTML = '<p>Search Results:</p>';
        data.RelatedTopics.forEach(result => {
            if (result.Text) {
                const resultElement = document.createElement('p');
                resultElement.innerHTML = `<a href="${result.FirstURL}" target="_blank">${result.Text}</a>`;
                resultsContainer.appendChild(resultElement);
            }
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }

    chatBody.appendChild(resultsContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
}

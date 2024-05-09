const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('#send-btn');

const API_KEY = 'YOUR_API_KEY'; // Replace with your API key

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', className);
    let chatContent = `
        <span class="material-symbols-outlined">smart_toy</span>
        <p>${message}</p>
    `;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector('p');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            'model': 'gpt-3.5-turbo',
            'messages': [
                {
                    'role': 'user',
                    'content': userMessage
                }
            ]
        })
    };
    fetch(API_URL, requestOptions)
     .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
     .then(data => {
            messageElement.textContent = data.choices[0].message.content;
        })
     .catch((error) => {
            messageElement.classList.add('error');
            messageElement.textContent = 'Oops! Something went wrong. Please try again!';
        })
     .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }
    const incomingChatLi = createChatLi(userMessage, 'outgoing');
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTop = chatbox.scrollHeight;
    generateResponse(incomingChatLi);
    chatInput.value = '';
};
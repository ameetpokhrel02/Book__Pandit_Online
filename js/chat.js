document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const sendButton = document.querySelector('.chat-input button');

    // Sample responses (replace with actual backend integration)
    const responses = {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hi there! How can I assist you?',
        'booking': 'To book a pandit, please visit our booking page or use the calendar on our homepage.',
        'price': 'Our prices vary based on the type of ceremony and pandit experience. Please check our services page for detailed pricing.',
        'default': 'I apologize, but I don\'t have information about that. Please contact our support team for assistance.'
    };

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const response = getResponse(message.toLowerCase());
                addMessage(response, 'bot');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getResponse(message) {
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }
        return responses.default;
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add welcome message
    setTimeout(() => {
        addMessage('Welcome to Book Pandit! How can I help you today?', 'bot');
    }, 500);
}); 
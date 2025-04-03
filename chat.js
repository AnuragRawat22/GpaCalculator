const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Predefined questions and answers
const qaMap = {
  "what subject should i focus on more?": "Focus on subjects where you need the most improvement or those aligned with your career goals.",
  "how many hours should i give on a subject?": "It depends on the subject difficulty. Generally, 1-2 hours per subject daily is recommended.",
  "is an A in a class hard to get?": "Getting an A requires consistency, active participation, and strong study habits, but it's achievable!",
  "give me motivation to study?": "Success is built on small daily improvements. Stay consistent and remind yourself why you started!"
};

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Normalize the user message (lowercase and trimmed)
  const normalizedMessage = userMessage.toLowerCase().trim();

  // Find the response based on the predefined questions
  const response =
    qaMap[normalizedMessage] ||
    "I'm sorry, I don't have an answer for that. Please ask something else!";

  // Update the message element with the response
  messageElement.textContent = response;

  // Scroll to the latest message
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user-entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and reset its height
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

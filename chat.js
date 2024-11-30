// Get references to HTML elements
const messageInput = document.getElementById("user-message");
const submitButton = document.getElementById("submit-button");
const botResponseElement = document.getElementById("bot-response");

// Event listener for the submit button
submitButton.addEventListener("click", async () => {
    const userMessage = messageInput.value; // Get the message entered by the user

    // Check if the message is empty
    if (!userMessage.trim()) {
        botResponseElement.textContent = "Please enter a message!";
        return;
    }

    try {
        // Make the API request to the backend's /chat route
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specifies that we're sending JSON data
            },
            body: JSON.stringify({ message: userMessage }), // Send the message in the request body
        });

        const data = await response.json(); // Get the response data from the server
        console.log("Bot's response:", data.botMessage); // Log the response from the bot

        // Display the bot's response on the page
        botResponseElement.textContent = data.botMessage;

    } catch (error) {
        console.error("Error with the API request:", error);
        botResponseElement.textContent = "Sorry, something went wrong!";
    }
});

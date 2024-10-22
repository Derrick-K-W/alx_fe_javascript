// Array of quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Good things come to people who wait, but better things come to those who go out and get them.", category: "Success" }
  ];
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><strong>Category:</strong> ${quote.category}</p>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
      alert('New quote added!');
      
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    } else {
      alert('Please enter both quote text and category.');
    }
  }
  
  // Function to create the form dynamically for adding quotes
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');
    
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
    
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Quote';
    addButton.addEventListener('click', addQuote);
  
    // Append elements to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
    
    // Append form to the body or another container
    document.body.appendChild(formContainer);
  }
  
  // Event listeners for buttons
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call function to create the form
  createAddQuoteForm();
  
  // Display a random quote when the page loads
  showRandomQuote();
  
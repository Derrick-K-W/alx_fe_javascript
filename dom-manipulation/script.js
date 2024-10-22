let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Good things come to people who wait, but better things come to those who go out and get them.", category: "Success" }
  ];
  
  // Load quotes from local storage
  function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Show a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><strong>Category:</strong> ${quote.category}</p>`;
  }
  
  // Populate category filter dropdown with unique categories
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
  
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
      filterQuotes();
    }
  }
  
  // Filter quotes based on selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    // Filter quotes by selected category or show all if 'all' is selected
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
    // Display a random quote from the filtered list
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><strong>Category:</strong> ${quote.category}</p>`;
    } else {
      quoteDisplay.innerHTML = `<p>No quotes available in this category.</p>`;
    }
  
    // Save selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
  }
  
  // Add a new quote and update categories dynamically
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
      saveQuotes();  // Save updated quotes to local storage
      alert('New quote added!');
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Update the categories dropdown
      populateCategories();
    } else {
      alert('Please enter both quote text and category.');
    }
  }
  
  // Export quotes as a JSON file
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  }
  
  // Import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes); // Merge imported quotes into the existing array
      saveQuotes(); // Save the updated quotes to local storage
      alert('Quotes imported successfully!');
      populateCategories(); // Update categories
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Sync with the server (using JSONPlaceholder for simulation)
  function syncWithServer() {
    const syncStatus = document.getElementById('syncStatus');
    syncStatus.textContent = 'Syncing...';
  
    // Simulate fetching data from the server
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(serverData => {
        // Simulate resolving conflicts by using server data as the source of truth
        const serverQuotes = serverData.slice(0, 5).map(item => ({
          text: item.title,
          category: "Server"
        }));
  
        // Combine server and local quotes, prioritizing server data in case of conflict
        quotes = [...serverQuotes, ...quotes.filter(q => !serverQuotes.some(sq => sq.text === q.text))];
        saveQuotes(); // Update local storage with the merged data
  
        // Notify the user of the sync completion
        syncStatus.textContent = 'Sync complete. Server data has been merged with local data.';
        populateCategories(); // Refresh categories
        filterQuotes(); // Display updated quotes
      })
      .catch(() => {
        syncStatus.textContent = 'Sync failed. Please try again later.';
      });
  }
  
  // Initialize the app on page load
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Load initial quotes and categories
  loadQuotes();
  populateCategories();
  showRandomQuote();
  
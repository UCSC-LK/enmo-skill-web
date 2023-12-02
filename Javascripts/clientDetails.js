// Function to fetch country data from REST Countries API
async function fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      return [];
    }
  }
  
  // Function to populate the dropdown with countries in alphabetical order
  async function populateCountries() {
    const select = document.getElementById('countries');
  
    try {
      const countries = await fetchCountries();
  
      // Sort countries alphabetically by country name
      countries.sort((a, b) => {
        const countryA = a.name.common.toUpperCase();
        const countryB = b.name.common.toUpperCase();
        if (countryA < countryB) {
          return -1;
        }
        if (countryA > countryB) {
          return 1;
        }
        return 0;
      });
  
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common; // Use the country name as value
        option.text = country.name.common;
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Error populating countries:', error);
    }
  }
  
  // Call the function to populate the dropdown with sorted countries
  populateCountries();
  
const main = document.getElementsByTagName('main');
const timeFormat = document.querySelectorAll('.time');

// URL for the request (Ensure the file exists and the path is correct)
const requestUrl = "./data.json"; 
let dataPopulate = null;

// Function to fetch the data
async function fetchData() {
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    dataPopulate = await response.json(); // Parse the response as JSON
    createCards(); // Call the function to create the cards after data is fetched
  } catch (error) {
    console.error('Error fetching the request:', error);
  }
}

// Function to create the cards
function createCards() {
  if (dataPopulate != null) {
    for (let i = 0; i < dataPopulate.length; i++) {
      const element = dataPopulate[i];
      const div = document.createElement('section');
      div.classList.add('card');

      // Dynamically set class based on title
      const titleClass = element.title.toLowerCase().replace(" ", "-");
      div.classList.add(titleClass);

      const card__container = document.createElement('div');
      card__container.classList.add('card__container');

      const containerTitle = document.createElement('div');
      containerTitle.classList.add('container__title');
      const title = document.createElement('h2');
      title.classList.add('title');
      title.textContent = element.title;
      const img = document.createElement('img');
      img.classList.add('elipse');
      img.src = "/images/icon-ellipsis.svg";
      containerTitle.appendChild(title);
      containerTitle.appendChild(img);
      card__container.appendChild(containerTitle);

      // Daily data
      const daily = document.createElement('div');
      daily.classList.add('daily');
      const presentDaily = document.createElement('h3');
      presentDaily.classList.add('presentDaily');
      presentDaily.textContent = element.timeframes.daily.current + 'hrs';
      const previousDaily = document.createElement('p');
      previousDaily.classList.add('previousDaily');
      previousDaily.textContent = 'Last Day - ' + element.timeframes.daily.previous + 'hrs';
      daily.appendChild(presentDaily);
      daily.appendChild(previousDaily);

      // Weekly data
      const weekly = document.createElement('div');
      weekly.classList.add('weekly');
      const presentWeekly = document.createElement('h3');
      presentWeekly.classList.add('presentWeekly');
      presentWeekly.textContent = element.timeframes.weekly.current + 'hrs';
      const previousWeekly = document.createElement('p');
      previousWeekly.classList.add('previousWeekly');
      previousWeekly.textContent = 'Last Week - ' + element.timeframes.weekly.previous + 'hrs';
      weekly.appendChild(presentWeekly);
      weekly.appendChild(previousWeekly);
      
      // Monthly data
      const monthly = document.createElement('div');
      monthly.classList.add('monthly');
      const presentMonthly = document.createElement('h3');
      presentMonthly.classList.add('presentMonthly');
      presentMonthly.textContent = element.timeframes.monthly.current + 'hrs';
      const previousMonthly = document.createElement('p');
      previousMonthly.classList.add('previousMonthly');
      previousMonthly.textContent = 'Last Month - ' + element.timeframes.monthly.previous + 'hrs';
      monthly.appendChild(presentMonthly);
      monthly.appendChild(previousMonthly);

      // Event listeners for timeFormat buttons
      timeFormat.forEach(button => {
        button.addEventListener("click", () => {
          // Remove the 'active' class from all buttons
          timeFormat.forEach(el => el.classList.remove("active"));
          button.classList.add("active");

          // Clear existing timeframe (daily, weekly, monthly)
          card__container.querySelectorAll('.daily, .weekly, .monthly').forEach(el => el.remove());

          // Append the correct timeframe based on the clicked button
          if (button.textContent.toLowerCase() === 'daily') {
            card__container.appendChild(daily);
          } else if (button.textContent.toLowerCase() === 'weekly') {
            card__container.appendChild(weekly);
          } else if (button.textContent.toLowerCase() === 'monthly') {
            card__container.appendChild(monthly);
          }
        });
      });

      // Default: Show weekly data first
      card__container.appendChild(weekly);
      div.appendChild(card__container);
      main[0].appendChild(div);
    }
  }
}

// Call the fetchData function
fetchData();
const main = document.getElementsByTagName('main');

// URL for the request (Ensure the file exists and the path is correct)
const requestUrl = "./data.json"; 
let dataPopulate = null;


// Use fetch to make the request and handle the response
fetch(requestUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
        dataPopulate = data;
  })
  .catch(error => {
    console.error('Error fetching the request:', error);
  });


setTimeout(() => {
    if(dataPopulate != null){
        for (let i = 0; i < dataPopulate.length; i++) {
            const element = dataPopulate[i];
            const div = document.createElement('section');
            const container__top = document.createElement('div');
            container__top.classList.add('container__top');
            const img__top = document.createElement('img');
            img__top.classList.add('img__top');
            if(element.title == 'Self Care'){
                img__top.src = "/images/icon-self-care.svg";
            }else if(element.title == 'Work'){
                img__top.src = "/images/icon-work.svg";
            }else if(element.title == 'Play'){
                img__top.src = "/images/icon-play.svg";
            }else if(element.title == 'Study'){
                img__top.src = "/images/icon-study.svg";
            }else if(element.title == 'Social'){
                img__top.src = "/images/icon-social.svg";
            }else if(element.title == 'Exercise'){
                img__top.src = "/images/icon-exercise.svg";
            }
            container__top.appendChild(img__top);
            div.appendChild(container__top);

            div.classList.add('card');

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
            div.appendChild(containerTitle);

            const daily = document.createElement('div');
            daily.classList.add('daily');
            const presentDaily = document.createElement('p');
            presentDaily.classList.add('presentDaily');
            presentDaily.textContent = element.timeframes.daily.current + 'hrs';
            const previousDaily = document.createElement('p');
            previousDaily.classList.add('previousDaily');
            previousDaily.textContent = 'Last Day - ' + element.timeframes.daily.previous + 'hrs';
            daily.appendChild(presentDaily);
            daily.appendChild(previousDaily);



            const weekly = document.createElement('div');
            weekly.classList.add('weekly');
            const presentWeekly = document.createElement('p');
            presentWeekly.classList.add('presentWeekly');
            presentWeekly.textContent = element.timeframes.weekly.current + 'hrs';
            const previousWeekly = document.createElement('p');
            previousWeekly.classList.add('previousWeekly');
            previousWeekly.textContent = 'Last Week - ' + element.timeframes.weekly.previous + 'hrs';
            weekly.appendChild(presentWeekly);
            weekly.appendChild(previousWeekly);

            const monthly = document.createElement('div');
            monthly.classList.add('monthly');
            const presentMonthly = document.createElement('p');
            presentMonthly.classList.add('presentMonthly');
            presentMonthly.textContent = element.timeframes.monthly.current + 'hrs';
            const previousMonthly = document.createElement('p');
            previousMonthly.classList.add('previousMonthly');
            previousMonthly.textContent = 'Last Month - ' + element.timeframes.monthly.previous + 'hrs';
            monthly.appendChild(presentMonthly);
            monthly.appendChild(previousMonthly);




            div.appendChild(daily);
            // div.appendChild(weekly);
            // div.appendChild(monthly);
            main[0].appendChild(div);
        }
    }
}, 1000);
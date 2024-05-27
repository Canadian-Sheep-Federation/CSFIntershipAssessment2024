// API has teams listed as ints, use dictionary to convert to names
const teamDictionary = {
  "Atlanta Hawks": 1,
  "Boston Celtics": 2,
  "Brooklyn Nets": 4,
  "Charlotte Hornets": 5,
  "Chicago Bulls": 6,
  "Cleveland Cavaliers": 7,
  "Dallas Mavericks": 8,
  "Denver Nuggets": 9,
  "Detroit Pistons": 10,
  "Golden State Warriors": 11,
  "Houston Rockets": 14,
  "Indiana Pacers": 15,
  "LA Clippers": 16,
  "Los Angeles Lakers": 17,
  "Memphis Grizzlies": 19,
  "Miami Heat": 20,
  "Milwaukee Bucks": 21,
  "Minnesota Timberwolves": 22,
  "New Orleans Pelicans": 23,
  "New York Knicks": 24,
  "Oklahoma City Thunder": 25,
  "Orlando Magic": 26,
  "Philadelphia 76ers": 27,
  "Phoenix Suns": 28,
  "Portland Trail Blazers": 29,
  "Sacramento Kings": 30,
  "San Antonio Spurs": 31,
  "Toronto Raptors": 38,
  "Utah Jazz": 40,
  "Washington Wizards": 41
};


// wait for page to load
document.addEventListener('DOMContentLoaded', function () {
  populateTeamDropdown();
  populatePlayers();
});

function populateTeamDropdown() {
  const teamSelect = document.getElementById('team');
  for (const [teamName, teamID] of Object.entries(teamDictionary)) {
    const option = document.createElement('option');
    option.value = teamName;
    option.textContent = teamName;
    teamSelect.appendChild(option);
  }
}

document.getElementById('nba-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const teamName = document.getElementById('team').value;
  const season = document.getElementById('season').value;
  const teamId = teamDictionary[teamName];

  const selectedFields = Array.from(document.querySelectorAll('input[name="players"]:checked')).map(cb => cb.value);

  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players',
    params: {
      team: teamId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': '4e38a7bd87mshc58f399befd7f54p17d480jsne7542e532a7f',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    // Send data to server
    // await axios.post('http://localhost:3000/nba-players', { data });

    const nbaPlayersList = document.getElementById('nba-players');

    nbaPlayersList.innerHTML = '';

    console.log(data);
    data.response.forEach(player => {
      console.log(player);
      const playerStats = {
        "First Name)": player.firstname,
        "Last Name)": player.lastname,
        "Team Name)": teamName,
        "Birth Date)": (player.birth.date, player.birth.country),
        "College)": player.college,
        "Height)": player.height.meters,
        "Weight)": player.weight.pounds,
        "Career)": (player.nba.start - player.nba.start + player.nba.pro)
      }

      const li = document.createElement('li');
      let playerInfo = '';
      selectedFields.forEach(field => {
        const value = playerStats[field]
        playerInfo += field + ` ${value},\n`;
      });
      li.textContent = playerInfo.trim();
      nbaPlayersList.appendChild(li);
    });

  } catch (error) {
    console.error('Error fetching NBA players:', error);
  }
});


// document.getElementById('fetchNbaData').addEventListener('click', function () {
//   // Call the getAllNBAPlayers function
//   getAllNBAPlayers((err, players) => {
//       if (err) {
//           console.error('Error fetching NBA players:', err);
//           return;
//       }
//       // Process the players array, log it, or send it as a response, etc.
//       console.log('NBA players:', players);
//   });
// });

// // async function fetchResponses() {
// //   try {
// //     const response = await fetch('http://localhost:3000/');
// //     const data = await response.json();
// //     const responsesList = document.getElementById('responses');
// //     responsesList.innerHTML = '';
// //     data.forEach(response => {
// //       const li = document.createElement('li');
// //       li.textContent = `ID: ${response.id}, Field1: ${response.field1}, Field2: ${response.field2}, Field3: ${response.field3}`;
// //       responsesList.appendChild(li);
// //     });
// //   } catch (error) {
// //     console.error('Error fetching responses:', error);
// //   }
// // }

document.getElementById('addResponseForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const responseData = {};
  formData.forEach((value, key) => {
    responseData[key] = value;
  });

  try {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseData)
    });

    if (!response.ok) {
      throw new Error('Failed to add response');
    }

    alert('Response added successfully');
    this.reset();
  } catch (error) {
    console.error('Error adding response:', error);
    alert('Failed to add response. Please try again.');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // viewing all responses
  document.getElementById('fetchResponses').addEventListener('click', async function () {
    try {
      // Fetch previous responses from the server using a GET request
      const response = await fetch('http://localhost:3000/', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch responses');
      }

      const responseData = await response.json();

      // Clear previous data in the list
      const nbaDataList = document.getElementById('nba-data');
      nbaDataList.innerHTML = '';

      // Populate the list with fetched responses
      responseData.forEach(response => {
        const li = document.createElement('li');
        li.textContent = `Name: ${response.Name}, Favorite Team: ${response.FavoriteTeam}, Favorite Player: ${response.FavoritePlayer}`;
        nbaDataList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching responses:', error);
      alert('Failed to fetch responses. Please try again.');
    }
  });

  // for viewing a single response by ID
  document.getElementById('IDResponse').addEventListener('click', async function (event) {
    event.preventDefault();
    const responseId = document.getElementById('responseId').value;

    try {
      const response = await fetch(`http://localhost:3000/${responseId}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const singleResponseData = await response.json();

      // Clear previous data in the list
      const singleResponse = document.getElementById('singleResponse');
      singleResponse.innerHTML = '';

      // Check if the response is not empty
      if (singleResponseData) {
        const li = document.createElement('li');
        li.textContent = `Name: ${singleResponseData.Name}, Favorite Team: ${singleResponseData.FavoriteTeam}, Favorite Player: ${singleResponseData.FavoritePlayer}`;
        singleResponse.appendChild(li);
      } else {
        const li = document.createElement('li');
        li.textContent = 'No response found with the given ID.';
        singleResponse.appendChild(li);
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
      alert('Failed to fetch response. Most likely the responseID has not yet been created. Please try again(Number > 0).');
    }
  });
});

const playersData = [{
    data: "First Name"
  },
  {
    data: "Last Name"
  },
  {
    data: "Team Name"
  },
  {
    data: "Birth Date"
  },
  {
    data: "College"
  },
  {
    data: "Height"
  },
  {
    data: "Weight"
  },
  {
    data: "Career"
  },
];

// Function to populate the players checkboxes
function populatePlayers() {
  const playersDiv = document.getElementById('players');
  playersData.forEach(player => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'players';
    checkbox.value = `${player.data})`;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(`${player.data}`));
    playersDiv.appendChild(label);
    playersDiv.appendChild(document.createElement('br'));
  });
}
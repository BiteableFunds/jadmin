var currentTeam;

function assignTeam(team) {
    currentTeam = team;
    // Reset Styles
    document.getElementById(1).style.fontWeight = 'Lighter';
    document.getElementById(2).style.fontWeight = 'Lighter';
    document.getElementById(3).style.fontWeight = 'Lighter';
    document.getElementById(4).style.fontWeight = 'Lighter';
    document.getElementById(5).style.fontWeight = 'Lighter';
    // ---
    element = document.getElementById(team).style.fontWeight = 'Bolder';
    console.log(`new selected team: ${currentTeam}`);
};

// Init Team (runs once on page load)
assignTeam(1);

const getEndpoint = new URL("https://77220z28-20000.use.devtunnels.ms/teams/fetch")
const postEndpoint = new URL("https://77220z28-20000.use.devtunnels.ms/teams")

async function getTeamData() {
    const res = (await fetch(getEndpoint));
    const returnedData = await res.json();
    var counter = 1;
    while (counter < 6) {
      let date = new Date(returnedData.teamData[counter])
      let time = date.toLocaleTimeString("en-US");
      let ms = date.getMilliseconds();
      console.log(`Team ${counter} : ${time} ${ms}ms (${returnedData.teamData[counter]})`)
      counter += 1;
    }
    // console.log(returnedData.teamData[1]);
}

async function postData() {
    const data = {
      "team": currentTeam,
      "timestamp": Date.now()
    }
    const res = await fetch(postEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
         body: JSON.stringify(data)
    });
    console.log(res.json())
};

async function postDataBuzzer(timestamp) {
  const data = {
    "team": currentTeam,
    "timestamp": timestamp
  }
  const res = await fetch(postEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       body: JSON.stringify(data)
  });
  console.log(res.json())
};

function buzz() {
  let timestamp = Date.now();
  let time = new Date(timestamp).toLocaleTimeString("en-US");
  document.getElementById("display").innerHTML = `buzzed in at: ${time} ... ${timestamp}`;
  postDataBuzzer(timestamp);
};

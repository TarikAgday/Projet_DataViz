
export function stackedBarChartData(data) {
  // TODO : Generate the data structure as defined above
  let res = [];
  var Clubs = [...new Set(data.map(d => d.Club))]
  
  for (let i = 0; i < Clubs.length; i++) {
    let m = 0;
    let d = 0;
    let f = 0;
    let gk = 0;
 
      let data_per_club = data.filter(d => d.Club == Clubs[i])
      for(let j = 0 ; j < data_per_club.length; j++){
        if(data_per_club[j]["Playing Position"] == "M"){
          m += parseInt(data_per_club[j]["Salaire"].slice(2))
        }
        else if(data_per_club[j]["Playing Position"] == "D"){
          d += parseInt(data_per_club[j]["Salaire"].slice(2))
        }
        else if(data_per_club[j]["Playing Position"] == "F"){
          f += parseInt(data_per_club[j]["Salaire"].slice(2))
        }
        else if(data_per_club[j]["Playing Position"] == "GK"){
          gk += parseInt(data_per_club[j]["Salaire"].slice(2))
        }
      }

  
    res.push({club : Clubs[i], M : m, D : d ,F : f ,GK: gk, sum : m+d+f+gk} )
  }
  return res
}

export function scatteredPlotProcess(data) {
  const STANDING = "General Standing"
  const PLAYOFFS_STANDING = "Playoffs Standing"
  const TOTAL_BUDGET = "Total Budget"

  return data.map(d => {
    return {
      club: d.Club,
      pos: parseInt(d[STANDING]),
      playoffPos: parseInt(d[PLAYOFFS_STANDING]),
      budget: parseInt(d[TOTAL_BUDGET])
    }
  })
}


export function mapMultiPannelProcess (data){
  console.log(data)
  const multiPannelData = new Map()
  data.forEach(d => {
    if (!multiPannelData.has(d.Club))  {
      multiPannelData.set(d.Club, new Map([[
        d["First Name"]+ " " + d["Last Name"], {
          "Minutes": parseInt(d["MinutesPlayed"]),
          "Position": d["Playing Position"]
        }]]))
    } else {
      multiPannelData.get(d.Club).set(
        d["First Name"] +" " + d["Last Name"], {
        "Minutes": parseInt(d["MinutesPlayed"]),
        "Position": d["Playing Position"]
      })
    }
  })
  return multiPannelData
}

export function multipannelProcess(data){
  var multiPannelData = mapMultiPannelProcess(data)
  const processedData = []
  multiPannelData.forEach((players, team) =>{
    const playersInfo = []
    players.forEach((info, player) =>{
      playersInfo.push({
        "Name": player,
        "Minutes": parseInt(info.Minutes),
        "Position": info.Position
      })
    })
    processedData.push({
      "Team": team,
      "Players": playersInfo
    })
  })
  return processedData
}
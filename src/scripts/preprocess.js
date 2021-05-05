
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
          m += Math.trunc(parseFloat((data_per_club[j]["Salaire"].replace(/,/g,"").substring(2))))

        }
        else if(data_per_club[j]["Playing Position"] == "D"){
          d += Math.trunc(parseFloat((data_per_club[j]["Salaire"].replace(/,/g,"").substring(2))))

        }
        else if(data_per_club[j]["Playing Position"] == "F"){
          f += Math.trunc(parseFloat((data_per_club[j]["Salaire"].replace(/,/g,"").substring(2))))

        }
        else if(data_per_club[j]["Playing Position"] == "GK"){
          gk += Math.trunc(parseFloat((data_per_club[j]["Salaire"].replace(/,/g,"").substring(2))))

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
      budget: parseInt(d[TOTAL_BUDGET]),
      src: d.src
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
          "Position": d["Playing Position"],
          "Salary": d["Salaire"]
        }]]))
    } else {
      multiPannelData.get(d.Club).set(
        d["First Name"] +" " + d["Last Name"], {
        "Minutes": parseInt(d["MinutesPlayed"]),
        "Position": d["Playing Position"],
        "Salary": d["Salaire"]
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
        "Position": info.Position,
        "Salary": info.Salary
      })
    })

    const str = ["M", "D", "GK", "F"] 
    const playersM = [], playersD = [], playersGK = [], playersF = []

    playersInfo.forEach((player) =>{
      // console.log(player.Position)
      if (player.Position === "M") {
        playersM.push(player)
      } else if (player.Position === "D") {
        playersD.push(player)
      } else if (player.Position === "GK") {
        playersGK.push(player)
      } else {
        playersF.push(player)
      }
    })

    const sortedArray  = playersM.concat(playersD).concat(playersGK).concat(playersF)


    processedData.push({
      "Team": team,
      "Players": sortedArray
    })
  })
  return processedData
}


export function mapMultiBubbleChartProcess (data){
  const multiPannelData = new Map()
  data.forEach(d => {
    if (!multiPannelData.has(d["Playing Position"]))  {
      multiPannelData.set(d["Playing Position"], new Map([[
        d["First Name"]+ " " + d["Last Name"], {
          "Age": d.Age,
          "Minutes": parseInt(d["MinutesPlayed"]),
          "Performance": d.X,
          "Club": d.Club,
          "Salary": d.Salaire,
          "Position": d["Playing Position"]
        }]]))
    } else {
      multiPannelData.get(d["Playing Position"]).set(
        d["First Name"] +" " + d["Last Name"], {
        "Age": d.Age,
        "Minutes": parseInt(d["MinutesPlayed"]),
        "Performance": d.X,
        "Club": d.Club,
        "Salary": d.Salaire,
        "Position": d["Playing Position"]
      })
    }
  })
  return multiPannelData
}

export function multipannelBubbleChartProcess(data){
  var multiPannelData = mapMultiBubbleChartProcess(data)
  const processedData = []
  multiPannelData.forEach((players, position) =>{
    const playersInfo = []
    players.forEach((info, player) =>{
      playersInfo.push({
        "Name": player,
        "Age": info.Age,
        "Club": info.Club,
        "Minutes": parseInt(info.Minutes),
        "Performance": info.Performance,
        "Position": info.Position,
        "Salary": Math.trunc(parseFloat((info.Salary.replace(/,/g,"").substring(2))))
      })
    })
    processedData.push({
      "Position": position,
      "Players": playersInfo
    })
  })
  return processedData
}


  export function getClubsNames(data) {
    // TODO: Return the neihborhood names
    const uniqueClubNames = [...new Set(data.map(item => item.Club))];
    return uniqueClubNames
  }

  export function getAgeCategories(number) {
    // TODO: Return the
    switch(String(number)) {
      case "15":
      case  "16":
        return 0

      case "17":
      case "18":
        return 1

      case "19":
      case  "20":
        return 2

      case "21":
      case "22":
        return 3

      case "23":
      case  "24":
        return 4

      case "25":
      case "26":
        return 5

      case "27":
      case "28":
        return 6


        case "29":
        case "30":
        return 7

        case "31":
        case "32":
        return 8

        case "33":
        case "34":
        return 9

        case "35":
        case "36" :
        return 10

        case "37":
        case "38":
        return 11

      case "39":
      case "40":
        return 12

        default:
        return null
    }

  }

  export function heatmapProcess(data) {


    // Generate the data structure
    let clubResult = [];
    var Clubs = [...new Set(data.map(d => d.Club))]
    // Loop through each club
    for (let i = 0; i < Clubs.length; i++) {

        let data_per_club = data.filter(d => d.Club == Clubs[i])
        //console.log("DPC",data_per_club)

        // Designate the age groups
        let ageGroupSalaries = new Array(13).fill(0)

          // Each ageGroup contains two years; e.g 15-16, 17-18 [...] 39-40 years old
          for(let j = 0; j < data_per_club.length; j++){
            let ageCategorie= getAgeCategories(data_per_club[j].Age)
            ageGroupSalaries[ageCategorie] += Math.trunc(parseFloat((data_per_club[j].Salaire.replace(/,/g,"").substring(2))))


          }


          for (let k = 0 ; k < ageGroupSalaries.length; k++){

            let ageGroup = k
              clubResult.push({Club : Clubs[i], Age : ageGroup, ageGroupSalary : ageGroupSalaries[ageGroup]})

          }
    }return clubResult


  }

  export function bubbleChartPreProcess(data) {

    // Generate the data structure
    let clubResult = [];

    // Loop through each club
    for (let i = 0; i < data.length; i++) {
              if(data[i]["Playing Position"] == 'M'){
                clubResult.push({Club : data[i].Club, LastName : data[i]["Last Name"], FirstName: data[i]["First Name"],
                                MinsPlayed : data[i].MinutesPlayed, Position : data[i]["Playing Position"], Performance: (data[i].X/1000),
                                Salary:  Math.trunc(parseFloat((data[i].Salaire.replace(/,/g,"").substring(2))))})}
              else{
              clubResult.push({Club : data[i].Club, LastName : data[i]["Last Name"], FirstName: data[i]["First Name"],
                              MinsPlayed : data[i].MinutesPlayed, Position : data[i]["Playing Position"], Performance: data[i].X,
                              Salary:  Math.trunc(parseFloat((data[i].Salaire.replace(/,/g,"").substring(2))))})}

    }
    return clubResult
  }

  export function connectedDotPlotProcess(data) {

    let result = []

   // Loop through each club
   for (let i = 0; i < data.length; i++) {
    var goals = [data[i].BM, data[i].BE]
    result.push({Club : data[i].Club, values: goals})

  }
    return result
  }


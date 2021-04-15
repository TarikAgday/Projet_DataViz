export function stackedBarChartData(data) {
  // Generate the data structure as defined above
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
          m += parseInt(data_per_club[j]["Salary"].slice(2))
        }
        else if(data_per_club[j]["Playing Position"] == "D"){
          d += parseInt(data_per_club[j]["Salary"].slice(2))
        }
        else if(data_per_club[j]["Playing Position"] == "F"){
          f += parseInt(data_per_club[j]["Salary"].slice(2))
        }
        else if(data_per_club[j]["Playing Position"] == "GK"){
          gk += parseInt(data_per_club[j]["Salary"].slice(2))
        }
      }

    res.push({club : Clubs[i], M : m, D : d ,F : f ,GK: gk, sum : m+d+f+gk} )
  }
  return res
}

export function getClubsNames(data) {
  // TODO: Return the neihborhood names
  const uniqueClubNames = [...new Set(data.map(item => item.Club))];
  return uniqueClubNames
}

export function getAgeCategories(number) {
  // TODO: Return the
  switch(number) {
    case "15" || "16":
      return 0
    case "17" || "18":
      return 1
    case "19" || "20":
      return 2
    case "21" || "22":
      return 3
    case "23" || "24":
      return 4
    case "25" || "26":
      return 5
    case "27" || "28":
      return 6
    case "29" || "30":
      return 7
    case "31" || "32":
      return 8
    case "33" || "34":
      return 9
    case "35" || "36" :
      return 10
    case "37" || "38":
      return 11
    case "39" || "40":
      return 12
    default:
      return null
  }

}

export function heatmapProcess(data) {


  // Generate the data structure
  let clubResult = [];
  var Clubs = [...new Set(data.map(d => d.Club))]
  console.log("Clubs",Clubs)
  // Loop through each club
  for (let i = 0; i < Clubs.length; i++) {

      let data_per_club = data.filter(d => d.Club == Clubs[i])
      console.log("DPC",data_per_club)

      // Designate the age groups
      let ageGroupSalaries = new Array(13).fill(0)

        // Each ageGroup contains two years; e.g 15-16, 17-18 [...] 39-40 years old
        for(let j = 0; j < data_per_club.length; j++){
          let ageCategorie= getAgeCategories((data_per_club[j].Age))
          ageGroupSalaries[ageCategorie] += Math.trunc(parseFloat((data_per_club[j].Salary.replace(/,/g,"").substring(2))))

        }


        for (let k = 0 ; k < ageGroupSalaries.length; k++){

          let ageGroup = k
            clubResult.push({Club : Clubs[i], Age : ageGroup, ageGroupSalary : ageGroupSalaries[ageGroup]})

        }
      console.log("CR",clubResult)
  }return clubResult


}


export function bubbleChartPreProcess(data) {


  // Generate the data structure
  let clubResult = [];

  // Loop through each club
  for (let i = 0; i < data.length; i++) {

            clubResult.push({Club : data[i].Club, LastName : data[i].LastName, FirstName: data[i].FirstName,
                            MinsPlayed : data[i].MinutesPlayed, Position : data[i].PlayingPosition, Performance: data[i].X,
                            Salary:  Math.trunc(parseFloat((data[i].Salary.replace(/,/g,"").substring(2))))})


  }console.log("Club Result Bubble",clubResult)
  return clubResult



}


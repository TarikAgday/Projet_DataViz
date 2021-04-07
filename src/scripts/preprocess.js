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
          console.log("Buddy",data_per_club[j]["Salary"])
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

export function heatmapProcess(data) {

  let result = []
  const clubNames =  getNeighborhoodNames(data)
  for (let i = 0; i < NeighborhoodNames.length; i++) {
    const filtered_data_neighborhood = data.filter(e => e.Arrond_Nom == NeighborhoodNames[i])
    const Years = [...new Set(filtered_data_neighborhood.map(item => item.Date_Plantation.getFullYear()))];
    for (let j = 0; j < Years.length; j++) {
      const count = filtered_data_neighborhood.filter(e => e.Date_Plantation.getFullYear() == Years[j]).length
      result.push({ Arrond_Nom: NeighborhoodNames[i], Plantation_Year: Years[j], Comptes: count})
    }
  }

  // Generate the data structure
  let clubResult = [];
  var Clubs = [...new Set(data.map(d => d.Club))]

  // Loop through each club
  for (let i = 0; i < Clubs.length; i++) {

      let data_per_club = data.filter(d => d.Club == Clubs[i])

      // Designate the age groups
      let ageGroupSalaries = new Array(13).fill(0)

      for(let j = 0 ; j < data_per_club.length; j++){

        // Each ageGroup contains two years; e.g 15-16, 17-18 [...] 39-40 years old
        let ageGroup = parseInt((data_per_club[j]["Age"]/17))

        for (let k = 0 ; k < ageGroupSalaries.length; j++){

          let age1 = k+17
            let age2 = age1 + 1

            if(data_per_club[j].Age == age1 || data_per_club[j].Age == age2){
              ageGroupSalaries[ageGroup] += data_per_club[j]["Salary"].slice(2)
            }
        }
  }
  return clubResult
}


}
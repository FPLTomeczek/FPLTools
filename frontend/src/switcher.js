const switchTeamName = (teamName) => {
  switch (teamName) {
    case "Arsenal":
      teamName = "ARS";
      break;
    case "Aston Villa":
      teamName = "AVL";
      break;
    case "Chelsea":
      teamName = "CHE";
      break;
    case "Bournemouth":
      teamName = "BOU";
      break;
    case "Brentford":
      teamName = "BRE";
      break;
    case "Brighton":
      teamName = "BRI";
      break;
    case "Crystal Palace":
      teamName = "CRY";
      break;
    case "Everton":
      teamName = "EVE";
      break;
    case "Fulham":
      teamName = "FUL";
      break;
    case "Leeds":
      teamName = "LEE";
      break;
    case "Leicester":
      teamName = "LEI";
      break;
    case "Liverpool":
      teamName = "LIV";
      break;
    case "Newcastle":
      teamName = "NEW";
      break;
    case "Forest":
      teamName = "NFO";
      break;
    case "Southampton":
      teamName = "SOU";
      break;
    case "West Ham":
      teamName = "WHU";
      break;
    case "Wolverhampton":
      teamName = "WOL";
      break;
    case "Man United":
      teamName = "MUN";
      break;
    case "Man City":
      teamName = "MCI";
      break;
    case "Spurs":
      teamName = "TOT";
      break;
    default:
  }
  return teamName;
};

export default switchTeamName;

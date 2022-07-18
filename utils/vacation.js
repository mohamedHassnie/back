//méthode pour calcuer date debut - date fin mtee congé
const calculateVacationPeriod = (vacation) => {
  const startingDate = new Date(vacation.startingDate);
  const endingDate = new Date(vacation.endingDate);
  //math.round traja3 entier : function mtee arrondi
  const days = Math.round((endingDate - startingDate) / (1000 * 60 * 60 * 24));
  return days;
};

const vacationStatus = (vacations, year = "") => {
  //+year convetir year in int
  // year = "" : andék choix argument etheka t3abih ou yet3ada vide : optional
  //new Date().getFullYear() : La méthode getFullYear()renvoie l'année de la date renseignée d'après l'heure locale.
  if (+year > new Date().getFullYear())
    throw new Error("Invalid year, please enter a valid year"); //exceptions
  const vacationYear = year || new Date().getFullYear(); // variable hetha vacationYear bch n3adilou ena year ou bien par défaut bch ye5ou l'annéé ahna fih local

  const vacationsInSameYear = vacations.filter(
    (vacation) =>
      vacation.startingDate.substring(0, 4) === vacationYear.toString()
  );
  const totalDays = vacationsInSameYear.reduce(
    (acc, curr) => acc + calculateVacationPeriod(curr),
    0
  );

  // extract the max days attribute from  vacation in the same year
  const maxDays = vacationsInSameYear[0].maxDays;

  if (totalDays > maxDays) {
    return {
      status: "rejected",
      remainingDays: 0,
    };
  } else if (totalDays < maxDays) {
    return {
      status: "pending",
      remainingDays: maxDays - totalDays,
    };
  } else {
    return {
      status: "rejected",
      remainingDays: 0,
    };
  }
};

module.exports = {
  vacationStatus,
};

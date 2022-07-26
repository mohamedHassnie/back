//méthode pour calcuer date debut - date fin mtee congé
const calculateVacationPeriod = (vacation) => {
  const startingDate = new Date(vacation.startingDate);
  const endingDate = new Date(vacation.endingDate);
  const time = Math.abs(endingDate - startingDate);
  const days = Math.ceil(time / (1000 * 60 * 60 * 24));
  console.log("ee", days);
  return days;
};

const vacationStatus = (vacations, year = "") => {
  //+year convetir year in int
  // year = "" : andék choix argument etheka t3abih ou yet3ada vide : optional
  //new Date().getFullYear() : La méthode getFullYear()renvoie l'année de la date renseignée d'après l'heure locale.
  if (+year > new Date().getFullYear())
    throw new Error("Invalid year, please enter a valid year"); //exceptions
  const vacationYear = year || new Date().getFullYear(); // variable hetha vacationYear bch n3adilou ena year ou bien par défaut bch ye5ou l'annéé ahna fih local

  //filtre crée un nouveau tableau en supprimant les
  // éléments qui n'appartiennent pas. reduce , d'autre part,
  //prend tous les éléments d'un tableau et les réduit en une seule value .
  //vacation pacourou beha : bch nchouf f anneé en cours ou nn
  const vacationsInSameYear = vacations.filter((vacation) => {
    // test startingDate nefsou am ahna mawjoudine fih ou non
    return (
      vacation.startingDate.substring(0, 4) &&
      vacation.endingDate.substring(0, 4) === vacationYear.toString()
    );
  });
  console.log("ttt", vacationsInSameYear());
  // ou b facon hetha nektbu
  // k = 0 : initialisation , récursivité
  const totalDays = vacationsInSameYear.reduce(
    (k = 0),
    (i, j) => {
      return i + days(j);
    },
    k
  );
  console.log("total", totalDays);
  console.log("ee", calculateVacationPeriod().days);
  // extract the max days attribute from  vacation in the same year
  const maxDays = vacationsInSameYear[0].maxDays;
  const maxDaysMalade = vacationsInSameYear[0].maxDaysMalade;
  console.log("max", maxDays);
  console.log("maxDaysMalade", maxDaysMalade);
  if (type_vacation === " normal") {
    if (totalDays >= maxDays) {
      return {
        status: "rejected",
        remainingDays: 0,
      };
    } else {
      return {
        status: "pending",
        remainingDays: maxDays - totalDays,
      };
    }
  } else {
    if (totalDays >= maxDaysMalade) {
      return {
        status: "rejected",
        remainingDays: 0,
      };
    } else {
      return {
        status: "pending",
        remainingDays: maxDaysMalade - totalDays,
      };
    }
  }
};
module.exports = {
  vacationStatus,
  calculateVacationPeriod,
};

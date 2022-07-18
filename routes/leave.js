class Vacation {
  constructor(startingDate, endingDate) {
    this.startingDate = startingDate;
    this.endingDate = endingDate;
    this.maxDays = 60;
    this.status = "pending";
  }
}

const vacation1 = new Vacation("2020-01-01", "2020-01-31");
const vacation2 = new Vacation("2020-02-01", "2020-02-20");
const vacation3 = new Vacation("2020-03-01", "2020-03-4");
const vacation4 = new Vacation("2021-03-05", "2021-03-27");
const vacation5 = new Vacation("2022-07-05", "2022-07-10");

// 1. get vacation starting date and ending date
// 2. calculate the number of days between the two dates
// 6. calculate the total number of days of all vacations in the same year
// 7. if the total number of days is greater than 60, return "rejected" and the remaining days
// 8. if the total number of days is less than 60, return "pending" and the remaining days
// 9. if the total number of days is equal to 60, return "rejected" and the remaining days

const vacationStatus = (vacations, year = "") => {
  if (+year > new Date().getFullYear())
    throw new Error("Invalid year, please enter a valid year");
  const vacationYear = year || new Date().getFullYear();
  const calculateVacationPeriod = (vacation) => {
    const startingDate = new Date(vacation.startingDate);
    const endingDate = new Date(vacation.endingDate);
    const days = Math.round(
      (endingDate - startingDate) / (1000 * 60 * 60 * 24)
    );
    return days;
  };
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

// console.log(
//   vacationStatus(
//     [vacation1, vacation2, vacation3, vacation4, vacation5],
//     "2025"
//   )
// );

// 1. get a vacation request and the old vacations
//2. check if the request is valid or not using vacationStatus function
//3. if the request is valid, return "approved"
//4. if the request is invalid, return "rejected" and the remaining days

const validateVacationRequest = (vacation, oldVacations) => {
  const { status, remainingDays } = vacationStatus([...oldVacations, vacation]);
  if (status === "pending") {
    return {
      status: "approved",
      remainingDays,
    };
  } else {
    return {
      status: "rejected",
      remainingDays,
    };
  }
};

console.log(
  validateVacationRequest(new Vacation("2022-01-01", "2022-01-31"), [
    vacation1,
    vacation2,
    vacation3,
    vacation4,
    vacation5,
  ])
);

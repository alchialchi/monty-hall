export const playMontyHall = (
  switchDoor: boolean,
  doorSelectedByMe: number,
  doorNumberWithCar: number
) => {
  const doorSelectedByHost = [0, 1, 2].find(
    door => door !== doorNumberWithCar && door !== doorSelectedByMe
  );

  if (switchDoor) {
    return (
      doorNumberWithCar ===
      [0, 1, 2].find(
        door => door !== doorSelectedByMe && door !== doorSelectedByHost
      )
    );
  } else {
    return doorNumberWithCar === doorSelectedByMe;
  }
};

export const simulateGame = (num: number, switchDoor: boolean) => {
  let gamesWon = 0;

  for (let i = 0; i < num; i++) {
    const doorNumberWithCar = Math.floor(Math.random() * 3);
    const doorSelectedByMe = Math.floor(Math.random() * 3);

    if (playMontyHall(switchDoor, doorSelectedByMe, doorNumberWithCar)) {
      gamesWon++;
    }
  }
  return gamesWon;
};

const playMontyHall = (switchDoor: boolean) => {
  const doorNumberWithCar = Math.floor(Math.random() * 3);
  const selectedDoor = Math.floor(Math.random() * 3);
  const openedDoor = [0, 1, 2].find(
    door => door !== doorNumberWithCar && door !== selectedDoor
  );

  if (switchDoor) {
    return (
      doorNumberWithCar ===
      [0, 1, 2].find(door => door !== selectedDoor && door !== openedDoor)
    );
  } else {
    return doorNumberWithCar === selectedDoor;
  }
};

export const simulateGame = (num: number, switchDoor: boolean) => {
  let gamesWon = 0;

  for (let i = 0; i < num; i++) {
    if (playMontyHall(switchDoor)) {
      gamesWon++;
    }
  }
  return gamesWon;
};

import { playMontyHall } from "../game";

// playMontyHall(switchDoor: boolean, doorSelectedByMe: number, doorNumberWithCar: numder)

test("Switch door: false, user selected door 1, the car is behind door 1", () => {
  expect(playMontyHall(false, 1, 1)).toBe(true);
});

test("Switch door: true, user selected door 1, the car is behind door 1", () => {
  expect(playMontyHall(true, 1, 1)).toBe(false);
});

test("Switch door: false, user selected door 1, the car is behind door 3", () => {
  expect(playMontyHall(false, 1, 3)).toBe(false);
});

test("Switch door: true, user selected door 1, the car is behind door 3", () => {
  expect(playMontyHall(true, 1, 3)).toBe(false);
});

import {
  checkBankValue,
  checkPlayerRoles,
  firstElevenFormationValidation,
} from "../validateFunctions";

// playerRoles
test("correct playerRoles", () => {
  expect(checkPlayerRoles({ 1: 2, 2: 5, 3: 5, 4: 3 })).toBeFalsy();
});

test("incorrect playerRoles", () => {
  expect(checkPlayerRoles({ 1: 2, 2: 4, 3: 6, 4: 3 })).toBeTruthy();
});

test("incomplete playerRoles", () => {
  expect(checkPlayerRoles({ 1: 2, 2: 5, 3: 5 })).toBeTruthy();
});

// firstElevenFormationValidation
test("correct first eleven formation", () => {
  expect(
    firstElevenFormationValidation({ 1: 1, 2: 4, 3: 4, 4: 2 })
  ).toBeFalsy();
});

test("correct first eleven formation with boundary conditions", () => {
  expect(
    firstElevenFormationValidation({ 1: 1, 2: 3, 3: 5, 4: 2 })
  ).toBeFalsy();
});

test("incorrect first eleven formation", () => {
  expect(
    firstElevenFormationValidation({ 1: 1, 2: 2, 3: 4, 4: 4 })
  ).toBeTruthy();
});

test("incomplete first eleven formation", () => {
  expect(firstElevenFormationValidation({ 1: 1, 3: 5, 4: 2 })).toBeTruthy();
});

// bankValue
test("bankValue is 0", () => {
  expect(checkBankValue(0)).toBeFalsy();
});

test("bankValue is under 0", () => {
  expect(checkBankValue(-5)).toBeTruthy();
});

test("bankValue is above 0", () => {
  expect(checkBankValue(10)).toBeFalsy();
});

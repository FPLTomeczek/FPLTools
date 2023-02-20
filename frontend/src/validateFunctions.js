export const checkPlayerRoles = (dict) => {
  if (dict[1] !== 2 || dict[2] !== 5 || dict[3] !== 5 || dict[4] !== 3) {
    return true;
  }
  return false;
};

export const checkBankValue = (bank_value) => {
  if (bank_value < 0) {
    return true;
  }
  return false;
};

export const firstElevenFormationValidation = (dict) => {
  if (
    dict[1] !== 1 ||
    !dict[1] ||
    dict[2] > 5 ||
    dict[2] < 3 ||
    !dict[2] ||
    dict[3] > 5 ||
    dict[3] < 2 ||
    !dict[3] ||
    dict[4] > 3 ||
    !dict[4]
  ) {
    return true;
  }
  return false;
};

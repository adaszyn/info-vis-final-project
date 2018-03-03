import { memoize } from "underscore";
import { crimes } from "../constants/crimes";

export const getTranslatedCrimeType = (name, language) => {
  if (language === "swedish") {
    return name;
  }
  const [crime] = crimes.filter(crime => crime.name === name);
  if (!crime) {
    return name;
  }
  return crime.translation ? crime.translation : crime.name;
};

export const getCrimeTypeColor = memoize(name => {
  const [crime] = crimes.filter(crime => crime.name === name);
  if (!crime || !crime.color) {
    return false;
  }
  return crime.color;
});

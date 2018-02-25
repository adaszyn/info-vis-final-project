import { memoize } from "underscore";
import { crimes } from "../constants/crimes";

const DEFAULT_COLOR = "#FF00FF";

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
  if (!crime) {
    return DEFAULT_COLOR;
  }
  return crime.color ? crime.color : DEFAULT_COLOR;
});

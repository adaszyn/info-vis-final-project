import { memoize } from "underscore";
import { crimes } from "../constants/crimes";

const DEFAULT_COLOR = "#FF00FF";

export const getCrimeTypeNameInEnglish = memoize((name) => {
    const [crime] = crimes.filter(crime => crime.name === name)
    if (!crime) {
        throw "Crime with such name does not exists";
    }
    return crime.translation
        ? crime.translation
        : crime.name;
});

export const getCrimeTypeColor = memoize((name) => {
    const [crime] = crimes.filter(crime => crime.name === name)
    if (!crime) {
        throw "Crime with such name does not exists";
    }
    return crime.color
        ? crime.color
        : DEFAULT_COLOR;
});

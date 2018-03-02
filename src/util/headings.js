import { headings } from "../constants/headings";

export const getTranslatedHeading = (id, language) => {
  const heading = headings[id];
  if (!heading) {
    return id;
  }
  return heading[language] ? heading[language] : id;
};

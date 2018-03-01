import { memoize } from "underscore";
import { headings } from "../constants/headings";

export const getTranslatedHeading = (id, language) => {
  const [heading] = headings.filter(heading => heading.id === id);
  if (!heading) {
    return id;
  }
  return language === "swedish" ? heading.name : heading.translation;
};

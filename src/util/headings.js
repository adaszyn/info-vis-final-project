import { memoize } from "underscore";
import { headings } from "../constants/headings";

export const getTranslatedHeading = (id, language) => {
  if (!headings[id]) {
    return id;
  }
  return language === "swedish" ? headings[id].name : headings[id].translation;
};

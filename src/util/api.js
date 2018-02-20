import CONFIG from "../config";
import qs from "querystring";
import axios from "axios";
import moment from "moment";

export const fetchCrimes = ({ startYear, endYear }) => {
  const startTime = moment(`01/01/${startYear}`, "DD/MM/YYYY").unix();
  const endTime = moment(`30/12/${endYear}`, "DD/MM/YYYY").unix();
  const query = qs.encode({ startTime, endTime });

  return axios.get(`${CONFIG.apiBase}/crime?${query}`);
};

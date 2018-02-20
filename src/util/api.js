import CONFIG from "../config";
import qs from "querystring";
import axios from "axios";
import moment from "moment";
import { DATE_FORMAT } from '../util/range-util';

export const fetchCrimes = ({ startDate, endDate }) => {
  const startTime = moment(startDate, DATE_FORMAT).unix();
  const endTime = moment(endDate, DATE_FORMAT).unix();
  const query = qs.encode({ startTime, endTime });
  return axios.get(`${CONFIG.apiBase}/crime?${query}`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err))
};

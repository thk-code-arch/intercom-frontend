import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL+'/api/maintenance/';

class MaintenanceService {
  sendReport(report) {
    return axios.post(API_URL + 'sendreport',{
    "title": report.title,
    "label": report.label,
    "context": report.context,
	}, { headers:{"Authorization": authHeader()} });
  }
}

export default new MaintenanceService();

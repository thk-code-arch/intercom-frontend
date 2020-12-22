import axios from 'axios';
import authHeader from './auth-header';
import projectHeader from './project-header';

const API_URL = process.env.VUE_APP_API_URL+'api/';

class UploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("project", file);
    var header = {
    headers: {
            "Authorization": authHeader(),
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress}
    console.log(header);
    return axios.post(API_URL, formData, header);
  }

  uploadifc(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("project", file);
    var header = {
    headers: {
            "Authorization": authHeader(),
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress}
    console.log(header);
    return axios.post(API_URL+'uploadifc/'+projectHeader(), formData, header);
  }
}

export default new UploadService();

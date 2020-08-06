import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL+'upload-file';

class UploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("project", file);
    var header = {
    headers: {
            "x-access-token": authHeader(),
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress}
    console.log(header);
    return axios.post(API_URL, formData, header);
  }

}

export default new UploadService();

import projectHeader from './project-header';
import Vue from 'vue'
class UploadService  {

  uploadifc(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    var header = {
    headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress}
    console.log(header);
    return Vue.prototype.$http.post('project/uploadifc/'+projectHeader(), formData, header);
  }
}

export default new UploadService();

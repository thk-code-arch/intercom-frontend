import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_URL+'api/learning/';

class LearningService {
  addLearning(theLearning) {
    return axios.post(API_URL + 'add',{
    "category": theLearning.category,
    "url": theLearning.url,
    "thumbnail": theLearning.thumbnail,
    "title":theLearning.title,
    "description":theLearning.description,
    "type": theLearning.type,
	}, { headers:{"x-access-token": authHeader()} });
  }

  getAllLearningPublic() {
    return axios.get(API_URL + 'public',{ headers:{"x-access-token": authHeader() } });
  }
  getLearning(learningId) {
    console.log("learning ,,,");
    return axios.get(API_URL + 'show/'+learningId,{ headers:{"x-access-token": authHeader() } });
  }
}

export default new LearningService();

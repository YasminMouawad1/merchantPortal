import { Injectable } from '@angular/core';
import { APIService } from '../../../core/services/http/api.service';
import { UrlEndpoints } from '../../constants/url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankEndpoints {

  constructor(private _API: APIService) { }
  getTest() {
    return this._API.doGet(UrlEndpoints.POST_TOKEN_AUTH);
  }

  //Get All Questions 
  getAllQuestions() {
    return this._API.doGet(UrlEndpoints.GET_QUESTIONS)
  }

  // Get Question For Edit
  getQuestionForEdit(id: string) {
    return this._API.doGet(UrlEndpoints.GET_QUESTION_FOREDIT + id);
  }

  // Add New Questions 

  createOrEdit(newQuestion: any) {
    return this._API.doPost(UrlEndpoints.ADD_QUESTION, newQuestion)
  }
  // Delete Question
  deleteQuestion(id: string) {
    return this._API.doDelete(UrlEndpoints.DELETE_QUESTION + id)

  }

  // Get All School Level For Table Dropdown 
  getALlSchoolLevel() {
    return this._API.doGet(UrlEndpoints.GET_SCHOOLLEVELFORDROPDOWN)
  }
  // Get All Semester For Table Dropdown
  getAllSemester() {
    return this._API.doGet(UrlEndpoints.GET_SEMESTERFORDROPDOWN)
  }

  // Get All Subject For Table Dropdown
  getAllSubject() {
    return this._API.doGet(UrlEndpoints.GET_SUBJECTFORDROPDOWN)
  }

  // Get All Lesson For Table Dropdown
  getAllLesson() {
    return this._API.doGet(UrlEndpoints.GET_LESSONFORDROPDOWN)
  }

  // Get All Questions Difficalty For Table Dropdown

  getAllQustionsDifficalty() {
    return this._API.doGet(UrlEndpoints.GET_QUESTIONSDIFFICALTYFORDROPDOWN)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  env = environment;

  constructor(
    private httpClient: HttpClient
  ) {}

  signUp(body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/sign-up', body);
  }

  signIn(body: {
    email: string;
    password: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/sign-in', body);
  }

  getUser(params: {
    email: string;
  }) {
    return this.httpClient.get(this.env.apiUrl + 'api/user', { params });
  }

  createEvent(body: {
    type: string;
    title: string;
    description: string;
    date: string;
    bgImage: string;
    userEmail: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/events', body);
  }

  getAllEvents() {
    return this.httpClient.get(this.env.apiUrl + 'api/events');
  }
  
  getEventById(params: {
    id: string;
  }) {
    return this.httpClient.get(this.env.apiUrl + 'api/events' , { params });
  }

  getUserEvents(params: {
    email: string;
  }) {
    return this.httpClient.get(this.env.apiUrl + 'api/user/events' , { params });
  }
  
  goToEvent (body: {
    id: string;
    email: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/events/go', body);
  }

  deleteEvent (params: {
    id: string;
    userEmail: string;
  }) {
    return this.httpClient.delete(this.env.apiUrl + 'api/events', { params });
  }
}

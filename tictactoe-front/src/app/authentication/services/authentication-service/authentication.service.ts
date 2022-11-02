import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserAuth } from "../../models/UserAuth";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { SignupRequest } from "../../models/signupRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userAuthSubject: BehaviorSubject<UserAuth | any>;
  public userAuthObservable: Observable<UserAuth | any>;
  readonly STORAGE_KEY = 'userAuth';

  constructor(
    private http: HttpClient,
  ) {
    this.userAuthSubject = new BehaviorSubject<any>(null);
    this.userAuthObservable = this.userAuthSubject.asObservable();
  }

  public userAuthValue(): UserAuth {
    return this.userAuthSubject.value;
  }

  readStoredUserAuth(): void {
    const savedUserAuth = sessionStorage.getItem(this.STORAGE_KEY)
    if (savedUserAuth) {
      this.userAuthSubject.next(JSON.parse(savedUserAuth))
    }
  }

  login(email: string, password: string): Observable<UserAuth> {
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, password}, {withCredentials: true})
      .pipe(map(user => {
        this.userAuthSubject.next(user);
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
        return user;
      }));
  }

  logout(): Observable<any> {
    sessionStorage.clear();
    this.userAuthSubject.next(null);
    return this.http.post<any>(`${environment.apiUrl}/logout`, {},{withCredentials: true})
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/signup`, signupRequest);
  }
}

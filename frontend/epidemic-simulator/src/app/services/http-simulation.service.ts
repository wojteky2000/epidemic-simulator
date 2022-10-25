import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Simulation} from "../models/Simulation";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class HttpSimulationService {

  private url = 'http://localhost:8080/simulations';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
  }

  showSnackBar(): void {
    this.snackBar.open('Wystąpił problem, spróbuj ponownie później.', 'Ok', {
      duration: 5000
    });
  }

  getSimulations(): Observable<Simulation[]> {
    return this.httpClient.get<Simulation[]>(this.url).pipe(tap(console.log), catchError((error) => {
      this.showSnackBar();
      return this.handleError(error);
    }));
  }

  getSimulation(id: string): Observable<Simulation> {
    return this.httpClient.get<Simulation>(this.url + '/' + id).pipe(catchError((error) => {
      this.showSnackBar();
      return this.handleError(error);
    }));
  }

  createSimulation(simulation: Partial<Simulation>) {
    return this.httpClient.post<Simulation>(this.url, simulation).pipe(catchError((error) => {
      this.showSnackBar();
      return this.handleError(error);
    }));
  }

  changeSimulation(id: number, simulation: Partial<Simulation>) {
    return this.httpClient.put(this.url + '/' + id, simulation).pipe(catchError((error) => {
      this.showSnackBar();
      return this.handleError(error);
    }));
  }

  deleteSimulation(id: number) {
    return this.httpClient.delete(this.url + '/' + id).pipe(catchError((error) => {
      this.showSnackBar();
      return this.handleError(error);
    }));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(
      `Name: ${error.name} \n` +
      `Message: ${error.message} \n` +
      `Returned code: ${error.status} \n`
    );
    return throwError(() => 'Something bad happened; please try again later.');
  }
}

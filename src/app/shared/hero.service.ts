import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Hero } from './hero';

import 'rxjs/add/operator/catch';

@Injectable()
export class HeroService {
  private apiUrl = 'http://localhost:8080/api/hero';
  private headers = new Headers({'Content-type': 'application/json'});

  constructor(private http: Http) { }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes()
               .map(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.apiUrl)
               .map(response => response.json() as Hero[])
               .catch(this.handleError);
  }

  create(name: string): Observable<Hero> {
    return this.http
               .post(this.apiUrl, JSON.stringify({name: name}), {headers: this.headers})
               .map(res => res.json())
               .catch(this.handleError);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
               .map(() => null)
               .catch(this.handleError);
  }

  update(hero: Hero): Observable<Hero> {
    const url = `${this.apiUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
               .map(() => hero)
               .catch(this.handleError);
  }

  search(term : string): Observable<Hero[]> {
    const url = `${this.apiUrl}/query?name=${term}`;
    return this.http.get(url)
                    .map((response) => response.json() as Hero[]);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Observable.throw(error.message || error);
  }
}

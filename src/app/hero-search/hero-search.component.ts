import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroService } from '../shared/hero.service';
import { Hero } from '../shared/hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: 'hero-search.component.html',
  providers: [HeroService]
})
export class HeroSearchComponent {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  public asyncSelected: string = '';
  public dataSource: Observable<any>;
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;
  constructor(
    private heroService: HeroService,
    private router: Router
  ) {
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.heroService.search(token));
  }

  search(term: string): void {
    console.log(term);
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: any): void {
    this.gotoDetail(e.item);
  }
}

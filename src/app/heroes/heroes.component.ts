import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService, LangChangeEvent } from 'ng2-translate';

import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.scss' ],
  providers: [ HeroService ]
})
export class HeroesComponent implements OnInit {
  title = 'Tour of HEROES';
  heroes: Hero[];
  selectedHero: Hero;

  deleteAll: boolean = false;

  totalItems: number = 0;
  currentPage: number = 1;
  maxSize: number = 3;
  itemsPerPage: number = 5;
  startIndex: number = 0;
  endIndex: number = 0;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  pageChanged(event:any): void {
    this.startIndex = event.itemsPerPage * (event.page - 1);
    this.endIndex = this.startIndex + event.itemsPerPage;
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.startIndex = this.itemsPerPage * (this.currentPage - 1);
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.totalItems = heroes.length;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
        .subscribe(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
                    .subscribe(() => {
                      this.heroes = this.heroes.filter(h => h !== hero);
                      if(this.selectedHero === hero) {
                        this.selectedHero = null;
                      }
                    })
  }
}

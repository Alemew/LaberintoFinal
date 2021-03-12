import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.page.html',
  styleUrls: ['./niveles.page.scss'],
})
export class NivelesPage implements OnInit {

  constructor(
    private route: Router,
    
    
  ) { }

  
    
    
  

  ngOnInit() {
  }

  public LevelUno(){
    let extrasNavegacion:NavigationExtras = {
      state: {
        level: 1,

      },
    };
    this.route.navigate(["juego"],extrasNavegacion);
  }
  public LevelDos(){
    let extrasNavegacion:NavigationExtras = {
      state: {
        level: 2,
        
      },
    };
    this.route.navigate(["juego"],extrasNavegacion);
  }
  public LevelTres(){
    let extrasNavegacion:NavigationExtras = {
      state: {
        level: 3,
        
      },
    };
    this.route.navigate(["juego"],extrasNavegacion);
  }
  public LevelCuatro(){
    let extrasNavegacion:NavigationExtras = {
      state: {
        level: 4,
        
      },
    };
    this.route.navigate(["juego"],extrasNavegacion);
  }
  public LevelCinco(){
    let extrasNavegacion:NavigationExtras = {
      state: {
        level: 5,
        
      },
    };
    this.route.navigate(["juego"],extrasNavegacion);
  }


}

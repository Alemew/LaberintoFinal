import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LaberintoService {

  maxX:number
  maxY:number
  tamanoBaldosa=18;
  tamanoCirculo=7;
  moveInX = 20;
  moveInY = -20;
  inicialX:number
  inicialY:number
  PlayerX:number
  PlayerY:number
  casillaFinal:Number[];
  casillaLlave:Number[];
  casillas:Number[][];
  constructor(
    private plt:Platform,
    private _x:Number,
    private _y:Number,
    private _casillaF:Array<Number>,
    private _casillaL:Array<Number>,
    private _casillasLaberinto:Array<Array<Number>>
  ) { 
    this.maxX =this.plt.width();
    this.maxY =this.plt.height();
    this.inicialX=this.maxX/this._x.valueOf();
    this.inicialY = this.maxY/this._y.valueOf()-30;
    this.PlayerX=this.maxX/this._x.valueOf()+9;
    this.PlayerY=this.maxY/this._y.valueOf()+9-30;
    this.casillaFinal = this._casillaF;
    this.casillaLlave = this._casillaL;
    this.casillas = this._casillasLaberinto;
  }


}

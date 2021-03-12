import { DeviceMotionOriginal } from '@ionic-native/device-motion';
import { LaberintoService } from './Servicios/laberinto.service';
import { AlertController, Platform } from '@ionic/angular';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'juego.page.html',
  styleUrls: ['juego.page.scss'],
})
export class JuegoPage implements AfterViewInit, OnInit{
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  canvasElement: any;
  level: number;

  PosicionC = false;
  HaveKey = false;

  mapa:Map<number,LaberintoService> = new Map();
  laberintoServices:LaberintoService

  alertController:AlertController = new AlertController()
  
  
  constructor(
    private plt:Platform,
    public route:Router,
    private rutaActivada: ActivatedRoute,
    ){
      this.mapa.set(1,new LaberintoService(this.plt,2,1.5,[2,13],[-4,-4],
        [[-2,-4],[-1,-4],[0,-4],[1,-4],[-4,-3],[-2,-3],[1,-3],[-4,-2],[-2,-2]
        ,[1,-2],[2,-2],[3,-2],[4,-2],[5,-2],[-4,-1],[-3,-1],[-2,-1],[5,-1,],[-4,0],[5,0],[-4,1],[-3,1]
        ,[-2,1],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[-2,2],[-1,2],[2,2],[5,2],[2,3],[3,3],[5,3],[-3,4]
        ,[-2,4],[-1,4],[0,4],[3,4],[-4,5],[-3,5],[0,5],[1,5],[2,5],[3,5],[4,5],[-4,6],[-2,6],[-1,6]
        ,[0,6],[4,6],[-2,7],[1,7],[2,7],[3,7],[4,7],[-4,8],[-3,8],[-2,8],[1,8],[-4,9],[1,9],[2,9],[3,9]
        ,[4,9],[-4,10],[-3,10],[-2,10],[-1,10],[0,10],[4,10],[-4,11],[0,11],[1,11],[2,11],[4,11],[5,11]
        ,[-4,12],[-3,12],[-2,12],[-1,12],[2,12],[5,12],[-2,13],[0,13],[4,13],[5,13],[-4,14],[-3,14]
        ,[-2,14],[0,14],[1,14],[3,14],[4,14],[1,15],[2,15],[3,15],[16,21]]))
      this.mapa.set(2,new LaberintoService(this.plt,20, 6 ,[15,-20],[13,-20],
        [[3,0],[4,0],[5,0],[8,0],[9,0],[10,0],[12,0],[13,0],[14,0],[15,0],[0,-1]
        ,[1,-1],[2,-1],[3,-1],[5,-1],[8,-1],[10,-1],[12,-1],[15,-1],[0,-2],[5,-2],[7,-2],[8,-2],[10,-2]
        ,[12,-2],[13,-2],[15,-2],[0,-3],[1,-3],[3,-3],[4,-3],[5,-3],[7,-3],[10,-3],[13,-3],[15,-3],[1,-4]
        ,[3,-4],[6,-4],[7,-4],[9,-4],[10,-4],[12,-4],[13,-4],[15,-4],[1,-5],[3,-5],[4,-5],[5,-5],[6,-5]
        ,[9,-5],[12,-5],[15,-5],[16,-5],[1,-6],[2,-6],[7,-6],[9,-6],[10,-6],[11,-6],[12,-6],[16,-6],[2,-7]
        ,[5,-7],[6,-7],[7,-7],[13,-7],[14,-7],[15,-7],[16,-7],[0,-8],[1,-8],[2,-8],[3,-8],[4,-8],[5,-8]
        ,[8,-8],[9,-8],[10,-8],[11,-8],[12,-8],[13,-8],[0,-9],[5,-9],[8,-9],[13,-9],[0,-10],[1,-10],[2,-10]
        ,[3,-10],[5,-10],[8,-10],[9,-10],[10,-10],[11,-10],[13,-10],[3,-11],[5,-11],[13,-11],[14,-11],[15,-11]
        ,[3,-12],[5,-12],[6,-12],[7,-12],[8,-12],[10,-12],[11,-12],[12,-12],[15,-12],[1,-13],[2,-13],[3,-13]
        ,[8,-13],[10,-13],[12,-13],[13,-13],[15,-13],[1,-14],[5,-14],[6,-14],[7,-14],[8,-14],[10,-14],[13,-14]
        ,[14,-14],[15,-14],[0,-15],[1,-15],[3,-15],[5,-15],[10,-15],[0,-16],[3,-16],[5,-16],[6,-16],[7,-16]
        ,[8,-16],[10,-16],[12,-16],[13,-16],[14,-16],[0,-17],[1,-17],[2,-17],[3,-17],[8,-17],[10,-17],[11,-17]
        ,[12,-17],[14,-17],[4,-18],[5,-18],[6,-18],[8,-18],[14,-18],[15,-18],[0,-19],[1,-19],[3,-19],[4,-19]
        ,[6,-19],[7,-19],[8,-19],[9,-19],[10,-19],[11,-19],[12,-19],[13,-19],[15,-19],[1,-20],[2,-20],[3,-20]]))
      this.mapa.set(3,new LaberintoService(this.plt,2,2.1,[0,2],[-5,-10],[[-3,11],
        [-2,11],[-1,11],[2,11],[3,11],[4,11],[-7,10],[-1,10],[2,10]
        ,[-7,9],[-6,9],[-5,9],[-4,9],[-3,9],[-2,9],[-1,9],[0,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9]
        ,[-2,8],[4,8],[-6,7],[-5,7],[-4,7],[-3,7],[-2,7],[-1,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]
        ,[8,7],[-8,6],[-6,6],[-3,6],[3,6],[6,6],[8,6],[-8,5],[-6,5],[-4,5],[-3,5],[-2,5],[-1,5],[0,5],[2,5]
        ,[3,5],[4,5],[6,5],[8,5],[-8,4],[-6,4],[-4,4],[4,4],[6,4],[8,4],[-8,3],[-6,3],[-4,3],[-2,3]
        ,[-1,3],[0,3],[1,3],[2,3],[4,3],[6,3],[7,3],[8,3],[-8,2],[-6,2],[-4,2],[-3,2],[-2,2]
        ,[2,2],[4,2],[6,2],[-8,1],[-6,1],[-4,1],[-2,1],[2,1],[3,1],[4,1],[6,1],[8,1],[-8,0],[-7,0]
        ,[-6,0],[-4,0],[-2,0],[2,0],[4,0],[6,0],[8,0],[-8,-1],[-6,-1],[-4,-1],[-2,-1],[0,-1],[2,-1],[4,-1]
        ,[6,-1],[7,-1],[8,-1],[-6,-2],[-4,-2],[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[6,-2],[8,-2],[-8,-3]
        ,[-6,-3],[-4,-3],[4,-3],[6,-3],[-8,-4],[-6,-4],[-4,-4],[-3,-4],[-2,-4],[-1,-4]
        ,[0,-4],[1,-4],[2,-4],[3,-4],[4,-4],[6,-4],[-8,-5],[-7,-5],[-6,-5],[3,-5],[6,-5],[-8,-6]
        ,[-6,-6],[-5,-6],[-4,-6],[-3,-6],[-2,-6],[0,-6],[1,-6],[2,-6],[3,-6],[5,-6],[6,-6]
        ,[-5,-7],[0,-7],[5,-7],[-7,-8],[-6,-8],[-5,-8],[-2,-8],[-1,-8],[0,-8],[1,-8],[3,-8],[4,-8],[5,-8]
        ,[6,-8],[7,-8],[4,-9],[-4,-10],[-3,-10],[-2,-10],[-1,-10],[0,-10],[1,-10],[2,-10],[3,-10]
        ,[4,-10],[5,-10],[6,-10]]))
      this.mapa.set(4,new LaberintoService(this.plt,20,1.4,[0,20],[16,17],[[1,20],[2,20]
        ,[2,20],[3,20],[4,20],[5,20],[6,20],[6,19],[9,19],[10,19],[13,19],[14,19],[15,19],[1,18]
        ,[2,18],[3,18],[4,18],[5,18],[6,18],[8,18],[9,18],[10,18],[13,18],[15,18],[1,17],[2,17]
        ,[8,17],[10,17],[13,17],[15,17],[0,16],[2,16],[8,16],[10,16],[13,16],[14,16],[0,15],[2,15]
        ,[3,15],[4,15],[5,15],[6,15],[7,15],[8,15],[10,15],[11,15],[12,15],[14,15],[0,14],[4,14]
        ,[13,14],[14,14],[0,13],[2,13],[3,13],[4,13],[7,13],[8,13],[9,13],[10,13],[11,13],[12,13]
        ,[13,13],[15,13],[0,12],[2,12],[7,12],[15,12],[16,12],[0,11],[1,11],[2,11],[3,11],[4,11]
        ,[5,11],[7,11],[9,11],[10,11],[11,11],[12,11],[13,11],[15,11],[2,10],[6,10],[7,10]
        ,[9,10],[13,10],[15,10],[2,9],[6,9],[9,9],[13,9],[15,9],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8]
        ,[9,8],[13,8],[15,8],[13,7],[15,7],[0,6],[2,6],[4,6],[6,6],[9,6],[10,6],[11,6],[12,6],[13,6]
        ,[15,6],[0,5],[3,5],[6,5],[9,5],[15,5],[0,4],[3,4],[4,4],[5,4],[6,4],[9,4],[11,4],[12,4]
        ,[13,4],[14,4],[15,4],[0,3],[3,3],[9,3],[15,3],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[9,2]
        ,[11,2],[12,2],[13,2],[15,2],[0,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[13,1],[15,1]
        ,[13,0],[14,0],[15,0]]))
      this.mapa.set(5,new LaberintoService(this.plt,1.2,1.4,[0,18],[-3,13],[[-15,18],[-14,18],[-13,18]
        ,[-12,18],[-11,18],[-10,18],[-9,18],[-8,18],[-7,18],[-4,18],[-3,18],[-2,18],[-15,17],[-7,17]
        ,[-4,17],[0,17],[-15,16],[-9,16],[-7,16],[-4,16],[-2,16],[-1,16],[0,16],[-15,15],[-9,15],[-7,15]
        ,[-6,15],[-5,15],[-4,15],[-3,15],[-2,15],[-15,14],[-13,14],[-12,14],[-9,14],[0,14],[-15,13]
        ,[-13,13],[-9,13],[-6,13],[-5,13],[-4,13],[0,13],[-15,12],[-13,12],[-11,12],[-10,12],[-9,12]
        ,[-6,12],[0,12],[-15,11],[-13,11],[-11,11],[-6,11],[0,11],[-15,10],[-13,10],[-12,10],[-11,10]
        ,[-6,10],[-5,10],[-4,10],[-3,10],[-2,10],[-1,10],[0,10],[-15,9],[-11,9],[-3,9],[-15,8],[-11,8]
        ,[-3,8],[-15,7],[-11,7],[-3,7],[-15,6],[-11,6],[-3,6],[-15,5],[-11,5],[-3,5],[-15,4],[-11,4],[-3,4]
        ,[-15,3],[-11,3],[-10,3],[-9,3],[-8,3],[-7,3],[-6,3],[-5,3],[-4,3],[-3,3],[-2,3],[-1,3],[0,3]
        ,[-15,2],[-7,2],[0,2],[-15,1],[-7,1],[0,1],[-15,0],[-14,0],[-13,0],[-12,0],[-11,0],[-10,0]
        ,[-9,0],[-8,0],[-7,0]]))
      this.mapa.set(6,new LaberintoService(this.plt,1.2,3.5,[-14,-18],[-8,-4],[[-14,0],[-13,0],[-12,0]
        ,[-12,0],[-11,0],[-10,0],[-9,0],[-8,0],[-7,0],[-6,0],[-5,0],[-4,0],[-3,0],[-2,0],[-1,0],[-14,-1]
        ,[-2,-1],[-14,-2],[-12,-2],[-11,-2],[-10,-2],[-8,-2],[-7,-2],[-6,-2],[-4,-2],[-2,-2],[-1,-2],[0,-2],[-14,-3]
        ,[-12,-3],[-10,-3],[-6,-3],[-4,-3],[0,-3],[-14,-4],[-13,-4],[-12,-4],[-10,-4],[-9,-4],[-6,-4],[-4,-4]
        ,[-3,-4],[-2,-4],[0,-4],[-6,-5],[-4,-5],[0,-5],[-14,-6],[-13,-6],[-12,-6],[-11,-6],[-10,-6],[-9,-6]
        ,[-8,-6],[-7,-6],[-6,-6],[-5,-6],[-4,-6],[-2,-6],[-1,-6],[0,-6],[-14,-7],[-4,-7],[-2,-7],[-14,-8]
        ,[-11,-8],[-9,-8],[-8,-8],[-7,-8],[-6,-8],[-4,-8],[-2,-8],[-14,-9],[-11,-9],[-8,-9],[-6,-9],[-4,-9]
        ,[-2,-9],[-1,-9],[0,-9],[-14,-10],[-13,-10],[-12,-10],[-11,-10],[-10,-10],[-8,-10],[-6,-10],[-4,-10],[0,-10]
        ,[-13,-11],[-10,-11],[-8,-11],[-6,-11],[-4,-11],[-2,-11],[0,-11],[-10,-12],[-8,-12],[-6,-12],[-4,-12]
        ,[-2,-12],[0,-12],[-14,-13],[-13,-13],[-12,-13],[-11,-13],[-10,-13],[-8,-13],[-6,-13],[-4,-13],[-2,-13]
        ,[0,-13],[-14,-14],[-10,-14],[-8,-14],[-6,-14],[-4,-14],[-3,-14],[-2,-14],[0,-14],[-14,-15],[-12,-15]
        ,[-10,-15],[-8,-15],[-6,-15],[-4,-15],[0,-15],[-14,-16],[-13,-16],[-12,-16],[-10,-16],[-9,-16],[-8,-16]
        ,[-6,-16],[-4,-16],[-3,-16],[0,-16],[-14,-17],[-6,-17],[-3,-17],[0,-17],[-6,-18],[-5,-18],[-3,-18],[0,-18]
        ,[-3,-19],[-2,-19],[-1,-19],[0,-19]]))
      this.mapa.set(7,new LaberintoService(this.plt,5,1.37,[0,18],[7,11],[[1,19],[2,19],[3,19],[4,19],[5,19]
        ,[6,19],[7,19],[8,19],[9,19],[10,19],[11,19],[12,19],[13,19],[14,19],[1,18],[10,18],[3,17],[4,17]
        ,[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[12,17],[13,17],[14,17],[0,16],[1,16],[2,16],[3,16],[12,16]
        ,[3,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15],[0,14],[3,14],[6,14],[9,14],[14,14],[0,13]
        ,[3,13],[6,13],[9,13],[11,13],[12,13],[13,13],[14,13],[0,12],[3,12],[4,12],[5,12],[6,12],[9,12],[11,12]
        ,[14,12],[0,11],[9,11],[10,11],[11,11],[14,11],[0,10],[7,10],[14,10],[0,9],[1,9],[2,9],[3,9],[4,9]
        ,[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[14,9],[2,8],[10,8],[11,8],[12,8],[14,8],[2,7],[6,7],[12,7],[13,7]
        ,[14,7],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[0,5],[8,5],[12,5],[0,4],[1,4],[2,4],[8,4]
        ,[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[5,3],[6,3],[7,3],[8,3],[14,3],[5,2],[14,2],[5,1],[8,1],[9,1]
        ,[10,1],[11,1],[13,1],[14,1],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[11,0]]))
     this.mapa.set(8,new LaberintoService(this.plt,5,3.7,[7,-18],[7,-9],[[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0]
        ,[13,0],[0,-1],[5,-1],[13,-1],[0,-2],[1,-2],[2,-2],[3,-2],[4,-2],[5,-2],[6,-2],[7,-2],[8,-2],[9,-2],[10,-2]
        ,[11,-2],[13,-2],[14,-2],[11,-3],[0,-4],[1,-4],[2,-4],[3,-4],[4,-4],[5,-4],[6,-4],[7,-4],[8,-4],[11,-4]
        ,[12,-4],[13,-4],[14,-4],[0,-5],[14,-5],[0,-6],[14,-6],[0,-7],[1,-7],[2,-7],[3,-7],[4,-7],[5,-7],[6,-7]
        ,[7,-7],[8,-7],[9,-7],[10,-7],[11,-7],[14,-7],[3,-8],[11,-8],[14,-8],[3,-9],[8,-9],[9,-9],[10,-9],[11,-9],[14,-9]
        ,[3,-10],[14,-10],[3,-11],[4,-11],[5,-11],[6,-11],[7,-11],[8,-11],[9,-11],[10,-11],[11,-11],[12,-11],[13,-11]
        ,[14,-11],[13,-12],[13,-13],[0,-14],[1,-14],[2,-14],[3,-14],[4,-14],[5,-14],[6,-14],[7,-14],[8,-14],[9,-14],[10,-14]
        ,[11,-14],[12,-14],[13,-14],[0,-15],[11,-15],[0,-16],[1,-16],[2,-16],[3,-16],[4,-16],[5,-16],[6,-16],[7,-16]
        ,[8,-16],[11,-16],[8,-17],[11,-17],[12,-17],[13,-17],[14,-17],[8,-18]]))
      this.mapa.set(9,new LaberintoService(this.plt,2,1.4,[8,12],[-4,19],[[5,19],[7,19],[-4,18],[-3,18],[-2,18]
        ,[5,18],[7,18],[-3,17],[-2,17],[0,17],[1,17],[2,17],[3,17],[4,17],[5,17],[7,17],[-3,16],[0,16],[5,16],[7,16]
        ,[-8,15],[-7,15],[-6,15],[-3,15],[0,15],[2,15],[3,15],[4,15],[5,15],[6,15],[7,15],[-8,14],[-6,14],[-3,14]
        ,[0,14],[2,14],[5,14],[-8,13],[-6,13],[-3,13],[0,13],[2,13],[5,13],[-8,12],[-6,12],[-3,12],[0,12],[2,12]
        ,[5,12],[7,12],[-8,11],[-6,11],[-3,11],[0,11],[2,11],[5,11],[7,11],[-8,10],[-6,10],[-3,10],[0,10],[2,10],[5,10],[7,10]
        ,[-8,9],[-6,9],[-5,9],[-4,9],[-3,9],[-2,9],[-1,9],[0,9],[2,9],[5,9],[7,9],[-8,8],[-6,8],[0,8],[1,8],[2,8],[5,8],[7,8],[-8,7]
        ,[-6,7],[0,7],[4,7],[5,7],[7,7],[-8,6],[-6,6],[0,6],[4,6],[7,6],[-8,5],[-6,5],[-5,5],[-4,5],[-3,5],[-2,5]
        ,[-1,5],[0,5],[1,5],[2,5],[4,5],[7,5],[-8,4],[0,4],[2,4],[4,4],[7,4],[-8,3],[0,3],[2,3],[4,3],[7,3],[-8,2]
        ,[0,2],[2,2],[4,2],[5,2],[6,2],[7,2],[-8,1],[0,1],[2,1],[7,1],[-8,0],[-7,0],[-6,0],[-5,0],[-4,0],[-3,0]
        ,[-2,0],[-1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]]))
      this.mapa.set(10,new LaberintoService(this.plt,1.15,2.48,[-14,6],[-8,-3],[[-13,6],[-11,6],[-10,6],[-15,5],[-13,5]
        ,[-10,5],[-9,5],[-6,5],[-5,5],[-15,4],[-13,4],[-9,4],[-8,4],[-7,4],[-6,4],[-4,4],[-3,4],[-2,4],[-1,4]
        ,[-15,3],[-13,3],[-6,3],[-4,3],[-15,2],[-13,2],[-12,2],[-11,2],[-10,2],[-9,2],[-8,2],[-7,2],[-6,2],[-4,2]
        ,[-3,2],[-2,2],[-1,2],[0,2],[-15,1],[-12,1],[-10,1],[-2,1],[0,1],[-15,0],[-12,0],[-2,0],[-15,-1],[-12,-1]
        ,[-10,-1],[-9,-1],[-8,-1],[-7,-1],[-6,-1],[-5,-1],[-4,-1],[-2,-1],[-15,-2],[-13,-2],[-12,-2],[-10,-2]
        ,[-4,-2],[-2,-2],[-15,-3],[-12,-3],[-10,-3],[-7,-3],[-6,-3],[-4,-3],[-2,-3],[-15,-4],[-12,-4],[-10,-4]
        ,[-6,-4],[-4,-4],[-2,-4],[-15,-5],[-12,-5],[-10,-5],[-9,-5],[-8,-5],[-7,-5],[-6,-5],[-4,-5],[-2,-5]
        ,[-15,-6],[-12,-6],[-4,-6],[-2,-6],[-15,-7],[-13,-7],[-12,-7],[-11,-7],[-10,-7],[-9,-7],[-8,-7],[-7,-7]
        ,[-6,-7],[-5,-7],[-4,-7],[-2,-7],[-15,-8],[-13,-8],[-8,-8],[-2,-8],[-15,-9],[-13,-9],[-8,-9],[-2,-9]
        ,[-15,-10],[-14,-10],[-13,-10],[-12,-10],[-11,-10],[-10,-10],[-9,-10],[-7,-10],[-6,-10]
        ,[-5,-10],[-4,-10],[-3,-10],[-2,-10],[-1,-10],[-13,-11],[-10,-11],[-1,-11],[-15,-12],[-14,-12],[-13,-12]
        ,[-10,-12],[-7,-12],[-6,-12],[-5,-12],[-4,-12],[-3,-12],[-2,-12],[-1,-12],[-15,-13],[-10,-13],[-9,-13]
        ,[-8,-13],[-7,-13]]))
  }

  ngOnInit() {
    this.rutaActivada.queryParams.subscribe(() => {
      this.level = this.route.getCurrentNavigation().extras.state.level;
    })
  }

  
  

  ngAfterViewInit() {

    this.laberintoServices = this.mapa.get(this.level)
    this.canvasElement = this.myCanvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = this.plt.height()-120;
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    var ctx = this.context;
    
    let i = 0;
    ctx.fillStyle = 'blue';
      ctx.fillRect(this.laberintoServices.inicialX,this.laberintoServices.inicialY,this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.laberintoServices.PlayerX, this.laberintoServices.PlayerY, this.laberintoServices.tamanoCirculo, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
      
      let intervalo = setInterval(() =>{
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.laberintoServices.inicialX+(this.laberintoServices.moveInX*this.laberintoServices.casillas[i][0].valueOf())
        ,this.laberintoServices.inicialY+(this.laberintoServices.moveInY*this.laberintoServices.casillas[i][1].valueOf())
        ,this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
        i++;
        
        if (i==this.laberintoServices.casillas.length) {
          clearInterval(intervalo);
        }
        },10);
      ctx.fillStyle = 'yellow';
      ctx.fillRect(this.laberintoServices.inicialX+(this.laberintoServices.moveInX*this.laberintoServices.casillaLlave[0].valueOf())
      ,this.laberintoServices.inicialY+(this.laberintoServices.moveInY*this.laberintoServices.casillaLlave[1].valueOf())
      ,this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
          
  }

  public Right() {
    this.paint();
    this.laberintoServices.PlayerX += this.laberintoServices.moveInX;
    this.move();
  }
  public Up() {
    this.paint();
    this.laberintoServices.PlayerY += this.laberintoServices.moveInY;
    this.move();
  }
  public Down() {
    this.paint();
    this.laberintoServices.PlayerY -= this.laberintoServices.moveInY;
    this.move();
  }
  public Left() {
    this.paint();
    this.laberintoServices.PlayerX -= this.laberintoServices.moveInX;
    this.move();
  }  

  public paint(){
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    var ctx = this.context;
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.laberintoServices.PlayerX-9,this.laberintoServices.PlayerY-9
      ,this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
  }

  public move() {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    var ctx = this.context;
    this.win();
    this.GetKey();
    this.Fall();
    ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.laberintoServices.PlayerX, this.laberintoServices.PlayerY, this.laberintoServices.tamanoCirculo, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
  }


  public Fall() {
    for (let i = 0; i < this.laberintoServices.casillas.length; i++) {
      if (Math.round(this.laberintoServices.inicialX+this.laberintoServices.casillas[i][0].valueOf()*this.laberintoServices.moveInX)==Math.round(this.laberintoServices.PlayerX-9) && Math.round(this.laberintoServices.inicialY+this.laberintoServices.casillas[i][1].valueOf()*this.laberintoServices.moveInY)==Math.round(this.laberintoServices.PlayerY-9)
        || Math.round(this.laberintoServices.inicialX+this.laberintoServices.casillaLlave[0].valueOf()*this.laberintoServices.moveInX)==Math.round(this.laberintoServices.PlayerX-9) && Math.round(this.laberintoServices.inicialY+this.laberintoServices.casillaLlave[1].valueOf()*this.laberintoServices.moveInY)==Math.round(this.laberintoServices.PlayerY-9)
        || Math.round(this.laberintoServices.inicialX+this.laberintoServices.casillaFinal[0].valueOf()*this.laberintoServices.moveInX)==Math.round(this.laberintoServices.PlayerX-9) && Math.round(this.laberintoServices.inicialY+this.laberintoServices.casillaFinal[1].valueOf()*this.laberintoServices.moveInY)==Math.round(this.laberintoServices.PlayerY-9) && this.HaveKey==true
        || Math.round(this.laberintoServices.inicialX)==Math.round(this.laberintoServices.PlayerX-9) && Math.round(this.laberintoServices.inicialY)==Math.round(this.laberintoServices.PlayerY-9)) {
        this.PosicionC=true;
      }
    }
    if (this.PosicionC == false) {
      // laberinto\platforms\android\app\build\outputs\apk\debug\app-debug.apk
      if(this.level>5){
        this.level--;
        this.laberintoServices.PlayerX = this.laberintoServices.inicialX+9
        this.laberintoServices.PlayerY = this.laberintoServices.inicialY+9
        this.laberintoServices = this.mapa.get(this.level)
      }
      this.laberintoServices.PlayerX = this.laberintoServices.inicialX+9
      this.laberintoServices.PlayerY = this.laberintoServices.inicialY+9
      this.ngAfterViewInit();
      this.reset();
    }
    this.PosicionC=false;
  }

  public GetKey(){

    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    var ctx = this.context;
    if (Math.round(this.laberintoServices.inicialX+this.laberintoServices.casillaLlave[0].valueOf()*this.laberintoServices.moveInX)==Math.round(this.laberintoServices.PlayerX-9) && Math.round(this.laberintoServices.inicialY+this.laberintoServices.casillaLlave[1].valueOf()*this.laberintoServices.moveInY)==Math.round(this.laberintoServices.PlayerY-9)) {
      ctx.fillStyle = 'green';
      ctx.fillRect(this.laberintoServices.inicialX+(this.laberintoServices.moveInX*this.laberintoServices.casillaFinal[0].valueOf()),this.laberintoServices.inicialY+(this.laberintoServices.moveInY*this.laberintoServices.casillaFinal[1].valueOf()),this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
      this.HaveKey = true;
    }
      
  }

  public reset(){
    this.HaveKey=false;
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    var ctx = this.context;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.laberintoServices.inicialX+(this.laberintoServices.moveInX*this.laberintoServices.casillaLlave[0].valueOf()),this.laberintoServices.inicialY+(this.laberintoServices.moveInY*this.laberintoServices.casillaLlave[1].valueOf()),this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
    ctx.clearRect(this.laberintoServices.inicialX+(this.laberintoServices.moveInX*this.laberintoServices.casillaFinal[0].valueOf()),this.laberintoServices.inicialY+(this.laberintoServices.moveInY*this.laberintoServices.casillaFinal[1].valueOf()),this.laberintoServices.tamanoBaldosa,this.laberintoServices.tamanoBaldosa);
  }

  public async win(){
    if (Math.round(this.laberintoServices.inicialX+(this.laberintoServices.moveInX*this.laberintoServices.casillaFinal[0].valueOf()))==Math.round(this.laberintoServices.PlayerX-9) && Math.round(this.laberintoServices.inicialY+(this.laberintoServices.moveInY*this.laberintoServices.casillaFinal[1].valueOf())) == Math.round(this.laberintoServices.PlayerY-9)
    && this.HaveKey==true) {
      this.level++;
      if(this.level<=5){
        const alerta = await this.alertController.create({
          header: 'Felicidades',
          message: 'Has superado este nivel',
          buttons: [
            {
              text:'Siguiente Nivel',
              handler: () => {
                this.ngAfterViewInit();
              }
            }]
        });
        await alerta.present();
      }else{
        if (this.level==11) {
          const alerta = await this.alertController.create({
            header: 'Felicidades',
            message: 'Has superado todos los niveles',
          });
          await alerta.present();
          this.level--;
        }
        this.ngAfterViewInit();
      }      
    }
  }

}



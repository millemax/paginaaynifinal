import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

//modulos para enviar a la base de datos
import {Router} from '@angular/router'
import {PhotoService} from '../services/photo.service'


//modulo de las alertas
import { ToastrService } from 'ngx-toastr';



interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}



// mediaRecorder nos dara un error al momento de compilarlo los solucionamos asi:
declare var MediaRecorder: any;


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent{
//variable booleano para collapse
isCollapsed:boolean=true;

//variables del texto para enviar a mongodb
titulotext:string;
descriptiontext:string;

//variables de audio
tituloaudio:string;
descripcionaudio:string;

//variables de video
titulovideo:string;
descripcionvideo:string;



//declaramos variables para enviar a mongodb
  photoSelected: string | ArrayBuffer;
  file: File;

  audio:File;

  fileVideo:File;

  mensajevideo:string;
  


// declaramos variables para el video :
mediaRecorder:any;
urlVideo:any;
localmedia:any;

blobVideo:any;
 @ViewChild('video',{static:false}) video;
 @ViewChild('video2',{static:false}) video2;

 botoncito:boolean=false;

 videito:boolean=false;
 
//fin de varibles de video
 



  //Lets initiate Record OBJ
  private record;
  //Will use this flag for detect recording
  private recording = false;
  //Url of Blob
  private url;
  private error;
  
  

  constructor(private domSanitizer: DomSanitizer,private photoService: PhotoService, private router: Router,private toastr: ToastrService) { }

  

  //codigo para enviar a mongodb

  
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  } 

  // funcion para enviar a la base de datos 
  texto(){
     
    // creee un archivo txt por que no permite la api rest enviar archivos vacios.
      var file = new File(["audio"], "audio.txt", {
        type: "text/plain",
      });
    
    const cat="texto";
    console.log(this.titulotext);
    console.log(this.descriptiontext);
    this.photoService.createPhoto(this.titulotext,this.descriptiontext,file,cat)
          .subscribe(res=>{
            console.log(res)
            console.log("texto enviado a la BD");
            
            this.titulotext="";
            this.descriptiontext="";
            this.toastr.success('envio exitoso de texto', 'Correcto!');
            
          },
          err=>{

            this.toastr.error('no se pudo enviar','¡Error!');
          }
          
          );
          return false;
    
  }

  //funcion para enviar el audio a bd

  enviaraudio(){
    const cat="audio";

    console.log(this.tituloaudio,this.descripcionaudio);
    this.photoService.createPhoto(this.tituloaudio,this.descripcionaudio,this.audio,cat)
            .subscribe(res=>{
              this.tituloaudio="";
              this.descripcionaudio="";
              this.toastr.success('envio exitoso de audio', 'Correcto!')


            },
            
            err=>{
              this.toastr.error('no se puedo enviar el audio','¡Error!')
            }
            
            );


    return false;
    
    
  }

  //funcion para enviar el video
  enviarvideo(){
    console.log("enviaando el video...")
    console.log(this.fileVideo);
    
    
    const cat="video";
    this.photoService.createPhoto(this.titulovideo,this.descripcionvideo,this.fileVideo,cat)
            .subscribe(res=>{
              this.toastr.success('envio exitoso de video','Correcto!')

            },
            err=>{
                this.toastr.error('no se pudo enviar video','Error!')
            }
            );

  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    const cat="audio"
    this.photoService
      .createPhoto(title.value, description.value, this.file,cat)
      .subscribe(
        res => {
          console.log(res);
          console.log("datos enviados a mongodb")
          //this.router.navigate(['/photos'])
        },
        err => console.log(err)
      );
    return false;
  }


  //funcion para enviar el video a la base de datos





  //fin codigo mongodb
  
  
  //codigo de video

toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = true;
    video.controls =true;
    video.autoplay = true;
  }

toggleControl2(){
  let video: HTMLVideoElement = this.video2.nativeElement;
    video.muted = false;
    video.controls =true;
    video.autoplay = false;

}

grabar(){
    
    this.videito=false;
    
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
          .then(this.recordVideo.bind(this))
          .catch(error=> console.log("error al obtener la camara"));
        
  }



  
recordVideo(stream){
    let chunks=[];
     
    console.log("captando el stream");
    this.toggleControls();
    let video: HTMLVideoElement = this.video.nativeElement;
    let video2: HTMLVideoElement = this.video2.nativeElement;
    video.srcObject=stream;
    this.localmedia=stream;
    

    //les dara un error mediarecorder esto lo soluciona solo ejecutenlo
    // npm install -D @types/dom-mediacapture-record
     this.mediaRecorder= new MediaRecorder(stream,{
      mimeType: 'video/webm;codecs=h264'
    })

    //inicia con el proceso de grabacion  ojo con esto abajo en almacenar

   // this.mediaRecorder.start();

  //producir una archivo final
    this.mediaRecorder.ondataavailable=function(e){

       chunks.push(e.data)
    }

  //cuando finaliza la grabacion guarda el archivo en un tipo blob  que esta guardado en el chunks
    
    this.mediaRecorder.onstop=function(){

       
       this.blobVideo= new Blob(chunks,{type:'video/webm'});
       
      chunks=[];  
      console.log("en el ONSTOP");
      this.mensajevideo="archivo cambiado en onstop";
      
      this.fileVideo = new File([this.blobVideo], "video.webm");
      
      console.log(this.fileVideo);

      // convirtiendo en una url  el video 
      this.urlVideo=window.URL.createObjectURL(this.blobVideo);
           
      video2.src= this.urlVideo;
      this.grabando=true;
      
      
      console.log("grabacion finalizada en onstop");
      
      

    };
    

  


  }

  almacenando(){
     
      this.botoncito=true;
      this.mediaRecorder.start();
      //this.toggleControl2();
      
      //para que pueda aparecer los botonos de parar y desechar
      this.videito=true;
  }

  parar(){
    
    
    this.botoncito=false;
    let video: HTMLVideoElement = this.video.nativeElement;     
    video.srcObject=null;
    this.mediaRecorder.stop() ;       
    this.localmedia.stop(); 
    
    
    console.log("parar grabacion")
  }


  desecharVideo(){
    this.botoncito=false;   
    let video2: HTMLVideoElement = this.video2.nativeElement;
    video2.src=null;
    console.log("Desechado")
    this.grabar();
    
    
  }

  cerrarTodo(){
    this.botoncito=false;
    console.log("cerrando todo")
    this.localmedia.stop();
    this.localmedia=null; 
    let video2: HTMLVideoElement = this.video2.nativeElement;
    video2.src=null;
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src=null;

    
    
  }




  



//-------------------codigo del audio................


sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
}
/**
 * Start recording.
 */
initiateRecording() {
    this.isCollapsed=true;
    this.recording = true;
    let mediaConstraints = {
        video: false,
        audio: true
    };
    navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));
}
/**
 * Will be called automatically.
 */
successCallback(stream) {
    var options = {
        mimeType: "audio/wav",
        numberOfAudioChannels: 1
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
}
/**
 * Stop recording.
 */
stopRecording() {
    this.isCollapsed=false
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
}
/**
 * processRecording Do what ever you want with blob
 * @param  {any} blob Blog
 */
processRecording(blob) {
    this.audio = new File([blob], "audio.wav");
    this.url = URL.createObjectURL(blob);
    console.log(this.audio)
}
/**
 * Process Error.
 */
errorCallback(error) {
    this.error = 'Can not play audio in your browser';
}
 
desechar(){
  this.url=null;
  this.isCollapsed=true;
}









}

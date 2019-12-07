import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

//let RecordRTC = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent{

//video
private stream: MediaStream;
private recordRTC: any;
@ViewChild('video',{static:false}) video;

 



  //Lets initiate Record OBJ
  private record;
  //Will use this flag for detect recording
  private recording = false;
  //Url of Blob
  private url;
  private error;

  constructor(private domSanitizer: DomSanitizer) { }

  
  
  //codigo de video

  ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

 




  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = video.muted;
    video.controls = video.controls;
    video.autoplay = !video.autoplay;
  }

  // controles cuando grabas
  toggleControlsRecord() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallbackVideo(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm;codecs', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject=stream; 
    //video.src = URL.createObjectURL(stream);
    
  
    this.toggleControlsRecord();
  }

  errorCallbackVideo() {
    console.log("no pudimos grabar")
  }

  processVideo(audioVideoWebMURL) {
    
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    let recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  
  }

  startRecording() {
    let mediaConstraints = {
        video:true,
        audio:true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallbackVideo.bind(this), this.errorCallbackVideo.bind(this));


  }

  stopRecordingVideo() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }





  //fin de codigo de video






  sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
}
/**
 * Start recording.
 */
initiateRecording() {
    
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
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
}
/**
 * processRecording Do what ever you want with blob
 * @param  {any} blob Blog
 */
processRecording(blob) {
    this.url = URL.createObjectURL(blob);
}
/**
 * Process Error.
 */
errorCallback(error) {
    this.error = 'Can not play audio in your browser';
}
 
desechar(){
  this.url=null;
}







}

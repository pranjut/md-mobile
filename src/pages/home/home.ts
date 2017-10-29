import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matches: String[];
  isRecording = false;
  constructor(public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef) {
      
  }

  startListening(){
    let options = {
      language: "en-US"
    }
    this.speechRecognition.startListening(options).subscribe((matches) => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true
  }

  stopListening(){
      this.speechRecognition.stopListening().then(() => {
        this.isRecording = false;
      });
  }

  getPermissions(){
    this.speechRecognition.hasPermission().then((isPermitted: Boolean) => {
        if(!isPermitted){
          this.speechRecognition.requestPermission();
        }
    });
  }

  isIOS(){
    return this.plt.is("ios");
  }

}

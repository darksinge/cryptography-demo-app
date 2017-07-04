import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { hashSync, compareSync } from 'bcrypt';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

@Component({
  selector: 'App',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/bootstrap.css']
})
export class AppComponent implements OnInit {
  public readonly name = 'electron-forge';

  @ViewChild('input') input: ElementRef;
  public hashes: string[] = [];
  public saltRounds: number = 1;

  public encryptMethod: string = "caeser";

  ngOnInit() {
    console.log('component initialized');
  }

  setEncryptMethod(ev: string) {
    this.encryptMethod = ev;
  }

  compareMessage(h: string, s: string) {
    return compareSync(h, s);
  }

  onClickEncrypt(ev) {
    let msg = this.input.nativeElement.value;
    let encMsg;
    switch (this.encryptMethod) {
      case 'caeser':
      encMsg = this.caeserCipher(msg);
      console.log(encMsg);
      break;
      case 'bcrypt':
      encMsg = this.bcryptHash(msg);
      console.log('2');
      break;
      case 'ssl':
      encMsg = this.sslEncrypt(msg);
      console.log('3');
    }
    this.hashes.push(encMsg);
  }

  clear() {
    this.hashes = [];
  }

  bcryptHash(s: string) {
    return hashSync(s, this.saltRounds);
  }

  sslEncrypt(s: string) {
    return "";
  }

  caeserCipher(s: string) {
    const shiftVal = 3;
    s = s.toLowerCase();
    let enc = "";
    for (var i = 0; i < s.length; i++) {
      let currChar: string = s[i];

      let alphIndex = alphabet.indexOf(currChar);
      
      if (alphIndex < 0) {
        enc += currChar;
        continue;
      }
      
      let shift = (alphIndex + shiftVal) > 25 ? alphIndex + shiftVal - 26 : alphIndex + shiftVal;
      console.log(shift);
      enc += alphabet[shift];
    }
    return enc;
  }

}


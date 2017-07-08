import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BcryptComponent } from './bcrypt/bcrypt.component';
import { CaesarComponent } from './caesar/caesar.component';
import { SimpleSSLComponent } from './ssl/simple-ssl.component';

export class Alphabet {
  public static readonly alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  public static readonly special = ['!', '@', '#', '$', '%', '^', '&', '*', '.'];
}

@Component({
  moduleId: module.id,
  selector: 'App',
  templateUrl: './app.component.html',
  styleUrls: ['./css/bootstrap.css']
})
export class AppComponent implements OnInit {
  public readonly name = 'electron-forge';

  @ViewChild('input') input: ElementRef;

  @ViewChild('app-bcrypt') bcryptComp: BcryptComponent;
  @ViewChild('app-caesar') caesarComp: CaesarComponent;
  @ViewChild('simplessl') sslComp: SimpleSSLComponent;

  public hashes: string[] = [];
  public saltRounds: number = 1;

  public encryptMethod: string = "ssl";

  ngOnInit() {
    console.log('component initialized');
  }

  

  onClickEncrypt(ev) {
    let msg = this.input.nativeElement.value;
    let encMsg;
    switch (this.encryptMethod) {
      case 'caeser':
      encMsg = this.caesarCipher(msg);
      console.log(encMsg);
      break;
      case 'bcrypt':
      encMsg = this.bcryptComp.encrypt(msg);
      break;
      case 'ssl':
      encMsg = this.sslComp.encrypt(msg);
      break;
    }
    this.hashes.push(encMsg);
  }

  onOutput(ev) {
    this.hashes.push(ev);
  }

  clear() {
    this.hashes = [];
  }

  caesarCipher(s: string) {
    const shiftVal = 3;
    s = s.toLowerCase();
    let arr = s.split('').map(char => {
      let alphIndex = Alphabet.alphabet.indexOf(char);
      if (alphIndex < 0) {
        return char;
      }
      let shift = (alphIndex + shiftVal) -1 > 26 ? alphIndex + shiftVal - 26 : alphIndex + shiftVal;
      return Alphabet.alphabet[shift];
    })
    
    return arr.reduce((sum, val) => {
      return sum + val;
    });
  }

}


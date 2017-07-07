import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs';
import { Alphabet } from '../app.component';

@Component({
    moduleId: module.id,
    selector: 'app-simplessl',
    templateUrl: './simple-ssl.component.html' 
})
export class SimpleSSLComponent implements OnDestroy {
    @ViewChild('secretKey') secretKey: ElementRef;
    @ViewChild('publicKey') publicKey: ElementRef;

    private pKey: string;
    private sKey: string;

    timer: Rx.Subscription;

    constructor() {
        this.timer = Rx.Observable.timer(1000, 1000).timeInterval().subscribe(() => {
            if (this.secretKey && this.publicKey) this.onChange();
        });
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    onChange() {
        this.sKey = this.secretKey.nativeElement.value;
        this.pKey = this.publicKey.nativeElement.value;
    }

    encrypt(s: string) {
        var key = this.pKey.toLowerCase() || "abc";
        let alph = Alphabet.alphabet;
        let offset = 0;
        for (var i = 0; i < key.length; i++) {
            let index = alph.indexOf(key[i]);
            if (index > -1) offset += index + 1;
        }
        console.log("offset: " + offset);
        let hash = "";
        for (var i = 0; i < s.length; i++) {
            let index = alph.indexOf(s[i]);
            if (index < 0) {
                hash += s[i];
                continue;
            }
            index += offset;
            if (index / 26 >= 1) {
                index = index % 26;
            }
            console.log(index);
            console.log(`${s[i]} = ${alph[index] || "NaC"}`);
            hash += alph[index];
        }
        return hash;
    }
}
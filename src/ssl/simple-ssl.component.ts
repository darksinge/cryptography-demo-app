import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs';
// import { Alphabet } from '../app.component';
import { DiffieHellman } from './diffieHellman';

// const specialCharRegex = /[!@#$%^&*]/;

@Component({
    moduleId: module.id,
    selector: 'app-simplessl',
    templateUrl: './simple-ssl.component.html' 
})
export class SimpleSSLComponent implements OnDestroy {
    @ViewChild('secretKey1') secretKeyRef1: ElementRef;
    @ViewChild('publicKey1') publicKeyRef1: ElementRef;
    @ViewChild('secretKey2') secretKeyRef2: ElementRef;
    @ViewChild('publicKey2') publicKeyRef2: ElementRef;

    private publicKey1: string = '';
    private secretKey1: string = '';
    private publicKey2: string = '';
    private secretKey2: string = '';

    timer: Rx.Subscription;

    private dh = new DiffieHellman(3, 13);

    constructor() {
        this.timer = Rx.Observable.timer(1000, 1000).timeInterval().subscribe(() => {
            if (this.secretKeyRef1 && this.publicKeyRef1 && this.secretKeyRef2 && this.publicKeyRef2) this.onChange();
        });
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    onChange() {
        this.secretKey1 = this.secretKeyRef1.nativeElement.value || '';
        this.secretKey2 = this.secretKeyRef2.nativeElement.value || '';
    }

    generatePubKey1() {
        //alice get secret
        const secret1 = this.secretKey1;
        // alice creates public key
        this.publicKey1 = this.dh.genPublicKey(secret1);
        // alice sends public key to bob
        this.publicKeyRef1.nativeElement.value = this.publicKey1;
    }

    generatePubKey2() {
        // bob recives alice's public key
        // *stored in this.publicKey1*
        // bob creates secret
        const secret2 = this.secretKey2;
        // bob creates public key
        this.publicKey2 = this.dh.genPublicKey(secret2);
        // bob sends public key to alice
        this.publicKeyRef2.nativeElement.value = this.publicKey2;
    }

    sharedSecret1: number;
    sharedSecret2: number;
    getSharedSecret() {
        console.log(this.dh.str2FlatNum(this.secretKey1));
        console.log(this.publicKey2);
        console.log(this.dh.str2FlatNum(this.secretKey2));
        console.log(this.publicKey1);
        // alice takes bobs public result and and raises it to her private key % prime
        this.sharedSecret1 = this.dh.fastModularExponentiation(this.dh.str2FlatNum(this.secretKey1), +this.publicKey2, 13);
        // bob takes alices public results and raises it to his private key % prime
        this.sharedSecret2 = this.dh.fastModularExponentiation(this.dh.str2FlatNum(this.secretKey2), +this.publicKey1, 13);
    }

    encrypt(s: string = "") {
        // return 'foobar';
    }

    
}
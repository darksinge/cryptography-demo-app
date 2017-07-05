import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { hashSync, compareSync } from 'bcrypt';


@Component({
    moduleId: module.id.split('\\').join('/'),
    selector: 'app-bcrypt',
    templateUrl: './bcrypt.component.html'
})
export class BcryptComponent implements OnInit {
    @ViewChild('selector') selector: ElementRef;
    @Output('saltRounds') saltRoundsEventEmitter = new EventEmitter<any>();
    @Output('output') onHashComplete = new EventEmitter<any>();

    public saltRounds: number = 1;

    ngOnInit() {
        console.log('component initialized');
    }

    onChangeSaltRounds() {
        // this.saltRoundsEventEmitter.emit(this.selector.nativeElement.value || 1);
        this.saltRounds = this.selector.nativeElement.value || 1;
    }

    encrypt(s: string) {
        const start = Date.now();
        let hash = hashSync(s, this.saltRounds);
        const end = Date.now();
        console.log(`Time: ${(end - start)/1000} seconds`);
        this.onHashComplete.emit(hash);
    }

    compareMessage(h: string, s: string) {
        return compareSync(h, s);
    }
}
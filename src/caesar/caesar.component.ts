import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id.split('\\').join('/'),
    selector: 'app-caesar',
    templateUrl: './caesar.component.html',
    styleUrls: ['../css/bootstrap.css']
})
export class CaesarComponent implements OnInit {
    
    ngOnInit() {
        
    }

}
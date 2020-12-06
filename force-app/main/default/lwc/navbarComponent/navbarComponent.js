import { LightningElement, track, wire } from 'lwc';
import getCurrentAppName from '@salesforce/apex/ResortAppClass.getCurrentAppName';
import User_Id from '@salesforce/user/Id';
export default class NavbarComponent extends LightningElement {
    @track data = 'Brand Name';
    @track timestamp = new Date();

    // @api
    // refresh() {
    //     this.timestamp = new Date();
    // }

    @wire(getCurrentAppName,{userId:User_Id}) appName({error,data}){
        if(data){
            this.data = data;
            this.error = undefined;
        }
        else if(error) {
            this.error = error;
            this.data = undefined;
        }
    }

    constructor() {
        super(); // Must be called first
        // this.startClock();
    }

    startClock(){ 
        setInterval(() => {
            this.timestamp = new Date();
        }, 1000);
    }
}
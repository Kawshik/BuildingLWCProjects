import { LightningElement, track, wire } from 'lwc';
import getCurrentAppName from '@salesforce/apex/ResortAppClass.getCurrentAppName';
import User_Id from '@salesforce/user/Id';
export default class NavbarComponent extends LightningElement {
    @track data = 'Brand Name';
    @track timestamp = new Date();
    @track date = this.timestamp.toLocaleDateString();
    @track time = this.timestamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    @track error;

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
            this.date = this.timestamp.toLocaleDateString();
            this.time = this.timestamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }, 5000);
    }
}
import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    @track expression = '0';

    getName(event){
        // console.log(event.target.innerHTML);
        var buttonName = event.target.innerHTML;

        // console.log(exprWindow.value);

        if(buttonName === "AC"){
            this.expression = '';
        }

        else if(buttonName === "C"){
            // if(this.result){
            //     this.result = this.result.substring(0, this.result.length - 1);
            // } else {
                this.expression = this.expression.substring(0, this.expression.length - 1);
        }

        else if(buttonName === "="){
            // console.log(this.expression);
            //event.target.label = this.expression;
            // console.log(this.evaluate(this.expression.trim()));
            this.expression = this.evaluate(this.expression.trim());
        } 
        
        else {
            if(this.expression == '0')
                this.expression = buttonName;
            else
                this.expression += buttonName;
        }
    }

    isOperator(character){
        if(character==='+' || character==='-' || character==='x' || character==='/') return true;
        else return false;
    }

    evaluate(exp){        
        if (exp.length === 0) return 0;

        // Remove last character if is an operator
        var expLastChar = exp.substring(exp.length - 1, exp.length);
        while(this.isOperator(expLastChar)){
            exp = exp.substring(0, exp.length - 1);
            expLastChar = exp.substring(exp.length - 1, exp.length);
        }
        
        //Make expression to 0 if multiple operator are in sequence
        for(var i = 0;i<exp.length;i++){
            if(this.isOperator(exp.charAt(i)) && this.isOperator(exp.charAt(i+1))){
                return 0;
            }
        }

        // Sanity Check for the Expression
        var regex = new RegExp(/^[0-9+*%./-]*$/);
        var result = regex.test(exp);

        if(result){
            // return eval(exp)+""; //Do not use eval. It is malicious
        } else {
            return 0;
        }
        
        // return (res)?res:0;
    }
}
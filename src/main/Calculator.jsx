import React, { useState } from 'react';

// Style
import './Calculator.css';

// Components
import Display from '../components/Display';
import Button from '../components/Button';

export default () => {

    // Set States
    const [display, setDisplay] = useState('0');
    const [clear, setClear] = useState(false);
    const [operation, setOperation] = useState(null);
    const [values, setValues] = useState([0, 0]);
    const [current, setCurrent] = useState(0);

    // limpar o Display
    const clearDisplay = () => {
        setDisplay('0');
        setClear(false);
        setOperation(null);
        setValues([0, 0]);
        setCurrent(0);
    };

    // setar a operation
    const Operation = operationValue => {
        if(current === 0) {
            setOperation(operationValue);
            setCurrent(1);
            setClear(true);
        } else {
            const equals = operationValue === '='
            const currentOperation = operation

            const DisplayValues = [...values]

            try {
                DisplayValues[0] = eval(`${DisplayValues[0]} ${currentOperation} ${DisplayValues[1]}`)
            } catch(err) {
                DisplayValues[0] = values[0]
            }
            
            DisplayValues[1] = 0
            
            setDisplay(DisplayValues[0].toString())
            setOperation(equals ? null : operationValue)
            setCurrent(equals ? 0 : 1)
            setClear(!equals)
            setValues(DisplayValues)
        };
    };

    // adicionar um digito
    const Digit = n => {

        // para nao incluir mais de um '.'
        if(n === '.' && display.includes('.')) {
            return
        };

        // regras para limpar o display
        const clearDisplay = display === '0' 
            || clear;

        // pegar o valor corrente
        const currentValue = clearDisplay ? '' : display;

        // pegar o valor do display
        const displayValue = currentValue + n;

        // setar os States
        setDisplay(displayValue);
        setClear(false);

        if(n !== '.') {
            const i = current;
            const newValue = parseFloat(displayValue);
            const valuesDisplay =  [...values];
            valuesDisplay[i] = newValue;
            setValues(valuesDisplay);

            console.log(values); /* !!!!!! DEBUG !!!!! */
        };

        
        

    };

    const addDigit = n => Digit(n);
    const addOperation = op => Operation(op);

    return (
        <div className="calculator">
            <Display value={display} />
            <Button label="AC" click={() => clearDisplay()} triple/>
            <Button label="/" click={addOperation} operation/>
            <Button label="7" click={addDigit} />
            <Button label="8" click={addDigit}/>
            <Button label="9" click={addDigit}/>
            <Button label="*" click={addOperation} operation/>
            <Button label="4" click={addDigit}/>
            <Button label="5" click={addDigit}/>
            <Button label="6" click={addDigit}/>
            <Button label="-" click={addOperation} operation/>
            <Button label="1" click={addDigit}/>
            <Button label="2" click={addDigit}/>
            <Button label="3" click={addDigit}/>
            <Button label="+" click={addOperation} operation/>
            <Button label="0" click={addDigit} double/>
            <Button label="." click={addDigit}/>
            <Button label="=" click={addOperation} operation/>

        </div>
    );
};
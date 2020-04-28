const numberBtn = document.querySelectorAll('[data-number]');
const opBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOpText = document.querySelector('[data-previous-operand]');
const currentOpText = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOpText, currentOpText){
        this.previousOpText = previousOpText
        this.currentOpText = currentOpText
        this.clear()
    }

    clear() {
        this.previousOp = ''
        this.currentOp = ''
        this.operation = undefined

    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0,-1);

    }

    appendNum(number) {
        if(number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString()

    }

    chooseOperation(operation) {
        if(this.currentOp === '') return
        if(this.previousOp !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''
    }

    compute() {
        let comp  
        const prev = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                comp = prev + current
                break
            case '-':
                comp = prev - current
                break
            case '*':
                comp = prev * current
                break
            case '/':
                comp = prev / current
                break
            default:
                return            

        }
        this.currentOp = comp
        this.operation = undefined
        this.previousOp = ''

    }

    

    updateDisplay() {
        this.currentOpText.innerText = this.currentOp
        if(this.operation != null) {
        this.previousOpText.innerText = `${this.previousOp} ${this.operation}`}
        else {
            this.previousOpText.innerText = ''
        }


    }


}

const calculator = new Calculator(previousOpText, currentOpText)

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

opBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

class Calculator{
	constructor(previousOperandTextElement, CurrentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement
		this.PreviousOperandTextElement = currentOperandTextElement
		this.clear()
	}
	clear(){
		this.previousOperand = ''
		this.currentOperand = ''
		this.operation = undefined
	}
	delete(){
		this.currentOperand = this.currentOperand.toString().slice(0,-1)
	}
	appendNumber(number){
		if(number =='.' && this.currentOperand.incluides('.')) return
			this.currentOperand = this.currentOperand.toString() + number.toString()
	}
	chooseOperation(operation){
		if(this.currentOperand == '') return;
		if(this.previousOperand !== ''){
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}
	compute(){
    let computation;
	const prev = parseFloat(this.previousOperand)
	const curr = parseFloat(this.currentOperand)
	if(isNaN(prev) || isNaN(curr)) return;
	
	switch(this.operation){
		case '+':
		computation = prev + curr
		break
        case '-':
		computation = prev - curr
		break
		case '*':
		computation = prev * curr
		break
		case '/': 
		computation = prev / curr 
		break
		default: 
		return
	}
	this.currentOperand = computation
	this.previousOperand = ''
	this.operation = undefined
	}
	getDisplayNum(number){
		const stringNumber = number.toString()
		const integerNumber = parseFloat(stringNumber.split('.')[0])
		const decimalNumber = stringNumber.split('.')[1]
		let integerDisplay 
		if(isNaN(integerNumber)){
			integerDisplay = ''
	} 
	else{
		integerDisplay = integerNumber.toLocalString('en', {maximumFractionDigits: 0 })
	}
	if(decimalNumber != null){
	return `${integerDisplay}.${decimalNumber}`
	}
	else{
		return integerDisplay
	}
}
UpdateDisplay(){
	this.currentOperandTextElement.innerText = this.getDisplayNum(this.currentOperand)
	if(this.operation !=null){
		this.previousOperandTextElement.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
	}
	else{
		this.previousOperandTextElement.innerText = ''
	}
}
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelectorAll('[data-equals]')
const allClearButtons = document.querySelectorAll('[data-all-clear]')
const deleteButtons = document.querySelectorAll('[data-delete]')
const previousOperandTextElement = document.querySelectorAll('[data-prev-op]')
const currentOperandTextElement = document.querySelectorAll('[data-curr-op]')

const calculator = new calculator(previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.UpdateDisplay()
	})
	})
operationButtons.forEach(operation => {
	operation.addEventListener('click', () => {
		calculator.chooseOperation(operation.innerText)
		calculator.UpdateDisplay()
	})
})
equalsButton.addEventListener('click', button => {
	calculator.compute()
	calculator.UpdateDisplay()
})
allClearButtons.addEventListener('click', button => {
	calculator.clear()
	calculator.UpdateDisplay()
})
deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.UpdateDisplay()
})
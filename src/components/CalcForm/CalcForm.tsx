import { useRef, useState } from "react";
import calculatePayPalFees from "../../utils/calculatePayPalFees";
import calculateWithdrawalFees from "../../utils/calculateWithdrawalFees";
import formatCurrency from "../../utils/formatCurrency";
function CalcForm() {
  const [amount, setAmount] = useState(0)
  const [percentage, setPercentage] = useState(4.4)
  const [fixed, setFixed] = useState(0.3)
  const [paypalFees, setpaypalFees] = useState(0)
  const [withdrawalFees, setwithdrawalFees] = useState(0)
  const [received, setReceived] = useState(0)
  const [ask, setAsk] = useState(0)
  const checkbox = useRef<HTMLInputElement>(null)

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement
    setAmount(Number(element.value))
  }
  const handlePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement
    setPercentage(Number(element.value))
  }
  const handleFixed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement
    setFixed(Number(element.value))
  }


  const calculateFees = () => {
    if(amount <1) return
    const fees = calculatePayPalFees(amount, percentage, fixed)
    const equityFees = calculateWithdrawalFees(amount)

    setpaypalFees(fees)
    setwithdrawalFees(equityFees)
    
    let toReceive = amount - fees
    let toAskFor = amount + fees

    if (checkbox.current?.checked) {
      toReceive = amount - (fees+equityFees)
      toAskFor = amount + fees + equityFees
    } 

    setReceived(toReceive)
    setAsk(toAskFor)
  }
   
  const handleSubmit = () => {
    calculateFees()
  }
  
  return (
    

<div className="mt-6 mx-auto  max-w-xs md:max-w-screen-md bg-zinc-200  dark:bg-gray-900 rounded p-6">
  <h1 className="text-sm  mb-6">If you are sent:</h1>
  <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="floating_company" 
        id="floating_company" 
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        required 
        value={amount} 
        onChange={handleAmount}/>
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
    </div>
  
  <h1 className="text-sm mb-6">PayPal Fees:</h1>

  <div className="grid grid-cols-3 md:gap-1">
    <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={percentage} onChange={handlePercentage}/>
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Percentage</label>
    </div>
    <div className="relative z-0 w-full mb-8 text-center text-2xl group">+</div>
    <div className="relative z-0 w-full mb-8 group">
        <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={fixed} onChange={handleFixed}/>
        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fixed fee</label>
    </div>
  </div>
  <div>
    <label className="relative inline-flex items-center cursor-pointer mb-8">
        <input type="checkbox" ref={checkbox} className="sr-only peer" />
        <div className="w-11 h-6 md:w-9 md:h-5 bg-zinc-300  border-2 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm xs:text-xs font-medium text-gray-900 dark:text-gray-300">Include Equity bank withdrawal fees</span>
    </label>
  </div>
  <button type="submit" 
  className="mb-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  onClick={handleSubmit}>Calculate fees</button>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className=" w-full mb-6 ">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">PayPal Fees:</div>
      <div className=" text-md text-gray-900 dark:text-gray-100 ">{formatCurrency(paypalFees)}</div>
    </div>
   <div className=" w-full mb-6 ">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">Withdrawal Fees:</div>
      <div className=" text-md text-gray-900 dark:text-gray-100 ">{formatCurrency(withdrawalFees)}</div>
    </div>
  <div className=" w-full mb-6 ">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">You will receive:</div>
        <div className=" text-md text-gray-900 dark:text-gray-100 ">{formatCurrency(received)}</div>
    </div>
    <div className=" w-full mb-6 ">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">You should ask for:</div>
      <div className=" text-md text-gray-900 dark:text-gray-100 ">{formatCurrency(ask)}</div>
    </div>
  </div>
</div>


  );
}

export default CalcForm;

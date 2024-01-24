import InputBox from './components/InputBox';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { useState } from 'react';

function App() {

  const [amount,setAmount] = useState()
  const [from, setFrom] = useState("inr")  
  const [to, setTo] = useState("usd")
  const [convertedAmount, setConvertedAmount] = useState()
  
  const currencyInfo = useCurrencyInfo(from)//this will return data into string
  const options = Object.keys(currencyInfo)//this we have used to store the keys from data. to access th data.

  const swap = ()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert =()=>{
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e)=>{e.preventDefault(); convert()}}>
            <div className='w-full mb-1'>
              <InputBox label="From" amount={amount} currencyOptions={options} onCurrencyChange={(currency)=>setAmount(amount)} onAmountChange={(amount)=>setAmount(amount)} selectCurrency={from}/>
            </div>
            <div className='relative w-full h-0.5'>
              <button type="button" onClick={swap} className='absolute left-1/2-translate-x-1/2-translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'>
                Swap
              </button>
            </div>
            <div className='w-full mt-5 mb-4'>
              <InputBox label="To" amount={convertedAmount} currencyOptions={options} onCurrencyChange={(currency)=>setTo(currency)} selectCurrency={from} amountDisable/>
            </div>
            <button type="Submit" className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;

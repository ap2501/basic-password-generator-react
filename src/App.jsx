import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(7);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllowed) str+="!@#$%^&*()_+{}[]|;:,.<>?~-=";
    if(numberAllowed) str+="01234567890"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass +=  str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  const passRef = useRef()

  const copyToClipboard = useCallback(()=>{
    passRef.current.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  

  useEffect(()=>{
    passwordGenerator()
  }, [length, charAllowed, numberAllowed])

  return (
    <>
      
        <div className="max-w-screen-md mx-auto rounded-lg px-4 my-8 bg-gray-400 flex flex-col place-content-center">
          <h1 className="text-center text-4xl text-white mt-7 font-bold">Password Generator</h1>
          <div className="flex rounded-lg overflow-hidden py-10">
          <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3 rounded-lg' 
          placeholder='Password' readOnly
          ref={passRef}
          />
          <button onClick={copyToClipboard} className='bg-blue-700 m-2' type="button">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-5">
            <input 
            type="range"
            min={6}
            max={25}
            value={length}
            className='m-2 cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className='font-bold text-black'>Length : {length}</label>
            <input 
            type="checkbox" 
            defaultChecked = {numberAllowed}
            id="numberInput" 
            onChange={()=>{
              setNumberAllowed((prev)=> !prev);
            }}
            
            />
            <label className='font-bold text-black'>Numbers</label>
            <input 
            type="checkbox" 
            defaultChecked = {charAllowed}
            id="charInput" 
            onChange={()=>{
              setCharAllowed((prev)=> !prev);
            }}
            />
            <label className='font-bold text-black'>Characters</label>
            <button className='bg-blue-600 mb-2' type="button" onClick={passwordGenerator}>Generate Another ! 😎</button>
          </div>
          
        </div>

      

      </div>


    </>
  )
}

export default App

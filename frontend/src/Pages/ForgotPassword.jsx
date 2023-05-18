import React, { useEffect, useState } from 'react'

function ForgotPassword() {
  return (
    <div>
        <GetEmailId/>
        <div className='hidden'>
        <EnterOTP/>
        </div>
    </div>
  )
}

function GetEmailId(){

    const [email ,setEmail] = useState('');
    
    async function handleSendEmail(){
        const response = await fetch('/exist_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
      
          const data = await response.json();
          if (data.status) {
            console.log("Account Founded");
            
          } else {
            console.log("Account not found");
          }
    }

    return(
        <div className='h-screen flex justify-center items-center'>
            <div className='flex items-center justify-center rounded-2xl m-3 py-3 w-auto bg-slate-300'>
                <div className='p-10 justify-center'>
                    <p>For forgot Password You can enter your Email
                        </p> <p>or Phone or UserName here.</p>
                    <p>OTP is send to the respective Email ID</p>
                    <div className=' p-3 flex justify-center'>
                        <input className='rounded-xl w-full px-3 py-2 outline-none' type="text" placeholder='username or email or phone' onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='flex justify-center '>
                        <button className='border-2 p-3 rounded-xl bg-green-500' onClick={handleSendEmail}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EnterOTP(){
    return(
        <div>
            Hi
        </div>
    )
}

export default ForgotPassword
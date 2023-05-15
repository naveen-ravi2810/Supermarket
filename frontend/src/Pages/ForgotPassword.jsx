import React, { useEffect, useState } from 'react'

function ForgotPassword() {
  return (
    <div>
        <GetEmailId/>
    </div>
  )
}

function GetEmailId(){

    const [email ,setEmail] = useState('');
    
    // function handleSendEmail(){
    //     useEffect(())
    // }
    function handleSendEmail(){
        console.log("Is this ok");
    }

    return(
        <div className='h-screen flex justify-center items-center'>
            <div className='flex items-center justify-center w-auto bg-slate-300'>
                <div className='w-1/3 justify-center'>
                    <p>For forgot Password You can enter your Email or Phone or UserName here.</p>
                    <p>OTP is send to the respective Email ID</p>
                    <div className='flex justify-center'>
                        <input className='w-1/2 rounded-xl outline-none' type="text" placeholder='username or email or phone' onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='flex justify-center p-3'>
                        <button className='border-2 p-2 rounded-xl bg-green-500' onClick={handleSendEmail}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword
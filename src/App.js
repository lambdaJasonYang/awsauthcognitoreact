import logo from './logo.svg';
import './App.css';
// import {useMachine , useInterpret, useSelector} from '@xstate/react';
// import {sendParent, send, interpret, assign, spawn,createMachine} from 'xstate';
// import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {useState} from 'react';




function App() {
  const [getuserPoolId,setuserPoolId] = useState("us-east-1_zknguzw3R");
  const [getuserPoolWebClientId,setuserPoolWebClientId] = useState("62js8mr29t9kuf432lih20ffld");
  const [getpoolDataResult,setpoolDataResult] = useState(null)
  var poolData = {
    "userPoolId": getuserPoolId, // Your user pool id here
    "userPoolWebClientId": getuserPoolWebClientId, // Your client id here
  };
  
  const [getusername,setusername] = useState("weqdweqdf")
  const [getpassword,setpassword] = useState("loioihoihiS@#1")
  const [getemail,setemail] = useState("yifamot793@onlcool.com")
  
  
  var signUpPayload = {
    "username" : getusername,
    "password" : getpassword,
    "attributes" : {
      'email': getemail
    }
  }



const [getsignInResult,setsignInResult] = useState(null)

const signInAWS = async () => {
  try{
    const outcome = await Auth.signIn(getusername,getpassword)
    setsignInResult(outcome)
  }catch(e){
    setsignInResult(e)
  }
  
}

const [getsignUpResult,setsignUpResult] = useState(null)

const signUpAWS = async () => {
  try{
    const outcome = await Auth.signUp(signUpPayload)
    setsignUpResult(outcome)
  }catch(e){
    setsignUpResult(e)
  }
}

const [getverifyCode,setverifyCode] = useState("870719")

const signUpConfirmAWS = async () => {
  const outcome = await Auth.confirmSignUp(getusername,getverifyCode)
  console.log(outcome)
}


const [getcurrentUserInfo,setcurrentUserInfo] = useState()

  return (
    <div className="App">
      <h1>Simplest Auth signup, verify email, signin, signout Flow. </h1>
      <button onClick={()=>{setpoolDataResult(Auth.configure(poolData))}}>Setup userPoolId and userPoolClientId</button>
      <div>Setup Pooldata Results: {JSON.stringify(getpoolDataResult)}</div>
      <div>
      <textarea name="setPoolid" onChange={(e) => {setuserPoolId(e.target.value)}} value={getuserPoolId}/>
      <textarea name="setPoolClient" onChange={(e) => {setuserPoolWebClientId(e.target.value)}} value={getuserPoolWebClientId}/>
      </div>
      
      <div>
        <div>
          <input type="text" onChange={(e) => {setusername(e.target.value)}} value={getusername}/>
          <input type="text" onChange={(e) => {setpassword(e.target.value)}} value={getpassword}/>
          <input type="text" onChange={(e) => {setemail(e.target.value)}} value={getemail}/>
        </div>
        <button onClick={() => {signUpAWS()}} > hi sign up</button>
        <button onClick={() => {signUpConfirmAWS()}}> verify email </button>
        <button onClick={() => {signInAWS()}}>sign in </button>
        <button onClick={() => {Auth.currentUserInfo().then((v)=>setcurrentUserInfo(v))}}>Auth.currentUserInfo()</button>      
        <button onClick={() => {Auth.signOut()}}>Auth.signout</button>
      </div>
      <div>
      <input type="text" onChange={(e) => {setverifyCode(e.target.value)}} value={getverifyCode}/>
      </div>
      <fieldset>
        Sign In Results: 
        <textarea value={JSON.stringify(getsignInResult,null,"\t")}/>
      </fieldset>
      <fieldset>
        Sign Up Results:
        <textarea value={JSON.stringify(getsignUpResult,null,"\t")}/>
      </fieldset>
      <fieldset>
        Auth.currentUserInfo(): 
        <textarea value={JSON.stringify(getcurrentUserInfo,null,"\t")}/>
      </fieldset>
    </div>
  );
}

export default App;

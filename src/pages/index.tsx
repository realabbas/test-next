import { useEffect, useState } from "react";
import {ClientVerificationUI} from 'client-verification-trential-next-sdk'
import "@aws-amplify/ui-react/styles.css";
import axios from 'axios'

function Home() {

  const [token, setToken] = useState()

  // generate session token
  const generateSessionToken = async () => {
    const response = await axios({
      url: "https://api.trential.dev/verification/api/1.0/transactions/start-group-verification",
      method: "POST",
      headers: {
        "x-api-key": "8d388308-4023-4f83-94a3-9351c72a6690"
      },
      data: {
        "verificationNameList": ["aadhaar", "dl", "passport", "liveness", "japanese-resident-card"]
      }
    })
    if (response?.data?.data) {
      setToken(response?.data?.data?.token)
    }
  }

  const invokeSDK = () => {
   if(!token){
      generateSessionToken()
   }
  }

  useEffect(()=>{
      invokeSDK()
  }, [])

  return (
    <ClientVerificationUI
      onError = {() => {}}
      onSuccess = {() => {}}
      verifications = {['japanese-resident-card', 'drivingLicense']}
      token = {token}
      disclaimer='I provide my consent to share my details with Hudini'
      environment={"development"}
    />
  );
}

export default Home
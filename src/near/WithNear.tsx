import * as React from 'react';
import { useEffect, useState } from "react"
import { initContract } from "./utils"

// Dynamic Wrapper component which adds NEAR sdk to window
const WithNear = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      initContract().then(() => {
        setLoading(false);
        setSdkLoaded(true);
      })
    }
  })

  if (loading) {
    return <div>Loading NEAR SDK...</div>
  }

  return (
    (sdkLoaded) ? <> {children} </> : <div>NEAR SDK not loaded!</div>
  )
}

export default WithNear;
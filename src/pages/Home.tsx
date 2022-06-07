import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Button from '../components/Button'
import Card, { CardFooter, CardPadding } from '../components/Card'
import deviceStore from '../stores/deviceStore'
import walletStore from '../stores/walletStore'

function LinkButton() {
  const keys = deviceStore((s) => s.keys)
  const device = deviceStore((s) => s.device)
  const linkHalo = deviceStore((s) => s.linkHalo)
  const connected = walletStore((s) => s.address).length > 0
  const registered = deviceStore((s) => s.registered)

  if (!keys) {
    return (
      <Button fullWidth onClick={linkHalo}>
        Initiate Scan
      </Button>
    )
  } else if (device && registered) {
    return <Navigate to="/success" />

    return (
      <Button to={'/success'} fullWidth>
        View Halo
      </Button>
    )
  } else if (device && !connected && !registered) {
    return (
      <Button fullWidth disabled>
        Connect MEGO
      </Button>
    )
  } else if (device && keys && !registered) {
    return (
      <Button to={'/register'} fullWidth>
        Connect MEGO
      </Button>
    )
  } else {
    return (
      <Button fullWidth disabled>
        Connect MEGO
      </Button>
    )
  }
}

export default function Home() {
  const init = deviceStore((s) => s.init)
  const keys = deviceStore((s) => s.keys)
  const addy = deviceStore((s) => s.addy)
  const loading = deviceStore((s) => s.loading)
  const connected = walletStore((s) => s.address).length > 0
  const registered = deviceStore((s) => s.registered)

  useEffect(() => {
    init()
  }, [])

  return (
    <Card loading={loading}>
      <CardPadding>
        {keys ? (
          <>
            <h1 className="text-3xl mt-6 font-expanded uppercase">
              CHIP
              <br />
              Detected
            </h1>
            <p className="text-dark-gray text-sm mt-4 mb-4">
              This chip hasn’t been registered. Tap link below to connect a MEGO token.
            </p>
            <h3 className="font-normal mt-4 mb-1 text-light-gray text-xs">Device ID</h3>
            <p className="break-word font-bold text-smb">{keys?.primaryPublicKeyHash}</p>
            <h3 className="font-normal mt-4 mb-1 text-light-gray text-xs">Device Address</h3>
            <p className="break-word font-bold text-smb">{addy}</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl mt-6 font-expanded uppercase">
              No CHIP
              <br />
              Detected
            </h1>
            <p className="text-dark-gray text-sm mt-4 mb-4">Scan an HaLo chip (by KONG) by tapping the button below and holding the chip to your smartphone NFT antenna.</p>
          </>
        )}
      </CardPadding>
      <CardFooter>
        <CardPadding>
          {LinkButton()}
          {!connected && !registered && (
            <p className="text-center text-xs text-light-gray uppercase mt-4">Connect wallet to continue</p>
          )}
        </CardPadding>
      </CardFooter>
    </Card>
  )
}

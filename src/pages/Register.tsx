import classNames from 'classnames'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import Button from '../components/Button'
import Card, { CardBack, CardFooter, CardPadding } from '../components/Card'
import Field from '../components/Field'
import GrayCenterBox from '../components/GrayCenterBox'
import deviceStore from '../stores/deviceStore'
import registerStore from '../stores/registerStore'
import { ReactComponent as Image } from '../svg/image.svg'
import { ReactComponent as X } from '../svg/x.svg'

export default function Register() {
  const rs = registerStore()
  const ds = deviceStore()

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    file.size < 5000001 ? rs.changeFileField(file) : alert('Media must be 5mb in size or less')
  }

  if (!ds.device) return <Navigate to="/" />
  if (rs.sigSplit && rs.block) return <Navigate to="/confirm" />

  return (
    <Card loading={rs.loading}>
      <CardPadding>
        <CardBack to="/">Connect CHIP</CardBack>
        <div className="relative mb-6">
            // TODO: See tokens owned by address an link one of them to chip
        </div>
      </CardPadding>
      <CardFooter>
        <CardPadding>
          {/* <Link to="/confirm">testing</Link> */}

          {rs.registerForm.image ? (
            <Button fullWidth onClick={rs.scanHalo}>
              Tap chip to connect MEGO
            </Button>
          ) : (
            <Button fullWidth disabled>
              Please select MEGO token
            </Button>
          )}
        </CardPadding>
      </CardFooter>
    </Card>
  )
}

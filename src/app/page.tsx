'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, TextField } from '@mui/material'
import Main from './components/main'

export default function Home() {
  const reg = new RegExp("^[0-9]+$")
  const router = useRouter()

  const [id, setId] = useState("")
  const [valid, setValid] = useState(true)

  const handleValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setId(e.target.value)
    setValid(reg.test(e.target.value))
  };

  const onClick = () => {
    setValid(reg.test(id) && id.length > 0)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push('/tracker?' + id)
  }

  return (
    <Main>
      <div className="bg-white flex flex-col h-4/6 ml-40 rounded-2xl p-12 pt-8 div--info">
        <span className="font-sans inline-block mb-2 text-2xl">Olá!</span>
        <span className="font-sans leading-6 text-2xl">Acompanhe com a Loggi a entrega do seu pedido. 😃</span>
        <span className="font-sans inline-block mt-4 text-base span--gray">Primeiro, digite o código de rastreamento.</span>
        <span className="font-sans inline-block mt-6 text-base span--gray">Código de rastreamento.</span>

        <form onSubmit={ onSubmit }>
          <TextField
            className={"mt-1 w-full" + (!valid ? ' error' : '')}
            error={ !valid }
            id="outlined-basic"
            inputProps={{ pattern: "^[0-9]+$" }}
            onChange={ (e) => handleValidation(e) }
            required={ true }
            value={ id }
            variant="outlined" />

          <div className="flex justify-center mt-10">
            <Button className="button--big button--loggi font-sans" onClick={ onClick } type="submit" variant="contained">
              Acompanhar pedido
            </Button>
          </div>
        </form>
      </div>
    </Main>
  )
}

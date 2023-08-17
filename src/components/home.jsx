import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import BarLoader from 'react-spinners/BarLoader'

import { useGodSheets } from './godsheets-context'

export default function Home() {
  const { godSheets } = useGodSheets()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [godSheets])

  const content = () => {
    if (loading) {
      return <div className='loader'><BarLoader color='#2d3f47' loading={true} size={100} /></div>
    }
    if (Object.keys(godSheets).length === 0) return <FirstYear setLoading={setLoading} />
    return <MainMenu setLoading={setLoading} />
  }

  return <div className='home'>
    <div className='title'>pillowfort</div>
    <img src='./logo-big.png' alt='' />
    <div className='content'>
      {content()}
    </div>
  </div>
}

function MainMenu() {
  return <>
    <Link to='/add' className='primary button'>add expense/income</Link>
    <Link to='/stats' className='button'>dashboard</Link>
  </>
}

function FirstYear({ setLoading }) {
  const [URL, setURL] = useState('')
  const { addYear } = useGodSheets()
  
  const login = async () => {
    setLoading(true)
    await addYear(String(URL))
  }

  return <>
    <div className='text'>You don't seem to have any connections to yearly godsheets.</div>
    <div className='text'>Add your first!</div>
    <div className='add-year'>
      <input type='text' name='url' value={URL} onChange={e => setURL(e.target.value)} />
      <div className='done icon' onClick={login}><FaCheck /></div>
    </div>
  </>
}

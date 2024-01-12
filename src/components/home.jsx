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
    if (Object.keys(godSheets).length === 0)
      return <AddYear setLoading={setLoading} text={<>
        <div className='text'>You don't seem to have any connections to yearly godsheets.</div>
        <div className='text'>Add your first!</div>
      </>} />
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

function MainMenu({ setLoading }) {
  const [showAddYear, setShowAddYear] = useState(false)
  
  return <div style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Link to='/add' className='primary button'>add entry</Link>
      <Link to='/status' className='button'>status</Link>
      <Link to='/stats' className='button'>dashboard</Link>
    </div>
    {showAddYear ?
      <AddYear setLoading={setLoading} text={<div className='text'>Add a new year</div>} callback={() => setShowAddYear(false)} />
    :
      <a href='/#' className='link' onClick={() => setShowAddYear(true)}>add year</a>
    }
  </div>
}

function AddYear({ setLoading, text, callback }) {
  const [URL, setURL] = useState('')
  const { addYear } = useGodSheets()
  
  const login = async () => {
    setLoading(true)
    await addYear(String(URL))
    callback()
  }

  return <>
    {text}
    <div className='add-year'>
      <input type='text' name='url' value={URL} onChange={e => setURL(e.target.value)} />
      <div className='done icon' onClick={login}><FaCheck /></div>
    </div>
  </>
}

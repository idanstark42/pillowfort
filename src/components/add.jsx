import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BarLoader from 'react-spinners/BarLoader'
import { toast } from 'react-toastify'
import { FaArrowLeft } from 'react-icons/fa'

import { useGodSheets } from './godsheets-context'

import BOOKS_IMAGE from '../images/books.png'
import CHARITY_IMAGE from '../images/charity.png'
import DINING_IMAGE from '../images/dining.png'
import ENTRETAINMENT_IMAGE from '../images/entretainment.png'
import GROCERIES_IMAGE from '../images/groceries.png'
import LIVING_IMAGE from '../images/living.png'
import SOCIAL_IMAGE from '../images/social.png'
import TRANSPOTATION_IMAGE from '../images/transportation.png'
import PROJECTS_IMAGE from '../images/projects.png'

const IMAGES = {
  books: <img src={BOOKS_IMAGE} alt='books' />,
  charity: <img src={CHARITY_IMAGE} alt='charity' />,
  dining: <img src={DINING_IMAGE} alt='dining' />,
  entretainment: <img src={ENTRETAINMENT_IMAGE} alt='entretainment' />,
  groceries: <img src={GROCERIES_IMAGE} alt='groceries' />,
  living: <img src={LIVING_IMAGE} alt='living' />,
  social: <img src={SOCIAL_IMAGE} alt='social' />,
  transportation: <img src={TRANSPOTATION_IMAGE} alt='transportation' />,
  projects: <img src={PROJECTS_IMAGE} alt='projects' />,
  default: <div className='icon'>?</div>
}

export default function Add () {
  const { godSheets } = useGodSheets()
  const [type, setType] = useState('expense')

  if (Object.keys(godSheets).length === 0) return <div className='add'>
  </div>

  return <div className='add'>
    <div className='title'>add</div>
    <div className='icon' style={{ position: 'absolute', left: '1rem' }}><Link to='/'><FaArrowLeft style={{ color: 'var(--main)' }} /></Link></div>
    <div className='buttons'>
      {['expense', 'income'].map(currentType =>
        <div className={`inline button ${type === currentType ? 'primary' : ''}`} onClick={() => setType(currentType)}>{currentType}</div>)}
    </div>
    <div style={{ flex: 1, display: 'flex' }}>
    {type === 'expense' ? <AddExpense year={2023} /> : <AddIncome year={2023} />}
    </div>
  </div>
}

function AddIncome ({ year }) {
  const navigate = useNavigate()
  const { addIncome } = useGodSheets()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [profile, setProfile] = useState('')
  const [details, setDetails] = useState('')
  
  const add = async () => {
    setLoading(true)
    await addIncome(year, { date, title, amount, profile, details })
    setLoading(false)
    toast.success('income added')
    navigate('/')
  }

  if (loading) return <div className='loader'><BarLoader color='#2d3f47' loading={true} size={100} /></div>

  return <div className='add-income form'>
    <div className='text'>date</div>
    <input type='date' name='date' value={date} onChange={e => setDate(e.target.value)} />
    <div className='text'>title</div>
    <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
    <div className='text'>amount</div>
    <input type='number' name='amount' value={amount} onChange={e => setAmount(e.target.value)} />
    <div className='text'>profile</div>
    <select name='type' onChange={e => setProfile(e.target.value)}>
      <option value=''>select type</option>
      {['freelance', 'employee'].map(option => <option value={option}>{option}</option>)}
    </select>
    <div className='text'>details</div>
    <textarea name='details' value={details} onChange={e => setDetails(e.target.value)} />
    <div className='done primary button' onClick={add}>add</div>
  </div>
}

function AddExpense({ year }) {
  const navigate = useNavigate()
  const { addExpense, expenseTypes } = useGodSheets()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('')
  const [details, setDetails] = useState('')
  
  const add = async () => {
    setLoading(true)
    await addExpense(year, { date, title, amount, type, details })
    setLoading(false)
    toast.success('expense added')
    navigate('/')
  }

  if (loading) return <div className='loader'><BarLoader color='#2d3f47' loading={true} size={100} /></div>

  return <div className='add-expense form'>
    <div className='text'>date</div>
    <input type='date' name='date' value={date} onChange={e => setDate(e.target.value)} />
    <div className='text'>title</div>
    <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
    <div className='text'>amount</div>
    <input type='number' name='amount' value={amount} onChange={e => setAmount(e.target.value)} />
    <div className='text'>type</div>
    <div className='types'>
      {expenseTypes(year).map(currentType => <div className={`type-button ${type === currentType ? 'selected' : ''}`} onClick={() => setType(currentType)}>{IMAGES[currentType] || IMAGES.default}</div>)}
    </div>
    <div className='text'>details</div>
    <textarea name='details' value={details} onChange={e => setDetails(e.target.value)} />
    <div className='done primary button' onClick={add}>add</div>
  </div>
}
import React, {useEffect} from 'react'
import ContactForm from '../../Components/ContactForm/ContactForm'

export default function Contact() {
  useEffect(() => {
    document.title = "AFH | Contact"
  }, [])
  return (
    <div>
        <ContactForm />
    </div>
  )
}

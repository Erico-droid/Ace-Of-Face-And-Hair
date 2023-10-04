import React, {useEffect} from 'react'
import ContactForm from '../../Components/ContactForm/ContactForm'
import Seo from '../../Components/Seo/Seo'

export default function Contact() {
  useEffect(() => {
    document.title = "AFH | Contact"
  }, [])
  return (
    <div>
      <Seo title="Get in touch" description="Get in touch with us during our working hours. from 9.00am - 5.00pm" />
        <ContactForm />
    </div>
  )
}

import React from 'react'
import "./ContactForm.css"

export default function ContactForm() {
  return (
        <div className = "container-fluid">
            <div className="wrapper" style={{backgroundImage: "url('images/bg-registration-form-2.jpg')", zIndex: 1000}}>
            <div className = "row">
                <div className = "col-md-8">
                <div className="inner">
                    <form action="">
                        <h3>Registration Form</h3>
                        <div className="form-group">
                        <div className="form-wrapper">
                        <label for="">First Name</label>
                        <input type="text" className="form-control" />
                        </div>
                        <div className="form-wrapper">
                        <label for="">Last Name</label>
                        <input type="text" className="form-control" />
                        </div>
                        </div>
                        <div className="form-wrapper">
                        <label for="">Email</label>
                        <input type="text" className="form-control" />
                        </div>
                        <div className="form-wrapper">
                        <label for="">Password</label>
                        <input type="password" className="form-control" />
                        </div>
                        <div className="form-wrapper">
                        <label for="">Confirm Password</label>
                        <input type="password" className="form-control" />
                        </div>
                        <div className="checkbox">
                        <label>
                        <input type="checkbox" /> I caccept the Terms of Use & Privacy Policy.
                        <span className="checkmark"></span>
                        </label>
                        </div>
                        <button>Register Now</button>
                    </form>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

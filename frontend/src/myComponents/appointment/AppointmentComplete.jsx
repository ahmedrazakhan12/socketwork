import React from 'react'

import './appointment.css'
export default function AppointmentComplete() {
  return ( 
    <>
        <div class="appointment-container">
        <header>
            <h1>Appointment Completed</h1>
        </header>
        <main>
            <section class="appointment-rating-section">
                <h2>Rate Your Experience</h2>
                <div class="appointment-rating-stars">
                     <span class="appointment-star">&#9733;</span>
                    <span class="appointment-star">&#9733;</span>
                    <span class="appointment-star">&#9733;</span>
                    <span class="appointment-star">&#9733;</span>
                    <span class="appointment-star">&#9733;</span>
                </div>
            </section>
            <section class="appointment-feedback-section">
                <h2>Leave Your Feedback</h2>
                <textarea id="feedback" rows="4" placeholder="Write your feedback here..."></textarea>
            </section>
            <button class="appointment-submit-button">Submit</button>
        </main>
        <footer>
            <p>&copy; 2024 Your Website Name. All rights reserved.</p>
        </footer>
    </div>
    </>
  )
}

import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>Let us know how we can get you to spend more money!</p>

            {isSubmitted ? (
                <div className="thank-you-message">
                    <h3>Thank you for reaching out!</h3>
                    <p>We will never get back to you.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Your Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Your Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="message">Your Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            )}
        </div>
    );
}

export default Contact;

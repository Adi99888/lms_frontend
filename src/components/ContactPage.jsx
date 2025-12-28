import React, { useState } from "react";
import { contactStyles } from "../assets/dummyStyles";
import {
  EqualApproximatelyIcon,
  Mail,
  Mailbox,
  MessageCircle,
  MessageCircleDashed,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const isFormValid =
    formData.name &&
    formData.email &&
    validatePhone(formData.phone) &&
    formData.subject &&
    formData.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePhone(formData.phone)) {
      setPhoneError("please enter a valid phone number");
      return;
    }
    setIsSubmitting(true);
    const whatsappMessage =
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Subject: ${formData.subject}%0A` +
      `Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/7018202838?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      setPhoneError(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhoneError(!validatePhone(value));
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={contactStyles.container}>
      <div className={contactStyles.mainContainer}>
        <div className={contactStyles.header}>
          <h1 className={contactStyles.title}>Contact Us</h1>
        </div>

        <div className={contactStyles.mainSection}>
        <div className={contactStyles.formContainer}>
          <div className={contactStyles.formGlow1} />
          <div className={contactStyles.formGlow2} />
          <div className={contactStyles.formGlow3} />

          <div className={contactStyles.form}>
            <form
              onSubmit={handleSubmit}
              className={contactStyles.formElements}
            >
              {/* name email */}

              <div className={contactStyles.formGrid}>
                <div className={contactStyles.formGroup}>
                  <label className={contactStyles.label}>
                    <User
                      className={`${contactStyles.labelIcon} ${contactStyles.colors.purple.icon}`}
                    />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${contactStyles.input} ${contactStyles.colors.purple.focus} ${contactStyles.colors.purple.hover}`}
                    placeholder="Enter your Full name"
                  />
                </div>

                <div className={contactStyles.formGroup}>
                  <label className={contactStyles.label}>
                    <Mail
                      className={`${contactStyles.labelIcon} ${contactStyles.colors.blue.icon}`}
                    />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${contactStyles.input} ${contactStyles.colors.blue.focus} ${contactStyles.colors.blue.hover}`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className={contactStyles.formGrid}>
                {/* Phone */}
                <div className={contactStyles.formGroup}>
                  <label className={contactStyles.label}>
                    <Phone
                      className={`${contactStyles.labelIcon} ${contactStyles.colors.green.icon}`}
                    />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    inputMode="numeric"
                    maxLength={10}
                    className={`${contactStyles.input} ${
                      contactStyles.colors.green.focus
                    } ${contactStyles.colors.green.hover} ${
                      phoneError ? contactStyles.inputError : ""
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {phoneError && (
                    <p className={contactStyles.errorText}>{phoneError}</p>
                  )}
                </div>

                {/* Subject */}
                <div className={contactStyles.formGroup}>
                  <label className={contactStyles.label}>
                    <MessageSquare
                      className={`${contactStyles.labelIcon} ${contactStyles.colors.purple.icon}`}
                    />
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`${contactStyles.select} ${contactStyles.colors.purple.focus}`}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Collaboration">
                      Project Collaboration
                    </option>
                    <option value="Support">Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <div className={contactStyles.formGroup}>
                  <label className={contactStyles.label}>
                    <MessageCircle
                      className={`${contactStyles.labelIcon} ${contactStyles.colors.blue.icon}`}
                    />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`${contactStyles.input} ${contactStyles.colors.blue.focus} ${contactStyles.colors.blue.hover}`}
                    placeholder="Enter your message"
                  />
                  {phoneError && (
                    <p className={contactStyles.errorText}>{phoneError}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`${contactStyles.submitButton} ${
                  isFormValid && !isSubmitting
                } ? ${contactStyles.submitButtonEnabled} : ${
                  contactStyles.submitButtonDisabled
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className={contactStyles.spinner}>Sending...</div>
                  </>
                ) : (
                  <>
                    <Send className={contactStyles.submitIcon} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

         {/* Animation Section */}
        <div className={contactStyles.animationContainer}>
          <div className={contactStyles.animationWrapper}>
            <DotLottieReact
              src="https://lottie.host/9ccf026c-11e9-417a-9a9d-0169bc83e49d/sMK5FavyPC.lottie"
              loop
              autoplay
              style={{
                width: "100%",
                height: "500px",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
              }}
            />
          </div>
        </div>


        </div>

       

         {/* footer info */}

          <div className={contactStyles.footer}>
             <div className={contactStyles.footerBadge}>

              <MessageCircle className={contactStyles.footerIcon}/>
              <span className={contactStyles.footerText}>
                All Messages are Sent to Whats App For immediate Response
              </span>

          </div>

          </div>
      </div>
    </div>
  );
};

export default ContactPage;

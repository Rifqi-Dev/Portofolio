import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const emailConfig = {
  service_id: "service_c6kacwf",
  template_id: "template_6sizxn6",
  public_key: "uOaJuvlu7UWJzNq14",
};

const inputClass =
  "w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white font-poppins text-sm placeholder:text-white/30 focus:outline-none focus:border-red-500/60 focus:bg-white/10 transition-all duration-300";

function Contact() {
  const emailRef = useRef();

  const sendMail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        emailConfig.service_id,
        emailConfig.template_id,
        emailRef.current,
        { publicKey: emailConfig.public_key },
      )
      .then(
        () => Toast.fire({ title: "Message sent!", icon: "success" }),
        (error) =>
          Toast.fire({ title: `Failed: ${error.text}`, icon: "error" }),
      );
  };

  return (
    <section id="contact" className="relative z-10 py-20 px-6 lg:px-32 md:px-10">
      <h2
        className="text-center font-poppins text-[36px] font-bold mb-14 text-white"
        data-aos="fade-up"
      >
        Get In{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">
          Touch
        </span>
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Left — Info */}
        <div
          className="flex flex-col gap-8"
          data-aos="fade-right"
        >
          <div>
            <h3 className="font-poppins font-bold text-2xl text-white mb-3">
              Let's work together
            </h3>
            <p className="text-white/60 font-poppins text-sm leading-relaxed">
              I'm open to new opportunities, collaborations, or just a friendly
              chat. Feel free to reach out through the form or via any of the
              channels below.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:firlianrifqi22@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-red-900/20 hover:border-red-500/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-800/40 border border-red-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-700/50 transition-colors duration-300">
                <FontAwesomeIcon icon={faEnvelope} className="text-red-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs font-poppins uppercase tracking-widest mb-0.5">
                  Email
                </p>
                <p className="text-white font-poppins text-sm">
                  firlianrifqi22@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/rifqi-firlian/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-900/20 hover:border-sky-500/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-800/20 border border-sky-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-700/30 transition-colors duration-300">
                <FontAwesomeIcon icon={faLinkedin} className="text-sky-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs font-poppins uppercase tracking-widest mb-0.5">
                  LinkedIn
                </p>
                <p className="text-white font-poppins text-sm">
                  rifqi-firlian
                </p>
              </div>
            </a>

            <a
              href="https://github.com/rifqi-dev"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-900/20 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-800/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-700/30 transition-colors duration-300">
                <FontAwesomeIcon icon={faGithub} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs font-poppins uppercase tracking-widest mb-0.5">
                  GitHub
                </p>
                <p className="text-white font-poppins text-sm">
                  rifqi-dev
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-red-800/40 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-red-400"
                />
              </div>
              <div>
                <p className="text-white/40 text-xs font-poppins uppercase tracking-widest mb-0.5">
                  Location
                </p>
                <p className="text-white font-poppins text-sm">
                  Tangerang Selatan, Banten, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div
          className="backdrop-blur-sm bg-white/5 border border-white/15 rounded-2xl p-8"
          data-aos="fade-left"
        >
          <form ref={emailRef} onSubmit={sendMail} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-xs font-poppins uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your name"
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/50 text-xs font-poppins uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your email"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-xs font-poppins uppercase tracking-widest">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="What's this about?"
                className={inputClass}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-xs font-poppins uppercase tracking-widest">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell me more..."
                rows={5}
                className={inputClass + " resize-none"}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white font-poppins text-sm py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(162,11,11,0.4)]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

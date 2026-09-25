import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
  service_id: "service_y2m173e",
  template_id: "template_0f617kj",
  public_key: "mjE9rmJ59UT__9GMx",
};

// Neon-outline fields: glass fill on mobile (like the bento cards), the checklist-row
// card style (navy fill, ring, rounded-xl) at md+.
// Use explicit opacities that exist in Tailwind's scale or `[0.15]`-style
// arbitrary values: e.g. `border-white/15` generates nothing (no 15 step) and
// the border falls back to the default light-gray.
const inputClass =
  "w-full bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 md:ring-1 md:ring-inset md:ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] rounded-lg md:rounded-xl px-4 py-3 text-archive-text font-inter text-sm placeholder:text-archive-muted/60 focus:outline-none focus:border-archive-gold/60 focus:bg-white/10 md:focus:bg-space-blue transition-all duration-300";

export const ContactFormPanel = () => {
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
    <form ref={emailRef} onSubmit={sendMail} className="flex flex-col gap-4 h-full flex-1">
      {/* One field per row on mobile; Name/Email side by side at md+. (No
          `grid-cols-1`: tailwind.config.js only defines 2 and 3 columns.) */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-archive-muted text-xs font-inter uppercase tracking-widest">
            Name
          </label>
          <input type="text" name="from_name" placeholder="Your name" className={inputClass} required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-archive-muted text-xs font-inter uppercase tracking-widest">
            Email
          </label>
          <input type="email" name="from_email" placeholder="Your email" className={inputClass} required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-archive-muted text-xs font-inter uppercase tracking-widest">
          Subject
        </label>
        <input type="text" name="subject" placeholder="What's this about?" className={inputClass} required />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <label className="text-archive-muted text-xs font-inter uppercase tracking-widest">
          Message
        </label>
        <textarea name="message" placeholder="Tell me more..." rows={4} className={inputClass + " resize-none flex-1"} required />
      </div>

      <button
        type="submit"
        className="mt-1 flex items-center justify-center gap-2 bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 md:ring-1 md:ring-inset md:ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] text-archive-text md:text-archive-text/80 md:hover:text-archive-text font-inter text-sm py-3 px-6 rounded-lg md:rounded-xl transition-all duration-300"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        Send Message
      </button>
    </form>
  );
};

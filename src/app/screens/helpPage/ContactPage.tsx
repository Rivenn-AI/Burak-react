import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to your backend
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <TabPanel value={"3"}>
      <Box className={"contact-card"}>
        <div className={"contact-head"}>Contact Us!</div>
        <div className={"contact-sub"}>
          Fill out below form to send a message!
        </div>

        <form className={"contact-form"} onSubmit={handleSubmit}>
          <label>Ism</label>
          <input
            type="text"
            placeholder="Ilkhom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Elektron Manzil</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Xabar</label>
          <textarea
            placeholder="Xabar"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Box className={"contact-actions"}>
            {sent ? <span className={"sent-text"}>Message sent!</span> : null}
            <Button type="submit" variant={"contained"} className={"send-btn"}>
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </TabPanel>
  );
}

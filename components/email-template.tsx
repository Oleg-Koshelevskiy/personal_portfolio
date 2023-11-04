import * as React from "react";

interface EmailTemplateProps {
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  subject,
  message,
}) => (
  <>
    <h1 className="text-xl">{subject}</h1>
    <p>{message}</p>
    <p>Received from: {email}</p>
  </>
);

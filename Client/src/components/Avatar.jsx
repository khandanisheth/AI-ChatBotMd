import React from "react";

export default function Avatar({ role }) {
  const base = "avatar";
  if (role === "error") return <div className={`${base} avatar--error`}>!</div>;
  if (role === "user") return <div className={`${base} avatar--user`}>You</div>;
  return <div className={`${base} avatar--ai`}>AI</div>;
}
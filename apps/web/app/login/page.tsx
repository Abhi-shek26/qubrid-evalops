"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../lib-api";
export default function Login() { const r=useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState("");
async function submit(e:React.FormEvent){e.preventDefault(); const res=await fetch(`${API_URL}/api/v1/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})}); const data=await res.json(); if(!res.ok){setError(data.message);return;} localStorage.setItem("evalops_token",data.data.token); r.push("/dashboard");}
return <main><div className="card"><h1>Login</h1><form onSubmit={submit}><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label><label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password"/></label>{error&&<p>{error}</p>}<button>Login</button></form></div></main> }

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Card, Label, TextInput } from "flowbite-react";
import Cookies from "js-cookie";
import { useAuth } from "@/auth/auth";
import Link from "next/link";

const AuthCard = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (userData) {
      router.push("/dashboard");
    }
  }, [router, userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.success) {
        Cookies.set("user_token", responseData.data.token, {
          expires: new Date(responseData.data.expires_at),
          path: "/",
        });
        router.reload();
      } else {
        console.log(responseData);
        setMsg(responseData.message);
      }
    } catch (error) {
      console.error(error);
      setMsg(error.message);
    }
  };

  return (
    <Card className="w-full py-5">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="rehan@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {msg && <p className="text-red-500">{msg}</p>}
        <Button onClick={handleSubmit}>Login</Button>
        <div>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Register
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default AuthCard;

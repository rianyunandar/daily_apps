import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, Label, TextInput } from "flowbite-react";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/register/", // Adjust the URL for your signup API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const responseData = await response.json();

      window.alert(
        "You have successfully registered!   Please login to continue.   Thank you!"
      );
      if (responseData.success) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setMsg(error.message);
    }
  };

  return (
    <Card className="w-full py-5">
      <form className="flex flex-col gap-2" onSubmit={handleSignup}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="john.doe@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {msg && <p className="text-red-500">{msg}</p>}
        <Button type="submit">Signup</Button>
        <div>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default SignupPage;

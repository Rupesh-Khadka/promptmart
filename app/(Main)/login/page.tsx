import { LoginForm } from "@/components/forms/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <Link href="/" className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">
            <span className="text-[#6dff4b]">Prompt</span>Mart
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}

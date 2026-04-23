import React, { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Package, User2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const from = (location.state as LocationState | null)?.from?.pathname || "/";

  if (isAuthenticated && user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(formData);
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Login berhasil.");
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#1d1f20] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
        <section className="flex items-center justify-center px-6 py-10">
          <Card className="w-full max-w-md border-0 bg-[#1d1f20] text-white shadow-2xl backdrop-blur">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#181a1b]">
                  <Package className="h-7 w-7" />
                </div>
                <h1 className="text-3xl font-bold tracking-wide">SUKSES ELEKTRO</h1>
                <p className="mt-2 text-sm text-slate-300">Masuk ke sistem toko elektronika</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200">
                    Username
                  </Label>
                  <div className="relative">
                    <User2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          username: event.target.value,
                        }))
                      }
                      placeholder="Masukan Username"
                      className="border-0 bg-[#ffffff] pl-10 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Masukan Password"
                      className="border-0 bg-[#ffffff] pl-10 pr-11 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="h-11 w-full bg-white text-black hover:bg-slate-200">
                  Masuk
                </Button>
              </form>

            </CardContent>
          </Card>
        </section>

        <section className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-[url('/Background.png')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(24,26,27,0.2),_rgba(24,26,27,0.75))]" />
        </section>
      </div>
    </div>
  );
}

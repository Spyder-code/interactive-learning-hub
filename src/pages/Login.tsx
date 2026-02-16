import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FiUser, FiLock, FiBookOpen } from "react-icons/fi";

const Login = () => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authAPI.login(nim, password);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di Interactive Learning Hub!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login Gagal",
        description: error.message || "NIM atau password salah",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <FiBookOpen className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Interactive Learning Hub
          </CardTitle>
          <CardDescription className="text-base">
            Masuk dengan NIM dan password Anda untuk mengakses materi
            pembelajaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nim" className="text-base">
                NIM
              </Label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="nim"
                  type="text"
                  placeholder="Masukkan NIM"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="pl-10 h-11"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-semibold text-center mb-2">
              Demo Account:
            </p>
            <p className="text-xs text-center text-muted-foreground">
              NIM: 2301010101 / 2301010102 / 2301010103
            </p>
            <p className="text-xs text-center text-muted-foreground">
              Password: 12345
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// JWT token üretme (gerçek uygulamada bu sunucu tarafında yapılır)
const generateToken = (userId: string) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    userId,
    exp: Date.now() + 3600000 // 1 saat geçerli
  }));
  const signature = btoa(`${header}.${payload}.SECRET_KEY`);
  
  return `${header}.${payload}.${signature}`;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Token geçerliliği gerçek bir uygulamada sunucu tarafında doğrulanmalıdır
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    // Basit validasyon
    if (!email.includes('@')) {
      setLoginError("Lütfen geçerli bir e-posta adresi girin");
      return;
    }
    
    if (password.length < 6) {
      setLoginError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    setIsLoading(true);
    
    // Demo için basit bir doğrulama (gerçek uygulamada API çağrısı yapılır)
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo kullanıcı
      if (email === "demo@example.com" && password === "123456") {
        // JWT token oluştur ve sakla
        const token = generateToken("user-123");
        localStorage.setItem('auth_token', token);
        
        toast({
          title: "Giriş Başarılı",
          description: "Hoş geldiniz!",
        });
        
        navigate("/dashboard");
      } else {
        setLoginError("E-posta veya şifre yanlış");
        toast({
          title: "Giriş Başarısız",
          description: "Lütfen bilgilerinizi kontrol edin",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleRegisterClick = () => {
    // For demo, just show an alert
    alert("Registration process would happen here.\nIn a real app, this would show a registration form with invite code field.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Forwarder Panel</h1>
          <p className="text-muted-foreground">Login to your forwarder account</p>
        </div>
        
        <Card className="shadow-lg">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loginError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-destructive" />
                  <div className="text-destructive text-sm">{loginError}</div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button type="button" variant="link" className="p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                Demo hesabı: demo@example.com / 123456
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
              <div className="text-center text-sm text-muted-foreground mt-2">
                <span>Don't have an invite code? </span>
                <Button type="button" variant="link" className="p-0 h-auto" onClick={handleRegisterClick}>
                  Register here
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProfile } from "@/lib/mockData";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// JWT için gerekli fonksiyonlar
const generateToken = (userId: string) => {
  // Gerçek bir JWT uygulamasında, bu sunucu tarafında yapılmalıdır
  // Bu sadece frontend için bir örnektir
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    userId,
    exp: Date.now() + 3600000 // 1 saat geçerli
  }));
  const signature = btoa(`${header}.${payload}.SECRET_KEY`); // Gerçek uygulamada sunucu tarafında gizli bir anahtar kullanılmalıdır
  
  return `${header}.${payload}.${signature}`;
};

const verifyToken = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    if (!payload || !payload.exp) return false;
    
    return payload.exp > Date.now(); // Tokenin süresi dolmuş mu kontrol et
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return false;
  }
};

const Profile = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [tokenValid, setTokenValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  // Token doğrulama işlemi
  useEffect(() => {
    if (token) {
      const isValid = verifyToken(token);
      setTokenValid(isValid);
      
      if (!isValid) {
        localStorage.removeItem('auth_token');
        setToken(null);
        toast({
          title: t("sessionExpired"),
          description: t("pleaseLoginAgain"),
          variant: "destructive",
        });
      }
    } else {
      // Demo için otomatik token oluştur
      const newToken = generateToken(profile.id);
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      setTokenValid(true);
    }
  }, [profile.id, t, toast]);

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tokenValid) {
      toast({
        title: t("authError"),
        description: t("pleaseLoginAgain"),
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      // Token yenile
      const newToken = generateToken(profile.id);
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      
      toast({
        title: t("profileUpdated"),
        description: t("profileUpdateSuccess"),
      });
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (!tokenValid) {
      toast({
        title: t("authError"),
        description: t("pleaseLoginAgain"),
        variant: "destructive",
      });
      return;
    }

    // Şifre doğrulama kontrolleri
    if (currentPassword.length < 6) {
      setPasswordError("Mevcut şifre en az 6 karakter olmalıdır");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Yeni şifre en az 8 karakter olmalıdır");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Şifreler eşleşmiyor");
      return;
    }
    
    // Mock şifre kontrolü (gerçek uygulamada API'ye gönderilir)
    if (currentPassword !== "123456") {
      setPasswordError("Mevcut şifre yanlış");
      return;
    }
    
    setIsSaving(true);
    
    // Simulate password change
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Token yenile
      const newToken = generateToken(profile.id);
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      
      toast({
        title: t("passwordUpdated"),
        description: t("passwordUpdateSuccess"),
      });
    }, 1000);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(profile.inviteCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("profile")}</h1>
        <p className="text-muted-foreground">{t("manageAccount")}</p>
      </div>

      {!tokenValid && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle size={18} />
              <p className="font-semibold">{t("authRequired")}</p>
            </div>
            <p className="text-sm mt-1">{t("pleaseLoginAgain")}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">{t("basicInformation")}</TabsTrigger>
          <TabsTrigger value="security">{t("security")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          {/* Invite code card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("yourInviteCode")}</CardTitle>
              <CardDescription>
                {t("shareWithClients")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="bg-accent p-4 rounded-md text-lg font-mono flex-1 text-center">
                  {profile.inviteCode}
                </div>
                <Button
                  onClick={copyInviteCode}
                  size="icon"
                  variant="secondary"
                  className="flex-shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic info form */}
          <form onSubmit={handleBasicInfoSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>{t("basicInformation")}</CardTitle>
                <CardDescription>
                  {t("updatePersonalInfo")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("firstName")}</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("lastName")}</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t("companyName")}</Label>
                  <Input
                    id="company"
                    value={profile.companyName || ""}
                    onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="email">{t("emailAddress")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iban">{t("iban")}</Label>
                  <Input
                    id="iban"
                    value={profile.iban}
                    onChange={(e) => setProfile({...profile, iban: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? t("saving") : t("saveChanges")}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        
        <TabsContent value="security">
          <form onSubmit={handlePasswordSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>{t("changePassword")}</CardTitle>
                <CardDescription>
                  {t("changePasswordDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {passwordError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                    {passwordError}
                  </div>
                )}
              
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t("currentPassword")}</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Demo için şifre: "123456"</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t("newPassword")}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">En az 8 karakter olmalıdır</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSaving || !tokenValid}>
                  {isSaving ? t("changingPassword") : t("changePassword")}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

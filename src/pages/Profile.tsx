
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProfile } from "@/lib/mockData";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateToken, verifyToken } from "@/utils/jwt";
import { InviteCodeCard } from "@/components/profile/InviteCodeCard";
import { BasicInfoForm } from "@/components/profile/BasicInfoForm";
import { PasswordForm } from "@/components/profile/PasswordForm";
import { ProfileData } from "@/types/profile";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>(mockProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [tokenValid, setTokenValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  // For demo purposes, we store the "current" password
  // In a real app, this would be securely stored in the database
  const [storedPassword, setStoredPassword] = useState("123456");

  useEffect(() => {
    if (token) {
      const isValid = verifyToken(token);
      setTokenValid(isValid);
      
      if (!isValid) {
        localStorage.removeItem('auth_token');
        setToken(null);
        toast({
          title: "Yetkilendirme Hatası",
          description: "Lütfen tekrar giriş yapın.",
          variant: "destructive",
        });
      }
    } else {
      const newToken = generateToken(profile.id);
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      setTokenValid(true);
    }
  }, [profile.id, toast, t]);

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tokenValid) {
      toast({
        title: "Yetkilendirme Hatası",
        description: "Lütfen tekrar giriş yapın.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
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
        title: "Yetkilendirme Hatası",
        description: "Lütfen tekrar giriş yapın.",
        variant: "destructive",
      });
      return;
    }

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
    
    // Compare with the stored password rather than hardcoding
    if (currentPassword !== storedPassword) {
      setPasswordError("Mevcut şifre yanlış");
      return;
    }
    
    setIsSaving(true);
    
    setTimeout(() => {
      // Update the stored password to the new one
      setStoredPassword(newPassword);
      
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      const newToken = generateToken(profile.id);
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      
      toast({
        title: t("passwordUpdated"),
        description: t("passwordUpdateSuccess"),
      });
    }, 1000);
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
              <p className="font-semibold">Yetkilendirme Hatası</p>
            </div>
            <p className="text-sm mt-1">Lütfen tekrar giriş yapın.</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">{t("basicInformation")}</TabsTrigger>
          <TabsTrigger value="security">{t("security")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <InviteCodeCard inviteCode={profile.inviteCode} />
          <BasicInfoForm 
            profile={profile}
            onProfileChange={setProfile}
            onSubmit={handleBasicInfoSubmit}
            isSaving={isSaving}
          />
        </TabsContent>
        
        <TabsContent value="security">
          <PasswordForm
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            passwordError={passwordError}
            onCurrentPasswordChange={setCurrentPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={handlePasswordSubmit}
            isSaving={isSaving}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

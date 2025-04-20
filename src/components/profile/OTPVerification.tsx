
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

interface OTPVerificationProps {
  onVerify: (code: string) => void;
  onCancel: () => void;
  email: string;
  isVerifying: boolean;
}

export const OTPVerification = ({ 
  onVerify, 
  onCancel,
  email,
  isVerifying
}: OTPVerificationProps) => {
  const { t } = useLanguage();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Hata",
        description: "Lütfen 6 haneli kodu giriniz",
        variant: "destructive"
      });
      return;
    }
    
    onVerify(otp);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>E-posta Doğrulama</CardTitle>
        <CardDescription>
          {email} adresine gönderilen 6 haneli kodu giriniz
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            value={otp}
            onChange={setOtp}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots && Array.isArray(slots) && slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Doğrulama kodu 5 dakika geçerlidir
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isVerifying}>
          İptal
        </Button>
        <Button onClick={handleVerify} disabled={otp.length !== 6 || isVerifying}>
          {isVerifying ? "Doğrulanıyor..." : "Doğrula"}
        </Button>
      </CardFooter>
    </Card>
  );
};

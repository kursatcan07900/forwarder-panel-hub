
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InviteCodeCardProps {
  inviteCode: string;
}

export const InviteCodeCard = ({ inviteCode }: InviteCodeCardProps) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("yourInviteCode")}</CardTitle>
        <CardDescription>{t("shareWithClients")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="bg-accent p-4 rounded-md text-lg font-mono flex-1 text-center">
            {inviteCode}
          </div>
          <Button onClick={copyInviteCode} size="icon" variant="secondary" className="flex-shrink-0">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProfileData } from "@/types/profile";

interface BasicInfoFormProps {
  profile: ProfileData;
  onProfileChange: (profile: ProfileData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export const BasicInfoForm = ({ profile, onProfileChange, onSubmit, isSaving }: BasicInfoFormProps) => {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{t("basicInformation")}</CardTitle>
          <CardDescription>{t("updatePersonalInfo")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("firstName")}</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => onProfileChange({...profile, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("lastName")}</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => onProfileChange({...profile, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t("companyName")}</Label>
            <Input
              id="company"
              value={profile.companyName || ""}
              onChange={(e) => onProfileChange({...profile, companyName: e.target.value})}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="email">{t("emailAddress")}</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => onProfileChange({...profile, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phoneNumber")}</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => onProfileChange({...profile, phone: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iban">{t("iban")}</Label>
            <Input
              id="iban"
              value={profile.iban}
              onChange={(e) => onProfileChange({...profile, iban: e.target.value})}
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
  );
};

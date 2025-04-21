
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SuperAdmin = () => (
  <div className="flex justify-center items-center h-full">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Süper Admin Paneli</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Bu sayfa sadece Süper Adminler içindir. Buradan sistem yönetimini gerçekleştirebilirsiniz.</p>
      </CardContent>
    </Card>
  </div>
);

export default SuperAdmin;

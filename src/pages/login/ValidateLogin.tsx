import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ValidateTwoFactor() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 p-4">
      <Card className="w-full max-w-md bg-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-neutral-400 text-sm">
            Enter the verification code from your authenticator app.
          </p>
          <Label className="text-white">2FA Code</Label>
          <Input
            placeholder="Enter 2FA code"
            className="bg-neutral-700 border-none text-white"
          />
          <Button className="bg-neutral-600 hover:bg-neutral-500">
            Verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

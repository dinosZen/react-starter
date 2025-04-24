import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useVerify } from "@/features/auth/hooks";
import { JwtPartialUser } from "@/features/auth/types";
import { clearCookie, getCookieValue } from "@/lib/cookies";
import { useTwoFactorStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupTwoFactor() {
  const navigate = useNavigate();
  const verify = useVerify();
  const { secret } = useTwoFactorStore();
  const userCookie = getCookieValue("partial_token");
  const user = userCookie
    ? jwtDecode<JwtPartialUser>(userCookie)
    : { email: "cambix@cambix.com" };

  useEffect(() => {
    if (!secret) {
      clearCookie("partial_token");
      navigate("/login");
    }
  }, [secret, navigate]);

  if (!secret) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const code = form.get("code") as string;

    verify.mutate({ code });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 p-4">
      <Card className="w-full max-w-md bg-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl">
            Set Up Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-neutral-400 text-sm">
            Scan the QR code with your authenticator app or enter the secret key
            manually.
          </p>
          <div className="flex justify-center">
            <QRCodeSVG
              value={`otpauth://totp/cambix:${user.email}?secret=${secret}&issuer=Cambix`}
              size={256}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-4">
              <Label className="text-white">Enter Code</Label>
              <Input
                name="code"
                placeholder="Enter 2FA code"
                className="bg-neutral-700 border-none text-white"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={verify.isPending}
              className="bg-neutral-600 hover:bg-neutral-500 w-full"
            >
              {verify.isPending ? "Verifying..." : "Confirm Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useValidate } from "@/features/auth/hooks";

export default function ValidateTwoFactor() {
  const validate = useValidate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const code = form.get("code") as string;

    validate.mutate({ code });
  };
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Label className="text-white">Enter Code</Label>
              <Input
                name="code"
                placeholder="Enter 2FA code"
                className="bg-neutral-700 border-none text-white"
                required
              />
              <Button
                type="submit"
                disabled={validate.isPending}
                className="bg-neutral-600 hover:bg-neutral-500"
              >
                {validate.isPending ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

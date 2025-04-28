import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        info: null,
        success: null,
        error: null,
        warning: null,
        close: <span className="text-text-primary-default">×</span>,
      }}
      expand={true}
      toastOptions={{
        /** shared defaults */
        className: "border group",
        duration: 4000,
        classNames: {
          error: "!text-red-900 border-bg-brand-primary-default",
          info: "!text-blue-900",
          success: "!text-green-900",
          warning: "!text-yellow-900 border-bg-brand-primary-default",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

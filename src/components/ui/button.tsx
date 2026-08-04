import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium" | "glass";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantStyles = {
      default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]",
      destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
      outline: "border border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40",
      secondary: "bg-muted text-foreground shadow-sm hover:bg-muted/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      premium: "bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-lg hover:shadow-xl active:scale-[0.98]",
      glass: "glass-panel text-foreground hover:bg-white/80 dark:hover:bg-white/10",
    };

    const sizeStyles = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-lg px-4 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      xl: "h-14 rounded-2xl px-10 text-lg",
      icon: "h-10 w-10",
    };

    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (children.props as { className?: string }).className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

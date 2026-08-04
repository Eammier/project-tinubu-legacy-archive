import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { APP_NAME, NAV_ITEMS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold">{APP_NAME}</p>
                <p className="text-xs text-muted-foreground">
                  Federal Republic of Nigeria
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Preserving Nigeria&apos;s progress through transparent documentation
              of every verified Federal Government project from 2023–2030.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Policies
            </h3>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Data Protection", "Accessibility", "Open Data API", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Federal Secretariat, Abuja, FCT, Nigeria
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                info@ptla.gov.ng
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +234 (0) 9 123 4567
              </li>
            </ul>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Newsletter</p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="text-sm" />
                <Button size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Emergency: 112 · NEMA: 0800-NEMA-HELP
          </p>
        </div>
      </div>
    </footer>
  );
}

import { HeroSection } from "./sections/hero-section";
import { PartnerLogos } from "./sections/partner-logos";
import { FeatureGrid } from "./sections/feature-grid";
import { ModuleShowcase } from "./sections/module-showcase";
import { StatsSection } from "./sections/stats-section";
import { OperationsSection } from "./sections/operations-section";
import { Testimonials } from "./sections/testimonials";
import { LoginFooter } from "./sections/login-footer";

export default function LoginPage() {
  return (
    <div className="flex-1">
      <HeroSection />
      <PartnerLogos />
      <FeatureGrid />
      <ModuleShowcase />
      <StatsSection />
      <OperationsSection />
      <Testimonials />
      <LoginFooter />
    </div>
  );
}

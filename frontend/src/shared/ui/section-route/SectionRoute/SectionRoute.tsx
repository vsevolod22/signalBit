import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { landingEase, revealViewport, ROUTE_CONNECTOR_PATHS } from '@/shared/lib/landing-motion';
import './section-route.scss';

interface AnimatedRoutePathProps {
  delay?: number;
  path: string;
}

function AnimatedRoutePath({ delay = 0, path }: AnimatedRoutePathProps): ReactElement {
  return (
    <motion.path
      className="route-path"
      d={path}
      initial={{ opacity: 0, strokeDashoffset: 0 }}
      whileInView={{ opacity: 1, strokeDashoffset: [0, -56] }}
      viewport={revealViewport}
      transition={{
        opacity: { duration: 0.45, ease: landingEase, delay },
        strokeDashoffset: { duration: 3.6, ease: 'linear', repeat: Infinity },
      }}
    />
  );
}

interface SectionRouteProps {
  className: string;
  path: string;
}

export function SectionRoute({ className, path }: SectionRouteProps): ReactElement {
  return (
    <motion.svg
      className={`section-route ${className}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, ease: landingEase }}
    >
      <AnimatedRoutePath path={path} />
    </motion.svg>
  );
}

interface RouteConnectorProps {
  side: keyof typeof ROUTE_CONNECTOR_PATHS;
}

export function RouteConnector({ side }: RouteConnectorProps): ReactElement {
  return (
    <motion.svg
      className={`route-connector route-connector--${side}`}
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, ease: landingEase }}
    >
      <AnimatedRoutePath path={ROUTE_CONNECTOR_PATHS[side]} delay={0.12} />
    </motion.svg>
  );
}

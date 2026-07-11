import { HTTP_METHOD, PUBLIC_ROUTE_CONFIG } from '../../../shared/http';

export default {
  routes: [
    {
      method: HTTP_METHOD.GET,
      path: '/site-content',
      handler: 'site-content.find',
      config: PUBLIC_ROUTE_CONFIG,
    },
  ],
};

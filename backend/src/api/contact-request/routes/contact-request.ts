import { HTTP_METHOD, PUBLIC_ROUTE_CONFIG } from '../../../shared/http';

export default {
  routes: [
    {
      method: HTTP_METHOD.POST,
      path: '/contact-requests/submit',
      handler: 'contact-request.submit',
      config: PUBLIC_ROUTE_CONFIG,
    },
  ],
};

import { HTTP_METHOD, PUBLIC_ROUTE_CONFIG } from '../../../shared/http';

export default {
  routes: [
    {
      method: HTTP_METHOD.POST,
      path: '/course-registrations/submit',
      handler: 'course-registration.submit',
      config: PUBLIC_ROUTE_CONFIG,
    },
  ],
};

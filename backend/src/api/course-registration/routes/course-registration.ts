export default {
  routes: [
    {
      method: 'POST',
      path: '/course-registrations/submit',
      handler: 'course-registration.submit',
      config: {
        auth: false,
      },
    },
  ],
};

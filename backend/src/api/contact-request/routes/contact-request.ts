export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-requests/submit',
      handler: 'contact-request.submit',
      config: {
        auth: false,
      },
    },
  ],
};

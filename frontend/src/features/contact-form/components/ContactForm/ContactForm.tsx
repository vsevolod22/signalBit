import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useContactFormMutation } from '@/features/contact-form/api/submit-contact-form';
import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { contactFormSchema } from '@/features/contact-form/model/contact-form-schema';
import { ContactFormFields } from '@/features/contact-form/ui/ContactFormFields';
import { ContactFormIntro } from '@/features/contact-form/ui/ContactFormIntro';
import type { SubmissionStatus } from '@/features/contact-form/ui/ContactFormStatus';
import { ContactFormStatus } from '@/features/contact-form/ui/ContactFormStatus';
import { fadeUpVariants, pageSectionVariants, revealViewport } from '@/shared/lib/landing-motion';

import './contact-form.scss';

const DEFAULT_VALUES: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
};

export function ContactForm(): ReactElement {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const contactFormMutation = useContactFormMutation();
  const isSubmitPending = form.formState.isSubmitting || contactFormMutation.isPending;

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    setStatus('idle');
    try {
      await contactFormMutation.mutateAsync(values);
      form.reset(DEFAULT_VALUES);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="contact"
      id="request"
      aria-labelledby="request-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <ContactFormIntro />
      <FormProvider {...form}>
        <motion.form
          className="contact__form"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          variants={fadeUpVariants}
        >
          <ContactFormFields />
          <ContactFormStatus isPending={isSubmitPending} status={status} />
        </motion.form>
      </FormProvider>
    </motion.div>
  );
}

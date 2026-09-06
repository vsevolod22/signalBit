import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useContactFormMutation } from '@/features/contact-form/api/submit-contact-form';
import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { contactFormSchema } from '@/features/contact-form/model/contact-form-schema';
import { ContactFormFields } from '@/features/contact-form/ui/ContactFormFields';
import { ContactFormIntro } from '@/features/contact-form/ui/ContactFormIntro';
import type { SubmissionStatus } from '@/features/contact-form/ui/ContactFormStatus';
import { ContactFormStatus } from '@/features/contact-form/ui/ContactFormStatus';
import { getCaptchaSubmissionError } from '@/shared/api/captcha-errors';
import { fadeUpVariants, pageSectionVariants, revealViewport } from '@/shared/lib/landing-motion';
import { CAPTCHA_MESSAGE, getSmartCaptchaSiteKey } from '@/shared/lib/smart-captcha';
import { SmartCaptchaField } from '@/shared/ui/smart-captcha/SmartCaptchaField';

import './contact-form.scss';

const DEFAULT_VALUES: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
};

interface ContactFormProps {
  apiUrl?: string;
  captchaSiteKey?: string;
}

export function ContactForm({ apiUrl, captchaSiteKey }: ContactFormProps = {}): ReactElement {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [captchaError, setCaptchaError] = useState('');
  const submissionLockRef = useRef(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const contactFormMutation = useContactFormMutation(apiUrl);
  const isSubmitPending = form.formState.isSubmitting || contactFormMutation.isPending;
  const siteKey = getSmartCaptchaSiteKey(captchaSiteKey);

  const handleCaptchaError = (message: string): void => {
    setCaptchaToken('');
    setCaptchaError(message);
  };

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    setStatus('idle');

    if (submissionLockRef.current || isSubmitPending) {
      return;
    }
    if (siteKey === undefined) {
      setCaptchaError(CAPTCHA_MESSAGE.missing);
      return;
    }
    if (captchaToken === '') {
      setCaptchaError(CAPTCHA_MESSAGE.required);
      return;
    }

    submissionLockRef.current = true;
    try {
      await contactFormMutation.mutateAsync({ smartCaptchaToken: captchaToken, values });
      form.reset(DEFAULT_VALUES);
      setStatus('success');
    } catch (error: unknown) {
      const captchaSubmissionError = getCaptchaSubmissionError(error);
      if (captchaSubmissionError === undefined) {
        setStatus('error');
      } else {
        setCaptchaError(captchaSubmissionError);
      }
    } finally {
      setCaptchaToken('');
      setCaptchaResetKey((value) => value + 1);
      submissionLockRef.current = false;
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
          <SmartCaptchaField
            key={captchaResetKey}
            siteKey={captchaSiteKey}
            error={captchaError}
            onSuccess={(token) => {
              setCaptchaToken(token);
              setCaptchaError('');
            }}
            onError={handleCaptchaError}
          />
          <ContactFormStatus isDisabled={siteKey === undefined} isPending={isSubmitPending} status={status} />
        </motion.form>
      </FormProvider>
    </motion.div>
  );
}

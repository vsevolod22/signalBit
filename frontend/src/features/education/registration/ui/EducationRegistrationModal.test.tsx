import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { COURSE_AUDIENCE } from '@/features/education/registration/model/education-registration-schema';

import { EducationRegistrationModal } from './EducationRegistrationModal';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function renderModal(audience: 'children' | 'adults', courseTitle: string): ReactElement {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return (
    <QueryClientProvider client={queryClient}>
      <EducationRegistrationModal
        apiUrl="https://cms.example.test"
        audience={audience}
        courseTitle={courseTitle}
        triggerLabel="Оставить заявку"
      />
    </QueryClientProvider>
  );
}

describe('EducationRegistrationModal', () => {
  it('показывает поля места обучения и родителя для детского курса', () => {
    render(renderModal(COURSE_AUDIENCE.CHILDREN, 'Школа пилотирования'));
    fireEvent.click(screen.getByRole('button', { name: 'Оставить заявку' }));

    expect(screen.getByRole('dialog', { name: 'Школа пилотирования' }).hasAttribute('open')).toBe(true);
    expect(screen.getByLabelText('Место обучения обучающегося')).not.toBeNull();
    expect(screen.getByLabelText('ФИО родителя/законного представителя')).not.toBeNull();
    expect(screen.queryByLabelText('Город проживания')).toBeNull();
  });

  it('показывает город без родительских полей для взрослого курса', () => {
    render(renderModal(COURSE_AUDIENCE.ADULTS, 'Инженер-оператор БАС'));
    fireEvent.click(screen.getByRole('button', { name: 'Оставить заявку' }));

    expect(screen.getByLabelText('Город проживания')).not.toBeNull();
    expect(screen.queryByLabelText('ФИО родителя/законного представителя')).toBeNull();
  });

  it('после отправки показывает согласованное сообщение', async () => {
    const fetchMock = vi.fn<typeof fetch>(() =>
      Promise.resolve(new Response(JSON.stringify({ data: { id: 1 } }), { status: 200 })),
    );
    vi.stubGlobal('fetch', fetchMock);
    render(renderModal(COURSE_AUDIENCE.ADULTS, 'Инженер-оператор БАС'));
    fireEvent.click(screen.getByRole('button', { name: 'Оставить заявку' }));
    fireEvent.change(screen.getByLabelText('ФИО обучающегося'), { target: { value: 'Петров Пётр Петрович' } });
    fireEvent.change(screen.getByLabelText('Дата рождения обучающегося'), { target: { value: '21.08.1998' } });
    fireEvent.change(screen.getByLabelText('Номер телефона обучающегося'), { target: { value: '+7 900 111-22-33' } });
    fireEvent.change(screen.getByLabelText('Ссылка на Telegram/ВК обучающегося'), {
      target: { value: 'https://t.me/adult' },
    });
    fireEvent.change(screen.getByLabelText('Город проживания'), { target: { value: 'Таганрог' } });
    fireEvent.click(screen.getByLabelText('Я согласен на обработку персональных данных для регистрации на обучение.'));
    const form = screen.getByRole('dialog', { name: 'Инженер-оператор БАС' }).querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const status = await screen.findByRole('status');
    expect(status.textContent).toContain(
      'Спасибо за вашу заинтересованность в обучении! Наш сотрудник свяжется с вами в течение рабочего дня, чтобы ответить на все вопросы',
    );
  });
});

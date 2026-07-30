import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  COURSE_AUDIENCE,
  createEducationRegistrationDefaults,
} from '@/features/education/registration/model/education-registration-schema';

import { submitEducationRegistration } from './submit-education-registration';

const CMS_URL = 'https://cms.example.test';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('education registration request', () => {
  it('отправляет дату в формате Strapi и сохраняет место обучения', async () => {
    const fetchMock = vi.fn<typeof fetch>(() =>
      Promise.resolve(new Response(JSON.stringify({ data: { id: 1 } }), { status: 200 })),
    );
    vi.stubGlobal('fetch', fetchMock);
    const values = {
      ...createEducationRegistrationDefaults(COURSE_AUDIENCE.CHILDREN),
      studentFullName: 'Иванов Иван Иванович',
      studentBirthDate: '15.04.2010',
      studentPhone: '+7 900 123-45-67',
      studentSocialLink: 'https://t.me/student',
      studyPlace: 'МОБУ СОШ № 38, 10А',
      parentFullName: 'Иванова Анна Сергеевна',
      parentPhone: '+7 900 765-43-21',
      parentSocialLink: 'https://vk.com/parent',
      consent: true,
    };

    await expect(submitEducationRegistration(values, CMS_URL)).resolves.toEqual({ saved: true });
    const request = fetchMock.mock.calls[0]?.[1];
    const body = String(request?.body);
    expect(body).toContain('"studentBirthDate":"2010-04-15"');
    expect(body).toContain('"studyPlace":"МОБУ СОШ № 38, 10А"');
  });

  it('дожидается ответа backend дольше общего четырёхсекундного тайм-аута', async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn<typeof fetch>(
      (_input, init) =>
        new Promise<Response>((resolve, reject) => {
          const responseTimeout = setTimeout(() => {
            resolve(new Response(JSON.stringify({ data: { id: 1 } }), { status: 201 }));
          }, 5_000);

          init?.signal?.addEventListener(
            'abort',
            () => {
              clearTimeout(responseTimeout);
              reject(init.signal?.reason);
            },
            { once: true },
          );
        }),
    );
    vi.stubGlobal('fetch', fetchMock);
    const values = {
      ...createEducationRegistrationDefaults(COURSE_AUDIENCE.ADULTS),
      studentFullName: 'Петров Пётр Петрович',
      studentBirthDate: '21.08.1998',
      studentPhone: '+7 900 111-22-33',
      studentSocialLink: 'https://t.me/adult',
      city: 'Таганрог',
      consent: true,
    };
    const submission = submitEducationRegistration(values, CMS_URL);

    await vi.advanceTimersByTimeAsync(5_000);

    await expect(submission).resolves.toEqual({ saved: true });
  });
});

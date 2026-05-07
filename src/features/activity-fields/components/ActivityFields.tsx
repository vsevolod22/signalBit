import type { ReactElement } from 'react';

import { getMediaUrl, useSiteContentQuery } from '@/shared/api/site-content';
import { CourseRegistrationForm } from './CourseRegistrationForm';
import { ACTIVITY_FIELDS } from '../model/activity-fields-data';
import '../styles/fieldsOfActivity.css';

export function ActivityFields(): ReactElement {
  const { data: siteContent } = useSiteContentQuery();
  const activityFields = siteContent?.activityFields?.length
    ? siteContent.activityFields.map((field, index) => ({
        img: getMediaUrl(field.image, ACTIVITY_FIELDS[index]?.img ?? ACTIVITY_FIELDS[0].img),
        title: field.title ?? ACTIVITY_FIELDS[index]?.title ?? '',
        description: field.description ?? ACTIVITY_FIELDS[index]?.description ?? '',
      }))
    : ACTIVITY_FIELDS;
  const setting = siteContent?.activitySetting;

  return (
    <div className="fieldsOfActivity">
      <h3 className="title">{setting?.sectionTitle ?? 'Чем мы занимаемся'}</h3>
      {activityFields.map((field) => (
        <div className="img-item" key={field.title}>
          <img src={field.img} />
          <div className="descr">
            <h2>{field.title}</h2>
            <span>{field.description}</span>
          </div>
        </div>
      ))}
      <CourseRegistrationForm
        educationEyebrow={setting?.educationEyebrow}
        educationTitle={setting?.educationTitle}
        parentFieldsTitle={setting?.parentFieldsTitle}
      />
    </div>
  );
}

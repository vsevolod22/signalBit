import type { ReactElement } from 'react';

import { ACTIVITY_FIELDS } from '../model/activity-fields-data';
import '../styles/fieldsOfActivity.css';

export function ActivityFields(): ReactElement {
  return (
    <div className="fieldsOfActivity">
      <h3 className="title">Чем мы занимаемся</h3>
      {ACTIVITY_FIELDS.map((field) => (
        <div className="img-item" key={field.title}>
          <img src={field.img} />
          <div className="descr">
            <h2>{field.title}</h2>
            <span>{field.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

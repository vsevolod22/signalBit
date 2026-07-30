import type { KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { useId, useRef } from 'react';

import type { ProductCatalogItem } from '@/shared/model/site-content';

interface ProductCharacteristicsModalProps {
  item: ProductCatalogItem;
  isInteractive: boolean;
}

function openDialog(dialog: HTMLDialogElement | null): void {
  if (dialog === null || dialog.open) {
    return;
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    return;
  }

  dialog.setAttribute('open', '');
}

function closeDialog(dialog: HTMLDialogElement | null): void {
  if (dialog === null || !dialog.open) {
    return;
  }

  if (typeof dialog.close === 'function') {
    dialog.close();
    return;
  }

  dialog.removeAttribute('open');
}

export function ProductCharacteristicsModal({
  item,
  isInteractive,
}: ProductCharacteristicsModalProps): ReactElement | null {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const dialogId = useId();

  if (item.characteristics.length === 0) {
    return null;
  }

  const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    if (!isInteractive) {
      return;
    }

    event.stopPropagation();
    openDialog(dialogRef.current);
  };

  const handleClose = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    closeDialog(dialogRef.current);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      closeDialog(dialogRef.current);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>): void => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog(dialogRef.current);
    }
  };

  return (
    <>
      <button
        className="products__catalog-characteristics"
        type="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={handleOpen}
      >
        {item.characteristicsButtonLabel ?? 'Подробные характеристики'}
      </button>
      <dialog
        className="product-spec-modal"
        id={dialogId}
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <div className="product-spec-modal__surface">
          <header className="product-spec-modal__header">
            <div>
              <span>СИГНАЛ-БИТ · БАС</span>
              <h4 id={titleId}>{item.characteristicsTitle ?? `Подробные характеристики — ${item.name}`}</h4>
            </div>
            <button type="button" onClick={handleClose}>
              Закрыть
            </button>
          </header>
          <div className="product-spec-modal__table-scroll">
            <table>
              <caption className="visually-hidden">{item.characteristicsTitle ?? item.name}</caption>
              <thead>
                <tr>
                  <th scope="col">{item.characteristicNameLabel ?? 'Наименование характеристики'}</th>
                  <th scope="col">{item.characteristicValueLabel ?? 'Значение'}</th>
                  <th scope="col">{item.characteristicUnitLabel ?? 'Ед. изм.'}</th>
                </tr>
              </thead>
              <tbody>
                {item.characteristics.map((characteristic, index) => (
                  <tr
                    className={characteristic.section ? 'product-spec-modal__section-row' : undefined}
                    key={`${characteristic.name}-${index}`}
                  >
                    <th scope="row">{characteristic.name}</th>
                    <td>{characteristic.value}</td>
                    <td>{characteristic.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  );
}

import React from "react";

function PopupWithForm(props) {
  const { name, title, children, textsubmit } = props;

  return (
    <div className={`popup popup_type_${name}`}>
      <div className="popup__container">
        <button className="popup__close-button" aria-label="Закрыть"></button>
        <h3 className="popup__title">{title}</h3>
        <form className="form" novalidate>
          {children}
          <button className="form__save-button" type="submit">{textsubmit}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

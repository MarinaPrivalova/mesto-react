import React from 'react';

function ImagePopup() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__container-image">
        <button className="popup__close-button" aria-label="Закрыть"></button>
        <figure className="popup__figure">
          <img className="popup__image" src="#" alt="#" />
          <figcaption className="popup__image-caption">
            <h2 className="popup__image-title"></h2>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
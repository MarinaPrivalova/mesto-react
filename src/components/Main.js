import React from 'react';
import avatar from '../images/avatar.jpg'

function Main() {
  function handleEditAvatarClick() {
    document.querySelector('.popup_type_avatar').classList.add('popup_opened');
  };
  function handleEditProfileClick() {
    document.querySelector('.popup_type_edit').classList.add('popup_opened');
  }
  function handleAddPlaceClick() {
    document.querySelector('.popup_type_new-card').classList.add('popup_opened');
  }
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__vector-avatar" onClick={handleEditAvatarClick}>
            <img
              src={avatar}
              className="profile__avatar"
              alt="Фотография профиля"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">Чип Чипович</h1>
            <button
              className="profile__edit-button" onClick={handleEditProfileClick}
              type="button"
              aria-label="Редактировать"
            ></button>
            <p className="profile__vocation">Любопытный нос</p>
          </div>
        </div>
        <button
          className="profile__add-button" onClick={handleAddPlaceClick}
          type="button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="photo">
        <ul className="photo__list"></ul>
      </section>
    </main>
  );
}

export default Main;

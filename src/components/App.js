import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext, defaultCurrentUser } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  /**Переменные состояния попапов*/
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  /**Переменные состояния для попапа открытия карточки*/
  const [selectedCard, setSelectedCard] = React.useState(null);

  /**Переменная состояния пользователя*/
  const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

  /**Переменная состояния карточек*/
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => { console.log(err) })
  }, []);

  React.useEffect(() => {
    api.getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => { console.log(err) })
  }, [])

  function handleCardLike(card) {
    /**Снова проверить, есть ли уже лайк на этой карточке*/
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    /**Отправить запрос в API и получить обновлённые данные карточки*/
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((deletedCard) => {
      setCards((cards) => cards.filter((c) => c._id !== card._id))
    })
    .catch((err) => { console.log(err) })
  }

  /**Изменить данные пользователя*/
  function handleUpdateUser(userData) {
    api.updateUserInfo(userData)
      .then((userDataServer) => {
        setCurrentUser(userDataServer)
        closePopups()
      })
      .catch((err) => { console.log(err) })
  };

  /**Изменить аватар пользователя*/
  function handleUpdateAvatar(userAvatar) {
    api.updateUserAvatar(userAvatar)
      .then((userAvatarServer) => {
        setCurrentUser(userAvatarServer)
        closePopups()
      })
      .catch((err) => { console.log(err) })
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupWithForm
            name="new-card"
            title="Новое место"
            textsubmit="Создать"
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            children={
              <fieldset className="form__set">
                <label className="form__field">
                  <input
                    className="form__input form__input_type_image-name"
                    type="text"
                    name="name"
                    id="imagename"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                  />
                  <span className="form__input-error imagename-error"></span>
                </label>
                <label className="form__field">
                  <input
                    className="form__input form__input_type_image-link"
                    type="url"
                    name="link"
                    id="imagelink"
                    placeholder="Ссылка на картинку"
                    required
                  />
                  <span className="form__input-error imagelink-error"></span>
                </label>
              </fieldset>
            }
          />
          <ImagePopup card={selectedCard} onClose={closePopups} />
          <PopupWithForm name="confirm" title="Вы уверены?" textsubmit="Да" />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

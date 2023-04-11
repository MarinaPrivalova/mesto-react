import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeletedCardPopup from "./DeleteCardPopup";
import { CurrentUserContext, defaultCurrentUser } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  /**Переменные состояния попапов*/
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [isRenderLoading, setIsRenderLoading] = React.useState(false);

  /**Переменные состояния для попапа открытия карточки*/
  const [selectedCard, setSelectedCard] = React.useState(null);

  /**Переменная состояния пользователя*/
  const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

  /**Переменная состояния карточек*/
  const [cards, setCards] = React.useState([]);
  const [deletedCard, setDeletedCard] = React.useState("");

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

  /**Рендер загрузки*/
  function renderLoading() {
    setIsRenderLoading((isRenderLoading) => !isRenderLoading);
  };

  /**Открытие попапов*/
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
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };

  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false)
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handleCardLike(card) {
    /**Снова проверить, есть ли уже лайк на этой карточке*/
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    /**Отправить запрос в API и получить обновлённые данные карточки*/
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  function handleCardDelete() {
    api.deleteCard(deletedCard._id)
    .then(() => {
      setCards((cards) => cards.filter((item) => item._id !== deletedCard._id))
    })
    .then(() => closePopups())
    .catch((err) => { console.log(err) })
    .finally(() => renderLoading())
  }

  function handleAddCard(card) {
    api.addNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closePopups();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => renderLoading())
  }

  /**Изменить данные пользователя*/
  function handleUpdateUser(userData) {
    api.updateUserInfo(userData)
      .then((userDataServer) => {
        setCurrentUser(userDataServer)
        closePopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  };

  /**Изменить аватар пользователя*/
  function handleUpdateAvatar(userAvatar) {
    api.updateUserAvatar(userAvatar)
      .then((userAvatarServer) => {
        setCurrentUser(userAvatarServer)
        closePopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  };

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
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onUpdateUser={handleUpdateUser}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            onAddPlace={handleAddCard}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />
          <ImagePopup 
            card={selectedCard} 
            onClose={closePopups} />
          <DeletedCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closePopups}
            onDeleteCard={handleCardDelete}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

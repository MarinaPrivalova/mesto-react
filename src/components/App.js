import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main />
        <Footer />
        <PopupWithForm 
          name="edit"
          title="Редактировать профиль"
          textsubmit="Сохранить"
          children={
            <fieldset className="form__set">
              <label className="form__field">
                <input className="form__input form__input_type_user-name" type="text" name="name" id="username" placeholder="Укажите своё имя" 
                  minlength="2" maxlength="40" required />
                <span className="form__input-error username-error"></span>
              </label>
              <label className="form__field">
                <input className="form__input form__input_type_vocation" type="text" name="about" id="vocation" placeholder="Укажите род деятельности"
                  minlength="2" maxlength="200" required />
                <span className="form__input-error vocation-error"></span>
              </label>
            </fieldset>
          }
        />
        <PopupWithForm 
          name="new-card"
          title="Новое место"
          textsubmit="Создать"
          children={
            <fieldset className="form__set">
              <label className="form__field">
                <input className="form__input form__input_type_image-name" type="text" name="name" id="imagename" placeholder="Название"
                  minlength="2" maxlength="30" required />
                <span className="form__input-error imagename-error"></span>
              </label>
              <label className="form__field">
                <input className="form__input form__input_type_image-link" type="url" name="link" id="imagelink" placeholder="Ссылка на картинку" required />
                <span className="form__input-error imagelink-error"></span>
              </label>
            </fieldset>
          }
        />
        <ImagePopup />
        <PopupWithForm 
          name="confirm"
          title="Вы уверены?"
          textsubmit="Да"
        />
        <PopupWithForm 
          name="avatar"
          title="Обновить аватар"
          textsubmit="Сохранить"
          children={
            <fieldset className="form__set">
              <label className="form__field">
                <input className="form__input form__input_type_avatar" type="url" name="avatar" id="avatar" placeholder="Ссылка на аватар" required />
                <span className="form__input-error avatar-error"></span>
              </label>    
            </fieldset>
          }
        />

        <template id="card">
          <li className="card">
            <img className="card__photo" src="#" alt="#" />
            <div className="card__container">
              <h2 className="card__title"></h2>
              <div className="card__like-container">
                <button
                  className="card__button-like"
                  type="button"
                  aria-label="Нравится"
                ></button>
                <span className="card__like-counter">0</span>
              </div>
              <button
                className="card__button-trash"
                type="button"
                aria-label="Удалить"
              ></button>
            </div>
          </li>
        </template>
      </div>
    </div>
  );
}

export default App;

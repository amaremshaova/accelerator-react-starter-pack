import { AppRoute } from '../../const';
import { Contact, SocialLink, SocialName } from './const';


function Footer():JSX.Element{
  return (
    <footer className="footer">
      <div className="footer__container container">
        <a className="footer__logo logo" href={AppRoute.Main}>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </a>
        <div className="socials footer__socials">
          <ul className="socials__list">
            <li className="socials-item">
              <a className="socials__link" href={SocialLink.Facebook} aria-label={SocialName.Facebook}>
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use href="#icon-facebook"></use>
                </svg>
              </a>
            </li>
            <li className="socials-item">
              <a className="socials__link" href={SocialLink.Instagram} aria-label={SocialName.Instagram}>
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use href="#icon-instagram"></use>
                </svg>
              </a>
            </li>
            <li className="socials-item">
              <a className="socials__link" href={SocialLink.Twitter} aria-label={SocialName.Twitter}>
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use href="#icon-twitter"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <section className="footer__nav-section footer__nav-section--info">
          <h2 className="footer__nav-title">О нас</h2>
          <p className="footer__nav-content footer__nav-content--font-secondary">Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!</p>
        </section>
        <section className="footer__nav-section footer__nav-section--links">
          <h2 className="footer__nav-title">Информация</h2>
          <ul className="footer__nav-list">
            <li className="footer__nav-list-item"><a className="link" href="#top">Где купить?</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">Блог</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">Вопрос - ответ</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">Возврат</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">Сервис-центры</a>
            </li>
          </ul>
        </section>
        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">Контакты</h2>
          <p className="footer__nav-content">{Contact.City},<br/>{Contact.Metro},  <br/>{Contact.Address}</p>
          <div className="footer__nav-content">
            <svg className="footer__icon" width="8" height="8" aria-hidden="true">
              <use href="#icon-phone"></use>
            </svg><a className="link" href={`tel:${Contact.Phone}`}>{Contact.Phone} </a>
          </div>
          <p className="footer__nav-content">Режим работы:<br/>
            <span className="footer__span">
              <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                <use href="#icon-clock"></use>
              </svg>
              <span>{Contact.OpeningHours} </span>
              <span>{Contact.NumberWorkingDays}</span>
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;

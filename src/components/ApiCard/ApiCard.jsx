import { IconClose } from '@consta/icons/IconClose';
import { Card } from '@consta/uikit/Card';
import { Modal } from '@consta/uikit/Modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/apiSlice';
import './ApiCard.scss';

const ApiCard = ({ api }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.api.favorites);
  const isFavorite = favorites.includes(api.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    dispatch(toggleFavorite(api.id));
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Card
        verticalSpace="2xs"
        horizontalSpace="2xs"
        className="api-card"
        status="alert"
        shadow={false}
        border={true}
        form="round"
        onClick={handleCardClick}
      >
        <div className="api-card__content">
          <h5>{api.name}</h5>
          <button onClick={handleFavoriteClick}>
            {isFavorite ? 'В избранном ★' : 'В избранное ☆'}
          </button>
        </div>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <div className="api-modal">
          <div className="head">
            <h4>{api.name}</h4>
            <IconClose size="m" as="div" className="head-close" onClick={() => setIsModalOpen(false)} />
          </div>
          <div className="line"></div>
          <div className="body">
            <p>Домен: {api.domain ? api.domain + " " : "отсутствует"}</p>
            <p>Страна: {api.country}</p>
            <p>Код страны: {api.alpha_two_code}</p>
            <p>Сайт: {api.web_page}</p>
            <button onClick={handleFavoriteClick}>
              {isFavorite ? 'В избранном ★' : 'В избранное ☆'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApiCard;

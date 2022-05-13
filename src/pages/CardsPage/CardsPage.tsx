import { useAppDispatch } from '../../redux/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { deleteCard, listCard } from '../../redux/cards/cards-operation';
import { getCards } from '../../redux/cards/cards-selector';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import CardForm from '../../components/CardForm/CardForm';
import s from './CardsPage.module.scss';
import { ICardsFull } from '../../redux/cards/cards-operation';
import sprite from '../../images/sprite2.svg';

const CardsPage = () => {
  const appDispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ICardsFull>();
  const [cards, setCards] = useState(useSelector(getCards));
  const [selectedSet, setSelectedSet] = useState<{
    label: string;
    value: string;
  } | null>({
    label: 'All cards',
    value: '',
  });
  const [copiedCards, setCopiedCards] = useState(cards);

  const cardsList = useSelector(getCards);

  useEffect(() => {
    appDispatch(listCard());
  }, []);

  useEffect(() => {
    setCards(cardsList);
    if (selectedSet?.value === '') {
      setCopiedCards(cards);
    } else {
      const result = cards.filter((card) => card.set === selectedSet?.value);
      setCopiedCards(result);
    }
  }, [cardsList, cards, selectedSet]);

  const makeSetsList = () => {
    const setsListPrev: string[] = [];
    cardsList.forEach((card) => {
      if (!setsListPrev.includes(card.set) && card.set) {
        setsListPrev.push(card.set);
      }
    });
    const setsOptionsList = setsListPrev.map((set) => {
      return { value: set, label: set };
    });
    return setsOptionsList;
  };
  let setsList = makeSetsList();
  const setsListForFilter = [{ label: 'All cards', value: '' }, ...setsList];

  const toggleModal = () => {
    setIsModalOpen((prevState) => {
      if (prevState === true) {
        setSelectedCard(undefined);
      }
      return !prevState;
    });
  };

  const handleDelete = (card: ICardsFull) => {
    appDispatch(deleteCard(card._id));
  };

  const handleEdit = (card: ICardsFull) => {
    toggleModal();
    setSelectedCard(card);
  };

  const mixCards = () => {
    const newCards = [...copiedCards];
    const mixedCards = newCards.sort(() => Math.random() - 0.5);
    setCopiedCards(mixedCards);
  };

  const handleClickOnCard = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains(`${s.turned}`)) {
      e.currentTarget.classList.remove(`${s.turned}`);
    } else {
      e.currentTarget.classList.add(`${s.turned}`);
    }
  };

  const theme = localStorage.getItem('theme');

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: '#868686',
      color: 'white',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#868686',
      color: '#ffffff',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#ffffff',
    }),
    menuList: (provided, state) => ({
      ...provided,
      backgroundColor: '#868686',
      color: '#ffffff',
      padding: 10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#ffffff',
    }),
  };

  return (
    <div className={s.page}>
      <div className={s.control}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`${s.btn_add} ${theme === 'dark' ? s.btn_dark : ''}`}
        >
          Add card
        </button>
        <button
          onClick={() => mixCards()}
          className={`${s.btn_mix} ${theme === 'dark' ? s.btn_dark : ''}`}
        >
          Mix
        </button>
        <Select
          defaultValue={selectedSet}
          onChange={setSelectedSet}
          options={setsListForFilter}
          className={s.select}
          classNamePrefix='test'
          styles={theme === 'dark' ? customStyles : undefined}
        />
      </div>

      <ul className={s.list}>
        {copiedCards.map((card) => {
          return (
            <li className={s.list_item} key={card._id}>
              <div
                className={`${s.card} ${theme === 'dark' ? s.dark : ''}`}
                onClick={handleClickOnCard}
              >
                <div className={s.front_side}>
                  <p className={s.word}> {card.word}</p>
                  <button
                    onClick={() => handleDelete(card)}
                    className={s.btn_delete}
                  >
                    <svg width='20' height='20' className={s.delete_icon}>
                      <use href={`${sprite}#icon-delete`}></use>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(card)}
                    className={s.btn_edit}
                  >
                    <svg width='20' height='20' className={s.edit_icon}>
                      <use href={`${sprite}#icon-edit`}></use>
                    </svg>
                  </button>
                </div>
                <div className={s.back_side} id='my-scrollbar'>
                  <SimpleBar style={{ height: '90px' }}>
                    <div>
                      <p className={s.translation}> {card.translation}</p>
                      {card.description && <p> {card.description}</p>}
                      {card.synonyms && <p> ({card.synonyms})</p>}
                      {selectedSet?.value === '' && card.set && (
                        <p>[{card.set}]</p>
                      )}
                    </div>
                  </SimpleBar>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Footer />
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <CardForm selectedCard={selectedCard} setsList={setsList} />
        </Modal>
      )}
    </div>
  );
};

//

export default CardsPage;

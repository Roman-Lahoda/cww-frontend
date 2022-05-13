import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import Select from 'react-select';
import { createCard, updateCard } from '../../redux/cards/cards-operation';
import s from './CardForm.module.scss';
import { ICards } from '../../interface/interface-cards';

interface IProps {
  selectedCard?: ICards;
  setsList: { value: string; label: string }[];
}

const CardForm = ({ selectedCard, setsList }: IProps) => {
  const [word, setWord] = useState(selectedCard?.word || '');
  const [translation, setTranslation] = useState(
    selectedCard?.translation || ''
  );
  const [description, setDescription] = useState(
    selectedCard?.description || ''
  );
  const [synonyms, setSynonyms] = useState(selectedCard?.synonyms || '');
  const [set, setSet] = useState('');
  interface ISelectedSet {
    value?: string;
    label?: string;
  }
  const [selectedSet, setSelectedSet] = useState<ISelectedSet | null>(
    selectedCard?.set
      ? {
          value: selectedCard?.set,
          label: selectedCard?.set,
        }
      : null
  );
  const appDispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'word':
        setWord(value);
        break;
      case 'translation':
        setTranslation(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'synonyms':
        setSynonyms(value);
        break;
      case 'set':
        setSelectedSet(null);
        setSet(value);
        break;
      case 'setSelect':
        setSet('');

        break;

      default:
        break;
    }
  };

  const handleSelectSet = (selectedOption: ISelectedSet | null) => {
    setSelectedSet(selectedOption);
    setSet('');
  };

  const chosenSet = selectedSet?.value ? selectedSet.value : set;
  const card = {
    word,
    translation,
    description,
    synonyms,
    set: chosenSet,
  };
  let fullCard: ICards;
  if (selectedCard) {
    fullCard = {
      ...selectedCard,
      word,
      translation,
      description,
      synonyms,
      set: chosenSet,
    };
  }

  const handleSubmit = () => {
    if (selectedCard) {
      appDispatch(updateCard(fullCard));
    } else {
      appDispatch(createCard(card));
    }
    setWord('');
    setTranslation('');
    setDescription('');
    setSynonyms('');
    setSet('');
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
    placeholder: (provided, state) => ({
      ...provided,
      color: '#bcbcbc',
    }),
  };

  return (
    <div className={`${s.box} ${theme === 'dark' ? s.dark : ''}`}>
      <form action='' className={s.form}>
        <div className={s.block}>
          <input
            type='text'
            id='wordInput'
            autoComplete='off'
            value={word}
            placeholder='Word *'
            name='word'
            className={s.input}
            onChange={handleChange}
          />
        </div>
        <div className={s.block}>
          <input
            type='text'
            id='translationInput'
            autoComplete='off'
            value={translation}
            placeholder='Translation *'
            name='translation'
            className={s.input}
            onChange={handleChange}
          />
        </div>
        <div className={s.block}>
          <input
            type='text'
            id='descriptionInput'
            autoComplete='off'
            value={description}
            placeholder='Description'
            name='description'
            className={s.input}
            onChange={handleChange}
          />
        </div>
        <div className={s.block}>
          <input
            type='text'
            id='synonymsInput'
            autoComplete='off'
            value={synonyms}
            placeholder='Synonyms'
            name='synonyms'
            className={s.input}
            onChange={handleChange}
          />
        </div>
        <div className={s.block}>
          {setsList.length > 0 && (
            <Select
              name='setSelect'
              options={setsList}
              onChange={(selectedOption) => handleSelectSet(selectedOption)}
              value={selectedSet}
              isSearchable
              placeholder='Select set'
              styles={theme === 'dark' ? customStyles : undefined}
              className={s.select}
            />
          )}
          <input
            type='text'
            id='setInput'
            autoComplete='off'
            value={set}
            placeholder={setsList.length > 0 ? 'Or enter new' : 'Set'}
            name='set'
            className={s.input}
            onChange={handleChange}
            maxLength={20}
          />
        </div>
      </form>
      <button
        className={s.btn}
        onClick={() => handleSubmit()}
        disabled={word && translation ? false : true}
      >
        {selectedCard ? 'Update' : ' Add card'}
      </button>
    </div>
  );
};

export default CardForm;

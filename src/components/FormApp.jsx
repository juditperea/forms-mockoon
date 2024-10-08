import React, { useEffect, useState } from 'react';
import '../App.css';
import UsernameInput from './UsernameInput';
import NameInput from './NameInput';
import SurnameInput from './SurnameInput';
import CountrySelect from './CountrySelect';
import IDInput from './IDInput';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
import CityInput from './CityInput';
import StreetInput from './StreetInput';
import { act } from 'react-dom/test-utils';

function FormApp() {
  const MAX_USERNAME_LENGTH = 10;
  const [usernameAlert, setUsernameAlert] = useState('');
  const [isFormValid, setIsFormValid] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [idAlert, setIdAlert] = useState('');
  const [mockUsers, setMockUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    country: '',
    city: '',
    street: '',
    id: '',
  });

  const clearForm = () => {
    setFormData({
      username: '',
      name: '',
      surname: '',
      country: '',
      city: '',
      street: '',
      id: '',
    });
    setSuccessMessage('');
  };

  const [errorFields, setErrorFields] = useState({
    username: false,
    name: false,
    surname: false,
    country: false,
    city: false,
    street: false,
    id: false,
  });

  // Validation functions
  function validateIDSpain(id, country) {
    const VALID_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const ID_NUMBER = id.substring(0, id.length - 1);
    const ID_LETTER = id.charAt(id.length - 1).toUpperCase();
    const calculatedLetter = VALID_LETTERS[ID_NUMBER % 23];

    if (country === 'SPAIN') {
      if (id.length !== 9) {
        return false;
      }
      if (!/^\d+$/.test(ID_NUMBER)) {
        return false;
      }
      return ID_LETTER === calculatedLetter;
    }
  }

  function validateIDArgentina(id) {
    id = id.replace(/\s|-/g, '');
    return /^\d{7,8}$/.test(id);
  }

  function validateID(id, country) {
    if (country === 'SPAIN') {
      if (!validateIDSpain(id, country)) {
        setIdAlert('Enter a valid ID for Spain');
      } else {
        setIdAlert('');
      }
    } else if (country === 'ARGENTINA') {
      if (!validateIDArgentina(id, country)) {
        setIdAlert('Enter a valid ID for Argentina');
      } else {
        setIdAlert('');
      }
    }
  }

  function validateUsernameLength(username) {
    return username.length <= MAX_USERNAME_LENGTH;
  }

  function validateUsername(username) {
    const isFirstNameInUsername =
      username.includes(formData.name) && formData.name !== '';
    if (!validateUsernameLength(username)) {
      setUsernameAlert('Username must be 10 or less characters');
    } else if (isFirstNameInUsername) {
      setUsernameAlert("The name can't be included in the username");
    } else {
      setUsernameAlert('');
    }
  }

  useEffect(() => {
    validateUsername(formData.username);
    return () => {
      setUsernameAlert('');
    };
  }, [formData.username, formData.name]);

  useEffect(() => {
    validateID(formData.id, formData.country);
    return () => {
      setIdAlert('');
    };
  }, [formData.id, formData.country]);

  const handleIDChange = (e) => {
    const newID = e.target.value;
    setFormData({ ...formData, id: newID });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const noEmptyFields = Object.values(formData).every((value) => value !== '');
    const noAlerts = usernameAlert === '' && idAlert === '';

    if (noEmptyFields && noAlerts) {
      const user = {
        username: formData.username,
        name: formData.name,
        surname: formData.surname,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        id: formData.id,
      };
      setSuccessMessage('User created successfully');
    } else {
      setSuccessMessage('');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4090/api/v1/account/');
        const responseData = await response.json();
        console.log('responseData:', responseData);
        if (responseData) {
          const randomUsers = getRandomUsers(responseData, 10);
          act(() => {
            setMockUsers(randomUsers);
          });
        }
      } catch (error) {
        console.error('Error fetching Mockoon data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleMockUserClick = (mockUser) => {
    setFormData({
      username: mockUser.username,
      name: mockUser.personal_data.name,
      surname: mockUser.personal_data.surname,
      country: mockUser.country,
      city: mockUser.city,
      street: mockUser.street,
      id: mockUser.user_id,
    });
  };

  const getRandomUsers = (responseData, count) => {
    const userArray = [...responseData];
    const shuffled = userArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <UsernameInput
          value={formData.username}
          onChange={(e) =>
            setFormData({
              ...formData,
              username: e.target.value.toUpperCase(),
            })
          }
          usernameAlert={usernameAlert}
        />
        <NameInput
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value.toUpperCase(),
            })
          }
        />
        <SurnameInput
          value={formData.surname}
          onChange={(e) =>
            setFormData({
              ...formData,
              surname: e.target.value.toUpperCase(),
            })
          }
        />
        <CountrySelect
          value={formData.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              country: e.target.value,
            })
          }
        />
        <CityInput
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.target.value.toUpperCase(),
            })
          }
        />
        <StreetInput
          type="text"
          placeholder="Street"
          value={formData.street}
          onChange={(e) =>
            setFormData({
              ...formData,
              street: e.target.value.toUpperCase(),
            })
          }
        />
        <IDInput value={formData.id} onChange={handleIDChange} idAlert={idAlert} />
        <div className="buttondiv">
          <SubmitButton onClick={handleSubmit} />
          <ClearButton onClick={clearForm} />
        </div>
        <p className="success-message" data-testid="success-message">
          {successMessage}
        </p>
      </form>
      <div data-testid="userElement">
  <h2>Mock Users</h2>
  <ul className="mock-users-list">
    {mockUsers.map((user, index) => (
      <li key={index} onClick={() => handleMockUserClick(user)} className="mock-user-item">
        <div data-testid="userMock" className="mock-user">{user.username}</div>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}

export default FormApp;

import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addRokok } from './actions';

import styles from './style.module.scss'

function Add() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [isi, setIsi] = useState('');
    const [image, setImage] = useState(null);
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('isi', isi);
      formData.append('image', image);
  
      dispatch(addRokok(formData));
      navigate('/');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h2><FormattedMessage id="app_add_cigerate"/></h2>
                <form id="add-account-form" onSubmit={handleSubmit}>
                    <label for="title"><FormattedMessage id="app_title" /> :</label>
                    <input
                       type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label for="price"><FormattedMessage id="app_price" /> :</label>
                    <input
                        type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label for="isi"><FormattedMessage id="app_isi" /> :</label>
                    <input
                        type="number" id="isi" value={isi} onChange={(e) => setIsi(e.target.value)} />
                    <label for="image"><FormattedMessage id="app_image" /> :</label>
                    <input
                       type="file" id="image" name="image" onChange={handleImageChange} />
                    <button type="submit">Submit</button>

                </form>
            </div>

        </div>
    )
}

export default Add
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectProfile } from '@pages/Profile/selector';
import { editProfile } from './actions';

import styles from './style.module.scss'

function Edit({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: '',
        image: null,
    });

    const { username, email, password, image } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user.id;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        dispatch(editProfile(userId, formData));
        navigate('/profile');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <h2>Edit Profile</h2>
                <form id="add-account-form" onSubmit={handleSubmit}>
                    <label for="username"><FormattedMessage id="app_fullName" />:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                    <label for="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <label for="image"><FormattedMessage id="app_image" />:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    )
}

Edit.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    user: selectProfile,
});

export default connect(mapStateToProps)(Edit);
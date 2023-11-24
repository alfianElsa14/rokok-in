import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import { selectLogin } from '@containers/Client/selectors';
import { loginUser } from '@containers/Client/actions';

import styles from './style.module.scss'

function Login({ login }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}));
    }

    useEffect(() => {
        if (login) {
            navigate('/')
        }
    }, [login, navigate])

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContent}>
                <div className={styles.title}>Login</div>
                <form action="" className={styles.formLogin}>
                    <label htmlFor="">Email :</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="">Password :</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
                <button onClick={handleLogin}>Login</button>
                <p>
                    <FormattedMessage id="app_have_account" /> Click<a href="" onClick={() => navigate('/register')}> <FormattedMessage id="app_here" />
                    </a>
                </p>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    login: selectLogin
})

export default connect(mapStateToProps)(Login);
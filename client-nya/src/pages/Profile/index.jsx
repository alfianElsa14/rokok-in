import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectMyRokok, selectNewStock, selectProfile } from './selector';
import { deleteMyRokok, getMyRokok, getUsertById, midtransPayment, actionEditStatus, reduceStock } from './actions';
import { selectToken, selectUser } from '@containers/Client/selectors'

import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './style.module.scss'

function Profile({ user, dataUser, myRokok, newStock }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const id = dataUser?.id
    const role = user.role

    const handleDelete = (rokokId) => {
        dispatch(deleteMyRokok(rokokId));
        dispatch(getMyRokok())
    };


    const handleCheckout = (rokokId, idRokok) => {
        dispatch(midtransPayment(rokokId, () => {
            console.log('callback');
            dispatch(actionEditStatus(rokokId));
            dispatch(reduceStock(idRokok));
            dispatch(getMyRokok())
        }));
    };

    const formatRupiah = (angka) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(angka);
    };

    useEffect(() => {
        dispatch(getUsertById(id));
        dispatch(getMyRokok())
    }, [id]);
console.log(user, "<<");
    return (
        <div className={styles.profileContent}>
            <div className={styles.header}>
                <h1>Profile</h1>
                <button onClick={() => { navigate(`/edit/${user.id}`) }}>Edit Profile</button>
            </div>
            <div className={styles.profilePic}>
                <div className={styles.fotoProfile}>
                    <img src={user.image} alt="" />
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                </div>
                <h1><FormattedMessage id="app_cart" /></h1>
                {
                    role === 'user' && (
                        <div className={styles.listCard}>
                            {
                                myRokok.map((el) => (
                                    <div className={styles.card} >
                                        <div className={styles.image}>
                                            <img src={el.Rokok.image} />
                                        </div>
                                        <div className={styles.list} >
                                            <p className={styles.title}>{el.Rokok.title}</p>
                                            <p className={styles.price}><strong><FormattedMessage id="app_price" />: </strong>{formatRupiah(el.Rokok.price)}</p>
                                            <p className={styles.isi}><strong>Stock:</strong> {el.Rokok.stock}</p>
                                            <p>{el.status}</p>
                                            <div className={styles.buttonCart}>
                                                {
                                                    el.status === 'Pending' && (
                                                        <button className={styles.cartBut} onClick={() => handleCheckout(el.id, el.Rokok.id)}>
                                                            <AddShoppingCartIcon />
                                                        </button>
                                                    )
                                                }
                                                <button onClick={() => handleDelete(el.id)} className={styles.deleteButton}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object,
    dataUser: PropTypes.object,
    myRokok: PropTypes.array,
    token: PropTypes.string,
    newStock: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
    user: selectProfile,
    dataUser: selectUser,
    myRokok: selectMyRokok,
    token: selectToken,
    newStock: selectNewStock
});

export default connect(mapStateToProps)(Profile);
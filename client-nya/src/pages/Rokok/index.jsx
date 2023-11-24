import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectRokok, selectStock } from './selector';
import { addMyRokok, addStock, deleteRokok, getRokokById } from './actions';

import { selectUser } from '@containers/Client/selectors';

import styles from './style.module.scss'

function Rokok({ rokok, user, stock }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const role = user.role
    const [addedStock, setAddedStock] = useState(0);


    const formatRupiah = (angka) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        return formatter.format(angka);
    };

    const handleAdd = (e) => {
        e.preventDefault()
        if (rokok.stock < 1) {
            Swal.fire('Stock sudah habis');
        } else {
            dispatch(addMyRokok(id));
            navigate('/profile');
        }
    }

    const handleDeleteRokok = (id) => {
        dispatch(deleteRokok(id))
        navigate('/')
    }

    const handleAddStock = (e) => {
        e.preventDefault();
        dispatch(addStock(id, { stock: addedStock }));
    };


    useEffect(() => {
        dispatch(getRokokById(id));
    }, []);

    return (
        <div className={styles.detail}>
            <img src={rokok.image} alt="" />
            <div className={styles.cardDetail}>
                <>
                    <h1>{rokok.title}</h1>
                    <div className={styles.paraph}>
                        <div className={styles.paraph1}>
                            <p><FormattedMessage id="app_price" />: <strong>{formatRupiah(rokok.price)}</strong></p>
                            <p><FormattedMessage id="app_isi" />: <strong>{rokok.isi} <FormattedMessage id="app_stick" /> / <FormattedMessage id="app_pack" /></strong></p>
                            <p>Stock: <strong>{rokok.stock < 1 ? <FormattedMessage id="app_sold_out" /> : `${rokok.stock}`}</strong></p>
                        </div>
                        {role === 'user' ? (
                            <div className={styles.button}>
                                <button onClick={handleAdd}
                                ><FormattedMessage id="app_add_to_cart" /></button>
                            </div>
                        ) : (
                            <div className={styles.button}>
                                <div className={styles.addStock}>
                                    <input type="number"
                                        value={addedStock}
                                        onChange={(e) => setAddedStock(parseInt(e.target.value, 10))} />
                                    <button onClick={handleAddStock}><FormattedMessage id="app_add_stock" /></button>
                                </div>
                                <button onClick={() => handleDeleteRokok(rokok.id)} className={styles.deleteBut}><FormattedMessage id="app_delete" /></button>
                            </div>
                        )}
                    </div>
                </>
            </div>
        </div>
    )
}

Rokok.propTypes = {
    rokok: PropTypes.object,
    user: PropTypes.object,
    stock: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
    rokok: selectRokok,
    user: selectUser,
    stock: selectStock
});

export default connect(mapStateToProps)(Rokok);
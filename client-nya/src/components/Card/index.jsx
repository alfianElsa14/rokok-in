import React from 'react'
import { FormattedMessage } from 'react-intl';

import { useNavigate } from 'react-router-dom'

import styles from './style.module.scss'

function Card({ rokoks }) {
    const navigate = useNavigate()

    const formatRupiah = (angka) => {
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        });
        return formatter.format(angka);
      };

    return (
        <div className={styles.listCard}>
            {
                rokoks.map((el) => (
                    <div className={styles.card} onClick={() => navigate(`/rokok/${el.id}`)}>
                        <div className={styles.image}>
                            <img src={el.image} />
                        </div>
                        <div className={styles.list} >
                            <p className={styles.title}>{el.title}</p>
                            <p className={styles.price}><strong><FormattedMessage id="app_price" />: </strong>{formatRupiah(el.price)}</p>
                            <p className={styles.isi}><strong>Stock: </strong> 
                            {el.stock < 1 ? <FormattedMessage id="app_sold_out" /> : `${el.stock}`}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Card
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import Card from '@components/Card';
import { getAllRokok } from './actions';
import { selectRokoks } from './selectors';

import styles from './style.module.scss'
import { selectUser } from '@containers/Client/selectors';
import { useNavigate } from 'react-router-dom';

const Home = ({ rokoks, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRokoks, setFilteredRokoks] = useState([]);
  const role = user.role

  useEffect(() => {
    dispatch(getAllRokok());
  }, []);

  const handleSearch = () => {
    const filtered = rokoks.filter(rokok =>
      rokok.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRokoks(filtered);
  };


  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <h1><FormattedMessage id="app_cigerate_list" /></h1>
        {role === 'admin' && (
          <button onClick={() => navigate('/add')}><FormattedMessage id="app_add_cigerate" /></button>
        )}
      </div>
      <div className={styles.search}>
        <input type="search"
          placeholder="Search rokok"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}><FormattedMessage id="app_search" /></button>
      </div>
      <Card rokoks={filteredRokoks.length > 0 ? filteredRokoks : rokoks} />
    </div>
  );
};

Home.propTypes = {
  rokoks: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  rokoks: selectRokoks,
  user: selectUser,
});

export default connect(mapStateToProps)(Home);


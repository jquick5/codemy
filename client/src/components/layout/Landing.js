import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopThree from '../courses/TopThree';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large m'>Codemy</h1>
          <p className='lead'>Learn coding at the speed of you!</p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary m'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light m'>
              Sign In
            </Link>
          </div>
          <div className='hide-sm'>
            <h3 className='lead m'>Our Top Courses</h3>
            <div className='grid-container'>
              <TopThree />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

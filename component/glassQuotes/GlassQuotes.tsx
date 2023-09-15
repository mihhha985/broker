import React from 'react';
import './GlassQuotes.css';

function GlassQuotes({name}: {name: string}) {
  return ( 
    <div className="glassQuotes">
      <div className="glassQuotes__header">
        <div className="glassQuotes__header__title">
          Цена(USDT)
        </div>
        <div className="glassQuotes__header__title">
          Сумма(USDT)
        </div>
      </div>
      <div className="glassQuotes__body__sell">
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
      </div>
      <div className="glassQuotes__body__spread">
        <p>0.0975</p>
        <h6>0.0975</h6>
      </div>
      <div className="glassQuotes__body__buy">
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
        <div className="glassQuotes__body__item">
          <span className='price'>0.0982</span>
          <span className='value'>2.36K</span>
        </div>
      </div>
      <div className="glassQuotes__footer">
        <div className="glassQuotes__footer__title">
          {name}
        </div>
      </div>
    </div>
  );
}

export default GlassQuotes;
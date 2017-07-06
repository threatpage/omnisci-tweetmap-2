import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as dc from '@mapd/mapdc';

import LegendItem from '../components/LegendItem';
import { COLOR_MAP } from '../constants';
import langCodes from '../services/langCodes';
import { selectFilter } from '../thunks/legendFilter';

class Legend extends React.Component {
  static propTypes = {
    langCounts: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleClick(lang) {
    this.props.dispatch(selectFilter(lang));
  }

  render() {
    const noneSelected = this.props.selected.length === 0;
    const items = this.props.langCounts.map(({ lang, count }) =>
      <li
        key={lang}
        className="notTitle"
        onClick={() => {
          this.handleClick(lang);
        }}>
        <LegendItem
          color={COLOR_MAP[lang]}
          title={langCodes[lang].name}
          sub={String(count)}
          active={noneSelected || this.props.selected.includes(lang)}
        />
      </li>
    );

    return (
      <div id="legend">
        <ul>
          <li style={{ marginLeft: '0.8em' }}>
            <LegendItem
              justTitle={true}
              title="Languages"
              sub=""
              active={true}
            />
          </li>
          {items}
          <div id="legendDummy" />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { langCounts, selectedLangs, ...rest } = state;
  return {
    selected: selectedLangs,
    langCounts
  };
};

export default connect(mapStateToProps)(Legend);

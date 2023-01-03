import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { RiTeamFill } from 'react-icons/ri';
import { LabelFilter, InputFilter } from './Filter.styled';

export const Filter = ({ filterContact, filter }) => {
    return (
        <LabelFilter>
            <IconContext.Provider value={{ className: 'global-icon' }}>
                <RiTeamFill />
            </IconContext.Provider>
            Find contacts by name
            <InputFilter
                onChange={filterContact}
                value={filter}
                type="text"
                name="find"
                autoComplete="off"
            />
        </LabelFilter>
    );
};

Filter.propTypes = {
    filterContact: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

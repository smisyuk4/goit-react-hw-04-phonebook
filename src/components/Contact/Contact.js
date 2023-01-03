import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { RiUserUnfollowFill } from 'react-icons/ri';

import { ItemContact, ButtonRemoveContact } from './Contact.styled';

export const Contact = ({ contact, onClickBtnRemove }) => {
    const { id, name, number } = contact;
    return (
        <ItemContact>
            {name}: {number}
            <ButtonRemoveContact
                type="button"
                onClick={() => onClickBtnRemove(id)}
            >
                <IconContext.Provider value={{ className: 'global-icon' }}>
                    <RiUserUnfollowFill />
                </IconContext.Provider>
                Remove
            </ButtonRemoveContact>
        </ItemContact>
    );
};

Contact.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onClickBtnRemove: PropTypes.func.isRequired,
};

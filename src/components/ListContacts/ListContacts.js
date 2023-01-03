import PropTypes from 'prop-types';
import { Filter } from 'components/Filter';
import { Contact } from 'components/Contact';
import { BaseContacts, CollectionContacts } from './ListContacts.styled';

export const ListContacts = ({
    arrayContacts,
    filterContact,
    filter,
    onClickBtnRemove,
}) => {
    return (
        <BaseContacts>
            <Filter filterContact={filterContact} filter={filter} />
            {arrayContacts.length !== 0 && (
                <CollectionContacts>
                    {arrayContacts.map(item => (
                        <Contact
                            contact={item}
                            key={item.id}
                            onClickBtnRemove={onClickBtnRemove}
                        />
                    ))}
                </CollectionContacts>
            )}
        </BaseContacts>
    );
};

ListContacts.propTypes = {
    arrayContacts: PropTypes.array.isRequired,
    filterContact: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    onClickBtnRemove: PropTypes.func.isRequired,
};

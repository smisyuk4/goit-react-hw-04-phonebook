import PropTypes from 'prop-types';
import { Section, SectionTitle } from './Title.styled';

export const Title = ({ title, children }) => {
    return (
        <Section>
            <SectionTitle>{title}</SectionTitle>

            {children}
        </Section>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

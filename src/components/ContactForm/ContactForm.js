import PropTypes from 'prop-types';
import { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { IconContext } from 'react-icons';
import {
    RiContactsFill,
    RiUserVoiceFill,
    RiUserFollowFill,
} from 'react-icons/ri';
import {
    FormWrp,
    LabelForm,
    InputForm,
    ButtonForm,
    InputError,
} from './ContactForm.styled';

const REGEX_NAME = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const REGEX_NUMBER =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2)
        .max(20)
        .matches(
            REGEX_NAME,
            'Name may contain only letters, apostrophe, dash and spaces'
        )
        .required(),
    number: Yup.string()
        .matches(
            REGEX_NUMBER,
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
        )
        .required(),
});

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    sendContact = ({ name, number }, { resetForm }) => {
        const contactId = nanoid();
        const newContact = { name, number, id: contactId };

        // check uniq contact
        if (!this.checkUniq(name)) {
            //move data to App
            this.props.onSubmit(newContact);
            Notify.success('The contact has been sent to storage', {
                position: 'center-top',
            });
            resetForm();
        } else {
            Report.warning(
                'Sorry',
                'Not a unique contact - write a new one!',
                'Okay'
            );
        }
    };

    checkUniq = name => {
        const contactsBase = this.props.contactsBase;
        const newName = name.toLowerCase();

        return contactsBase.find(({ name }) => name.toLowerCase() === newName);
    };

    render() {
        return (
            <Formik
                initialValues={this.state}
                onSubmit={this.sendContact}
                validationSchema={contactSchema}
            >
                <FormWrp autoComplete="off">
                    <LabelForm>
                        <IconContext.Provider
                            value={{ className: 'global-icon' }}
                        >
                            <RiContactsFill />
                        </IconContext.Provider>
                        Name:
                        <InputForm type="text" name="name" />
                        <ErrorMessage name="name" component={InputError} />
                    </LabelForm>
                    <LabelForm>
                        <IconContext.Provider
                            value={{ className: 'global-icon' }}
                        >
                            <RiUserVoiceFill />
                        </IconContext.Provider>
                        Number:
                        <InputForm type="tel" name="number" />
                        <ErrorMessage name="number" component={InputError} />
                    </LabelForm>
                    <ButtonForm type="submit">
                        <IconContext.Provider
                            value={{ className: 'global-icon' }}
                        >
                            <RiUserFollowFill />
                        </IconContext.Provider>
                        Add contact
                    </ButtonForm>
                </FormWrp>
            </Formik>
        );
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

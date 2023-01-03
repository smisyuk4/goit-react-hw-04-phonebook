import styled from '@emotion/styled';

export const LabelFilter = styled.label`
    margin-bottom: 10px;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
`;

export const InputFilter = styled.input`
    width: 100%;
    font-size: 18px;
    background-color: #cfdbdb;
    border: none;

    &:focus-visible {
        outline: none;
    }

    &:hover,
    &:focus {
        background-color: #90d4d4;
    }
`;

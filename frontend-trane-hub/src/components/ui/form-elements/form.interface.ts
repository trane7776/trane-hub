import { EditorProps } from 'draft-js';
import {
    ButtonHTMLAttributes,
    CSSProperties,
    InputHTMLAttributes,
} from 'react';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { Options } from 'react-select';

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    error?: FieldError;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * draft editor
 */
type TypeEditorField = EditorProps & IField;

export interface ITextEditor extends Omit<TypeEditorField, 'editorState'> {
    onChange: (...event: any[]) => void;
    value: string;
}

/**
 * UploadField
 */

export interface IUploadField {
    folder?: string;
    value?: string;
    onChange: (url: string) => void;
    placeholder: string;
    error?: FieldError;
    isImage?: boolean;
}
// React-select

export interface IOption {
    label: string;
    value: string;
}

export interface ISelect extends IField {
    options: Options<IOption>;
    isMulti?: boolean;
    field: ControllerRenderProps<any, any>;
    isLoading?: boolean;
}

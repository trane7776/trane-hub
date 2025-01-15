import { EditorProps } from 'draft-js';
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    error?: FieldError;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

type TypeEditorField = EditorProps & IField;

export interface ITextEditor extends Omit<TypeEditorField, 'editorState'> {
    onChange: (...event: any[]) => void;
    value: string;
}

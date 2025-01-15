'use client';
import React, { useEffect, useState } from 'react';
import { ITextEditor } from '../form.interface';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import styles from './TextEditor.module.scss';
import { cn } from '@/lib/utils';
import { Editor } from 'react-draft-wysiwyg';

const TextEditor: React.FC<ITextEditor> = ({
    onChange,
    placeholder,
    value,
    error,
}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (isUpdated) return;
        const defaultValue = value || '';
        const blocksFromHtml = htmlToDraft(defaultValue);

        const contentState = ContentState.createFromBlockArray(
            blocksFromHtml.contentBlocks,
            blocksFromHtml.entityMap
        );

        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
    }, [value, isUpdated]);

    const onEditorStateChange = (editorState: EditorState) => {
        setIsUpdated(true);
        setEditorState(editorState);
        return onChange(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
    };
    return (
        <div className={cn(styles.editor_wrapper, 'animate-fade')}>
            <label>
                <span>{placeholder}</span>
                <div className={styles.wrapper}>
                    <Editor
                        toolbarClassName={styles.toolbar}
                        editorClassName={styles.editor}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        spellCheck
                        toolbar={{
                            options: ['inline', 'list'],
                            inline: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                                options: [
                                    'bold',
                                    'italic',
                                    'underline',
                                    'strikethrough',
                                ],
                            },
                            list: {
                                inDropdown: false,
                                options: ['unordered', 'ordered'],
                            },
                        }}
                    />
                </div>
            </label>
            {error && <div className={styles.error}>{error.message}</div>}
        </div>
    );
};
export default TextEditor;

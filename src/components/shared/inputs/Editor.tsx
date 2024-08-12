'use client'

import { useEffect, useMemo, useRef } from 'react'
import Accordion from '@yoopta/accordion'
import ActionMenuList, {
    DefaultActionMenuRender,
} from '@yoopta/action-menu-list'
import Blockquote from '@yoopta/blockquote'
import Callout from '@yoopta/callout'
import Code from '@yoopta/code'
import YooptaEditor, {
    createYooptaEditor,
    YooptaContentValue,
} from '@yoopta/editor'
import Embed from '@yoopta/embed'
import { markdown } from '@yoopta/exports'
import File from '@yoopta/file'
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool'
import { BulletedList, NumberedList, TodoList } from '@yoopta/lists'
import {
    Bold,
    CodeMark,
    Highlight,
    Italic,
    Strike,
    Underline,
} from '@yoopta/marks'
import Paragraph from '@yoopta/paragraph'
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar'
import Video from '@yoopta/video'

const plugins = [
    Paragraph,
    Accordion,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Callout,
    NumberedList,
    BulletedList,
    TodoList,
    Code,
    Link,
    Embed,
    Image.extend({
        options: {
            async onUpload(file) {
                // const data = await uploadToCloudinary(file, 'image')

                return {
                    src: 'https://res.cloudinary.com/ench-app/image/upload/v1716997748/e608ab26-d8fd-44b6-8859-b35abc4b5558_oifyp1.webp',
                    alt: 'cloudinary',
                    sizes: {
                        width: 100,
                        height: 100,
                    },
                }
            },
        },
    }),
    Video.extend({
        options: {
            onUpload: async (file) => {
                // const data = await uploadToCloudinary(file, 'video')
                return {
                    src: 'https://res.cloudinary.com/ench-app/video/upload/v1716993231/Yoopta_Intro_cxh1iu.mp4',
                    alt: 'cloudinary',
                    sizes: {
                        width: 200,
                        height: 200,
                    },
                }
            },
        },
    }),
    File.extend({
        options: {
            onUpload: async (file) => {
                // const response = await uploadToCloudinary(file, 'auto')
                return {
                    src: 'https://res.cloudinary.com/ench-app/image/upload/v1716997748/e608ab26-d8fd-44b6-8859-b35abc4b5558_oifyp1.webp',
                    format: 'webp',
                    name: 'test',
                    size: 120,
                }
            },
        },
    }),
]

const TOOLS = {
    ActionMenu: {
        render: DefaultActionMenuRender,
        tool: ActionMenuList,
    },
    Toolbar: {
        render: DefaultToolbarRender,
        tool: Toolbar,
    },
    LinkTool: {
        render: DefaultLinkToolRender,
        tool: LinkTool,
    },
}

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight]

type EditorProps = {
    defaultValue?: string
    onChange?: (value: string) => void
    readonly?: boolean
}
export default function Editor(props: EditorProps) {
    const { defaultValue, onChange, readonly = false } = props

    const editor = useMemo(() => createYooptaEditor(), [])
    const selectionRef = useRef(null)

    useEffect(() => {
        function handleChange(value: YooptaContentValue) {
            const markdownString = markdown.serialize(editor, value)
            onChange?.(markdownString)
        }
        editor.on('change', handleChange)
        return () => {
            editor.off('change', handleChange)
        }
    }, [editor])

    useEffect(() => {
        if (!defaultValue) return
        const content = markdown.deserialize(editor, defaultValue)
        editor.setEditorValue(content)
    }, [defaultValue, markdown, editor])

    return (
        <div ref={selectionRef}>
            <YooptaEditor
                editor={editor}
                plugins={plugins}
                tools={TOOLS}
                marks={MARKS}
                selectionBoxRoot={selectionRef}
                autoFocus
                readOnly={readonly}
            />
        </div>
    )
}
